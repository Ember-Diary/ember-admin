import { createBrowserClient } from "@supabase/ssr";

/**
 * 브라우저에서 사용하는 Supabase 클라이언트
 * anon 키를 사용 (로그인 등 클라이언트 인증용)
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
