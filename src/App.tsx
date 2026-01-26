import React, { useState, useEffect, useCallback } from "react";
import { FileText, Eye } from "lucide-react";

// Simple markdown parser with LaTeX support
const parseMarkdown = (text: string): string => {
  let html = text;

  // LaTeX inline math: $...$
  html = html.replace(/\$([^\$]+)\$/g, '<span class="math-inline">$1</span>');

  // LaTeX block math: $$...$$
  html = html.replace(
    /\$\$([^\$]+)\$\$/g,
    '<div class="math-block">$$1$$</div>',
  );

  // Headers
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Code blocks
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    "<pre><code>$2</code></pre>",
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^\)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  // Unordered lists
  html = html.replace(/^\* (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");

  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr />");

  // Line breaks
  html = html.replace(/\n/g, "<br />");

  return html;
};

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
    `# Welcome to Markdown Editor

## Features
* Live preview with **debounced** input
* Support for $\\text{LaTeX}$ expressions
* Real-time HTML rendering

### Try LaTeX Math
Inline math: $E = mc^2$

Block math:
$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

### Code Example
\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
\`\`\`

**Bold text** and *italic text*

> This is a blockquote

[Visit Anthropic](https://www.anthropic.com)
`,
  );
  const [preview, setPreview] = useState<string>("");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

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

  // Initial render
  useEffect(() => {
    updatePreview(markdown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <FileText className="w-8 h-8" />
            Markdown Editor
          </h1>
          <p className="text-slate-400">
            Write markdown on the left, see live preview on the right
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-700 px-4 py-3 border-b border-slate-600 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Editor</span>
            </div>
            <textarea
              value={markdown}
              onChange={handleChange}
              className="w-full h-[600px] bg-slate-900 text-slate-100 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start typing your markdown here..."
              spellCheck={false}
            />
          </div>

          {/* Preview Panel */}
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
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .prose h1 {
            font-size: 2em;
            font-weight: bold;
            margin-top: 0.5em;
            margin-bottom: 0.5em;
            color: #1e293b;
          }
          .prose h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-top: 0.8em;
            margin-bottom: 0.5em;
            color: #334155;
          }
          .prose h3 {
            font-size: 1.25em;
            font-weight: bold;
            margin-top: 0.6em;
            margin-bottom: 0.4em;
            color: #475569;
          }
          .prose strong {
            font-weight: 600;
            color: #0f172a;
          }
          .prose em {
            font-style: italic;
            color: #334155;
          }
          .prose code {
            background-color: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            color: #e11d48;
          }
          .prose pre {
            background-color: #1e293b;
            padding: 1em;
            border-radius: 8px;
            overflow-x: auto;
            margin: 1em 0;
          }
          .prose pre code {
            background-color: transparent;
            color: #e2e8f0;
            padding: 0;
            font-size: 0.875em;
          }
          .prose ul {
            list-style-type: disc;
            padding-left: 2em;
            margin: 1em 0;
          }
          .prose ol {
            list-style-type: decimal;
            padding-left: 2em;
            margin: 1em 0;
          }
          .prose li {
            margin: 0.5em 0;
            color: #334155;
          }
          .prose blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 1em;
            margin: 1em 0;
            color: #64748b;
            font-style: italic;
          }
          .prose a {
            color: #3b82f6;
            text-decoration: underline;
          }
          .prose a:hover {
            color: #2563eb;
          }
          .prose hr {
            border: none;
            border-top: 2px solid #e2e8f0;
            margin: 2em 0;
          }
          .math-inline {
            font-family: 'Times New Roman', serif;
            font-style: italic;
            color: #7c3aed;
            background-color: #f5f3ff;
            padding: 2px 6px;
            border-radius: 4px;
          }
          .math-block {
            font-family: 'Times New Roman', serif;
            font-style: italic;
            color: #7c3aed;
            background-color: #f5f3ff;
            padding: 1em;
            border-radius: 8px;
            text-align: center;
            margin: 1em 0;
            font-size: 1.1em;
          }
        `,
          }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
