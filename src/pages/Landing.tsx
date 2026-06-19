import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeroPreview from "../components/landing/HeroPreview";
import RenderingCompare from "../components/landing/RenderingCompare";
import StatsSection from "../components/landing/StatsSection";
import {
  landingThemes,
  type LandingTheme,
  type ThemeKey,
} from "./landing-themes";

function FeatureCard({
  feature,
  theme,
  themeKey,
}: {
  feature: LandingTheme["features"][number];
  theme: LandingTheme;
  themeKey: ThemeKey;
}) {
  const Icon = feature.icon;
  const isTypo = feature.variant === "typography";

  const cardClass =
    isTypo && themeKey === "light-blue"
      ? "bg-[#0055ff] text-white border-[#0055ff]"
      : isTypo && themeKey === "cyber-green"
        ? `${theme.border} border ${themeKey === "cyber-green" ? "bg-[#130410]" : theme.bg}`
        : `${theme.border} border ${themeKey === "light-blue" && feature.variant === "small" ? "bg-slate-50" : themeKey === "obsidian-silver" ? "bg-[#070707]" : themeKey === "light-blue" ? "bg-white" : "bg-[#130410]"}`;

  return (
    <div
      className={`${cardClass} p-8 flex flex-col justify-between min-h-[200px] relative`}
    >
      <div>
        {isTypo ? (
          <div
            className={`mb-6 text-2xl font-black ${themeKey === "light-blue" ? "text-white" : theme.accentText}`}
          >
            Tt
          </div>
        ) : (
          <Icon
            size={22}
            className={`mb-6 ${themeKey === "light-blue" && !isTypo ? "text-[#0055ff]" : theme.accentText}`}
            strokeWidth={1.5}
          />
        )}
        <h3 className="text-sm font-black uppercase tracking-wide mb-2">
          {feature.title}
        </h3>
        <p
          className={`font-mono text-[11px] leading-relaxed max-w-lg ${isTypo && themeKey === "light-blue" ? "text-blue-100" : theme.subtext}`}
        >
          {feature.desc}
        </p>
      </div>
      {feature.tags && (
        <div className="flex flex-wrap gap-2 font-mono text-[9px] text-zinc-500 mt-8">
          {feature.tags.map((tag) => (
            <span key={tag}>[ {tag} ]</span>
          ))}
        </div>
      )}
      {feature.variant === "wide" && (
        <div className="hidden md:flex ml-auto mt-6 md:mt-0 md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2">
          <div
            className={`w-20 h-20 border ${theme.border} flex items-center justify-center ${themeKey === "obsidian-silver" ? "bg-zinc-950" : "bg-black/20"}`}
          >
            <Icon size={28} className={theme.accentText} strokeWidth={1.25} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  const { user } = useAuth();
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("cyber-green");
  const t = landingThemes[currentTheme];

  const primaryTo = user ? "/app" : "/signup";
  const primaryLabel = user ? "OPEN WORKSPACE" : "INITIALIZE DOWNLOAD";
  const headerTo =
    t.headerCta === "get-started" ? (user ? "/app" : "/signup") : user ? "/app" : "/login";
  const headerLabel =
    t.headerCta === "get-started"
      ? user
        ? "APP"
        : "GET STARTED"
      : user
        ? "APP"
        : "LOG IN";

  return (
    <div
      className={`${t.bg} ${t.text} font-sans antialiased min-h-screen transition-colors duration-500`}
    >
      {/* Header — 3-column Figma layout */}
      <header
        className={`border-b ${t.border} px-6 md:px-10 h-14 grid grid-cols-[1fr_auto_1fr] items-center`}
      >
        <Link to="/" className={`${t.logoClass} text-xs tracking-widest uppercase`}>
          {t.brand}
        </Link>
        <nav
          className={`hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase ${t.navClass}`}
        >
          {t.nav.map((item) => (
            <a key={item} href="#features" className="hover:opacity-80 transition-opacity">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex justify-end">
          <Link to={headerTo} className={t.headerCtaClass}>
            {headerLabel}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="max-w-5xl mx-auto px-6 pt-16 pb-14">
        <div className="text-center">
          <span
            className={`inline-block font-mono text-[9px] uppercase px-4 py-1.5 border mb-8 ${t.badgeClass}`}
          >
            {t.heroBadge}
          </span>

          <h1
            className={`font-black tracking-tighter uppercase leading-[0.9] mb-8 ${
              t.heroStacked
                ? "text-6xl md:text-8xl flex flex-col"
                : "text-5xl md:text-7xl lg:text-8xl flex flex-wrap justify-center gap-x-4"
            }`}
          >
            <span className={t.heroTitle1}>NEURAL</span>
            <span className={t.heroTitle2}>EDITOR</span>
          </h1>

          <p
            className={`${t.subtext} font-mono text-xs md:text-sm max-w-2xl mx-auto leading-relaxed mb-10`}
          >
            {t.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center font-mono mb-16">
            <Link to={primaryTo} className={t.btnPrimary}>
              {primaryLabel}
            </Link>
            <a href="#features" className={t.btnSecondary}>
              {t.secondaryLabel}
            </a>
          </div>
        </div>

        <HeroPreview theme={currentTheme} />
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-12">
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2">
              {t.featuresTitle}
            </h2>
            <p className={`${t.subtext} font-mono text-xs max-w-md leading-relaxed`}>
              {t.featuresDesc}
            </p>
          </div>
          {t.featuresVersion && (
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest shrink-0">
              {t.featuresVersion}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.features.map((feature) => (
            <div
              key={feature.title}
              className={`relative ${
                feature.variant === "large" || feature.variant === "wide"
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <FeatureCard
                feature={feature}
                theme={t}
                themeKey={currentTheme}
              />
            </div>
          ))}
        </div>
      </section>

      <RenderingCompare theme={currentTheme} />

      <StatsSection theme={currentTheme} />

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-5">
          {t.ctaTitle}
        </h2>
        <p className={`${t.subtext} font-mono text-xs max-w-lg mx-auto mb-10 leading-relaxed`}>
          {t.ctaDesc}
        </p>
        <Link to={primaryTo} className={`${t.btnPrimary} inline-block`}>
          {primaryLabel}
        </Link>
      </section>

      {/* Footer */}
      <footer className={`border-t ${t.border} py-8 px-6 font-mono text-[9px] uppercase tracking-widest ${t.subtext}`}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className={`font-bold ${t.text}`}>{t.brand}</div>
          <div className="flex flex-wrap justify-center gap-6">
            {t.footerLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:opacity-80">
                {link}
              </a>
            ))}
          </div>
          <div>{t.footerMeta}</div>
        </div>
      </footer>

      {/* Theme switcher — discret, coin bas-droit */}
      <div
        className="fixed bottom-4 right-4 z-50 flex gap-1 p-1 rounded-full border border-zinc-800 bg-zinc-950/90 backdrop-blur-sm shadow-xl"
        role="group"
        aria-label="Theme preview"
      >
        {(Object.keys(landingThemes) as ThemeKey[]).map((key) => (
          <button
            key={key}
            type="button"
            title={landingThemes[key].name}
            onClick={() => setCurrentTheme(key)}
            className={`w-7 h-7 rounded-full border-2 transition-transform ${
              currentTheme === key
                ? "border-white scale-110"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
            style={{
              background:
                key === "light-blue"
                  ? "#0055ff"
                  : key === "cyber-green"
                    ? "#00ff66"
                    : "#ffffff",
            }}
          />
        ))}
      </div>
    </div>
  );
}
