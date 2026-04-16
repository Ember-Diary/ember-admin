const TABLE_HEADERS = ["이름", "이메일", "구독 상태", "가입일", "관리"] as const;

const UsersPage = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ember-900">유저 관리</h2>
        <p className="text-sm text-ember-800/60">총 0명</p>
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
                Supabase 연동 후 유저 데이터가 표시됩니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
