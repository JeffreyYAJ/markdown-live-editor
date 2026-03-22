import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Terminal, Folder, Search, Settings, FileText, LayoutGrid, Layers3, Clock4, Search as SearchIcon, PanelRight, Download, Share2, Printer, MoreVertical } from 'lucide-react';
import './index.css';

// Composant personnalisé pour le rendu des H1 dans ReactMarkdown
const customMarkdownComponents = {
  h1: ({ node, ...props }: any) => <h1 className="preview-h1" {...props} />,
};

function App() {
  const [markdown, setMarkdown] = useState(`# Architecture: The Digital Command Deck

## Core Identity

The "Terminal Editorial" aesthetic is defined by its intentional asymmetry and high-contrast surface hierarchy. This document outlines the technical specifications for the ARCHITECT_OS interface.

### Key Directives
1. No-Line Rule: Boundaries are defined through subtle tonal shifts.
2. Phosphor Glow: Active elements emit a soft ambient glow.
3. Space Grotesk: High-end editorial typography.
`);

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="topbar">
        <div className="logo">ARCHITECT_OS</div>
        <div className="menu">
          <span className="file-menu">File</span>
          <span>Edit</span>
          <span>Selection</span>
          <span>View</span>
          <span>Go</span>
        </div>
        <div className="right-actions">
          <div className="search-area">
            <SearchIcon size={16} className="search-icon"/>
            <input type="text" placeholder="Global Search..." />
          </div>
          <button className="btn btn-run">RUN</button>
          <button className="btn btn-preview">PREVIEW</button>
          <div className="right-icons">
             <PanelRight size={18} />
             <Printer size={18} />
             <LayoutGrid size={18} />
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="workspace">
        
        {/* SIDEBAR AVEC ACTIVITY BAR */}
        <nav className="activity-bar">
          <div className="activity-bar-icon-wrapper active">
            <Terminal size={22} />
            <div className="activity-label">TERMINAL v1.0.4</div>
          </div>
          <div className="activity-bar-icon-wrapper">
            <Folder size={22} />
            <div className="activity-label">FILES</div>
          </div>
          <div className="activity-bar-icon-wrapper">
            <Search size={22} />
            <div className="activity-label">SEARCH</div>
          </div>
          <div className="activity-bar-icon-wrapper">
            <Layers3 size={22} />
            <div className="activity-label">GIT</div>
          </div>
          <div className="activity-bar-icon-wrapper" style={{ marginTop: 'auto' }}>
            <Settings size={22} />
            <div className="activity-label">SETTINGS</div>
          </div>
          <div className="activity-bar-icon-wrapper" style={{ marginBottom: '1rem' }}>
            <Clock4 size={22} />
          </div>
        </nav>

        <aside className="sidebar">
          <div className="sidebar-panel">
            <div className="sidebar-title-row">
                <div className="sidebar-title">EXPLORER</div>
                <div className="sidebar-dots">•••</div>
            </div>
            <ul className="explorer-list">
              <li className="active"><FileText size={12} style={{marginRight:'6px'}}/> index.md</li>
              <li><FileText size={12} style={{marginRight:'6px'}}/> about.md</li>
              <li><FileText size={12} style={{marginRight:'6px'}}/> styles.css</li>
            </ul>
          </div>

          <div className="sidebar-panel">
            <div className="sidebar-title-row">
                <div className="sidebar-title">OUTLINE</div>
                <div className="sidebar-dots">•••</div>
            </div>
            <ul className="explorer-list outline-list">
              <li># Architecture</li>
              <li>## Core Principles</li>
              <li>## System Design</li>
            </ul>
          </div>
        </aside>

        {/* EDITOR (GAUCHE) */}
        <section className="editor-pane">
          <div className="pane-header">INDEX.MD <span style={{marginLeft: '10px', color: '#4d4452'}}>EDITING...</span></div>
          {/* Simulation du textarea stylisé. Ne t'inquiète pas, le vrai éditeur Monaco est l'étape suivante. */}
          <textarea 
            className="editor-textarea"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
          />
        </section>

        {/* PREVIEW (DROITE) */}
        <section className="preview-pane">
          <div className="pane-header">RENDERED PREVIEW</div>
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={customMarkdownComponents}>
              {markdown}
            </ReactMarkdown>
          </div>

          {/* Actions flottantes à droite */}
          <div className="floating-actions">
            <FileText size={20} style={{color: '#fff'}}/>
            <Share2 size={20} />
            <Download size={20} />
            <MoreVertical size={20} />
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="status-bar">
        <div className="statusbar-left">
          <span style={{fontWeight: '700'}}>MAIN*</span>
          <span>UTF-8</span>
        </div>
        <div className="statusbar-right">
          <span>{`<> MARKDOWN`}</span>
          <span>LN 14, COL 22</span>
        </div>
      </footer>
    </div>
  );
}

export default App;