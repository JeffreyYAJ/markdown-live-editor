import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  fetchMe,
  signIn as apiSignIn,
  signOut as apiSignOut,
  signUp as apiSignUp,
  type PublicUser,
} from "../api/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { user: me } = await fetchMe();
        if (active) setUser(me);
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { user: u } = await apiSignIn(email, password);
    setUser(u);
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      const { user: u } = await apiSignUp(email, password, name);
      setUser(u);
    },
    [],
  );

  const signOut = useCallback(async () => {
    await apiSignOut();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, signIn, signUp, signOut }),
    [user, loading, signIn, signUp, signOut],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
