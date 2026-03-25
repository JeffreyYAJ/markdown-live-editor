export const initialMarkdown =
  `# Architecture: The Digital Command Deck

## Core Identity

The "Terminal Editorial" aesthetic is defined by its intentional asymmetry and high-contrast surface hierarchy. This document outlines the technical specifications for the ARCHITECT_OS interface.

### Key Directives
1. No-Line Rule: Boundaries are defined through subtle tonal shifts.
2. Phosphor Glow: Active elements emit a soft ambient glow.
3. Space Grotesk: High-end editorial typography.

## Features
* Live preview with **debounced** input
* Support for $\\text{LaTeX}$ expressions
* Real-time HTML rendering

### Try LaTeX Math
Inline math: $E = mc^2$

Block math:
$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

### Code Example
` +
  "```javascript\n" +
  "const greet = (name) => {\n" +
  "  console.log(`Hello, ${name}!`);\n" +
  "};\n" +
  "```" +
  `

**Bold text** and *italic text*

> This is a blockquote

---

### GFM Features
- [x] Task list item 1
- [ ] Task list item 2

Ordered List:
1. First item
2. Second item
3. Third item

~~Strikethrough text~~

| Feature | Support | Status |
| :--- | :---: | ---: |
| GFM | Yes | Ready |
| LaTeX | Yes | Active |
| Tables | Yes | Styled |

`;
