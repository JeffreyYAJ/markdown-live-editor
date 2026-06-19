import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthApiError } from "../api/auth";
import OAuthButtons from "../components/OAuthButtons";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import AuthField from "../components/auth/AuthField";
import { authThemes } from "./auth-themes";
import { useAppTheme } from "../hooks/useAppTheme";

export default function Signup() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useAppTheme();
  const t = authThemes[theme];

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

  const passwordStrength =
    password.length === 0
      ? null
      : password.length < 8
        ? "weak"
        : password.length < 12
          ? "medium"
          : "strong";

  return (
    <AuthPageLayout
      theme={theme}
      onThemeChange={setTheme}
      mode="signup"
      footer={
        <p className={`text-center text-sm ${t.subtext} font-mono`}>
          Already have an account?{" "}
          <Link to="/login" className={t.linkClass}>
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
        {error && (
          <p
            className={`text-sm font-mono px-4 py-3 rounded-sm border ${t.errorClass}`}
          >
            {error}
          </p>
        )}
        <AuthField
          theme={t}
          label="Display name"
          type="text"
          value={name}
          onChange={setName}
          autoComplete="name"
          placeholder="Optional"
        />
        <AuthField
          theme={t}
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <div>
          <AuthField
            theme={t}
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            required
            minLength={8}
            hint="Minimum 8 characters"
          />
          {passwordStrength && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 flex gap-1 h-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-colors ${
                      (passwordStrength === "weak" && i === 1) ||
                      (passwordStrength === "medium" && i <= 2) ||
                      (passwordStrength === "strong" && i <= 3)
                        ? theme === "light-blue"
                          ? "bg-[#0055ff]"
                          : theme === "cyber-green"
                            ? "bg-[#00ff66]"
                            : "bg-white"
                        : t.divider
                    }`}
                  />
                ))}
              </div>
              <span className={`font-mono text-[10px] uppercase ${t.subtext}`}>
                {passwordStrength}
              </span>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3.5 rounded-sm font-mono font-bold uppercase tracking-widest text-xs md:text-sm transition-colors ${t.btnPrimary}`}
        >
          {submitting ? "Creating…" : "Create account"}
        </button>
      </form>
      <div className="mt-6">
        <OAuthButtons theme={t} />
      </div>
    </AuthPageLayout>
  );
}
