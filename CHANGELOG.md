# SCS Website Changelog

---

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
