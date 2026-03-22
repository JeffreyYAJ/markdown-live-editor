import { Terminal, Folder, Search, Layers3, Settings, Clock4, FileText } from 'lucide-react';

export default function Sidebar() {
  return (
    <>
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
    </>
  );
}