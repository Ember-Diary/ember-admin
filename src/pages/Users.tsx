import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { supabase } from '../lib/supabase';
import { formatDate } from '../lib/utils';
import type { User } from '../types';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select(
          'id, email, name, nickname, birth_date, subscription_tier, onboarding_completed, created_at',
        )
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        setUsers([]);
      } else {
        setUsers(data ?? []);
        if ((data ?? []).length === 0) {
          setError(
            'RLS 정책으로 인해 전체 유저 목록을 조회할 수 없습니다. 본인 프로필만 표시됩니다.',
          );
        }
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Header title="유저 관리" />
      <div className="p-6">
        {error && (
          <div className="mb-4 rounded-lg border border-yellow-600/30 bg-yellow-900/20 px-4 py-3 text-sm text-yellow-300">
            {error}
            <p className="mt-1 text-xs text-yellow-400/70">
              전체 유저 조회는 service_role 키가 필요합니다.
            </p>
          </div>
        )}

        {loading ? (
          <p className="text-sm text-[var(--ember-muted)]">로딩 중...</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[var(--ember-border)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--ember-sidebar)]">
                <tr>
                  <th className="px-4 py-3 font-medium text-[var(--ember-muted)]">이메일</th>
                  <th className="px-4 py-3 font-medium text-[var(--ember-muted)]">닉네임</th>
                  <th className="px-4 py-3 font-medium text-[var(--ember-muted)]">구독</th>
                  <th className="px-4 py-3 font-medium text-[var(--ember-muted)]">가입일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--ember-border)]">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-[var(--ember-card)] transition-colors hover:bg-[var(--ember-border)]"
                  >
                    <td className="px-4 py-3 text-[var(--ember-text)]">{user.email}</td>
                    <td className="px-4 py-3 text-[var(--ember-text)]">
                      {user.nickname ?? user.name ?? '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          user.subscription_tier === 'premium'
                            ? 'bg-[var(--ember-highlight)]/20 text-[var(--ember-highlight)]'
                            : 'bg-[var(--ember-muted)]/20 text-[var(--ember-muted)]'
                        }`}
                      >
                        {user.subscription_tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--ember-muted)]">
                      {formatDate(user.created_at)}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-sm text-[var(--ember-muted)]"
                    >
                      조회된 유저가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
