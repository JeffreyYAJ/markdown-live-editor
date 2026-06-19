import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  GitBranch,
  Monitor,
  Puzzle,
  Shield,
  Sparkles,
  Type,
  Zap,
} from "lucide-react";

export type ThemeKey = "light-blue" | "cyber-green" | "obsidian-silver";

export interface LandingTheme {
  name: string;
  brand: string;
  nav: string[];
  headerCta: "login" | "get-started";
  headerCtaClass: string;
  logoClass: string;
  navClass: string;
  bg: string;
  text: string;
  subtext: string;
  border: string;
  accentText: string;
  accentBg: string;
  heroBadge: string;
  badgeClass: string;
  heroTitle1: string;
  heroTitle2: string;
  heroStacked: boolean;
  heroDesc: string;
  btnPrimary: string;
  btnSecondary: string;
  secondaryLabel: string;
  featuresTitle: string;
  featuresDesc: string;
  featuresVersion?: string;
  features: Array<{
    title: string;
    desc: string;
    icon: LucideIcon;
    tags?: string[];
    variant: "large" | "small" | "typography" | "wide";
  }>;
  compTitle: string;
  compProject: string;
  compSectionBg: string;
  compSourceLabel: string;
  compPreviewLabel: string;
  compSourceBg: string;
  compPreviewBg: string;
  ctaTitle: string;
  ctaDesc: string;
  stats: Array<{ val: string; lab: string; sym: [string, string] }>;
  footerLinks: string[];
  footerMeta: string;
}

