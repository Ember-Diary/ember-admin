import { Header } from "../components/Header";
import type { DashboardStats } from "../types";

const PLACEHOLDER_STATS: DashboardStats = {
  totalUsers: 0,
  activeSessions: 0,
  diaryCount: 0,
  fortuneCount: 0,
};

const STAT_CARDS = [
  { key: "totalUsers" as const, label: "총 유저", icon: "👥" },
  { key: "activeSessions" as const, label: "활성 세션", icon: "🟢" },
  { key: "diaryCount" as const, label: "일기 수", icon: "📝" },
  { key: "fortuneCount" as const, label: "운세 생성 수", icon: "🔮" },
];

export const Dashboard = () => {
  const stats = PLACEHOLDER_STATS;

  return (
    <div>
      <Header title="대시보드" />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(({ key, label, icon }) => (
            <div
              key={key}
              className="rounded-xl border border-[var(--ember-border)] bg-[var(--ember-card)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--ember-muted)]">
                  {label}
                </span>
                <span className="text-xl">{icon}</span>
              </div>
              <div className="mt-2 text-2xl font-bold text-[var(--ember-text)]">
                {stats[key].toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
