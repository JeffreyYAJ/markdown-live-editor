# Markdown Live Editor

A real-time markdown editor with live preview, built with React, TypeScript, and Vite.

![Markdown Editor](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4)

## ✨ Features

- **Live Preview**: See your markdown rendered in real-time as you type
- **Debounced Input**: Optimized performance with 300ms debounce on updates
- **LaTeX Support**: Inline (`$E=mc^2$`) and block math expressions
- **Syntax Highlighting**: Code blocks with proper formatting
- **Responsive Design**: Side-by-side layout on desktop, stacked on mobile
- **Dark Theme Editor**: Easy on the eyes for long writing sessions

## 🚀 Getting Started

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

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx       # App header
│   ├── EditorPanel.tsx  # Markdown textarea
│   └── PreviewPanel.tsx # Rendered preview
├── data/
│   └── initialMarkdown.ts # Default editor content
├── utils/
│   └── markdownParser.ts  # Markdown to HTML converter
├── App.tsx              # Main application
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 📜 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🎨 Supported Markdown

- Headers (`#`, `##`, `###`)
- **Bold** and _Italic_ text
- `Inline code` and code blocks
- Links and blockquotes
- Unordered and ordered lists
- Horizontal rules
- LaTeX math (inline and block)

## 📄 License

MIT

---

Made with ❤️ by [kyler004](https://github.com/kyler004)
