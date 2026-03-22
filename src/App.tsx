import { useState } from 'react';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Preview from './components/Preview';

function App() {
  const [markdown, setMarkdown] = useState(`# Architecture: The Digital Command Deck

## Core Identity

The "Terminal Editorial" aesthetic is defined by its intentional asymmetry and high-contrast surface hierarchy. This document outlines the technical specifications for the ARCHITECT_OS interface.

### Key Directives
1. No-Line Rule: Boundaries are defined through subtle tonal shifts.
2. Phosphor Glow: Active elements emit a soft ambient glow.
3. Space Grotesk: High-end editorial typography.
`);

  return (
    <div className="flex flex-col h-screen">
      <Topbar />

      {/* WORKSPACE */}
      <main className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Editor markdown={markdown} setMarkdown={setMarkdown} />
        <Preview markdown={markdown} />
      </main>

      {/* FOOTER (Tu pourras aussi le séparer plus tard si tu veux !) */}
      <footer className="h-6 bg-neon text-black flex justify-between items-center px-4 font-mono text-[0.7rem] font-semibold shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-bold">MAIN*</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{`<> MARKDOWN`}</span>
          <span>LN 14, COL 22</span>
        </div>
      </footer>
    </div>
  );
}

export default App;