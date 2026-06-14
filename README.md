# Markdown Live Editor

A real-time markdown editor with live preview, built with React, TypeScript, and Vite.

![Markdown Editor](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4)

##  Features

- **Live Preview**: See your markdown rendered in real-time as you type (via `react-markdown` + `remark-gfm`)
- **Synchronized Scrolling**: The editor and preview panes scroll together
- **LaTeX Support**: Inline (`$E=mc^2$`) and block (`$$...$$`) math via `remark-math` + `rehype-katex`
- **Syntax Highlighting**: Markdown editing powered by `react-simple-code-editor` + PrismJS
- **Themes**: Switch between `neon`, `obsidian`, and `white` (persisted in `localStorage`)
- **Built-in Terminal**: Toggle with `Ctrl+\``; supports `help`, `stats`, `theme`, `export md|html`, and more
- **Auto-save**: Document content is persisted locally and restored on reload
- **Resizable Panels**: Adjust the sidebar, editor, preview, and terminal layout

##  Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kyler004/markdown-live-editor.git
cd markdown-live-editor

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

##  Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons

##  Project Structure

```
src/
├── components/
│   ├── Topbar.tsx        # Top menu bar + terminal toggle
│   ├── Sidebar.tsx       # Activity bar, explorer, outline
│   ├── Editor.tsx        # Markdown code editor (PrismJS highlighting)
│   ├── Preview.tsx       # Rendered markdown preview (react-markdown + KaTeX)
│   ├── Terminal.tsx      # Interactive command terminal
│   └── SettingsMenu.tsx  # Theme switcher menu (portal)
├── context/
│   ├── ThemeContext.ts   # Theme context + useTheme hook
│   └── ThemeProvider.tsx # Theme state + localStorage persistence
├── data/
│   └── initialMarkdown.ts # Default editor content
├── App.tsx               # Main application layout
├── main.tsx              # Entry point
└── index.css             # Global styles + theme tokens
```

##  Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

##  Supported Markdown

- Headers (`#`, `##`, `###`)
- **Bold** and _Italic_ text
- `Inline code` and code blocks
- Links and blockquotes
- Unordered and ordered lists
- Horizontal rules
- LaTeX math (inline and block)

##  License

MIT

---

