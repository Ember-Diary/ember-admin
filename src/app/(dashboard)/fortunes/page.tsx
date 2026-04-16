const TABLE_HEADERS = ["유저", "운세 타입", "내용 미리보기", "생성일"] as const;

const FortunesPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-ember-900">운세 모니터링</h2>
        <p className="mt-1 text-sm text-ember-800/60">
          AI 생성 운세 현황을 모니터링합니다.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-ember-300/30 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ember-300/30 bg-ember-100/50">
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ember-800/60"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={TABLE_HEADERS.length}
                className="px-6 py-12 text-center text-ember-800/60"
              >
                Supabase 연동 후 운세 데이터가 표시됩니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FortunesPage;
