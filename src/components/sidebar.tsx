"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "대시보드", icon: "📊" },
  { href: "/users", label: "유저 관리", icon: "👥" },
  { href: "/emotions", label: "감정 태그", icon: "🎨" },
  { href: "/fortunes", label: "운세", icon: "🔮" },
  { href: "/settings", label: "설정", icon: "⚙️" },
] as const;

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-ember-900 text-ember-100">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-ember-300">🔥 모닥불 Admin</h1>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-ember-800 text-ember-300"
                      : "text-ember-100/70 hover:bg-ember-800/50 hover:text-ember-100"
                  )}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-ember-800 px-6 py-4">
        <p className="text-xs text-ember-100/50">Ember Admin v0.1.0</p>
      </div>
    </aside>
  );
};