export const landingThemes: Record<ThemeKey, LandingTheme> = {
  "light-blue": {
    name: "Architect Light",
    brand: "ARCHITECT_OS",
    nav: ["HOME", "DOCS", "PRICING", "COMMUNITY"],
    headerCta: "login",
    headerCtaClass:
      "bg-[#0055ff] text-white px-5 py-2 text-[10px] font-bold tracking-widest hover:bg-blue-600 transition-colors",
    logoClass: "text-slate-900 font-black",
    navClass: "text-slate-400",
    bg: "bg-white",
    text: "text-slate-900",
    subtext: "text-slate-500",
    border: "border-slate-200",
    accentText: "text-[#0055ff]",
    accentBg: "bg-[#0055ff]",
    heroBadge: "DIGITAL ARCHITECTS TOOLS ENABLED",
    badgeClass:
      "text-slate-400 border-slate-200 bg-slate-50 tracking-[0.25em]",
    heroTitle1: "text-slate-900",
    heroTitle2: "text-[#0055ff]",
    heroStacked: false,
    heroDesc:
      "The professional markdown environment for digital architects. Experience zero-latency real-time preview, precision typography, and seamless cloud integration.",
    btnPrimary:
      "bg-[#0055ff] text-white hover:bg-blue-600 px-12 py-4 font-bold tracking-widest uppercase text-xs md:text-sm",
    btnSecondary:
      "border border-slate-300 text-slate-600 hover:bg-slate-50 px-12 py-4 tracking-widest uppercase text-xs md:text-sm",
    secondaryLabel: "VIEW DESKTOP",
    featuresTitle: "ARCHITECTURAL GRADE INTERFACE",
    featuresDesc:
      "Clean, high-contrast layouts designed for deep focus and professional output.",
    featuresVersion: "BUILD_VERSION: 1.6.2_STABLE",
    features: [
      {
        title: "PRECISION RENDERING",
        desc: "Our proprietary rendering engine provides a pixel-perfect preview of your markdown documents with zero ghosting and instant feedback.",
        icon: Monitor,
        tags: ["0.12MS LATENCY", "120HZ REFRESH"],
        variant: "large",
      },
      {
        title: "ADVANCED TYPOGRAPHY",
        desc: "Sub-pixel text optimization tailored for long-form technical writing.",
        icon: Type,
        variant: "typography",
      },
      {
        title: "CLOUD NATIVE",
        desc: "Bi-directional sync with Git providers and instant PDF/HTML exports.",
        icon: Cloud,
        variant: "small",
      },
      {
        title: "REAL-TIME SYNC",
        desc: "Collaborate on complex documentation with team members using our distributed engine architecture.",
        icon: GitBranch,
        variant: "wide",
      },
    ],
    compTitle: "DIRECT-TO-CANVAS ENGINE",
    compProject: "Project_Status_Report",
    compSectionBg: "bg-slate-50/80 border-slate-200",
    compSourceLabel: "MARKDOWN SOURCE",
    compPreviewLabel: "LIVE PREVIEW",
    compSourceBg: "bg-white text-slate-600 border-slate-200",
    compPreviewBg: "bg-white text-slate-800 border-slate-200",
    ctaTitle: "READY TO BUILD?",
    ctaDesc:
      "Upgrade your writing environment today. Join the thousands of digital architects using Neural Editor for mission-critical documentation.",
    stats: [
      { val: "0.12ms", lab: "VISUAL LATENCY", sym: ["{", "}"] },
      { val: "AES-256", lab: "CYPHER SECURITY", sym: ["/", "/"] },
      { val: "∞", lab: "CANVAS STORAGE", sym: ["[", "]"] },
      { val: "100%", lab: "NATIVE CORE", sym: ["#", "#"] },
    ],
    footerLinks: ["TWITTER", "GITHUB", "STATUS", "CHANGELOG"],
    footerMeta: "© 2026 ARCHITECT_OS // ALL RIGHTS RESERVED",
  },
  "cyber-green": {
    name: "Cyber Phosphor",
    brand: "ARCHITECT_OS",
    nav: ["HOME", "DOCS", "PRICING", "COMMUNITY"],
    headerCta: "login",
    headerCtaClass:
      "bg-[#00ff66] text-black px-5 py-2 text-[10px] font-bold tracking-widest hover:bg-[#00dd55] transition-colors",
    logoClass: "text-[#00ff66] font-black",
    navClass: "text-zinc-500",
    bg: "bg-[#0d020b]",
    text: "text-zinc-100",
    subtext: "text-zinc-500",
    border: "border-zinc-900/80",
    accentText: "text-[#00ff66]",
    accentBg: "bg-[#00ff66]",
    heroBadge: "SYSTEM.INITIALIZE(NEURAL_CONSOLE)",
    badgeClass:
      "text-[#00ff66] border-[#00ff66]/25 bg-[#150412] tracking-[0.2em]",
    heroTitle1: "text-white",
    heroTitle2: "text-[#00ff66]",
    heroStacked: true,
    heroDesc:
      "The professional markdown environment for digital architects. Experience zero-latency real-time preview, precision typography, and seamless cloud integration.",
    btnPrimary:
      "bg-[#00ff66] text-black hover:bg-[#00dd55] px-12 py-4 font-bold tracking-widest uppercase text-xs md:text-sm",
    btnSecondary:
      "border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 px-12 py-4 tracking-widest uppercase text-xs md:text-sm",
    secondaryLabel: "[ VIEW ROADMAP ]",
    featuresTitle: "HARDWARE OPTIMIZED INTERFACE",
    featuresDesc:
      "Clean, high-contrast layouts designed for deep focus and professional output.",
    featuresVersion: "BUILD_VERSION: 1.6.2_STABLE",
    features: [
      {
        title: "REAL-TIME MD RENDERER",
        desc: "Our proprietary rendering engine provides an instant, high-fidelity preview of your markdown documents with the warmth of high-end CRT monitors.",
        icon: Zap,
        tags: ["KERNEL LEVEL", "120 FPS", "NO LATENCY"],
        variant: "large",
      },
      {
        title: "EDITORIAL TYPOGRAPHY",
        desc: "Sub-pixel optimization designed specifically for long-form writing and complex technical documentation.",
        icon: Type,
        variant: "typography",
      },
      {
        title: "CLOUD SYNC & EXPORT",
        desc: "Seamlessly sync your workspace across devices and export to PDF, HTML, or push directly to GitHub repositories.",
        icon: Cloud,
        variant: "small",
      },
      {
        title: "COLLABORATIVE EDITING",
        desc: "Technical writing reimagined through a decentralized grid. Share live editing sessions as raw binary streams with millisecond precision.",
        icon: GitBranch,
        variant: "wide",
      },
    ],
    compTitle: "DIRECT-TO-METAL RENDERING",
    compProject: "Project_Alpha",
    compSectionBg: "bg-black/50 border-zinc-900",
    compSourceLabel: "MARKDOWN SOURCE",
    compPreviewLabel: "LIVE PREVIEW",
    compSourceBg: "bg-black text-zinc-400 border-zinc-900",
    compPreviewBg: "bg-[#0a0209] text-zinc-100 border-zinc-900",
    ctaTitle: "READY TO INTERFACE?",
    ctaDesc:
      "Upgrade your writing environment today. Join the thousands of digital architects using Neural Editor for mission-critical documentation.",
    stats: [
      { val: "0.12ms", lab: "VISUAL LATENCY", sym: ["{", "}"] },
      { val: "256-bit", lab: "STREAM ENCRYPTION", sym: ["/", "/"] },
      { val: "∞", lab: "CUSTOM EXTENSIONS", sym: ["[", "]"] },
      { val: "99.9%", lab: "KERNEL UPTIME", sym: ["#", "#"] },
    ],
    footerLinks: ["TWITTER", "GITHUB", "STATUS", "CHANGELOG"],
    footerMeta: "© 2026 ARCHITECT_OS // SYSTEM_LIVE",
  },
  "obsidian-silver": {
    name: "Obsidian Noir",
    brand: "OBSIDIAN_OS",
    nav: ["FEATURES", "PRICING", "DOCS", "GITHUB"],
    headerCta: "get-started",
    headerCtaClass:
      "bg-white text-black px-5 py-2 text-[10px] font-bold tracking-widest hover:bg-zinc-200 transition-colors",
    logoClass: "text-white font-black",
    navClass: "text-zinc-500",
    bg: "bg-black",
    text: "text-zinc-100",
    subtext: "text-zinc-500",
    border: "border-zinc-900",
    accentText: "text-white",
    accentBg: "bg-white",
    heroBadge: "V0.2.0 | CORE_INFRASTRUCTURE_V2",
    badgeClass:
      "text-zinc-400 border-zinc-800 bg-zinc-950 tracking-[0.15em]",
    heroTitle1: "text-white",
    heroTitle2: "text-zinc-300",
    heroStacked: false,
    heroDesc:
      "An obsidian-grade markdown environment designed for elite architects. Direct-to-metal performance with zero-latency visual feedback and precision-focused typography.",
    btnPrimary:
      "bg-white text-black hover:bg-zinc-200 px-12 py-4 font-bold tracking-widest uppercase text-xs md:text-sm",
    btnSecondary:
      "border border-zinc-700 text-zinc-400 hover:text-white px-12 py-4 tracking-widest uppercase text-xs md:text-sm",
    secondaryLabel: "VIEW ARCHIVE",
    featuresTitle: "MONOCHROME PRECISION",
    featuresDesc:
      "Clean, high-contrast layouts designed for deep focus and professional output.",
    features: [
      {
        title: "LOW-LATENCY RENDERING",
        desc: "Experience zero-lag markdown input. Our proprietary text engine bypasses standard DOM rendering for a truly mechanical feel.",
        icon: Monitor,
        tags: ["HW_ACCEL", "0.05MS_POLL", "HYBRID_KERN"],
        variant: "large",
      },
      {
        title: "NEURAL GRAPH",
        desc: "Visualize your thoughts through an interactive web of connections. Obsidian-grade backlinking reimagined.",
        icon: Sparkles,
        variant: "small",
      },
      {
        title: "END-TO-END ENCRYPTION",
        desc: "Your data belongs to you. Local-first storage with optional zero-knowledge sync to any cloud provider.",
        icon: Shield,
        variant: "small",
      },
      {
        title: "PLUGIN ECOSYSTEM",
        desc: "Extend the editor with a massive library of community plugins. From Kanban boards to Vim emulation, the power is yours.",
        icon: Puzzle,
        variant: "wide",
      },
    ],
    compTitle: "DIRECT-TO-METAL RENDERING",
    compProject: "Project_Genesis",
    compSectionBg: "bg-zinc-950/50 border-zinc-900",
    compSourceLabel: "SOURCE_CODE",
    compPreviewLabel: "LIVE_PREVIEW",
    compSourceBg: "bg-black text-zinc-500 border-zinc-900",
    compPreviewBg: "bg-[#070707] text-zinc-100 border-zinc-900",
    ctaTitle: "EVOLVE YOUR WORKSPACE",
    ctaDesc:
      "Upgrade your writing environment today. Join the vanguard of digital architects using Neural Editor for mission-critical documentation.",
    stats: [
      { val: "0.05ms", lab: "INPUT LATENCY", sym: ["{", "}"] },
      { val: "AES-256", lab: "VAULT ENCRYPTION", sym: ["/", "/"] },
      { val: "1,200+", lab: "CORE PLUGINS", sym: ["#", "#"] },
      { val: "∞", lab: "CONNECTION NODES", sym: ["[", "]"] },
    ],
    footerLinks: ["GITHUB", "TWITTER", "DISCORD", "LINKEDIN"],
    footerMeta: "V2.0.0 BUILD_2026.02.12",
  },
};
