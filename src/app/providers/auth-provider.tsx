import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AUTH_STORAGE_KEY = "adbox-auth-session";

interface AuthSession {
  email: string;
}

interface AuthContextValue {
  email: string | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<AuthSession>;
    if (typeof parsed.email === "string" && parsed.email.length > 0) {
      return { email: parsed.email };
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(readStoredSession);

  useEffect(() => {
    if (!session) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  const value: AuthContextValue = {
    email: session?.email ?? null,
    isAuthenticated: !!session,
    login: (email) => setSession({ email }),
    logout: () => setSession(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider missing");
  }

  return context;
}
