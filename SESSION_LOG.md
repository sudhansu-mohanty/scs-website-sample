# SCS Website — Session Log

---

## 2026-09-13 — (session)

- Clarified that the active codebase is the React site (`scs-react`), not `index.html` — identified via a screenshot of the actual running site
- Added a `DETAILS` data map to `HomeEvents.jsx` keyed by category label, with description + event array for COMPETITIONS
- Added `selected` state to `HomeEvents` defaulting to `ITEMS[0]` (Competitions); changed `current` to fall back to `selected` instead of always `ITEMS[0]`
- Clicking a thumbnail now sets `selected` (WEEKLY still navigates to anchor); removed the arrow CTA button — the tile itself is the click target
- Added `.is-selected` CSS class (green ring outline) on the active thumbnail
- Added an `AnimatePresence`-driven `.he-detail` panel below the giant text showing the selected category's description (centered) and a 2×2 event card grid
- Card design iterated: started with badge + title + desc → changed to image on top, title, description (max 3 lines via `-webkit-line-clamp`)
- Replaced placeholder picsum images with real SCS Concordia competition data fetched from `scsconcordia.com`: Hello World Hackathon, CS Games, CyberSci, NorthSec, ICPC — using their actual hosted image URLs
- Added auto-span logic: when the event count is odd, the last card spans both grid columns (`gridColumn: '1 / -1'`)
- Iterated on image sizing: `object-fit: cover` (crops) → `height: auto` (non-uniform) → `object-fit: contain` with fixed height (letterbox) → `aspect-ratio: 3/2; object-fit: contain` (uniform, no crop, no fill)
- Widened `.he-detail` max-width from 900px → 1100px for roomier cards

---

## 2026-09-12 — (session 2)

- Renamed `InvertedSection` → `HomeEvents` throughout the codebase: file, component function, all `inv-` CSS class names → `he-`, all `--inv-*` CSS variables → `--he-*`, import and usage in `App.jsx`
- Moved WEEKLY item to the last position in `HomeEvents` ITEMS array
- Created `MeetTheTeam.jsx` as a placeholder inverted section (reuses `--he-bg`, `--he-text`, `--he-text-muted` tokens); added to `App.jsx` after `HomeEvents`
- Built `PixelDivider` component — a 2D grid of pixel blocks transitioning between section colors, placed between all section pairs; iterated on height (4→3→2 rows), block size, random 2D density grid (module-level `Math.random()` for stable-per-session pattern), overlay mode (transparent filled cells so Weekly dots show through) — ultimately removed on user feedback as it didn't look right

---

## 2026-09-12 — (session)

- Updated `InvertedSection.jsx` to be fully theme-aware (dark/light mode):
  - Added `useEffect` + `MutationObserver` watching `data-theme` on `<html>` to detect theme switches at runtime
  - Computed `colorRest` and `colorActive` from theme state, passed as `animate` prop to the giant text `motion.div`
- Added `--inv-bg`, `--inv-text`, `--inv-text-muted` CSS variables to both `:root` (dark) and `[data-theme='light']` blocks in `index.css`; `.inv-section` and `.inv-display` now use these tokens with `transition` for smooth theme-switch
- Replaced placeholder item labels (SCS, EVENTS, HACKS…) with real event categories: WEEKLY, ACADEMIC, SOCIAL, COMPETITIONS, WINE & CHEESE
- Added `href` field to items + click handler on the arrow button so items can navigate to page anchors
- Added a scroll-in label ("learn more about our events…") above the strip using Framer Motion `whileInView` + `viewport: { once: true }` — animates from `y: -30, opacity: 0` on scroll into view
- Tuned display text animation duration (visible: 0.5s → 0.35s) and reduced giant font size (`clamp(72px,17vw,210px)` → `clamp(54px,12vw,160px)`)
- Changed section layout from `justify-content: center` to `flex-start` with `padding-top: 60px` so label + strip + text stack naturally from the top

---

## 2026-09-08 — (session)

