import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminRole = useCallback(async (currentUser: User | null) => {
    if (currentUser) {
      const { data } = await supabase.rpc("has_role", {
        _user_id: currentUser.id,
        _role: "admin",
      });
      setIsAdmin(!!data);
    } else {
      setIsAdmin(false);
    }
    setUser(currentUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    let initialized = false;

    // Get initial session first
    supabase.auth.getSession().then(({ data: { session } }) => {
      initialized = true;
      checkAdminRole(session?.user ?? null);
    });

    // Then listen for changes (skip the initial event if we already handled it)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (initialized) {
          checkAdminRole(session?.user ?? null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [checkAdminRole]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, isAdmin, loading, signIn, signOut };
};
