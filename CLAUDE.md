# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
```

There is no test runner or linter configured.

## Git & Build Workflow

**After every code change:** Changes are auto-committed and pushed via hook (`chore: auto-save changes`).

**After completing a new feature:**
1. Run `npm run build`
2. If there are build errors, fix them all
3. Commit with a descriptive message and push to the current branch

## Architecture

This is a **vanilla JS SPA** for **FlavorLab™** — a science-based flavor pairing product. No framework (React/Vue/etc.) is used.

**Entry points:**
- `index.html` — full page HTML (all sections live here, not injected via JS)
- `src/main.js` — imports `./style.css`, then adds interactivity: nav scroll shadow, mobile menu toggle, smooth scroll, and IntersectionObserver-based scroll-reveal animations
- `src/style.css` — all styles; uses CSS custom properties defined in `:root`

**CSS architecture:** Single flat stylesheet with sections separated by comments. Design tokens in `:root` (`--primary`, `--accent`, `--font-serif`, `--font-sans`, etc.). Layout uses CSS Grid throughout; no utility framework.

**Scroll reveal:** Elements gain class `reveal` on init via JS, then `visible` when they enter the viewport via `IntersectionObserver`. Cards within the same grid are staggered by index × 80ms.

**Fonts:** Playfair Display (headings/serif) + Inter (body/sans) loaded from Google Fonts via `<link>` in `index.html`.

**Static assets:** `public/flavorlab-icon.svg` — SVG favicon (flask icon). `src/counter.js` and `src/javascript.svg` are unused boilerplate remnants and can be deleted.

## Design Tokens (key CSS variables)

| Variable | Value | Use |
|---|---|---|
| `--primary` | `#1B4332` | Dark forest green — headings, borders |
| `--accent` | `#C8663B` | Terracotta orange — CTAs, highlights |
| `--dark` | `#0D1A12` | Near-black — hero, dark sections |
| `--bg-alt` | `#F2F2EC` | Warm off-white — alternate section backgrounds |
| `--font-serif` | Playfair Display | All `h1`–`h4` |
| `--font-sans` | Inter | Body, nav, labels |
