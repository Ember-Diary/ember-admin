import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[var(--ember-bg)]">
        <Outlet />
      </main>
    </div>
  );
};
