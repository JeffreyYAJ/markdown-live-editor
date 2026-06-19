import { landingThemes, type ThemeKey } from "../../pages/landing-themes";

interface ThemeSwitcherProps {
  theme: ThemeKey;
  onChange: (key: ThemeKey) => void;
  className?: string;
}

export default function ThemeSwitcher({
  theme,
  onChange,
  className = "",
}: ThemeSwitcherProps) {
  return (
    <div
      className={`flex gap-1.5 p-1.5 rounded-full border border-zinc-800 bg-zinc-950/90 backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Theme"
    >
      {(Object.keys(landingThemes) as ThemeKey[]).map((key) => (
        <button
          key={key}
          type="button"
          title={landingThemes[key].name}
          onClick={() => onChange(key)}
          className={`w-7 h-7 rounded-full border-2 transition-transform ${
            theme === key
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
  );
}
