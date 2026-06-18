import { Link } from "react-router-dom";
import {
  Terminal,
  FileText,
  Zap,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Live Markdown",
    desc: "Split-pane editor with real-time preview, LaTeX, Mermaid, and syntax highlighting.",
  },
  {
    icon: Shield,
    title: "Private workspace",
    desc: "Every user gets an isolated folder on disk. Your documents are never shared.",
  },
  {
    icon: Zap,
    title: "Auto-save to disk",
    desc: "Edits are debounced and written directly to your personal workspace.",
  },
  {
    icon: Layers,
    title: "Multi-document",
    desc: "Create, rename, and organize multiple .md files in your explorer.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-editor text-main font-sans overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-surface-dim bg-topbar/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="font-mono text-neon font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]"
          >
            ARCHITECT_OS
          </Link>
          <nav className="flex items-center gap-6 font-mono text-sm">
            <a href="#features" className="text-dimmed hover:text-main transition-colors">
              Features
            </a>
            <Link
              to="/login"
              className="text-dimmed hover:text-main transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1.5 rounded-sm bg-neon text-black font-semibold uppercase tracking-wider text-xs hover:bg-[#00e63a] transition-colors"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon/10 rounded-full blur-3xl" />
        </div>

        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-neon text-xs tracking-[0.3em] uppercase mb-4">
              Terminal Editorial · v0.2
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-tight mb-6">
              Write Markdown.
              <br />
              <span className="text-neon">Own your files.</span>
            </h1>
            <p className="text-dimmed text-lg leading-relaxed mb-8 max-w-lg">
              A collaborative-grade markdown editor with a private workspace per
              user. Real-time preview, disk persistence, and the ARCHITECT_OS
              aesthetic — built for writers who think in terminals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-neon text-black font-mono font-semibold uppercase tracking-wider text-sm hover:bg-[#00e63a] transition-colors"
              >
                Create account
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-neon-dim text-neon font-mono font-semibold uppercase tracking-wider text-sm hover:bg-neon-dim transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* Mock terminal */}
          <div
            className="rounded-lg border border-surface-dim overflow-hidden shadow-[0_0_60px_rgba(0,255,65,0.08)]"
            style={{ backgroundColor: "var(--color-sidebar)" }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-surface-dim bg-activity">
              <Terminal size={14} className="text-neon" />
              <span className="font-mono text-[0.65rem] text-dimmed tracking-widest">
                INDEX.MD — LIVE PREVIEW
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-surface-dim min-h-[220px]">
              <pre className="p-4 font-mono text-[0.7rem] text-main leading-relaxed overflow-hidden">
{`# Architecture

## Core Principles
- No-line rule
- Phosphor glow
- Space Grotesk

\`\`\`js
const edit = true;
\`\`\``}
              </pre>
              <div className="p-4 text-[0.75rem] leading-relaxed overflow-hidden">
                <h2 className="text-neon font-bold text-base mb-2">
                  Architecture
                </h2>
                <h3 className="text-heading font-semibold mb-1">
                  Core Principles
                </h3>
                <ul className="text-dimmed space-y-1 list-none">
                  <li>— No-line rule</li>
                  <li>— Phosphor glow</li>
                  <li>— Space Grotesk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-surface-dim bg-preview/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-mono text-neon text-xs tracking-[0.3em] uppercase mb-2">
            Capabilities
          </h2>
          <p className="text-2xl font-bold text-heading mb-12">
            Everything you need to ship documents
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-5 rounded-lg border border-surface-dim bg-sidebar/50 hover:border-neon-dim transition-colors"
              >
                <Icon size={22} className="text-neon mb-3" />
                <h3 className="font-semibold text-heading mb-2">{title}</h3>
                <p className="text-sm text-dimmed leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-surface-dim">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-heading mb-4">
            Ready to write?
          </h2>
          <p className="text-dimmed mb-8 max-w-md mx-auto">
            Create your account and get a private workspace in seconds.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-sm bg-neon text-black font-mono font-semibold uppercase tracking-wider hover:bg-[#00e63a] transition-colors"
          >
            Get started free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-surface-dim py-6 px-6 text-center font-mono text-xs text-inactive">
        ARCHITECT_OS · Markdown Live Editor · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
