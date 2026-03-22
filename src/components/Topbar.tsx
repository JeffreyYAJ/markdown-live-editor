import { Search as SearchIcon, PanelRight, Printer, LayoutGrid } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="flex justify-between items-center px-4 h-10 bg-topbar font-mono text-xs border-b border-[#1a1a1a] shrink-0">
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
        <button className="px-3 py-1 rounded-[2px] font-semibold uppercase tracking-wider bg-neon text-black hover:bg-[#00e63a] transition-colors">RUN</button>
        <button className="px-3 py-1 rounded-[2px] font-semibold uppercase tracking-wider bg-transparent text-neon border border-neon-dim hover:bg-neon-dim transition-colors">PREVIEW</button>
        <div className="flex text-dimmed gap-2.5 ml-2">
           <PanelRight size={18} className="cursor-pointer hover:text-main transition-colors"/>
           <Printer size={18} className="cursor-pointer hover:text-main transition-colors"/>
           <LayoutGrid size={18} className="cursor-pointer hover:text-main transition-colors"/>
        </div>
      </div>
    </header>
  );
}