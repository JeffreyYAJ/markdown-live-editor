import { useState, useRef, useEffect } from "react";
import {
  Search as SearchIcon,
  PanelRight,
  Printer,
  LayoutGrid,
  TerminalSquare,
} from "lucide-react";
import type { ViewMode } from "../App";

interface TopbarProps {
  terminalOpen?: boolean;
  onToggleTerminal?: () => void;
  viewMode?: ViewMode;
  onSetViewMode?: (mode: ViewMode) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onSearchSubmit?: (backwards: boolean) => void;
  onNewDocument?: () => void;
  onImport?: () => void;
  onExportMarkdown?: () => void;
  onExportHtml?: () => void;
  onPrint?: () => void;
}

export default function Topbar({
  terminalOpen = false,
  onToggleTerminal,
  viewMode = "split",
  onSetViewMode,
  searchQuery = "",
  onSearchChange,
  onSearchSubmit,
  onNewDocument,
  onImport,
  onExportMarkdown,
  onExportHtml,
  onPrint,
}: TopbarProps) {
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const fileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        fileMenuRef.current &&
        !fileMenuRef.current.contains(e.target as Node)
      ) {
        setFileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [fileMenuOpen]);

  const cycleView = () => {
    if (!onSetViewMode) return;
    const order: ViewMode[] = ["split", "editor", "preview"];
    const idx = order.indexOf(viewMode);
    onSetViewMode(order[(idx + 1) % order.length]);
  };

  const fileItems = [
    { label: "New Document", action: onNewDocument },
    { label: "Import .md…", action: onImport },
    { label: "Export Markdown", action: onExportMarkdown },
    { label: "Export HTML", action: onExportHtml },
    { label: "Print / PDF", action: onPrint },
  ];

  return (
    <header className="flex justify-between items-center px-4 h-10 bg-topbar font-mono text-xs border-b border-surface-dim shrink-0">
      <div className="text-neon font-semibold drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
        ARCHITECT_OS
      </div>

      <div className="flex gap-4 text-dimmed">
        <div className="relative" ref={fileMenuRef}>
          <button
            type="button"
            onClick={() => setFileMenuOpen((o) => !o)}
            className="relative cursor-pointer hover:text-main after:content-[''] after:absolute after:-top-0.5 after:-right-1.5 after:w-1 after:h-1 after:bg-red-500 after:rounded-full"
          >
            File
          </button>
          {fileMenuOpen && (
            <ul
              className="absolute top-full left-0 mt-1 w-44 py-1 rounded border border-surface-dim bg-sidebar shadow-xl z-50"
            >
              {fileItems.map(({ label, action }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => {
                      action?.();
                      setFileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-main hover:bg-neon-bg hover:text-neon transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="cursor-pointer hover:text-main transition-colors">
          Edit
        </span>
        <span className="cursor-pointer hover:text-main transition-colors">
          Selection
        </span>
        <button
          type="button"
          onClick={cycleView}
          className="cursor-pointer hover:text-main transition-colors"
          title="Cycle view: split / editor / preview"
        >
          View
        </button>
        <span className="cursor-pointer hover:text-main transition-colors">
          Go
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon
            size={16}
            className="absolute left-2 top-1.5 text-inactive pointer-events-none"
          />
          <input
            id="global-search"
            type="text"
            placeholder="Global Search… (Ctrl+F)"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSearchSubmit?.(e.shiftKey);
              }
            }}
            className="bg-input-bg border border-surface-dim text-main rounded-[2px] py-1 pr-2 pl-7 w-56 font-mono text-xs outline-none focus:ring-1 focus:ring-neon-dim"
          />
        </div>
        <button
          type="button"
          onClick={() => onSetViewMode?.("editor")}
          className={`px-3 py-1 rounded-[2px] font-semibold uppercase tracking-wider transition-colors ${
            viewMode === "editor"
              ? "bg-neon text-black"
              : "bg-neon/80 text-black hover:bg-[#00e63a]"
          }`}
          title="Editor only"
        >
          RUN
        </button>
        <button
          type="button"
          onClick={() => onSetViewMode?.("preview")}
          className={`px-3 py-1 rounded-[2px] font-semibold uppercase tracking-wider transition-colors ${
            viewMode === "preview"
              ? "bg-neon-dim text-neon border border-neon"
              : "bg-transparent text-neon border border-neon-dim hover:bg-neon-dim"
          }`}
          title="Preview only"
        >
          PREVIEW
        </button>
        <div className="flex text-dimmed gap-2.5 ml-2 items-center">
          <button
            type="button"
            onClick={() => onSetViewMode?.("split")}
            title="Split view"
            aria-label="Split view"
            className={`cursor-pointer transition-colors ${
              viewMode === "split" ? "text-neon" : "hover:text-main"
            }`}
          >
            <PanelRight size={18} />
          </button>
          <button
            type="button"
            onClick={onPrint}
            title="Print"
            aria-label="Print document"
            className="cursor-pointer hover:text-main transition-colors"
          >
            <Printer size={18} />
          </button>
          <button
            type="button"
            onClick={cycleView}
            title="Cycle layout"
            aria-label="Cycle layout"
            className="cursor-pointer hover:text-main transition-colors"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            type="button"
            onClick={onToggleTerminal}
            title="Toggle Terminal (Ctrl+`)"
            aria-label="Toggle terminal"
            className={`cursor-pointer transition-colors p-0.5 rounded-sm ${
              terminalOpen
                ? "text-neon drop-shadow-[0_0_6px_var(--color-neon)]"
                : "text-dimmed hover:text-main"
            }`}
          >
            <TerminalSquare size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
