const STATS = [
  { label: "총 유저 수", value: "-", icon: "👥" },
  { label: "오늘 활성 세션", value: "-", icon: "🟢" },
  { label: "오늘 일기 수", value: "-", icon: "📝" },
  { label: "운세 생성 수", value: "-", icon: "🔮" },
] as const;

const DashboardPage = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-ember-900">대시보드</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, icon }) => (
          <div
            key={label}
            className="rounded-xl border border-ember-300/30 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-ember-800/60">{label}</p>
              <span className="text-2xl">{icon}</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-ember-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-ember-300/30 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-ember-900">
          최근 활동
        </h3>
        <p className="text-ember-800/60">
          Supabase 연동 후 실시간 데이터가 표시됩니다.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
