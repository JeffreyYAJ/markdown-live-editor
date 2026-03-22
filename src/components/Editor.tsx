interface EditorProps {
  markdown: string;
  //filename: string;
  setMarkdown: (value: string) => void;
}

export default function Editor({ markdown, setMarkdown }: EditorProps) {
  return (
    <section className="flex-[1.1] bg-editor flex flex-col border-r border-[#1a1a1a]">
      <div className="h-10 flex items-center px-4 font-mono text-[0.7rem] text-inactive tracking-widest uppercase">
        INDEX.MD <span className="ml-2.5 text-[#ee5858]">Editing...</span>
      </div>
      <textarea 
        className="flex-1 bg-transparent border-none font-mono text-sm p-4 resize-none outline-none leading-relaxed text-[#e0e0e0] caret-neon"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        spellCheck={false}
      />
    </section>
  );
}