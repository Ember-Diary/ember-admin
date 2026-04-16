"use client";

import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-ember-800/30 bg-white px-6">
      <div />
      <button
        onClick={handleLogout}
        className="rounded-lg bg-ember-900 px-4 py-2 text-sm text-ember-100 transition-colors hover:bg-ember-800"
      >
        로그아웃
      </button>
    </header>
  );
};
