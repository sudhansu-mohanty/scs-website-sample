# SCS Website Changelog

---

## 2026-09-08

### "What We Do" — Revealing Card Animation (`index.html`)
- New `#what-we-do` section after the hero with a "What we do" label and section heading
- Three cards — **Academic**, **Social Events**, **Wine & Cheese** — in a 3-up grid that stacks to one column under 860px
- Each card sits under a gradient "curtain" (`::after`) that wipes upward (`translateY(-101%)`) to reveal the content beneath
- Card content (icon, index, title, blurb) fades and slides up after the curtain clears; cards are staggered via `nth-child` transition delays
- Reveal triggered per-card by an `IntersectionObserver` (threshold 0.35, unobserved after firing); falls back to showing all cards when unsupported
- Per-card curtain colours from the brand palette (purple / green / blend); icons and hover border use the theme-aware `--color-accent`
- Respects `prefers-reduced-motion` (curtain hidden, content shown immediately) and only lifts on hover for `hover: hover` devices

---

## 2026-09-05

### Weekly Events Section (React app)
- New `WeeklyEvents` component + `#weekly` section, rendered after About Us in `App.jsx`
- Reworked into two **full-width alternating rows** — AlgoTime (image left / info right), Tech Hour (image right / info left)
- Each row: framed image (picsum placeholder), pill badge with schedule, serif title, blurb, checkmark list, "Join on Discord" ghost CTA
- Slide-in on scroll like About Us — GSAP ScrollTrigger with `scrub`, media and info sliding in from opposite sides
- Collapses to a single stacked column under 860px; content from `SCS_Concordia.md`
- New tokens: `--weekly-media-frame`, `--weekly-badge-border` (light + dark)

### Navbar Shape
- Navbar `border-radius` bumped from `16px` to `999px` (full pill / elongated oval), including the mobile breakpoint
- Applied in both `index.html` and `scs-react/src/index.css`

### Nav Control Cluster
- Theme-mode and mute icons now sit in their own rounded pill (`.nav-controls`) at the right of the navbar
- New `--color-nav-pill` token (subtle tint over the nav surface) added to both themes
- `index.html` (single toggle) gets the same pill treatment for consistency
- Nudged the cluster ~16px past the nav's inner edge (negative `margin-right`)

### Nav Hover Underline
- Top-level nav headers / dropdown triggers now show a purple (`--color-accent`) underline that animates in from left to right on hover (also stays lit while a dropdown is open)
- Implemented via an `::after` bar with `transform: scaleX(0 → 1)` and `transform-origin: left`, 0.45s ease
- Scoped to `.nav-item > a` / `.nav-trigger` so dropdown-panel options do NOT get the underline
- Applied in both `index.html` and `scs-react/src/index.css`

## 2026-08-24

### Theming & Visual Overhaul
- Removed purple radial gradient from hero section — site is now pure black (`#090909`) by default
- Replaced hardcoded color values with CSS custom properties across all components
- Defined full brand palette as CSS variables:
  - Purple: `#433079`, `#B6A5EB`, `#D3BBE3`, `#EEDFF6`
  - Green: `#7BC880`, `#B1E5B3`, `#D6F8D6`

### Dark / Light Mode
- Added complete dark/light mode system via `[data-theme="light"]` on `<html>`
- Flash-prevention script injected in `<head>` reads `localStorage` before first paint
- User preference persisted to `localStorage` under key `scs-theme`
- Logo and hand SVGs get `filter: invert(1)` in light mode to stay visible on light backgrounds
- Nav border, link hover, and accent text all respond to active theme

### Theme Toggle
- Sun/moon SVG icon button added to the right of the nav pill
- Switches between dark and light mode on click

### Circular Wipe Transition
- Replaced flat-color overlay with View Transitions API
- Toggling theme now triggers a semicircle that expands from the top center of the screen, revealing actual new-theme content (not a flat color)
- Clip-path animates from `circle(0% at 50% 0%)` to `circle(150% at 50% 0%)` over 700ms with `cubic-bezier(0.76, 0, 0.24, 1)`
- Graceful fallback to instant switch for unsupported browsers

### Brand Application
- Nav pill border uses `--color-accent` (purple) at 22% opacity
- Nav link hover color: `#B6A5EB` in dark mode, `#433079` in light mode
- Hero description strong text: `#7BC880` green in dark mode, `#3a8f40` in light mode

### Favicon
- Set `logo_full.svg` as the browser tab icon via `<link rel="icon" type="image/svg+xml">`
