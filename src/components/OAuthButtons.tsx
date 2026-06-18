import { useEffect, useState } from "react";
import { fetchOAuthProviders } from "../api/auth";

export default function OAuthButtons() {
  const [providers, setProviders] = useState({ google: false, github: false });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchOAuthProviders()
      .then(setProviders)
      .catch(() => setProviders({ google: false, github: false }))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || (!providers.google && !providers.github)) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-surface-dim" />
        <span className="text-xs text-inactive font-mono uppercase tracking-widest">
          or
        </span>
        <div className="h-px flex-1 bg-surface-dim" />
      </div>
      <div className="flex flex-col gap-2">
        {providers.google && (
          <a
            href="/api/auth/google"
            className="w-full py-2.5 rounded-sm border border-surface-dim text-main font-mono text-sm text-center hover:border-neon-dim hover:text-neon transition-colors"
          >
            Continue with Google
          </a>
        )}
        {providers.github && (
          <a
            href="/api/auth/github"
            className="w-full py-2.5 rounded-sm border border-surface-dim text-main font-mono text-sm text-center hover:border-neon-dim hover:text-neon transition-colors"
          >
            Continue with GitHub
          </a>
        )}
      </div>
    </div>
  );
}
