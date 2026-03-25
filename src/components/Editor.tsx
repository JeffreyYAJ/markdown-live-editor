interface EditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
  onCursorChange: (line: number, column: number) => void;
}

export default function Editor({ markdown, setMarkdown, onCursorChange }: EditorProps) {
  const handleSelectionChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const textBeforeCursor = textarea.value.slice(0, textarea.selectionStart);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    onCursorChange(line, column);
  };

  return (
    <section className="flex flex-col h-full bg-editor min-w-0">
          <div className="h-10 flex items-center px-4 font-mono text-[0.7rem] text-inactive tracking-widest uppercase shrink-0">
        INDEX.MD <span className="ml-2.5 text-[#a11c2e]">EDITING...</span>
      </div>
      <textarea 
        className="flex-1 w-full min-w-0 bg-transparent border-none font-mono text-sm p-4 resize-none outline-none leading-relaxed text-[#e0e0e0] caret-neon"
        value={markdown}
        onChange={(e) => {
          setMarkdown(e.target.value);
          handleSelectionChange(e);
        } }
        onSelect={handleSelectionChange}
        onClick={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        spellCheck={false}
      />
    </section>
  );
}