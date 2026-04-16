import { useState, useRef, useCallback, useEffect } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import type {
  PanelImperativeHandle,
  GroupImperativeHandle,
} from "react-resizable-panels";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Terminal from "./components/Terminal";
import { initialMarkdown } from "./data/initialMarkdown";
import { ThemeProvider } from "./context/ThemeProvider";
import { useTheme, type Theme } from "./context/ThemeContext";

//ultimate commit 
function AppInner() {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 });
  const [terminalOpen, setTerminalOpen] = useState(false);

  const { setTheme } = useTheme();

  // Refs for sync-scroll
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLElement>(null);
  const scrollingRef = useRef<"editor" | "preview" | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Panel imperative refs
  const sidebarPanelRef = useRef<PanelImperativeHandle>(null);
  const verticalGroupRef = useRef<GroupImperativeHandle>(null);
  const lastTerminalPct = useRef(35);

  const updateCursorPos = useCallback((line: number, column: number) => {
    setCursorPos({ line, column });
  }, []);

  // ── Sync-scroll ────────────────────────────────────────────
  const handleEditorScroll = useCallback(() => {
    if (scrollingRef.current === "preview") return;
    const editor = editorRef.current;
    const preview = previewRef.current;
    if (editor && preview) {
      scrollingRef.current = "editor";
      const pct =
        editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      preview.scrollTop = pct * (preview.scrollHeight - preview.clientHeight);
      if (scrollTimeoutRef.current)
        window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        scrollingRef.current = null;
      }, 50);
    }
  }, []);

  const handlePreviewScroll = useCallback(() => {
    if (scrollingRef.current === "editor") return;
    const editor = editorRef.current;
    const preview = previewRef.current;
    if (editor && preview) {
      scrollingRef.current = "preview";
      const pct =
        preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
      editor.scrollTop = pct * (editor.scrollHeight - editor.clientHeight);
      if (scrollTimeoutRef.current)
        window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        scrollingRef.current = null;
      }, 50);
    }
  }, []);

  // ── Sidebar ─────────────────────────────────────────────────
  const toggleSidebar = useCallback(() => {
    const panel = sidebarPanelRef.current;
    if (!panel) return;
    panel.isCollapsed() ? panel.expand() : panel.collapse();
  }, []);

  // ── Terminal (uses Group-level setLayout for reliability) ────
  const toggleTerminal = useCallback(() => {
    const group = verticalGroupRef.current;
    if (!group) { console.warn("no group ref"); return; }
    const layout = group.getLayout();
    console.log("current layout:", layout);
    const currentTerminalPct = layout["terminal"] ?? 0;

    if (currentTerminalPct <= 1) {
      // Open terminal at remembered size
      const target = lastTerminalPct.current;
      const requested = { workspace: 100 - target, terminal: target };
      console.log("requesting layout:", requested);
      const applied = group.setLayout(requested);
      console.log("applied layout:", applied);
      setTerminalOpen(true);
    } else {
      // Close terminal — save current size first
      lastTerminalPct.current = currentTerminalPct;
      const applied = group.setLayout({ workspace: 100, terminal: 0 });
      console.log("closed, applied:", applied);
      setTerminalOpen(false);
    }
  }, []);

  const closeTerminal = useCallback(() => {
    const group = verticalGroupRef.current;
    if (!group) return;
    const layout = group.getLayout();
    const currentTerminalPct = layout["terminal"] ?? 0;
    if (currentTerminalPct > 1) lastTerminalPct.current = currentTerminalPct;
    group.setLayout({ workspace: 100, terminal: 0 });
    setTerminalOpen(false);
  }, []);

  // Ctrl+` shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleTerminal]);

  return (
    <div className="flex flex-col h-screen">
      <Topbar terminalOpen={terminalOpen} onToggleTerminal={toggleTerminal} />

      {/* Vertical split: main workspace on top, terminal on bottom */}
      <Group
        orientation="vertical"
        className="flex-1 overflow-hidden"
        groupRef={verticalGroupRef}
      >
        {/* Top: main workspace */}
        <Panel id="workspace" defaultSize={100} minSize={10}>
          <main className="flex w-full h-full overflow-hidden">
            <Group orientation="horizontal" className="w-full h-full">
              <Panel
                panelRef={sidebarPanelRef}
                collapsible
                collapsedSize={3}
                defaultSize={20}
                minSize={10}
                maxSize={35}
              >
                <Sidebar onFolderClick={toggleSidebar} />
              </Panel>

              <Separator className="w-1 bg-[#1a1a1a] hover:bg-(--color-neon) active:bg-(--color-neon) transition-colors cursor-col-resize shrink-0" />

              <Panel defaultSize={40} minSize={10}>
                <Editor
                  ref={editorRef}
                  markdown={markdown}
                  setMarkdown={setMarkdown}
                  onCursorChange={updateCursorPos}
                  onScroll={handleEditorScroll}
                />
              </Panel>

              <Separator className="w-1 bg-[#1a1a1a] hover:bg-(--color-neon) active:bg-(--color-neon) transition-colors cursor-col-resize shrink-0" />

              <Panel defaultSize={40} minSize={10}>
                <Preview
                  ref={previewRef}
                  markdown={markdown}
                  onScroll={handlePreviewScroll}
                />
              </Panel>
            </Group>
          </main>
        </Panel>

        {/* Horizontal resize handle */}
        <Separator
          className={`h-1.5 transition-colors cursor-row-resize shrink-0 ${
            terminalOpen
              ? "bg-[#1a1a1a] hover:bg-(--color-neon) active:bg-(--color-neon)"
              : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Bottom: terminal panel */}
        <Panel
          id="terminal"
          defaultSize={0}
          minSize={0}
          maxSize={85}
          onResize={(panelSize) => {
            const pct = panelSize.asPercentage;
            if (pct <= 1) {
              setTerminalOpen(false);
            } else {
              setTerminalOpen(true);
            }
          }}
        >
          <Terminal
            markdown={markdown}
            onClose={closeTerminal}
            onThemeChange={(t: Theme) => setTheme(t)}
          />
        </Panel>
      </Group>

      <footer
        className="h-6 flex justify-between items-center px-4 font-mono text-[0.7rem] font-semibold shrink-0"
        style={{
          backgroundColor: "var(--color-neon)",
          color: "var(--color-on-accent)",
        }}
      >
        <div className="flex items-center gap-4">
          <span className="font-bold">MAIN*</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{`<> MARKDOWN`}</span>
          <span>
            LN {cursorPos.line}, COL {cursorPos.column}
          </span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
