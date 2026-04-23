import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

const NAV_ITEMS = [
  { to: "/", label: "대시보드", icon: "📊" },
  { to: "/users", label: "유저 관리", icon: "👥" },
  { to: "/emotions", label: "감정 태그", icon: "🎭" },
  { to: "/fortunes", label: "운세", icon: "🔮" },
  { to: "/legal", label: "약관 관리", icon: "📜" },
  { to: "/settings", label: "설정", icon: "⚙️" },
] as const;

export const Sidebar = () => {
  const { signOut } = useAuth();

  return (
    <aside className="flex h-screen w-60 flex-col bg-[var(--ember-sidebar)] p-4">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="text-2xl">🔥</span>
        <span className="text-lg font-bold text-[var(--ember-highlight)]">
          Ember Admin
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-[var(--ember-accent)] text-white font-medium"
                  : "text-[var(--ember-text)] hover:bg-[var(--ember-border)]",
              ].join(" ")
            }
          >
            <span>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={signOut}
        className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--ember-muted)] transition-colors hover:bg-[var(--ember-border)] hover:text-[var(--ember-text)]"
      >
        <span>🚪</span>
        <span>로그아웃</span>
      </button>
    </aside>
  );
};
