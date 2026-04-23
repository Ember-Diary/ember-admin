import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { session, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--ember-bg)]">
        <div className="text-[var(--ember-muted)]">로딩 중...</div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[var(--ember-bg)]">
        <h1 className="text-2xl font-bold text-[var(--ember-accent)]">접근 거부</h1>
        <p className="text-[var(--ember-muted)]">어드민 권한이 필요합니다.</p>
      </div>
    );
  }

  return <>{children}</>;
};
