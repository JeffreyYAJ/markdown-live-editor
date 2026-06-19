import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthApiError } from "../api/auth";
import OAuthButtons from "../components/OAuthButtons";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import AuthField from "../components/auth/AuthField";
import { authThemes } from "./auth-themes";
import { useAppTheme } from "../hooks/useAppTheme";

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const oauthError = searchParams.get("error");
  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname ?? "/app";

  const { theme, setTheme } = useAppTheme();
  const t = authThemes[theme];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err instanceof AuthApiError ? err.message : "Sign in failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      theme={theme}
      onThemeChange={setTheme}
      mode="login"
      footer={
        <p className={`text-center text-sm ${t.subtext} font-mono`}>
          No account?{" "}
          <Link to="/signup" className={t.linkClass}>
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
        {(error || oauthError) && (
          <p
            className={`text-sm font-mono px-4 py-3 rounded-sm border ${t.errorClass}`}
          >
            {error || oauthError}
          </p>
        )}
        <AuthField
          theme={t}
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <AuthField
          theme={t}
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3.5 rounded-sm font-mono font-bold uppercase tracking-widest text-xs md:text-sm transition-colors ${t.btnPrimary}`}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <div className="mt-6">
        <OAuthButtons theme={t} />
      </div>
    </AuthPageLayout>
  );
}
