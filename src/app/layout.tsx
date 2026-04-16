import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모닥불 Admin Dashboard",
  description: "Ember Admin Dashboard - 모닥불 서비스 관리",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className="bg-ember-100/30">{children}</body>
    </html>
  );
};

export default RootLayout;
