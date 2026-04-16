import { createClient } from "@supabase/supabase-js";

/**
 * 서버 컴포넌트에서 사용하는 Supabase 클라이언트
 * service_role 키를 사용하여 RLS를 우회함 (어드민 전용)
 */
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
