import React from "react";
import { FileText } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
        <FileText className="w-8 h-8" />
        Markdown Editor
      </h1>
      <p className="text-slate-400">
        Write markdown on the left, see live preview on the right
      </p>
    </header>
  );
};

export default Header;
