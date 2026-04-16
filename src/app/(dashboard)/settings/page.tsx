const SETTINGS_SECTIONS = [
  {
    title: "일반 설정",
    description: "서비스 기본 설정을 관리합니다.",
  },
  {
    title: "알림 설정",
    description: "푸시 알림 및 이메일 알림을 설정합니다.",
  },
  {
    title: "AI 설정",
    description: "운세 생성 AI 모델 및 파라미터를 설정합니다.",
  },
] as const;

const SettingsPage = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-ember-900">시스템 설정</h2>

      <div className="space-y-6">
        {SETTINGS_SECTIONS.map(({ title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-ember-300/30 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-ember-900">{title}</h3>
            <p className="mt-1 text-sm text-ember-800/60">{description}</p>
            <div className="mt-4 rounded-lg bg-ember-100/50 p-4">
              <p className="text-sm text-ember-800/60">Coming soon</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
