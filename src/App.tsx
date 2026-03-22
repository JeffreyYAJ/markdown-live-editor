import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Terminal, Folder, Search, Settings, FileText, LayoutGrid, Layers3, Clock4, Search as SearchIcon, PanelRight, Download, Share2, Printer, MoreVertical } from 'lucide-react';

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
      {/* HEADER */}
      <header className="flex justify-between items-center px-4 h-10 bg-topbar font-mono text-xs border-b border-[#1a1a1a]">
        <div className="text-neon font-semibold drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">ARCHITECT_OS</div>
        <div className="flex gap-4 text-dimmed">
          <span className="relative cursor-pointer hover:text-main after:content-[''] after:absolute after:-top-0.5 after:-right-1.5 after:w-1 after:h-1 after:bg-red-500 after:rounded-full">File</span>
          <span className="cursor-pointer hover:text-main transition-colors">Edit</span>
          <span className="cursor-pointer hover:text-main transition-colors">Selection</span>
          <span className="cursor-pointer hover:text-main transition-colors">View</span>
          <span className="cursor-pointer hover:text-main transition-colors">Go</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon size={16} className="absolute left-2 top-1.5 text-inactive"/>
            <input type="text" placeholder="Global Search..." className="bg-[#1a141a] border-none text-white rounded-[2px] py-1 pr-2 pl-7 w-56 font-mono text-xs outline-none focus:ring-1 focus:ring-neon-dim" />
          </div>
          <button className="px-3 py-1 rounded-[2px] font-semibold uppercase tracking-wider bg-neon text-black">RUN</button>
          <button className="px-3 py-1 rounded-[2px] font-semibold uppercase tracking-wider bg-transparent text-neon border border-neon-dim">PREVIEW</button>
          <div className="flex text-dimmed gap-2.5 ml-2">
             <PanelRight size={18} className="cursor-pointer hover:text-main"/>
             <Printer size={18} className="cursor-pointer hover:text-main"/>
             <LayoutGrid size={18} className="cursor-pointer hover:text-main"/>
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR AVEC ACTIVITY BAR */}
        <nav className="w-12 bg-activity flex flex-col items-center pt-4 gap-6 shrink-0">
          <div className="flex flex-col items-center gap-1 w-full cursor-pointer text-neon relative z-10 before:absolute before:-inset-y-1 before:inset-x-1 before:bg-neon-bg before:rounded-sm before:-z-10">
            <Terminal size={22} />
            <div className="font-mono text-[0.55rem] text-neon drop-shadow-[0_0_5px_rgba(0,255,65,0.6)] text-center leading-tight">TERMINAL<br/>v1.0.4</div>
          </div>
          <div className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors">
            <Folder size={22} />
            <div className="font-mono text-[0.55rem] text-center">FILES</div>
          </div>
          <div className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors">
            <Search size={22} />
            <div className="font-mono text-[0.55rem] text-center">SEARCH</div>
          </div>
          <div className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors">
            <Layers3 size={22} />
            <div className="font-mono text-[0.55rem] text-center">GIT</div>
          </div>
          <div className="flex flex-col items-center gap-1 w-full cursor-pointer text-inactive hover:text-dimmed transition-colors mt-auto">
            <Settings size={22} />
            <div className="font-mono text-[0.55rem] text-center">SETTINGS</div>
          </div>
          <div className="flex flex-col items-center w-full cursor-pointer text-inactive hover:text-dimmed transition-colors mb-4">
            <Clock4 size={22} />
          </div>
        </nav>

        <aside className="w-52 bg-sidebar flex flex-col py-4 font-mono shrink-0">
          <div className="px-4 mb-8">
            <div className="flex justify-between items-center mb-4">
                <div className="text-dimmed text-xs tracking-widest">EXPLORER</div>
                <div className="text-dimmed text-lg tracking-[-2px]">•••</div>
            </div>
            <ul className="text-xs space-y-2">
              <li className="text-neon font-medium cursor-pointer flex items-center"><FileText size={12} className="mr-1.5"/> index.md</li>
              <li className="text-inactive hover:text-dimmed cursor-pointer flex items-center transition-colors"><FileText size={12} className="mr-1.5"/> about.md</li>
              <li className="text-inactive hover:text-dimmed cursor-pointer flex items-center transition-colors"><FileText size={12} className="mr-1.5"/> styles.css</li>
            </ul>
          </div>

          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
                <div className="text-dimmed text-xs tracking-widest">OUTLINE</div>
                <div className="text-dimmed text-lg tracking-[-2px]">•••</div>
            </div>
            <ul className="text-xs text-dimmed space-y-2">
              <li className="cursor-pointer hover:text-main transition-colors"># Architecture</li>
              <li className="cursor-pointer hover:text-main transition-colors">## Core Principles</li>
              <li className="cursor-pointer hover:text-main transition-colors">## System Design</li>
            </ul>
          </div>
        </aside>

        {/* EDITOR (GAUCHE) */}
        <section className="flex-[1.1] bg-editor flex flex-col border-r border-[#1a1a1a]">
          <div className="h-10 flex items-center px-4 font-mono text-[0.7rem] text-inactive tracking-widest uppercase">
            INDEX.MD <span className="ml-2.5 text-[#4d4452]">EDITING...</span>
          </div>
          <textarea 
            className="flex-1 bg-transparent border-none font-mono text-sm p-4 resize-none outline-none leading-relaxed text-[#e0e0e0] caret-neon"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
          />
        </section>

        {/* PREVIEW (DROITE) */}
        <section className="flex-1 bg-preview overflow-y-auto relative">
          <div className="h-10 flex items-center px-4 font-mono text-[0.7rem] text-inactive tracking-widest uppercase sticky top-0 bg-preview/90 backdrop-blur-sm z-10">
            RENDERED PREVIEW
          </div>
          
          {/* Rendu Markdown avec les styles ciblés via Tailwind [&_tag] */}
          <div className="px-16 pb-12 font-sans text-main leading-relaxed text-[0.95rem] 
                          [&_h1]:text-white [&_h1]:text-[2.8rem] [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:border-l-[6px] [&_h1]:border-neon [&_h1]:pl-6 [&_h1]:-ml-[2.1rem]
                          [&_h2]:text-white [&_h2]:text-[1.6rem] [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                          [&_h3]:text-dimmed [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-4
                          [&_p]:text-[#b0b0b0] [&_p]:mb-4
                          [&_code]:font-mono [&_code]:text-neon
                          [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-6
                          [&_li]:relative [&_li]:pl-6 [&_li]:mb-2 [&_li]:text-[#b0b0b0]
                          [&_li::before]:content-['—'] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:text-neon">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>

          {/* Actions flottantes à droite */}
          <div className="absolute top-4 right-8 bg-[#2b1e2e] p-2.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col gap-4 z-20">
            <FileText size={20} className="text-white cursor-pointer" />
            <Share2 size={20} className="text-dimmed hover:text-white cursor-pointer transition-colors" />
            <Download size={20} className="text-dimmed hover:text-white cursor-pointer transition-colors" />
            <MoreVertical size={20} className="text-dimmed hover:text-white cursor-pointer transition-colors" />
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="h-6 bg-neon text-black flex justify-between items-center px-4 font-mono text-[0.7rem] font-semibold">
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