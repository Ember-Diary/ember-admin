/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷합니다.
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

/**
 * 클래스명을 조건부로 결합합니다.
 */
export const cn = (...classes: (string | boolean | undefined)[]): string =>
  classes.filter(Boolean).join(" ");

/**
 * 어드민 이메일 목록을 환경변수에서 파싱합니다.
 */
export const getAdminEmails = (): string[] => {
  const emails = import.meta.env.VITE_ADMIN_EMAILS as string | undefined;
  return emails?.split(",").map((e) => e.trim()) ?? [];
};
