import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { supabase } from '../lib/supabase';
import type { DailyFortune } from '../types';

const today = new Date().toISOString().split('T')[0];

interface GroupedFortunes {
  birthDate: string;
  fortunes: DailyFortune[];
}

const groupByBirthDate = (fortunes: DailyFortune[]): GroupedFortunes[] => {
  const grouped = fortunes.reduce<Record<string, DailyFortune[]>>((acc, fortune) => {
    const key = fortune.birth_date;
    acc[key] = [...(acc[key] ?? []), fortune];
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([birthDate, items]) => ({ birthDate, fortunes: items }))
    .sort((a, b) => a.birthDate.localeCompare(b.birthDate));
};

const ScoreBadge = ({ label, score }: { label: string; score: number | null }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--ember-accent)]/10 px-3 py-0.5 text-xs font-medium text-[var(--ember-accent)]">
    {label}: {score !== null ? score : '-'}
  </span>
);

export const Fortunes = () => {
  const [groups, setGroups] = useState<GroupedFortunes[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    const fetchFortunes = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('daily_fortunes')
        .select(
          'id, birth_date, fortune_date, emotion_score, relation_score, execution_score, overall_message, created_at',
        )
        .eq('fortune_date', selectedDate)
        .order('birth_date');

      setGroups(groupByBirthDate(data ?? []));
      setLoading(false);
    };

    fetchFortunes();
  }, [selectedDate]);

  return (
    <div>
      <Header title="운세 모니터링" />
      <div className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <label htmlFor="fortune-date" className="text-sm text-[var(--ember-muted)]">
            날짜:
          </label>
          <input
            id="fortune-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] px-3 py-2 text-sm text-[var(--ember-text)] outline-none focus:border-[var(--ember-accent)]"
          />
        </div>

        {loading ? (
          <p className="text-sm text-[var(--ember-muted)]">로딩 중...</p>
        ) : groups.length === 0 ? (
          <p className="text-sm text-[var(--ember-muted)]">
            {selectedDate} 날짜의 운세 데이터가 없습니다.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {groups.map((group) => (
              <div key={group.birthDate}>
                <h3 className="mb-3 text-sm font-semibold text-[var(--ember-text)]">
                  생년월일: {group.birthDate}
                </h3>
                <div className="flex flex-col gap-4">
                  {group.fortunes.map((fortune) => (
                    <div
                      key={fortune.id}
                      className="rounded-xl border border-[var(--ember-border)] bg-[var(--ember-card)] p-5"
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <ScoreBadge label="감정" score={fortune.emotion_score} />
                        <ScoreBadge label="관계" score={fortune.relation_score} />
                        <ScoreBadge label="실행" score={fortune.execution_score} />
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--ember-text)]">
                        {fortune.overall_message ?? '메시지 없음'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