- Added a new inverted section to the React app (`InvertedSection.jsx`) after the Weekly Events section — white/light background (`#f0eeea`) to contrast the dark hero
- Built a skiper6-inspired interactive gallery component from scratch (skiper6 is a Pro component requiring a paid license key — recreated the effect independently):
  - Horizontal strip of 9 small image thumbnails at the top
  - Giant display text filling the screen (`clamp(72px, 17vw, 210px)`, `font-weight: 800`)
  - Default state shows "SCS" in dark text
  - On thumbnail hover: image lifts and scales up (`translateY(-12px) scale(1.14)`), purple circle arrow button animates in below it
  - Giant text transitions to the hovered item's label — letters slide out upward (staggered right-to-left) and new letters slide in from below (staggered left-to-right) using Framer Motion `AnimatePresence mode="wait"` with `variants` propagation
  - Text color transitions from dark → brand purple (`#433079`) on hover via `motion.div animate`
- Diagnosed and resolved `npx shadcn add @skiper-ui/skiper6` failing: missing `jsconfig.json` (created it), then confirmed skiper6 requires a Pro license key
- Iterated on spacing: reduced gap and top padding on `.inv-section` to shift content up

---

## 2026-09-08 — 12:45

- Added a new "What We Do" section to `index.html`, placed directly after the hero
- Three-card grid — **Academic**, **Social Events**, **Wine & Cheese** — 3-up, collapsing to one column under 860px
- Built a "revealing card" animation: each card sits under a brand-gradient curtain (`::after`) that wipes upward (`translateY(-101%)`) to expose the content beneath
- Card content (icon, index number, title, blurb) fades and slides up after the curtain clears
- Staggered the reveal across the three cards using `:nth-child` + `transition-delay` on both the curtain and the inner content
- Triggered each card's reveal with an `IntersectionObserver` (threshold 0.35, `unobserve` after firing); fallback shows all cards when the API is unavailable
- Per-card curtain colours drawn from `brand-palette.md` via class-scoped CSS custom properties (`--card-a` / `--card-b`); icons and hover border use the theme-aware `--color-accent`
- Added `prefers-reduced-motion` handling (curtain removed, content shown immediately) and gated the hover lift behind `@media (hover: hover)`
- Inline SVG icons for each card (graduation cap, people, wine glass)
- Pointed the nav "What we do" link at the new `#what-we-do` anchor
- Logged the work in `CHANGELOG.md`

---

## 2026-09-06 — 17:45

- Added interactive dot-grid to the Weekly Events section: faded CSS grid lines as a static background + a canvas layer drawing dots at every 60×60px intersection
- Dots are always visible at rest and glow purple when the cursor is nearby (proximity-based, using `Math.hypot` for distance)
- Iterated on opacity of lines and dots multiple times to find a subtle balance — final values: lines `0.03` (dark) / `0.04` (light), dots `0.06` (dark) / `0.07` (light)
- Dot radius set to `2.5px` at rest, grows up to `5px` at closest proximity
- Canvas z-index sits between the CSS grid lines and the section content so it never blocks interaction

---

## 2026-09-06 — 16:45

- Made nav logo visible and larger (40px) in full-width transparent state at top, smoothly shrinking to 28px when the pill appears — uses the same `cubic-bezier` transition as the nav shape
- Decreased spacing between weekly event rows: `margin-top` reduced from `clamp(56px, 9vw, 110px)` to `clamp(32px, 4vw, 56px)`
- Reduced `.weekly` section top/bottom padding max from 140px to 90px
- Matched `.weekly-heading` font size to `.about-heading`: both now use `clamp(48px, 6vw, var(--text-display))`
- Replaced the single pill badge (day + time) on each event card with two separate meta items — location (H-430) with a pin icon, and time with a clock icon
- Moved the meta items below the card title instead of above it, with 20px top margin for breathing room

---

## 2026-09-06 — 15:30

