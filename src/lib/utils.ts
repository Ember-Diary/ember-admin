/**
 * 클래스 이름을 조건부로 결합하는 유틸리티
 */
export const cn = (...classes: (string | boolean | undefined | null)[]): string =>
  classes.filter(Boolean).join(" ");

/**
 * 날짜를 한국어 형식으로 포맷
 */
export const formatDate = (date: string): string =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));

/**
 * 숫자를 한국어 형식으로 포맷 (1,000 등)
 */
export const formatNumber = (num: number): string =>
  new Intl.NumberFormat("ko-KR").format(num);

/**
 * 환경변수에서 어드민 이메일 목록을 가져옴
 */
export const getAdminEmails = (): string[] =>
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
