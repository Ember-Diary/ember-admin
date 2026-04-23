import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { supabase } from '../lib/supabase';
import type { DashboardStats } from '../types';

const STAT_CARDS = [
  { key: 'totalUsers' as const, label: '총 유저', icon: '👥', rlsRestricted: true },
  { key: 'activeSessions' as const, label: '활성 세션', icon: '🟢', rlsRestricted: true },
  { key: 'diaryCount' as const, label: '일기 수', icon: '📝', rlsRestricted: true },
  { key: 'fortuneCount' as const, label: '운세 생성 수 (오늘)', icon: '🔮', rlsRestricted: false },
];

const today = new Date().toISOString().split('T')[0];

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const [profilesRes, sessionsRes, diariesRes, fortunesRes] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase
      .from('chat_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('session_date', today)
      .eq('status', 'active'),
    supabase.from('diaries').select('*', { count: 'exact', head: true }),
    supabase
      .from('daily_fortunes')
      .select('*', { count: 'exact', head: true })
      .eq('fortune_date', today),
  ]);

  return {
    totalUsers: profilesRes.count,
    activeSessions: sessionsRes.count,
    diaryCount: diariesRes.count,
    fortuneCount: fortunesRes.count,
  };
};

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: null,
    activeSessions: null,
    diaryCount: null,
    fortuneCount: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  const renderValue = (key: keyof DashboardStats, rlsRestricted: boolean) => {
    if (loading) return '...';
    const value = stats[key];
    if (value === null || value === 0) {
      return rlsRestricted ? 'RLS 제한' : '0';
    }
    return value.toLocaleString();
  };

  return (
    <div>
      <Header title="대시보드" />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(({ key, label, icon, rlsRestricted }) => (
            <div
              key={key}
              className="rounded-xl border border-[var(--ember-border)] bg-[var(--ember-card)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--ember-muted)]">{label}</span>
                <span className="text-xl">{icon}</span>
              </div>
              <div className="mt-2 text-2xl font-bold text-[var(--ember-text)]">
                {renderValue(key, rlsRestricted)}
              </div>
              {rlsRestricted && stats[key] === null && !loading && (
                <p className="mt-1 text-xs text-[var(--ember-muted)]">
                  본인 데이터만 조회 가능 (service_role 필요)
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
