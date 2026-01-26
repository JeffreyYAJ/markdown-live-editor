import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import EditorPanel from "./components/EditorPanel";
import PreviewPanel from "./components/PreviewPanel";
import { initialMarkdown } from "./data/initialMarkdown";
import { parseMarkdown } from "./utils/markdownParser";

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);
  const [preview, setPreview] = useState<string>(
    parseMarkdown(initialMarkdown),
  );
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Debounced update function
  const updatePreview = useCallback((text: string) => {
    const html = parseMarkdown(text);
    setPreview(html);
  }, []);

  // Handle input change with debouncing
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMarkdown(newValue);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      updatePreview(newValue);
    }, 300);

    setDebounceTimer(timer);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EditorPanel markdown={markdown} onChange={handleChange} />
          <PreviewPanel preview={preview} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
