import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthApiError } from "../api/auth";
import OAuthButtons from "../components/OAuthButtons";

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const oauthError = searchParams.get("error");
  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname ?? "/app";

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
    <AuthLayout
      title="Sign in"
      subtitle="Access your private workspace"
    >
      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
        {(error || oauthError) && (
          <p className="text-red-400 text-sm font-mono px-3 py-2 rounded border border-red-400/30 bg-red-400/10">
            {error || oauthError}
          </p>
        )}
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <Field
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
          className="w-full py-2.5 rounded-sm bg-neon text-black font-mono font-semibold uppercase tracking-wider text-sm hover:bg-[#00e63a] transition-colors disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <div className="mt-4">
        <OAuthButtons />
      </div>
      <p className="mt-6 text-center text-sm text-dimmed font-mono">
        No account?{" "}
        <Link to="/signup" className="text-neon hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-xs text-dimmed tracking-widest uppercase mb-1.5 block">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="w-full bg-input-bg border border-surface-dim text-main rounded-sm py-2 px-3 font-mono text-sm outline-none focus:ring-1 focus:ring-neon-dim"
      />
    </label>
  );
}

function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-editor flex flex-col items-center justify-center px-4">
      <Link
        to="/"
        className="mb-8 font-mono text-neon font-semibold drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]"
      >
        ARCHITECT_OS
      </Link>
      <div
        className="w-full max-w-md p-8 rounded-lg border border-surface-dim"
        style={{ backgroundColor: "var(--color-sidebar)" }}
      >
        <h1 className="text-2xl font-bold text-heading mb-1">{title}</h1>
        <p className="text-dimmed text-sm mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

