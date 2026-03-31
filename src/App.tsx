import { useState, useRef, useCallback } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import type { PanelImperativeHandle } from "react-resizable-panels";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { initialMarkdown } from "./data/initialMarkdown";
import { ThemeProvider } from "./context/ThemeProvider";

function AppInner() {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 });

  const updateCursorPos = useCallback((line: number, column: number) => {
    setCursorPos({ line, column });
  }, []);

  const sidebarRef = useRef<PanelImperativeHandle>(null);

  const toggleSidebar = () => {
    const panel = sidebarRef.current;
    if (panel) {
      if (panel.isCollapsed()) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar />

      <main className="flex-1 w-full flex overflow-hidden">
        <Group orientation="horizontal" className="w-full h-full">
          <Panel
            panelRef={sidebarRef}
            collapsible={true}
            collapsedSize="3"
            defaultSize="20"
            minSize="15"
            maxSize="35"
            className="transition-[flex-basis,flex-grow] duration-300 ease-in-out"
          >
            <Sidebar onFolderClick={toggleSidebar} />
          </Panel>

          <Separator className="w-1 bg-[#1a1a1a] hover:bg-(--color-neon) active:bg-(--color-neon) transition-colors cursor-col-resize shrink-0" />

          <Panel defaultSize="40" minSize="20">
            <Editor
              markdown={markdown}
              setMarkdown={setMarkdown}
              onCursorChange={updateCursorPos}
            />
          </Panel>

          <Separator className="w-1 bg-[#1a1a1a] hover:bg-(--color-neon) active:bg-(--color-neon) transition-colors cursor-col-resize shrink-0" />

          <Panel defaultSize="40" minSize="20">
            <Preview markdown={markdown} />
          </Panel>
        </Group>
      </main>
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
