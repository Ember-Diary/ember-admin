const EmotionsPage = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ember-900">감정 태그 관리</h2>
        <button className="rounded-lg bg-ember-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ember-500/90">
          태그 추가
        </button>
      </div>

      <div className="rounded-xl border border-ember-300/30 bg-white p-6 shadow-sm">
        <p className="text-ember-800/60">
          Supabase 연동 후 감정 태그 데이터가 표시됩니다.
        </p>
      </div>
    </div>
  );
};

export default EmotionsPage;
