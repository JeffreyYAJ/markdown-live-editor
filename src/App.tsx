import React, { useState, useCallback } from "react";
import html2pdf from "html2pdf.js";
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

  // Handle PDF download
  const handleDownloadPDF = () => {
    const element = document.createElement("div");
    element.innerHTML = preview;
    element.style.padding = "20px";
    element.style.fontSize = "16px";
    element.style.lineHeight = "1.6";

    const options = {
      margin: 10,
      filename: "markdown-document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header onDownloadPDF={handleDownloadPDF} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EditorPanel markdown={markdown} onChange={handleChange} />
          <PreviewPanel preview={preview} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
