# SCS Website — Session Log

---

## 2026-09-03 — 23:28

- Integrated `background-paths` shadcn component into hero: set up Tailwind CSS v4 (`@tailwindcss/vite`), installed `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`
- Configured `@` path alias in `vite.config.js` and `@custom-variant dark` for `data-theme` in `index.css`
- Created `src/lib/utils.js`, `src/components/ui/button.jsx`, `src/components/ui/background-paths.jsx`
- Added `data-theme="dark"` default to `index.html` so Tailwind dark variants work on first visit
- Debugged and removed `background-paths` animation — flickering caused by `pathOffset` and `Math.random()` in render body creating a framer-motion restart loop
- Built interactive `DotGrid` canvas component: faded white dots across hero, brand purple glow on mouse proximity
- Explored making dots form hand SVG silhouettes (pixel-sampling offscreen canvas approach), then reverted to static hand images on user request
- Final state: hero has static hand images restored, `DotGrid` removed from hero

---

## 2026-09-03 — 19:33

- Changed text selection highlight colour from default blue to green (`--green-mid: #7bc880`) with black text via `::selection` CSS
- Added purple underline (`--purple-mid`) under the "About Us" heading using `::after` pseudo-element; animates naturally with the existing GSAP slide-in
- Located Skiper UI animated theme toggle components in `scs-website/components/ui/skiper-ui/skiper4.tsx`
- Installed `framer-motion` in `scs-react`
- Replaced the static sun/moon icon in the Navbar with the Skiper Button 3 animation (sun ↔ moon), driven by the `theme` prop from App.jsx
- Fixed broken animation: replaced `<clipPath>` + `motion.path` approach (CSS transforms inside clipPath are ignored by browsers) with a background-coloured cutout circle that slides in/out via CSS `translateX` to carve a crescent; added `transformBox`/`transformOrigin` to sun rays for correct centre-anchored scale

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
