import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { supabase } from '../lib/supabase';

type DocumentType = 'privacy_policy' | 'terms_of_service';

type LegalDocument = {
  id: string;
  doc_type: DocumentType;
  title: string;
  content: string;
  doc_version: string;
  updated_at: string;
};

const TAB_LABELS: Record<DocumentType, string> = {
  privacy_policy: '개인정보처리방침',
  terms_of_service: '서비스 이용약관',
};

export const Legal = () => {
  const [docs, setDocs] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<DocumentType>('privacy_policy');
  const [content, setContent] = useState('');
  const [version, setVersion] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const fetchDocs = async () => {
    const { data } = await supabase.from('legal_documents').select('*').order('doc_type');
    setDocs(data ?? []);
    setLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchDocs uses state setters only, safe to call once on mount
  useEffect(() => {
    fetchDocs();
  }, []);

  useEffect(() => {
    const doc = docs.find((d) => d.doc_type === activeTab);
    if (doc) {
      setContent(doc.content);
      setVersion(doc.doc_version);
    }
  }, [activeTab, docs]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('legal_documents')
      .update({ content, doc_version: version })
      .eq('doc_type', activeTab);

    if (!error) {
      await fetchDocs();
      alert('저장되었습니다.');
    } else {
      alert(`저장 실패: ${error.message}`);
    }
    setSaving(false);
  };

  const activeDoc = docs.find((d) => d.doc_type === activeTab);

  return (
    <div>
      <Header title="약관 관리" />
      <div className="p-6">
        <div className="mb-6 flex gap-2">
          {(Object.keys(TAB_LABELS) as DocumentType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveTab(type)}
              className={[
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                activeTab === type
                  ? 'bg-[var(--ember-accent)] text-white'
                  : 'bg-[var(--ember-card)] text-[var(--ember-muted)] hover:bg-[var(--ember-border)]',
              ].join(' ')}
            >
              {TAB_LABELS[type]}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-[var(--ember-muted)]">로딩 중...</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-[var(--ember-text)]">
                버전
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-24 rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] px-3 py-1.5 text-sm text-[var(--ember-text)] outline-none focus:border-[var(--ember-accent)]"
                />
              </label>
              {activeDoc && (
                <span className="text-xs text-[var(--ember-muted)]">
                  최종 수정: {new Date(activeDoc.updated_at).toLocaleString('ko-KR')}
                </span>
              )}
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="rounded-lg border border-[var(--ember-border)] px-4 py-2 text-sm text-[var(--ember-text)] transition-colors hover:bg-[var(--ember-border)]"
                >
                  {showPreview ? '편집' : '미리보기'}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-[var(--ember-accent)] px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? '저장 중...' : '저장'}
                </button>
              </div>
            </div>

            {showPreview ? (
              <div className="min-h-[500px] rounded-lg border border-[var(--ember-border)] bg-[var(--ember-card)] p-6">
                <div
                  className="prose prose-invert max-w-none text-[var(--ember-text)]"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: markdown preview requires innerHTML rendering
                  dangerouslySetInnerHTML={{
                    __html: markdownToHtml(content),
                  }}
                />
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[500px] w-full resize-y rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] p-4 font-mono text-sm leading-relaxed text-[var(--ember-text)] outline-none placeholder:text-[var(--ember-muted)] focus:border-[var(--ember-accent)]"
                placeholder="마크다운으로 작성해주세요..."
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/** 간단한 마크다운 → HTML 변환 (미리보기용) */
const markdownToHtml = (md: string): string =>
  md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/^---$/gm, '<hr />')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/^(.+)$/gm, (_, line) => (line.startsWith('<') ? line : `<p>${line}</p>`));
