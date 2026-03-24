---
project_name: FlavorLab™
user_name: Pentalisman
date: '2026-03-24'
sections_completed: ['technology_stack', 'code_patterns', 'implementation_rules', 'git_workflow']
existing_patterns_found: 12
---

# Project Context for AI Agents

_Critical rules and patterns that all AI agents must follow when implementing code in this project. Focus on unobvious details that prevent implementation mistakes._

---

## Technology Stack & Versions

| Technology | Version | Role |
|---|---|---|
| Vite | ^6.2.0 | Build tool & dev server |
| Vanilla JS (ESM) | ES2022+ | All interactivity — NO framework |
| CSS Custom Properties | Native | Design system / tokens |
| Google Fonts | CDN via `<link>` | Cormorant Garamond, Space Grotesk, IBM Plex Mono |
| Node.js | 18+ (Windows) | Dev environment only |
| MongoDB | TBD (upcoming) | Ingredient pairing data store |

**No TypeScript. No React/Vue/Svelte. No CSS framework. No test runner. No linter.**

---

## Project Structure

```
First-Project/
├── index.html          ← ALL HTML lives here. No JS-injected sections.
├── src/
│   ├── main.js         ← ALL JS interactivity. Single entry point.
│   └── style.css       ← ALL styles. Single flat stylesheet.
├── public/
│   └── flavorlab-icon.svg
├── _bmad-output/       ← BMAD planning artifacts (do not edit manually)
├── _bmad/              ← BMAD framework files (do not modify)
└── package.json
```

**⚠️ `src/counter.js` and `src/javascript.svg` are unused boilerplate — safe to delete.**

---

## Critical Implementation Rules

### 1. HTML is Static — Never Inject Sections via JS

All page sections (`<section>`, `<nav>`, etc.) must live in `index.html`.
JavaScript only adds/removes CSS classes and handles events — it never creates or injects major DOM structures.

```js
// CORRECT — toggle a class
nav.classList.toggle('scrolled', window.scrollY > 20)

// WRONG — injecting content sections
document.body.innerHTML += '<section>...</section>'
```

### 2. Single Entry Point — All JS in `src/main.js`

Do not create additional `.js` files unless building a distinct backend/API layer.
All frontend interactivity belongs in `src/main.js`, organised as named `init*` functions called from a single `init()`.

```js
// Pattern to follow for new features:
function initMyFeature() {
  const el = document.querySelector('.my-element')
  if (!el) return  // always guard against missing elements
  // ... logic
}

function init() {
  initReveal()
  initParticles()
  initMyFeature()  // add here
}
```

### 3. Always Respect `prefersReducedMotion`

This is declared at the top of `main.js` and must be checked in EVERY animation or transition feature.

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function initMyAnimation() {
  if (prefersReducedMotion) return  // ← required guard
  // ... animation logic
}
```

For features that must still function (not just animate), skip the animation but keep the functionality:
```js
if (prefersReducedMotion) {
  targets.forEach(el => el.classList.add('visible'))  // show immediately, no animation
  return
}
```

### 4. Scroll Listeners Must Use `{ passive: true }`

```js
// CORRECT
window.addEventListener('scroll', handler, { passive: true })

// WRONG
window.addEventListener('scroll', handler)
```

### 5. Use Optional Chaining for DOM Queries

Elements may not exist on every page variant. Always use `?.`:

```js
toggle?.addEventListener('click', () => { ... })
const offset = nav?.offsetHeight ?? 72
```

### 6. CSS — Use Design Tokens, Never Hardcode Values

All colors, spacing, typography, shadows, and radii are tokenized in `:root`. Always use variables:

```css
/* CORRECT */
color: var(--color-text-primary);
padding: var(--sp-4);
border-radius: var(--radius-md);

/* WRONG */
color: #1A1A1A;
padding: 32px;
border-radius: 12px;
```

### 7. CSS — Single Flat Stylesheet with Section Comments

Add new CSS to `src/style.css` under the appropriate section comment. Do not create additional `.css` files.

```css
/* ── My New Section ──────────────────────── */
.my-component { ... }
```

### 8. CSS — 8px Spacing Grid

Always use the `--sp-*` tokens for spacing. Available: `--sp-1` (8px) through `--sp-16` (128px).

### 9. IntersectionObserver for Scroll Effects

Use the existing `reveal` / `visible` class pattern for scroll-based animations. Add the selector to the `initReveal()` target list:

```js
// In initReveal(), add your selector to the existing list:
const targets = document.querySelectorAll(
  '.step-card, .benefit-card, ... , .my-new-card'  // ← append here
)
```

### 10. No External JS Libraries on the Frontend

The frontend has zero runtime JS dependencies (only Vite as a dev tool). Do not `npm install` frontend libraries. Use native browser APIs: `IntersectionObserver`, `requestAnimationFrame`, `fetch`, `matchMedia`, etc.

---

## Design Tokens Reference

### Colors
| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#1F7A8C` | Teal — links, borders, primary actions |
| `--color-primary-dark` | `#165E6B` | Hover states for primary |
| `--color-accent` | `#FF7A59` | Orange — CTAs, highlights, spark effects |
| `--color-bg` | `#F7F5F2` | Warm off-white page background |
| `--color-surface` | `#FFFFFF` | Card/panel backgrounds |
| `--color-dark` | `#161616` | Hero section, dark backgrounds |
| `--color-text-primary` | `#1A1A1A` | Body text |
| `--color-text-muted` | `#8A8A8A` | Labels, captions |

### Typography
| Token | Value |
|---|---|
| `--font-serif` | Cormorant Garamond — all `h1`–`h4` |
| `--font-sans` | Space Grotesk — body, nav, UI |
| `--font-mono` | IBM Plex Mono — code, data labels |

### Transitions
```css
transition: color var(--t-base) var(--ease-out);
transition: transform var(--t-slow) var(--ease-spring);
```

---

## Git & Build Workflow

**After every file save:** A PostToolUse hook auto-commits and pushes (`chore: auto-save changes`). This is automated — do not manually commit trivial saves.

**After completing a feature:**
1. Run `npm run build`
2. Fix ALL build errors before proceeding
3. Commit with a descriptive message and push to the current branch

**Dev server:** `npm run dev` → http://localhost:5173

---

## Upcoming: MongoDB Integration

The project will add a MongoDB database to serve ingredient pairing data sourced from the FlavorGraph dataset (~8,000 ingredients, ~147,000 pairings).

**Planned document schema:**
```json
{
  "name": "garlic",
  "category": "Plant/Vegetable",
  "is_hub": true,
  "pairings": [
    { "name": "onion", "score": 0.92 },
    { "name": "rosemary", "score": 0.88 }
  ]
}
```

**Rule:** Pre-compute pairings at import time. Do not perform graph traversal queries at runtime. All ingredient lookups are by `name` (indexed).

---

## What NOT to Do

- Do not install frontend JS frameworks (React, Vue, etc.)
- Do not create multiple CSS files or use CSS-in-JS
- Do not inject HTML sections from JavaScript
- Do not hardcode color/spacing values — always use CSS tokens
- Do not add scroll listeners without `{ passive: true }`
- Do not add animations without checking `prefersReducedMotion`
- Do not use `document.write()` or jQuery
- Do not skip the `npm run build` check after completing a feature
