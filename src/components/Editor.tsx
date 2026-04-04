import { useState, useRef, useEffect } from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.css"; // Basic styles, we will override most of it

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
    e: React.SyntheticEvent<HTMLTextAreaElement | HTMLDivElement>,
  ) => {
    const textarea = e.target as HTMLTextAreaElement;
    if (!textarea.value) return;
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
    <section className="flex flex-col h-full bg-editor min-w-0 overflow-hidden">
      <div className="h-10 flex items-center px-4 font-mono text-[0.7rem] text-inactive tracking-widest uppercase shrink-0 border-b border-white/5">
        INDEX.MD{" "}
        {isEditing && (
          <span className="ml-2.5 text-[#a11c2e] animate-pulse">
            EDITING...
          </span>
        )}
      </div>
      <div className="flex-1 w-full overflow-auto custom-scrollbar">
        <CodeEditor
          value={markdown}
          onValueChange={(code) => {
            setMarkdown(code);
            handleInput();
          }}
          highlight={(code) => highlight(code, languages.markdown, "markdown")}
          padding={20}
          onSelect={handleSelectionChange}
          onClick={handleSelectionChange}
          onKeyUp={handleSelectionChange}
          className="markdown-editor font-mono text-sm leading-relaxed text-main min-h-full"
          textareaClassName="outline-none"
          textareaId="code-editor"
          style={{
            fontFamily: 'var(--font-mono)',
            minHeight: '100%',
          }}
        />
      </div>
    </section>
  );
}
