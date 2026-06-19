import type { ThemeKey } from "../../pages/landing-themes";

const items: Record<ThemeKey, string[]> = {
  "light-blue": [
    "PRECISION RENDERING",
    "CLOUD NATIVE",
    "AES-256",
    "0.12MS LATENCY",
    "LIVE PREVIEW",
    "CANVAS ENGINE",
    "DIGITAL ARCHITECTS",
  ],
  "cyber-green": [
    "KERNEL LEVEL",
    "DIRECT-TO-METAL",
    "256-BIT STREAM",
    "NO LATENCY",
    "CRT AESTHETICS",
    "NEURAL CONSOLE",
    "SYSTEM LIVE",
  ],
  "obsidian-silver": [
    "MONOCHROME PRECISION",
    "LOCAL FIRST",
    "VAULT ENCRYPTION",
    "NEURAL GRAPH",
    "0.05MS INPUT",
    "PLUGIN ECOSYSTEM",
    "OBSIDIAN GRADE",
  ],
};

const barClass: Record<ThemeKey, string> = {
  "light-blue": "border-slate-200 bg-slate-50/80 text-slate-400",
  "cyber-green": "border-[#2a1525] bg-[#0a0208]/80 text-[#00ff66]/70",
  "obsidian-silver": "border-zinc-900 bg-zinc-950/50 text-zinc-600",
};

export default function LandingTicker({ theme }: { theme: ThemeKey }) {
  const list = items[theme];
  const track = [...list, ...list];

  return (
    <div
      className={`border-y overflow-hidden py-3 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase ${barClass[theme]}`}
    >
      <div className="landing-ticker-track flex w-max gap-12 px-6">
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-12 shrink-0">
            {item}
            <span className="opacity-40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
