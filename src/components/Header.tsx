import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { session } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-[var(--ember-border)] bg-[var(--ember-card)] px-6 py-4">
      <h1 className="text-xl font-bold text-[var(--ember-text)]">{title}</h1>
      <div className="text-sm text-[var(--ember-muted)]">
        {session?.user?.email}
      </div>
    </header>
  );
};
