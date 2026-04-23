import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { supabase } from '../lib/supabase';
import type { EmotionTag } from '../types';

type CategoryType = EmotionTag['category'];

const CATEGORY_LABELS: Record<CategoryType, string> = {
  positive: '긍정',
  negative: '부정',
  neutral: '중립',
};

const CATEGORY_COLORS: Record<CategoryType, string> = {
  positive: '#2ECC71',
  negative: '#E74C3C',
  neutral: '#95A5A6',
};

export const Emotions = () => {
  const [tags, setTags] = useState<EmotionTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState('');
  const [newColor, setNewColor] = useState('#D4724A');
  const [newCategory, setNewCategory] = useState<CategoryType>('neutral');
  const [submitting, setSubmitting] = useState(false);

  const fetchTags = async () => {
    const { data } = await supabase
      .from('emotion_tags')
      .select('id, name, category, icon, color')
      .order('name');

    setTags(data ?? []);
    setLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchTags uses state setters only, safe to call once on mount
  useEffect(() => {
    fetchTags();
  }, []);

  const handleAdd = async () => {
    const trimmed = newTag.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    const { data, error } = await supabase
      .from('emotion_tags')
      .insert({ name: trimmed, color: newColor, category: newCategory })
      .select()
      .single();

    if (!error && data) {
      setTags((prev) => [...prev, data]);
      setNewTag('');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('emotion_tags').delete().eq('id', id);

    if (!error) {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    }
  };

  return (
    <div>
      <Header title="감정 태그 관리" />
      <div className="p-6">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="새 감정 태그"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] px-4 py-2 text-sm text-[var(--ember-text)] outline-none placeholder:text-[var(--ember-muted)] focus:border-[var(--ember-accent)]"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as CategoryType)}
            className="rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] px-3 py-2 text-sm text-[var(--ember-text)] outline-none focus:border-[var(--ember-accent)]"
          >
            <option value="positive">긍정</option>
            <option value="negative">부정</option>
            <option value="neutral">중립</option>
          </select>
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="h-9 w-9 cursor-pointer rounded border-none bg-transparent"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={submitting}
            className="rounded-lg bg-[var(--ember-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? '추가 중...' : '추가'}
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-[var(--ember-muted)]">로딩 중...</p>
        ) : tags.length === 0 ? (
          <p className="text-sm text-[var(--ember-muted)]">등록된 감정 태그가 없습니다.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 rounded-full border border-[var(--ember-border)] bg-[var(--ember-card)] px-4 py-2"
              >
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: tag.color ?? CATEGORY_COLORS[tag.category] }}
                />
                <span className="text-sm text-[var(--ember-text)]">{tag.name}</span>
                <span className="text-xs text-[var(--ember-muted)]">
                  {CATEGORY_LABELS[tag.category]}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(tag.id)}
                  className="ml-1 text-[var(--ember-muted)] transition-colors hover:text-red-400"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
