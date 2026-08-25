# SCS Website — Session Log

---

## 2026-08-24 — 22:45

- Removed purple radial gradient from hero — pure black background
- Defined full brand palette as CSS variables (purple: `#433079`, `#B6A5EB`, `#D3BBE3`, `#EEDFF6` / green: `#7BC880`, `#B1E5B3`, `#D6F8D6`)
- Built complete dark/light mode system using `[data-theme]` on `<html>` with CSS variable overrides
- Added flash-prevention script in `<head>` to read localStorage before first paint
- Added sun/moon theme toggle button to navbar
- Implemented circular wipe transition on theme toggle using View Transitions API (`clip-path: circle()`)
- Set `logo_full.svg` as browser tab favicon
- Rebuilt navbar from centered pill → full-width floating glassmorphism bar with logo left, links center, toggle right
- Added SCS logo to navbar left slot
- Brought hero logo and text into a flex column layout for proportional centering
- Fixed intro overlay logo alignment to hero logo using runtime `getBoundingClientRect()` measurement
- Added 5-minute intro animation skip using `localStorage` timestamp
- Added space between hero logo and text below it
- Created `CHANGELOG.md` documenting all changes
- Created `CLAUDE.md` with session logging instruction
- Created `brand-palette.md` with official brand colour swatches
- Committed and pushed all changes to `https://github.com/sudhansu-mohanty/scs-website-sample`
- Discussed React vs vanilla JS, MERN stack concepts, and migration strategy
- Scaffolded React + Vite project in `scs-react/` and migrated entire site:
  - `App.jsx` — root component owning all shared state
  - `useTheme.js` — custom hook with view transition toggle
  - `Navbar.jsx` — props-driven nav with conditional icon rendering
  - `IntroOverlay.jsx` — useRef + useEffect for animation logic
  - `Hero.jsx` — declarative class toggling via props
  - `CursorCircle.jsx` — useRef + useEffect mouse tracking
  - `index.css` — all global CSS and brand tokens extracted from HTML
- Installed Prettier, created `.prettierrc`
- Discussed learning roadmap: concept → code → break → fix loop

---
