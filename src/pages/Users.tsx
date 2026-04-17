import { Header } from "../components/Header";
import type { User } from "../types";
import { formatDate } from "../lib/utils";

const PLACEHOLDER_USERS: User[] = [
  {
    id: "1",
    email: "user1@example.com",
    nickname: "모닥불유저",
    subscription: "free",
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "2",
    email: "user2@example.com",
    nickname: "별빛여행자",
    subscription: "premium",
    created_at: "2026-02-20T00:00:00Z",
  },
];

export const Users = () => {
  const users = PLACEHOLDER_USERS;

  return (
    <div>
      <Header title="유저 관리" />
      <div className="p-6">
        <div className="overflow-hidden rounded-xl border border-[var(--ember-border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--ember-sidebar)]">
              <tr>
                <th className="px-4 py-3 font-medium text-[var(--ember-muted)]">
                  이메일
                </th>
                <th className="px-4 py-3 font-medium text-[var(--ember-muted)]">
                  닉네임
                </th>
                <th className="px-4 py-3 font-medium text-[var(--ember-muted)]">
                  구독
                </th>
                <th className="px-4 py-3 font-medium text-[var(--ember-muted)]">
                  가입일
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ember-border)]">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="bg-[var(--ember-card)] transition-colors hover:bg-[var(--ember-border)]"
                >
                  <td className="px-4 py-3 text-[var(--ember-text)]">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-[var(--ember-text)]">
                    {user.nickname}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        user.subscription === "premium"
                          ? "bg-[var(--ember-highlight)]/20 text-[var(--ember-highlight)]"
                          : "bg-[var(--ember-muted)]/20 text-[var(--ember-muted)]"
                      }`}
                    >
                      {user.subscription}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--ember-muted)]">
                    {formatDate(user.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
