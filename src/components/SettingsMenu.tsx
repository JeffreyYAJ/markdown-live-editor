import { useEffect, useRef } from "react";
import { User, Settings, Puzzle, ListTodo, Palette, Check } from "lucide-react";
import { useTheme, type Theme } from "../context/ThemeContext";

interface SettingsMenuProps {
  onClose: () => void;
}

const menuItems = [
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
  { icon: Puzzle, label: "Extensions" },
  { icon: ListTodo, label: "Tasks" },
];

const themes: {
  id: Theme;
  label: string;
  preview: string[];
  accent: string;
}[] = [
  {
    id: "neon",
    label: "Neon",
    preview: ["#000000", "#2e1524", "#00ff41"],
    accent: "#00ff41",
  },
  {
    id: "obsidian",
    label: "Obsidian",
    preview: ["#0d0b14", "#1c1730", "#c084fc"],
    accent: "#c084fc",
  },
  {
    id: "white",
    label: "White",
    preview: ["#fafaf8", "#f0eeea", "#1a6ef5"],
    accent: "#1a6ef5",
  },
];

export default function SettingsMenu({ onClose }: SettingsMenuProps) {
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay so the opening click doesn't immediately close it
    const id = setTimeout(() => {
      document.addEventListener("mousedown", handleClick);
    }, 50);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute left-full bottom-0 ml-2 z-50 w-64 rounded-lg shadow-2xl overflow-hidden
                 border border-inactive
                 bg-sidebar
                 animate-in"
      style={{
        animation: "slideIn 0.18s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>

      {/* Header */}
      <div className="px-4 py-3 border-b border-inactive flex items-center gap-2">
        <Settings size={14} className="text-neon" />
        <span className="font-mono text-xs tracking-widest text-dimmed uppercase">
          Settings
        </span>
      </div>

      {/* Menu items */}
      <ul className="py-1">
        {menuItems.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer
                       text-sm text-main font-sans
                       hover:bg-neon-bg hover:text-neon
                       transition-colors duration-150"
          >
            <Icon size={15} className="shrink-0 text-dimmed" />
            {label}
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="border-t border-inactive" />

      {/* Theme section */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <Palette size={14} className="text-neon" />
          <span className="font-mono text-xs tracking-widest text-dimmed uppercase">
            Theme
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {themes.map((t) => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className="flex items-center gap-3 w-full rounded-md px-3 py-2 cursor-pointer
                           transition-all duration-150 select-none text-left
                           hover:bg-neon-bg"
                style={{
                  border: `1px solid ${isActive ? t.accent : "var(--color-inactive)"}`,
                  boxShadow: isActive ? `0 0 8px ${t.accent}55` : "none",
                }}
              >
                {/* Mini preview strip */}
                <div className="flex rounded-sm overflow-hidden shrink-0 w-12 h-7 shadow-inner">
                  <div style={{ background: t.preview[0], flex: 1 }} />
                  <div style={{ background: t.preview[1], flex: 1.2 }} />
                  <div style={{ background: t.preview[2], flex: 0.5 }} />
                </div>

                <span
                  className="flex-1 text-sm font-sans"
                  style={{
                    color: isActive ? t.accent : "main",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {t.label}
                </span>

                {isActive && (
                  <Check size={14} style={{ color: t.accent, flexShrink: 0 }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
