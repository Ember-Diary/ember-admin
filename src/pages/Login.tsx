import { useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export const Login = () => {
  const { session, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--ember-bg)]">
        <div className="text-[var(--ember-muted)]">로딩 중...</div>
      </div>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
    }

    setSubmitting(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[var(--ember-bg)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-[var(--ember-card)] p-8 shadow-lg"
      >
        <div className="mb-6 text-center">
          <span className="text-4xl">🔥</span>
          <h1 className="mt-2 text-xl font-bold text-[var(--ember-highlight)]">Ember Admin</h1>
          <p className="mt-1 text-sm text-[var(--ember-muted)]">어드민 로그인</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-900/30 p-3 text-sm text-red-400">{error}</div>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] px-4 py-2.5 text-sm text-[var(--ember-text)] outline-none placeholder:text-[var(--ember-muted)] focus:border-[var(--ember-accent)]"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-lg border border-[var(--ember-border)] bg-[var(--ember-bg)] px-4 py-2.5 text-sm text-[var(--ember-text)] outline-none placeholder:text-[var(--ember-muted)] focus:border-[var(--ember-accent)]"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[var(--ember-accent)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </form>
    </div>
  );
};
