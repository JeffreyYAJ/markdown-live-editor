import { useMemo, useState, useRef, useEffect } from "react";
import {
  Terminal,
  Folder,
  Search,
  Layers3,
  Settings,
  Clock4,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import SettingsMenu from "./SettingsMenu";
import { useDocuments } from "../context/DocumentsContext";
import type { DocumentSnapshot } from "../context/DocumentsContext";
import { extractOutline } from "../utils/markdown";

interface SidebarProps {
  onFolderClick?: () => void;
  onOutlineClick?: (id: string) => void;
  onFocusSearch?: () => void;
  onImport?: () => void;
}

export default function Sidebar({
  onFolderClick,
  onOutlineClick,
  onFocusSearch,
  onImport,
}: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const settingsBtnRef = useRef<HTMLButtonElement>(null);

  const {
    documents,
    activeId,
    activeDoc,
    createDocument,
    deleteDocument,
    renameDocument,
    selectDocument,
    getHistory,
    refreshHistory,
    restoreSnapshot,
    lastSavedAt,
    isLoading,
  } = useDocuments();

  const [historySnaps, setHistorySnaps] = useState<DocumentSnapshot[]>([]);

  const outline = useMemo(
    () => extractOutline(activeDoc?.content ?? ""),
    [activeDoc?.content],
  );

  useEffect(() => {
    if (historyOpen && activeId) {
      void refreshHistory(activeId).then(setHistorySnaps);
    }
  }, [historyOpen, activeId, refreshHistory, lastSavedAt]);

  const history = historyOpen ? historySnaps : getHistory(activeId);

  const startRename = (id: string, name: string) => {
    setRenamingId(id);
    setRenameValue(name);
  };

  const commitRename = () => {
    if (renamingId && renameValue.trim()) {
      void renameDocument(renamingId, renameValue.trim());
    }
    setRenamingId(null);
    setRenameValue("");
  };

  return (
    <div className="flex h-full bg-sidebar min-w-0 overflow-hidden">
      <nav className="w-12 bg-activity flex flex-col items-center pt-4 gap-6 shrink-0 border-r border-surface-dim">
        <div className="flex flex-col items-center gap-1 w-full cursor-pointer text-neon relative z-10 before:absolute before:-inset-y-1 before:inset-x-1 before:bg-neon-bg before:rounded-sm before:-z-10">
          <Terminal size={22} />
          <div className="font-mono text-[0.55rem] text-neon drop-shadow-[0_0_5px_rgba(0,255,65,0.6)] text-center leading-tight">
            TERMINAL
          </div>
        </div>
        <button
          type="button"
          className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors"
          onClick={onFolderClick}
          aria-label="Toggle explorer"
          title="Toggle explorer"
        >
          <Folder size={22} />
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors"
          onClick={onFocusSearch}
          aria-label="Focus search"
          title="Search (Ctrl+F)"
        >
          <Search size={22} />
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors"
          onClick={onImport}
          aria-label="Import file"
          title="Import .md"
        >
          <Layers3 size={22} />
        </button>

        <div className="relative flex flex-col items-center gap-1 w-full cursor-pointer mt-auto">
          <button
            ref={settingsBtnRef}
            type="button"
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
              style={
                menuOpen
                  ? { filter: "drop-shadow(0 0 6px var(--color-neon))" }
                  : undefined
              }
            />
          </button>

          {menuOpen && (
            <SettingsMenu
              onClose={() => setMenuOpen(false)}
              buttonRef={settingsBtnRef}
            />
          )}
        </div>

        <button
          type="button"
          onClick={() => setHistoryOpen((o) => !o)}
          className={`flex flex-col items-center w-full cursor-pointer transition-colors mb-4 ${
            historyOpen ? "text-neon" : "text-inactive hover:text-dimmed"
          }`}
          aria-label="Document history"
          title="History"
        >
          <Clock4 size={22} />
        </button>
      </nav>

      <aside className="flex-1 flex flex-col py-4 font-mono overflow-y-auto overflow-x-hidden min-w-0">
        <div className="px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-dimmed text-xs tracking-widest truncate">
              EXPLORER
            </div>
            <button
              type="button"
              onClick={() => void createDocument()}
              className="text-dimmed hover:text-neon transition-colors"
              aria-label="New document"
              title="New document"
            >
              <Plus size={14} />
            </button>
          </div>
          {isLoading ? (
            <p className="text-xs text-inactive italic">Loading workspace…</p>
          ) : (
          <ul className="text-xs space-y-2">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className={`group flex items-center gap-1 truncate cursor-pointer transition-colors ${
                  doc.id === activeId
                    ? "text-neon font-medium"
                    : "text-inactive hover:text-dimmed"
                }`}
                onClick={() => void selectDocument(doc.id)}
                onDoubleClick={() => startRename(doc.id, doc.name)}
                title={doc.id}
              >
                <FileText size={12} className="shrink-0" />
                {renamingId === doc.id ? (
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitRename();
                      if (e.key === "Escape") setRenamingId(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 min-w-0 bg-input-bg border border-surface-dim text-main text-xs px-1 rounded outline-none"
                  />
                ) : (
                  <span className="truncate flex-1">{doc.name}</span>
                )}
                {documents.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      void deleteDocument(doc.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-dimmed hover:text-red-400 shrink-0"
                    aria-label={`Delete ${doc.name}`}
                  >
                    <Trash2 size={11} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          )}
        </div>

        <div className="px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-dimmed text-xs tracking-widest truncate">
              OUTLINE
            </div>
          </div>
          {outline.length === 0 ? (
            <p className="text-xs text-inactive italic">No headings yet</p>
          ) : (
            <ul className="text-xs text-dimmed space-y-2">
              {outline.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => onOutlineClick?.(h.id)}
                    className="w-full text-left cursor-pointer hover:text-main transition-colors truncate"
                    style={{ paddingLeft: `${(h.level - 1) * 10}px` }}
                    title={h.text}
                  >
                    {"#".repeat(h.level)} {h.text}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {historyOpen && (
          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-dimmed text-xs tracking-widest truncate">
                HISTORY
              </div>
            </div>
            {history.length === 0 ? (
              <p className="text-xs text-inactive italic">No snapshots yet</p>
            ) : (
              <ul className="text-xs text-dimmed space-y-2">
                {[...history].reverse().map((snap) => (
                  <li key={snap.ts}>
                    <button
                      type="button"
                      onClick={() => void restoreSnapshot(activeId, snap.ts)}
                      className="w-full text-left hover:text-neon transition-colors truncate"
                    >
                      {new Date(snap.ts).toLocaleString()}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
