import type { ReactNode } from "react";
import { Eye, Code2 } from "lucide-react";
import type { ThemeKey } from "../../pages/landing-themes";
import { landingThemes } from "../../pages/landing-themes";

interface RenderingCompareProps {
  theme: ThemeKey;
}

function SourceLine({
  n,
  children,
  lineNumClass,
}: {
  n: string;
  children: ReactNode;
  lineNumClass: string;
}) {
  return (
    <div className="flex items-start gap-2 text-left">
      <span className={`${lineNumClass} w-6 shrink-0 select-none text-[10px]`}>
        {n}
      </span>
      <span className="flex-1 text-[11px] leading-relaxed whitespace-pre-wrap">
        {children}
      </span>
    </div>
  );
}

function PanelHeader({
  left,
  right,
  className = "",
  rightClassName = "",
}: {
  left: ReactNode;
  right?: ReactNode;
  className?: string;
  rightClassName?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2.5 border-b text-[9px] font-mono uppercase tracking-widest ${className}`}
    >
      <span>{left}</span>
      {right && <span className={rightClassName}>{right}</span>}
    </div>
  );
}

function LightBlueCompare() {
  const blue = "text-[#0055ff]";
  const lineNum = "text-slate-300";

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden text-left">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-slate-200">
            <PanelHeader
              left={<span className={blue}>MARKDOWN SOURCE</span>}
              right="UTF-8 / LATENCY: 0.04ms"
              className="border-slate-200 text-slate-400"
            />
            <div className="p-4 font-mono bg-white text-slate-800 space-y-0.5">
              <SourceLine n="01" lineNumClass={lineNum}>
                <span className={`${blue} font-semibold`}>
                  # Project_Status_Report
                </span>
              </SourceLine>
              <SourceLine n="02" lineNumClass={lineNum}>
                {" "}
              </SourceLine>
              <SourceLine n="03" lineNumClass={lineNum}>
                The <span className={`${blue} font-bold`}>**Neural_Editor**</span>{" "}
                delivers
              </SourceLine>
              <SourceLine n="04" lineNumClass={lineNum}>
                unprecedented clarity for
              </SourceLine>
              <SourceLine n="05" lineNumClass={lineNum}>
                professional architects.
              </SourceLine>
              <SourceLine n="06" lineNumClass={lineNum}>
                {" "}
              </SourceLine>
              <SourceLine n="07" lineNumClass={lineNum}>
                <span className={blue}>- Ultra-low Latency</span>
              </SourceLine>
              <SourceLine n="08" lineNumClass={lineNum}>
                <span className={blue}>- Clean Aesthetics</span>
              </SourceLine>
            </div>
          </div>

          <div>
            <PanelHeader
              left={<span className={blue}>LIVE PREVIEW</span>}
              right={
                <span className={`${blue} flex items-center gap-1.5 normal-case`}>
                  <span className="text-[8px]">●</span> SYSTEM READY
                </span>
              }
              className="border-slate-200 text-slate-400"
            />
            <div className="p-5 bg-white text-left font-sans">
              <h3 className="text-lg font-black text-slate-900 mb-3">
                Project_Status_Report
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                The{" "}
                <span className={`${blue} font-bold`}>Neural_Editor</span>{" "}
                delivers unprecedented clarity for professional architects.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0055ff]" />
                  Ultra-low Latency
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0055ff]" />
                  Clean Aesthetics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CyberGreenCompare() {
  const green = "text-[#00ff66]";
  const lineNum = "text-[#2a3d2a]";

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="rounded-sm border border-[#2a1525] overflow-hidden text-left shadow-[0_0_30px_rgba(0,255,102,0.05)]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-[#2a1525]">
            <PanelHeader
              left={<span className={green}>MARKDOWN SOURCE</span>}
              right="UTF-8"
              className="border-[#2a1525] bg-black text-zinc-600"
              rightClassName="text-zinc-600"
            />
            <div className="p-4 font-mono bg-black text-zinc-400 space-y-0.5">
              <SourceLine n="01" lineNumClass={lineNum}>
                <span className={`${green} font-semibold`}># Project_Alpha</span>
              </SourceLine>
              <SourceLine n="02" lineNumClass={lineNum}>
                {" "}
              </SourceLine>
              <SourceLine n="03" lineNumClass={lineNum}>
                The{" "}
                <span className={`${green} font-bold`}>**Neural_Editor**</span>{" "}
                provides
              </SourceLine>
              <SourceLine n="04" lineNumClass={lineNum}>
                unprecedented control over
              </SourceLine>
              <SourceLine n="05" lineNumClass={lineNum}>
                technical documentation.
              </SourceLine>
              <SourceLine n="06" lineNumClass={lineNum}>
                {" "}
              </SourceLine>
              <SourceLine n="07" lineNumClass={lineNum}>
                <span className={green}>- Low Latency</span>
              </SourceLine>
              <SourceLine n="08" lineNumClass={lineNum}>
                <span className={green}>- CRT Aesthetics</span>
              </SourceLine>
            </div>
          </div>

          <div>
            <PanelHeader
              left={<span className={green}>LIVE PREVIEW</span>}
              right={
                <span className={`${green} flex items-center gap-1.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
                  LIVE
                </span>
              }
              className="border-[#2a1525] bg-[#1a0b16] text-zinc-600"
            />
            <div className="p-5 bg-[#1a0b16] text-left font-sans">
              <h3 className="text-lg font-black text-white mb-3">Project_Alpha</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                The{" "}
                <span className={`${green} font-bold`}>Neural_Editor</span>{" "}
                provides unprecedented control over technical documentation.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00ff66]" />
                  Low Latency
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00ff66]" />
                  CRT Aesthetics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ObsidianCompare() {
  const lineNum = "text-zinc-800";

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="rounded-sm border border-zinc-800 overflow-hidden text-left">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-zinc-800">
            <PanelHeader
              left={
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Code2 size={11} strokeWidth={2} />
                  SOURCE_MODE
                </span>
              }
              right="UTF-8 / LF"
              className="border-zinc-800 bg-zinc-950 text-zinc-600"
            />
            <div className="p-4 font-mono bg-black text-zinc-500 space-y-0.5">
              <SourceLine n="01" lineNumClass={lineNum}>
                <span className="text-white font-semibold"># Project_Genesis</span>
              </SourceLine>
              <SourceLine n="02" lineNumClass={lineNum}>
                {" "}
              </SourceLine>
              <SourceLine n="03" lineNumClass={lineNum}>
                <span className="text-zinc-400">
                  &gt; Knowledge is the ultimate power.
                </span>
              </SourceLine>
              <SourceLine n="04" lineNumClass={lineNum}>
                {" "}
              </SourceLine>
              <SourceLine n="05" lineNumClass={lineNum}>
                The <span className="text-white font-bold">**Neural_Editor**</span>{" "}
                connects
              </SourceLine>
              <SourceLine n="06" lineNumClass={lineNum}>
                nodes in your digital garden.
              </SourceLine>
              <SourceLine n="07" lineNumClass={lineNum}>
                {" "}
              </SourceLine>
              <SourceLine n="08" lineNumClass={lineNum}>
                - High Performance
              </SourceLine>
              <SourceLine n="09" lineNumClass={lineNum}>
                - Deep Dark Aesthetic
              </SourceLine>
              <SourceLine n="10" lineNumClass={lineNum}>
                - Local-First Storage
              </SourceLine>
            </div>
          </div>

          <div>
            <PanelHeader
              left={
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Eye size={11} strokeWidth={2} />
                  LIVE_PREVIEW
                </span>
              }
              right={
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-zinc-500" />● ACTIVE
                </span>
              }
              className="border-zinc-800 bg-zinc-950 text-zinc-600"
            />
            <div className="p-5 bg-[#121212] text-left font-sans">
              <h3 className="text-lg font-black text-white mb-3">
                Project_Genesis
              </h3>
              <blockquote className="border-l-2 border-zinc-700 pl-3 italic text-zinc-500 text-sm mb-4">
                Knowledge is the ultimate power.
              </blockquote>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                The{" "}
                <span className="text-white font-bold">Neural_Editor</span>{" "}
                connects nodes in your digital garden.
              </p>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  High Performance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  Deep Dark Aesthetic
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  Local-First Storage
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RenderingCompare({ theme }: RenderingCompareProps) {
  const t = landingThemes[theme];

  return (
    <section className={`border-t border-b ${t.compSectionBg} py-16 md:py-20`}>
      <div className="max-w-5xl mx-auto px-6 text-center mb-10">
        <h2
          className={`text-lg md:text-xl font-black uppercase tracking-wider mb-2 ${
            theme === "obsidian-silver"
              ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
              : ""
          }`}
        >
          {t.compTitle}
        </h2>
        <p
          className={`${t.accentText} font-mono text-[9px] uppercase tracking-[0.25em]`}
        >
          EXPERIENCE ZERO-LATENCY VISUAL FEEDBACK
        </p>
      </div>

      {theme === "light-blue" && <LightBlueCompare />}
      {theme === "cyber-green" && <CyberGreenCompare />}
      {theme === "obsidian-silver" && <ObsidianCompare />}
    </section>
  );
}
