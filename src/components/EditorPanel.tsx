import React from "react";
import { FileText } from "lucide-react";

interface EditorPanelProps {
  markdown: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ markdown, onChange }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden">
      <div className="bg-slate-700 px-4 py-3 border-b border-slate-600 flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-400" />
        <span className="text-white font-semibold">Editor</span>
      </div>
      <textarea
        value={markdown}
        onChange={onChange}
        className="w-full h-[600px] bg-slate-900 text-slate-100 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing your markdown here..."
        spellCheck={false}
      />
    </div>
  );
};

export default EditorPanel;
