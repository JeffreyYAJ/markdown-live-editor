import { useState, useRef, useEffect } from "react";

interface EditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
  onCursorChange: (line: number, column: number) => void;
}

export default function Editor({
  markdown,
  setMarkdown,
  onCursorChange,
}: EditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSelectionChange = (
    e: React.SyntheticEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = e.currentTarget;
    const textBeforeCursor = textarea.value.slice(0, textarea.selectionStart);
    const lines = textBeforeCursor.split("\n");
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    onCursorChange(line, column);
  };

  const handleInput = () => {
    setIsEditing(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setIsEditing(false), 1000);
  };

  return (
    <section className="flex flex-col h-full bg-editor min-w-0">
      <div className="h-10 flex items-center px-4 font-mono text-[0.7rem] text-inactive tracking-widest uppercase shrink-0">
        INDEX.MD{" "}
        {isEditing && (
          <span className="ml-2.5 text-[#a11c2e] animate-pulse">
            EDITING...
          </span>
        )}
      </div>
      <textarea
        className="flex-1 w-full min-w-0 bg-transparent border-none font-mono text-sm p-4 resize-none outline-none leading-relaxed text-main caret-neon"
        value={markdown}
        onChange={(e) => {
          setMarkdown(e.target.value);
          handleSelectionChange(e);
          handleInput();
        }}
        onSelect={handleSelectionChange}
        onClick={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        spellCheck={false}
      />
    </section>
  );
}
