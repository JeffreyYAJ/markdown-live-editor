interface EditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

export default function Editor({ markdown, setMarkdown }: EditorProps) {
  return (
    <section className="flex flex-col h-full bg-editor min-w-0">
          <div className="h-10 flex items-center px-4 font-mono text-[0.7rem] text-inactive tracking-widest uppercase shrink-0">
        INDEX.MD <span className="ml-2.5 text-[#a11c2e]">EDITING...</span>
      </div>
      <textarea 
        className="flex-1 w-full min-w-0 bg-transparent border-none font-mono text-sm p-4 resize-none outline-none leading-relaxed text-[#e0e0e0] caret-neon"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        spellCheck={false}
      />
    </section>
  );
}