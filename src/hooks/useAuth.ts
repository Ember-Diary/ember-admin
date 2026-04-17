import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { getAdminEmails } from "../lib/utils";

interface AuthState {
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
}

export const useAuth = (): AuthState & { signOut: () => Promise<void> } => {
  const [state, setState] = useState<AuthState>({
    session: null,
    isAdmin: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkAdmin = (session: Session | null): boolean => {
      const email = session?.user?.email;
      if (!email) return false;
      return getAdminEmails().includes(email);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        session,
        isAdmin: checkAdmin(session),
        isLoading: false,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        session,
        isAdmin: checkAdmin(session),
        isLoading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { ...state, signOut };
};
