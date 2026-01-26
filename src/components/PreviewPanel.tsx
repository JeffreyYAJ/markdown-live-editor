import React from "react";
import { Eye } from "lucide-react";

interface PreviewPanelProps {
  preview: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ preview }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden">
      <div className="bg-slate-700 px-4 py-3 border-b border-slate-600 flex items-center gap-2">
        <Eye className="w-5 h-5 text-green-400" />
        <span className="text-white font-semibold">Preview</span>
      </div>
      <div
        className="w-full h-[600px] bg-white p-6 overflow-auto prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: preview }}
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
        }}
      />
    </div>
  );
};

export default PreviewPanel;
