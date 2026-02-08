import React from "react";

import { FileText, Download } from "lucide-react";

interface HeaderProps {
  onDownloadPDF: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDownloadPDF }) => {
  return (
    <header className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <FileText className="w-8 h-8" />
            Markdown Editor
          </h1>
          <p className="text-slate-400">
            Write markdown on the left, see live preview on the right
          </p>
        </div>
        <button
          onClick={onDownloadPDF}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>
    </header>
  );
};

export default Header;
