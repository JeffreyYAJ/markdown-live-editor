import { useState } from "react";
import {
  Terminal,
  Folder,
  Search,
  Layers3,
  Settings,
  Clock4,
  FileText,
} from "lucide-react";
import SettingsMenu from "./SettingsMenu";

interface SidebarProps {
  onFolderClick?: () => void;
}

export default function Sidebar({ onFolderClick }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-full bg-sidebar min-w-0 overflow-hidden ">
      <nav className="w-12 bg-activity flex flex-col items-center pt-4 gap-6 shrink-0 border-r border-surface-dim">
        <div className="flex flex-col items-center gap-1 w-full cursor-pointer text-neon relative z-10 before:absolute before:-inset-y-1 before:inset-x-1 before:bg-neon-bg before:rounded-sm before:-z-10">
          <Terminal size={22} />
          <div className="font-mono text-[0.55rem] text-neon drop-shadow-[0_0_5px_rgba(0,255,65,0.6)] text-center leading-tight">
            TERMINAL
          </div>
        </div>
        <div
          className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors"
          onClick={onFolderClick}
        >
          <Folder size={22} />
        </div>
        <div className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors">
          <Search size={22} />
        </div>
        <div className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors">
          <Layers3 size={22} />
        </div>

        {/* Settings icon — opens context menu */}
        <div className="relative flex flex-col items-center gap-1 w-full cursor-pointer mt-auto">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`flex flex-col items-center w-full py-1 transition-colors ${
              menuOpen
                ? "text-(--color-neon)"
                : "text-inactive hover:text-dimmed"
            }`}
            aria-label="Settings"
          >
            <Settings
              size={22}
              style={menuOpen ? { filter: "drop-shadow(0 0 6px var(--color-neon))" } : undefined}
            />
          </button>

          {menuOpen && <SettingsMenu onClose={() => setMenuOpen(false)} />}
        </div>

        <div className="flex flex-col items-center w-full cursor-pointer text-inactive hover:text-dimmed transition-colors mb-4">
          <Clock4 size={22} />
        </div>
      </nav>

      <aside className="flex-1 flex flex-col py-4 font-mono overflow-y-auto overflow-x-hidden min-w-0">
        <div className="px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-dimmed text-xs tracking-widest truncate">
              EXPLORER
            </div>
            <div className="text-dimmed text-lg tracking-[-2px] shrink-0">
              •••
            </div>
          </div>
          <ul className="text-xs space-y-2">
            <li className="text-neon font-medium cursor-pointer flex items-center truncate">
              <FileText size={12} className="mr-1.5 shrink-0" /> index.md
            </li>
            <li className="text-inactive hover:text-dimmed cursor-pointer flex items-center transition-colors truncate">
              <FileText size={12} className="mr-1.5 shrink-0" /> about.md
            </li>
            <li className="text-inactive hover:text-dimmed cursor-pointer flex items-center transition-colors truncate">
              <FileText size={12} className="mr-1.5 shrink-0" /> styles.css
            </li>
          </ul>
        </div>

        <div className="px-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-dimmed text-xs tracking-widest truncate">
              OUTLINE
            </div>
            <div className="text-dimmed text-lg tracking-[-2px] shrink-0">
              •••
            </div>
          </div>
          <ul className="text-xs text-dimmed space-y-2">
            <li className="cursor-pointer hover:text-main transition-colors truncate">
              # Architecture
            </li>
            <li className="cursor-pointer hover:text-main transition-colors truncate">
              ## Core Principles
            </li>
            <li className="cursor-pointer hover:text-main transition-colors truncate">
              ## System Design
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
