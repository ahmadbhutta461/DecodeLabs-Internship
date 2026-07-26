# Project 1: Responsive Frontend Interface — TaskFlow

A responsive daily task board built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

## Goal
Create a responsive frontend interface for a simple web application, following a mobile-first, semantic-HTML approach.

## Live features
- Add, complete, and delete tasks
- Filter by All / In progress / Completed
- Animated progress ring showing daily completion
- Fully responsive: single column on mobile, sidebar layout on tablet (768px+), three-column layout on desktop (1024px+)
- Tasks persist locally in the browser (`localStorage`)

## Design decisions
- **Palette:** Mocha Mousse `#A5856F` (stability / primary actions), Ethereal Blue `#A0D4E0` (trust / progress & focus states), Moonlit Grey `#F2F0EA` (refinement / page background)
- **Typography:** Montserrat for headings, Open Sans for body text — 3 weights max, per the brief's constraint
- **Layout:** CSS Grid for the page-level shell (header / sidebar / board / footer), Flexbox for smaller components (nav links, filter buttons, tags)
- **Mobile-first:** base styles target a single column; `min-width` media queries progressively add the sidebar (768px) and the third column (1024px)
- **Fluid type:** `clamp()` used for headings and spacing so text scales smoothly between breakpoints instead of jumping
- **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<aside>`, `<article>`, `<footer>` used for their actual landmark meaning, improving accessibility and SEO

## How to run
No build tools or dependencies required.

1. Download or clone this folder
2. Open `index.html` directly in any modern browser

Or, for a local dev server:
```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## File structure
```
Project1-Responsive-Frontend-Interface/
├── index.html    # Semantic markup & structure
├── style.css     # Design tokens, layout, responsive breakpoints
├── script.js     # Task logic, filtering, progress ring, mobile nav
└── README.md
```

## Skills demonstrated
Semantic HTML5, responsive/mobile-first CSS, CSS Grid, Flexbox, fluid typography with `clamp()`, vanilla JS DOM manipulation, basic accessibility (focus states, `aria-live`, labelled controls).
