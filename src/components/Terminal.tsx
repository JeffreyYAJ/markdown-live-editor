import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { X, TerminalSquare, Minus } from "lucide-react";
import type { Theme } from "../context/ThemeContext";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "info" | "success";
  text: string;
}

interface TerminalProps {
  markdown: string;
  onClose: () => void;
  onThemeChange: (theme: Theme) => void;
}

const APP_VERSION = "0.1.0";

let lineIdCounter = 0;
const mkLine = (
  type: TerminalLine["type"],
  text: string,
): TerminalLine => ({ id: lineIdCounter++, type, text });

const WELCOME: TerminalLine[] = [
  mkLine("info", `ARCHITECT_OS terminal — v${APP_VERSION}`),
  mkLine("info", `Type \`help\` to see available commands.`),
];

function countStats(md: string) {
  const lines = md.split("\n").length;
  const words = md.trim() === "" ? 0 : md.trim().split(/\s+/).length;
  const chars = md.length;
  return { lines, words, chars };
}

export default function Terminal({ markdown, onClose, onThemeChange }: TerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>(WELCOME);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);


  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const pushLines = useCallback((...lines: TerminalLine[]) => {
    setHistory((h) => [...h, ...lines]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      pushLines(mkLine("input", `> ${trimmed}`));
      setCmdHistory((h) => [trimmed, ...h]);
      setHistIdx(-1);

      const [cmd, ...args] = trimmed.split(/\s+/);

      switch (cmd.toLowerCase()) {
        case "help":
          pushLines(
            mkLine("info", "Available commands:"),
            mkLine("output", "  help              — show this help"),
            mkLine("output", "  clear             — clear terminal output"),
            mkLine("output", "  whoami            — display editor identity"),
            mkLine("output", "  stats             — word/char/line count"),
            mkLine("output", "  theme <name>      — switch theme: neon | obsidian | white"),
            mkLine("output", "  echo <text>       — print text to terminal"),
            mkLine("output", "  date              — print current date & time"),
            mkLine("output", "  version           — display app version"),
            mkLine("output", "  export <format>   — export document: md | html"),
          );
          break;

        case "clear":
          setHistory(WELCOME);
          break;

        case "whoami":
          pushLines(
            mkLine("success", `  ARCHITECT_OS v${APP_VERSION}`),
            mkLine("output", "  Mode     : MARKDOWN"),
            mkLine("output", "  Engine   : React 19 + Vite"),
            mkLine("output", "  Renderer : react-markdown + remark-gfm"),
          );
          break;

        case "stats": {
          const { lines, words, chars } = countStats(markdown);
          pushLines(
            mkLine("success", "  Document statistics"),
            mkLine("output", `  Lines      : ${lines.toLocaleString()}`),
            mkLine("output", `  Words      : ${words.toLocaleString()}`),
            mkLine("output", `  Characters : ${chars.toLocaleString()}`),
          );
          break;
        }

        case "theme": {
          const t = args[0]?.toLowerCase() as Theme | undefined;
          const valid: Theme[] = ["neon", "obsidian", "white"];
          if (!t || !valid.includes(t)) {
            pushLines(
              mkLine("error", `  Usage: theme <neon|obsidian|white>`),
            );
          } else {
            onThemeChange(t);
            pushLines(mkLine("success", `  ✓ Theme switched to '${t}'`));
          }
          break;
        }

        case "echo":
          pushLines(mkLine("output", `  ${args.join(" ")}`));
          break;

        case "date":
          pushLines(
            mkLine("output", `  ${new Date().toLocaleString(undefined, { dateStyle: "full", timeStyle: "medium" })}`),
          );
          break;

        case "version":
          pushLines(
            mkLine("success", `  ARCHITECT_OS v${APP_VERSION}`),
            mkLine("output", `  React     : 19`),
            mkLine("output", `  TypeScript: 5.9`),
            mkLine("output", `  Vite      : 7`),
          );
          break;

        case "export": {
          const fmt = args[0]?.toLowerCase();
          if (fmt === "md") {
            pushLines(mkLine("info", "  Preparing Markdown export..."));
            setTimeout(() => {
              const blob = new Blob([markdown], { type: "text/markdown" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "document.md";
              a.click();
              URL.revokeObjectURL(url);
              setHistory((h) => [...h, mkLine("success", "  ✓ Saved as document.md")]);
            }, 300);
          } else if (fmt === "html") {
            pushLines(mkLine("info", "  Preparing HTML export..."));
            setTimeout(() => {
              const container = document.querySelector(".preview-content");
              const html = `<!DOCTYPE html><html><body>${container?.innerHTML ?? markdown}</body></html>`;
              const blob = new Blob([html], { type: "text/html" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "document.html";
              a.click();
              URL.revokeObjectURL(url);
              setHistory((h) => [...h, mkLine("success", "  ✓ Saved as document.html")]);
            }, 300);
          } else {
            pushLines(mkLine("error", "  Usage: export <md|html>"));
          }
          break;
        }

        default:
          pushLines(
            mkLine("error", `  command not found: '${cmd}'`),
            mkLine("info", "  Type \`help\` to see available commands."),
          );
      }
    },
    [markdown, onThemeChange, pushLines],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    }
  };

  const lineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":   return "text-neon font-semibold";
      case "success": return "text-neon";
      case "error":   return "text-red-400";
      case "info":    return "text-dimmed";
      default:        return "text-main";
    }
  };

  return (
    <div
      className="flex flex-col h-full w-full overflow-hidden"
      style={{ backgroundColor: "var(--color-topbar)" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        className="h-9 flex items-center justify-between px-3 shrink-0 border-b select-none"
        style={{
          backgroundColor: "var(--color-activity)",
          borderColor: "var(--color-surface-dim)",
        }}
      >
        {/* Left: icon + tab */}
        <div className="flex items-center gap-2">
          <TerminalSquare size={14} style={{ color: "var(--color-neon)" }} />
          <div className="flex items-center gap-0.5 ml-1">
            <div
              className="px-3 py-1 text-[0.65rem] font-mono tracking-widest rounded-sm"
              style={{
                backgroundColor: "var(--color-editor)",
                color: "var(--color-neon)",
                border: "1px solid var(--color-surface-dim)",
              }}
            >
              BASH
            </div>
          </div>
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-1">

          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-6 h-6 flex items-center justify-center rounded-sm transition-colors"
            style={{ color: "var(--color-inactive)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-inactive)")}
            title="Close"
            aria-label="Close terminal"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Output area */}
      <>
        <div
            ref={outputRef}
            className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[0.78rem] leading-relaxed custom-scrollbar"
          >
            {history.map((line) => (
              <div key={line.id} className={`whitespace-pre-wrap ${lineColor(line.type)}`}>
                {line.text}
              </div>
            ))}
          </div>

          {/* Prompt input */}
          <div
            className="flex items-center gap-2 px-4 py-2 shrink-0 border-t font-mono text-[0.78rem]"
            style={{ borderColor: "var(--color-surface-dim)" }}
          >
            <span
              className="shrink-0 font-bold select-none terminal-prompt"
              style={{ color: "var(--color-neon)" }}
            >
              &gt;
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-main caret-neon font-mono text-[0.78rem]"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-label="Terminal input"
              placeholder="type a command…"
              style={{ caretColor: "var(--color-neon)" }}
            />
          </div>
        </>
    </div>
  );
}
