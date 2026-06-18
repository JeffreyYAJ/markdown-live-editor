import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthApiError } from "../api/auth";
import OAuthButtons from "../components/OAuthButtons";

export default function Signup() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) navigate("/app", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signUp(email, password, name || undefined);
      navigate("/app", { replace: true });
    } catch (err) {
      setError(
        err instanceof AuthApiError ? err.message : "Sign up failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-heading mb-1">Create account</h1>
        <p className="text-dimmed text-sm mb-6">
          Get your own private markdown workspace
        </p>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          {error && (
            <p className="text-red-400 text-sm font-mono px-3 py-2 rounded border border-red-400/30 bg-red-400/10">
              {error}
            </p>
          )}
          <label className="block">
            <span className="font-mono text-xs text-dimmed tracking-widest uppercase mb-1.5 block">
              Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Optional"
              className="w-full bg-input-bg border border-surface-dim text-main rounded-sm py-2 px-3 font-mono text-sm outline-none focus:ring-1 focus:ring-neon-dim"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs text-dimmed tracking-widest uppercase mb-1.5 block">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full bg-input-bg border border-surface-dim text-main rounded-sm py-2 px-3 font-mono text-sm outline-none focus:ring-1 focus:ring-neon-dim"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs text-dimmed tracking-widest uppercase mb-1.5 block">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              minLength={8}
              className="w-full bg-input-bg border border-surface-dim text-main rounded-sm py-2 px-3 font-mono text-sm outline-none focus:ring-1 focus:ring-neon-dim"
            />
            <span className="text-xs text-inactive mt-1 block">
              Minimum 8 characters
            </span>
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-sm bg-neon text-black font-mono font-semibold uppercase tracking-wider text-sm hover:bg-[#00e63a] transition-colors disabled:opacity-50"
          >
            {submitting ? "Creating…" : "Create account"}
          </button>
        </form>

        <div className="mt-4">
          <OAuthButtons />
        </div>

        <p className="mt-6 text-center text-sm text-dimmed font-mono">
          Already have an account?{" "}
          <Link to="/login" className="text-neon hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