- Removed the `Weekly Events` label span and replaced the `h2` "Show up every week, leave a little sharper." with just "Weekly Events"
- Added the subtitle ("Two standing sessions...") to slide in together with the heading using GSAP stagger — added `subRef` and passed both refs as an array to `gsap.from()`
- Added purple underline to `Weekly Events` heading matching the About Us style — `::after` pseudo-element with `height: 4px`, `background-color: var(--purple-mid)`, and `display: inline-block` on the heading
- Rebuilt navbar scroll behaviour to match bklit.com: starts full-width and transparent flush to the top; transitions into the floating pill when scrolled past 60px using a `scrolled` CSS class toggled by a `useEffect` scroll listener
- `.nav-controls` pill background also fades in only when scrolled — transparent at top, visible in pill state

---

## 2026-09-06 — 14:53

- Slowed down About Us word reveal animation by increasing pin duration from `window.innerHeight * 1` to `window.innerHeight * 2`
- Slowed down About Us heading slide-in by pushing `end` from `'top 20%'` to `'top -50%'` (more scroll travel = slower feel)
- Added slide-in animation to Weekly Events heading — same GSAP `gsap.from()` with `x: -100, opacity: 0, scrub` as About Us heading; added `headingRef` and wired it to the `<h2>`
- Attempted to restyle `.weekly-heading` to match `.about-heading` (font size, underline) and changed row animations to all slide from right — reverted both on user request
- Updated `CLAUDE.md` to include a lesson plan step on `session terminated` — each session now also writes a `LESSON_PLAN.md` entry covering concepts encountered during that session
- Discussed what GSAP is: animation library, `gsap.from()`, `ScrollTrigger`, `scrub` explained in context of the codebase

---

## 2026-09-06 — 13:36

- Reverted accidental `AboutUs.jsx` changes from previous session (heading trigger was incorrectly set to `start: 'top top'` instead of `start: 'top 90%'`, and pin end was shortened)
- Diagnosed root cause of scroll animation ending too early: `.about` section had no minimum height, so when GSAP pinned it at the top, the events section was already visible in the bottom half of the viewport the entire time point 2 was never truly hidden
- Fixed by adding `min-height: 100vh`, `display: flex`, and `align-items: center` to `.about` in `index.css` — section now fills the full viewport when pinned, keeping the events section fully hidden behind it
- Simplified pin duration to exactly `window.innerHeight` (one full viewport scroll) — words reveal from 0→100% during that scroll, pin releases, events section scrolls up naturally from below

---

## 2026-09-06 — 00:26

- Nav hover underline: added a purple left-to-right wipe (`::after` scaleX) on hover; slowed from 0.25s to 0.45s; rescoped to `.nav-item > a` / `.nav-trigger` so dropdown-panel options are excluded
- Navbar shape: `border-radius` 16px → 999px (full pill), including mobile breakpoint
- Nav controls: theme + mute icons moved into their own rounded pill (`--color-nav-pill` token), nudged ~16px past the nav's inner edge; briefly tried `filter: invert(1)` on the pill then reverted
- Mirrored underline / radius / pill changes into the root `index.html`
- Built new Weekly Events section (`WeeklyEvents.jsx` + `#weekly`, rendered after About Us):
  - First pass: two side-by-side cards
  - Reworked to two full-width alternating rows — AlgoTime (image left / info right), Tech Hour (image right / info left)
  - Framed placeholder images (picsum), pill schedule badge, serif title, blurb, checkmark list, "Join on Discord" ghost CTA
  - Slide-in on scroll like About Us — GSAP ScrollTrigger with scrub, media + info entering from opposite sides
  - Stacks to one column under 860px; content from `SCS_Concordia.md`
- All changes logged in `CHANGELOG.md`

---

## 2026-09-05 — 23:33

- Added a purple (`--color-accent`) hover underline to nav options that wipes in from left to right
- Implemented as an `::after` bar using `transform: scaleX(0 → 1)` with `transform-origin: left`
- Applied to top-level nav links and dropdown triggers (`Who we are`, `What we do`, `Contact`); underline also stays lit while a dropdown is open
- Tuned timing from `0.25s` to `0.45s ease` per feedback
- Mirrored the change in both `index.html` and `scs-react/src/index.css`; logged in `CHANGELOG.md`

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
