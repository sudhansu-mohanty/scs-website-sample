# SCS Website — Session Log

---

## 2026-09-05 — 23:45

- Set up GitHub Pages deployment via GitHub Actions (`.github/workflows/deploy.yml`) — triggers on every push to main, builds from `scs-react/` subdirectory, deploys `dist/` to Pages
- Set `base: '/scs-website-sample/'` in `vite.config.js` for correct asset routing on GitHub Pages
- Fixed all hardcoded absolute asset paths (`/logo_full.svg`, `/logo_hollow.svg`, `/SVG/left_hand.svg`, `/SVG/right_hand.svg`) across Hero, IntroOverlay, Navbar, and DotGrid to use `import.meta.env.BASE_URL` — required for assets to load correctly under the `/scs-website-sample/` subpath
- Diagnosed and resolved deploy failure (GitHub Pages source not set to GitHub Actions in repo settings)
- Site successfully deployed and live at https://sudhansu-mohanty.github.io/scs-website-sample/

---

## 2026-09-05 — 23:10

- Fixed JSX parse error in Navbar.jsx — missing `</div>` closing tag for `.nav-bar` wrapper
- Added mute/unmute button to navbar beside the theme toggle: speaker-on/off SVG icons, persisted to localStorage (`scs-sfx-muted`), plays a confirmation click on unmute
- Added `.nav-controls` flex wrapper to hold both the theme toggle and mute button side by side
- Converted nav dropdowns from inline expanding pill to classic floating column panels (position: absolute below each trigger item)
- Each dropdown renders its items in a vertical list with frosted glass panel (matching nav bg/border), fade + slide-up animation, `::before` bridge to prevent hover flicker
- Increased dropdown offset from navbar (22px gap) and added more padding between dropdown items (10px 18px)

---

## 2026-09-05 — 21:15

- Converted navbar links to inline expanding dropdowns: "Who we are" (About Us, Meet the Team), "What we do" (Weekly Events, Academic Events, Social Events, Wine & Cheese), "Contact" (Instagram, LinkedIn, Discord, Facebook, Newsletter, Email)
- Dropdown panel lives inside the nav pill itself — pill expands downward on hover, no floating boxes; smooth `max-height` + opacity transition
- Chevron rotates 180° on active trigger; active label turns accent colour; panel items are pill-shaped with purple tint on hover
- Added "Links" nav item linking to `https://linktr.ee/scsconcordia` (opens in new tab), positioned at the end of the navbar
- Applied Monad typography system: JetBrains Mono (substitute for ABC Diatype Mono) for all UI/body text; Georgia (substitute for Untitled Serif) for display/heading text
- Hero LINE1 "Welcome to SCS Concordia" switched to serif, `clamp(24px, 3vw, 32px)`, weight 400, tight letter-spacing
- Hero LINE2 cycling text uses mono at `body-sm` (14px), muted colour
- About heading switched from Bricolage Grotesque 700 → serif 400, display scale (80px), `-1.6px` letter-spacing
- About body text switched to mono at `body-lg` (20px)
- Added full CSS type scale tokens (`--text-*`, `--leading-*`, `--tracking-*`) to `:root`
- Added Web Audio API sound effects (`src/utils/sfx.js`): soft high-pitched hover tick and deeper click tone, synthesized programmatically — no audio files; wired to all navbar interactive elements (links, triggers, dropdown items, theme toggle)

---

## 2026-09-05 — 19:30

- Restored `DotGrid` interactive dot canvas to the hero by importing and rendering it in `Hero.jsx` (it had been removed previously)
- Rewrote hero text section with a typewriter effect: LINE1 ("Welcome to SCS Concordia") types out once, then LINE2 cycles through multiple lines — typing, holding, deleting, and moving to the next
- Increased hero text font size from `clamp(11px, 0.95vw, 12.5px)` to `clamp(15px, 1.6vw, 21px)` with brand accent colour
- Added blinking cursor (`tw-cursor`) that follows the active typewriter line
- Replaced static Lorem ipsum LINE2 with a cycling array of placeholder lines as stand-ins until real content is ready

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
