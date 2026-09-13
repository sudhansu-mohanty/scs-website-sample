# SCS Website — Lesson Plan

---

## 2026-09-13

### `useState` as a selection mechanism — tracking which item is active
A very common React pattern is using `useState` to remember which item in a list is currently "selected." You store the whole item object (not just an index) so you can read its properties directly. Defaulting the state to a real item — `useState(ITEMS[0])` — means something meaningful is shown on first render without the user having to click anything. Then clicking updates the state, React re-renders, and the UI reflects the new selection automatically. We used this to make Competitions the default active category and to swap the detail panel when a different thumbnail is clicked.

**Try it yourself:** Change `useState(ITEMS[0])` to `useState(ITEMS[1])` in `HomeEvents.jsx`. Refresh the page — the second category (ACADEMIC) should now be the default. Change it back to `ITEMS[0]` when done.

---

### `object-fit` — controlling how images fill their container
`object-fit` tells the browser how to resize an image inside its box. `cover` scales the image up until it fills the box completely, cropping whatever overflows — great for hero images. `contain` scales the image down until the whole image fits inside the box, leaving empty space if the aspect ratios don't match — great when you can't afford to lose any part of the image. Without either, the image stretches to fill the box and distorts. We went through all three options this session before landing on `contain` to show the full competition photos without cropping.

**Try it yourself:** In `index.css`, change `object-fit: contain` on `.he-detail-card-img` to `object-fit: cover`. See how the photos fill the box edge-to-edge but get cropped. Then try removing `object-fit` entirely to see the distorted stretch. Put it back to `contain` when done.

---

### CSS `aspect-ratio` — locking a box to a fixed width-to-height ratio
The `aspect-ratio` property makes an element maintain a set width-to-height ratio no matter how wide its container is. `aspect-ratio: 3 / 2` means for every 3 units of width the element is 2 units tall — so a 300px-wide card gets a 200px-tall image box automatically. This is how we made all five competition card images exactly the same height without hardcoding a pixel value, and without any JavaScript. It works on any element, not just images.

**Try it yourself:** Change `aspect-ratio: 3 / 2` to `aspect-ratio: 1 / 1` on `.he-detail-card-img` and save. All images become square boxes. Try `16 / 9` for a widescreen look. Put it back to `3 / 2` when done.

---

### `-webkit-line-clamp` — truncating text to a fixed number of lines
When you want a text block to never exceed a certain number of lines (showing `…` after), CSS gives you the `line-clamp` pattern: set `display: -webkit-box`, `-webkit-box-orient: vertical`, `-webkit-line-clamp: 3`, and `overflow: hidden`. Despite the `-webkit-` prefix suggesting it's experimental, this pattern works in all modern browsers and is the standard way to clamp multiline text. It's useful for card descriptions where you want a consistent grid layout regardless of how long each description is.

**Try it yourself:** Change `-webkit-line-clamp: 3` to `-webkit-line-clamp: 1` on `.he-detail-card-desc`. Save and look at the cards — all descriptions collapse to one line with `…`. Try `5` for more breathing room. Put it back to `3`.

---

## 2026-09-12 (session 2)

### Renaming a React component — the full cascade
When you rename a component in React, the change isn't just the file name. You have to update: the file name itself, the `export default function` name inside it, every `import` statement that references the old name, every place the component is used in JSX, and any CSS class names or custom properties tied to it. We renamed `InvertedSection` → `HomeEvents`, which meant changing the file, the function, `inv-` class names → `he-` in both the JSX and the CSS, `--inv-*` CSS variables → `--he-*` in two `:root` blocks, and the import + usage in `App.jsx`. Missing any one of these breaks the app — the browser either throws a module-not-found error or silently applies no styles.

**Try it yourself:** Pick any component in the project and trace every place it's referenced — the file, the import, the JSX tag, and any CSS classes it uses. Count how many files you'd have to touch to rename it cleanly.

---

### `Math.random()` at module level — stable randomness per session
When you call `Math.random()` inside a React component or its render function, it runs on every re-render, which means the random values change and cause visual flickering or layout jumps. Moving `Math.random()` to the top of the module — outside the component — means it runs exactly once when the JS file first loads, and never again. The result is stored in a constant that the component reads every time it renders, always getting the same values. We used this in `PixelDivider` to generate a random-looking 2D grid of pixel blocks that stayed stable even as state changed elsewhere.

**Try it yourself:** Move the `GRID` constant inside the `PixelDivider` function body, just above the return. Hover something on the page to trigger a re-render — you'll see the pixel pattern randomly regenerate. Move it back out to the module level and it stabilises.

---

### CSS adjacent sibling combinator (`+`) — styling an element based on what's before it
The `+` combinator in CSS targets an element that immediately follows another specific element. `A + B { ... }` means "style B only when it comes directly after A in the DOM." We used `.pd-overlay + .weekly` to pull the Weekly section upward with a negative margin whenever a pixel divider in overlay mode sat right before it — without touching the `WeeklyEvents` component or passing any props. It's a clean way to express layout relationships between sibling elements purely in CSS.

**Try it yourself:** In `index.css`, write a rule `h2 + p { color: red; }` and add a `<h2>` followed by a `<p>` somewhere on the page. Only that `<p>` turns red — other paragraphs are unaffected. Remove it when done.

---

## 2026-09-12

### `MutationObserver` — watching for DOM changes at runtime
`MutationObserver` is a browser API that lets you run a callback any time something about the DOM changes — like an attribute being added, removed, or updated. You create one with `new MutationObserver(callback)`, then call `observe(element, options)` to start watching; `attributeFilter: ['data-theme']` narrows it down to only fire when that specific attribute changes. We used this in `InvertedSection.jsx` so the component can react immediately when the theme toggle flips `data-theme` on `<html>` — without needing any props or context. The cleanup step (`obs.disconnect()`) in the `useEffect` return is important so the observer stops when the component unmounts.

**Try it yourself:** Open `InvertedSection.jsx` and add `console.log('theme changed to', getTheme())` as the first line inside the `MutationObserver` callback. Open your browser console, then click the theme toggle — you should see the log fire each time.

---

### Framer Motion `whileInView` — scroll-triggered animations without JavaScript
`whileInView` is a Framer Motion prop that acts like an `initial`/`animate` pair that only activates when the element scrolls into the viewport. You combine it with `viewport={{ once: true }}` so the animation fires only the first time (not every time you scroll past it), and `viewport={{ amount: 0.5 }}` to control how much of the element needs to be visible before it triggers (50% here). This is the declarative alternative to setting up an `IntersectionObserver` manually in a `useEffect` — same idea, much less code. We used it for the "learn more about our events…" label.

**Try it yourself:** On the `motion.p` with `className="inv-label"`, change `amount: 0.5` to `amount: 1`. Now scroll slowly — the label won't animate until the full element is visible. Change it back to `0.5` to restore the earlier trigger point.

---

### CSS variables and `[data-theme]` attribute selectors for theming
You can use any HTML attribute as a CSS selector target — `[data-theme='light']` matches elements where `data-theme` equals `"light"`. By declaring CSS custom properties in both `:root` (the dark defaults) and `[data-theme='light'] { ... }` (the light overrides), the browser automatically swaps all tokens the moment that attribute changes — no JavaScript needed on the CSS side. We did this for `--inv-bg`, `--inv-text`, and `--inv-text-muted` so the inverted section flips between its dark and light palette just like the rest of the site. Adding `transition: background 0.3s ease` on the element using the variable gives you the smooth cross-fade for free.

**Try it yourself:** In `index.css`, change `--inv-bg` under `[data-theme='light']` to `red`. Toggle the theme — the inverted section background will turn red in light mode. Undo it to see how easy it is to retheme any part of the site with one variable.

---

## 2026-09-08

### `AnimatePresence` and `mode="wait"` — animating components in and out
`AnimatePresence` is a Framer Motion wrapper that lets components play an exit animation before they're removed from the DOM — normally React just deletes them instantly. You give each child a unique `key`, and when that key changes, the old child exits and the new one enters. `mode="wait"` means the new child waits for the old one to fully exit before entering — useful when you don't want two things occupying the same space at once. We used this today so the giant text word fully slides out before the new word slides in.

**Try it yourself:** In `InvertedSection.jsx`, change `mode="wait"` to `mode="popLayout"` and hover between thumbnails quickly. Notice both words briefly overlap. Change it back to see the clean wait behaviour.

---

### Framer Motion `variants` and `staggerChildren` — orchestrating groups of animations
Instead of writing `animate`, `initial`, and `exit` props on every element, Framer Motion lets you define named states in a `variants` object and propagate them automatically to children. A parent with `variants` and `staggerChildren` in its transition will fire each child's animation slightly after the previous one — creating a cascade. We used this today so the letters of each word slide in one after another instead of all at once, giving the text reveal its signature staggered feel.

**Try it yourself:** In `InvertedSection.jsx`, change `staggerChildren: 0.05` to `staggerChildren: 0.15` and hover a thumbnail. The letters will appear very slowly one by one. Try `0.01` for an almost-simultaneous burst.

---

### Overflow hidden on letter wrappers — the sliding text trick
The letter-slide animation only works because each letter lives inside a container with `overflow: hidden`. The letter itself animates from `y: '110%'` (below the container, invisible) to `y: '0%'` (in place). Without `overflow: hidden`, you'd see the letter approaching from below the line — with it, the clip creates a clean reveal as if the letter is pushing up through a slot. This is one of the most common typographic animation patterns on the web.

**Try it yourself:** In `index.css`, temporarily remove `overflow: hidden` from `.inv-char-wrap`. Hover a thumbnail and watch the letters slide in from visibly below the text line instead of appearing to push up through it. Put it back.

---

### `IntersectionObserver` — reacting when an element enters the screen
`IntersectionObserver` is a browser API that tells you, efficiently, when an element scrolls into or out of view. Before it existed, people listened to the `scroll` event and did math on `getBoundingClientRect()` on every frame, which was easy to get wrong and slow. You create one with `new IntersectionObserver(callback, options)`, then call `observe(element)` for each thing you care about; the browser calls your callback with a list of "entries," each carrying an `isIntersecting` boolean. In today's section we made one observer with `threshold: 0.35` (fire when 35% of the card is visible), added a `.revealed` class to trigger the CSS animation, then called `io.unobserve(entry.target)` so each card only animates once. We also added a fallback: if `'IntersectionObserver' in window` is false, we just reveal every card immediately.

**Try it yourself:** Add a fourth card to the section and confirm it reveals on scroll without any extra JS. Then change the `threshold` to `1.0` and notice how you now have to scroll the whole card into view before it animates.

### Staggering animations with `:nth-child` and `transition-delay`
When several elements animate at once it often looks better if they start a beat apart rather than all together — that's called a stagger. You don't need JavaScript for it: `transition-delay` says "wait this long before starting the transition," and `:nth-child(n)` lets you target the 2nd, 3rd, etc. element in a group. In our card grid the curtains all get `.revealed` at nearly the same moment, but `.reveal-card:nth-child(2)::after { transition-delay: 0.12s }` and `:nth-child(3)` at `0.24s` make them peel away in sequence. We applied the same idea to the inner content so text slides up shortly after its curtain clears. The tradeoff: `:nth-child` delays are hard-coded, so if you expect a variable number of items you'd set the delay from JavaScript instead.

**Try it yourself:** Change the delays so the cards reveal right-to-left instead of left-to-right, then try making the middle card reveal first.

### Capability and preference media queries — `prefers-reduced-motion` and `hover`
Media queries aren't only about screen width. `@media (prefers-reduced-motion: reduce)` matches when the visitor has asked their operating system to minimise animation (often for vestibular or attention reasons) — we use it to drop the curtain wipe entirely and just show the cards. `@media (hover: hover)` matches only devices whose primary pointer can truly hover, like a mouse; on a touchscreen it's false, so we put the "lift up 6px on hover" effect inside it to avoid a sticky hover state after a tap. These queries let you treat motion and hover as enhancements layered on top of a design that already works without them.

**Try it yourself:** Turn on "Reduce motion" in your OS accessibility settings (or emulate it in your browser devtools) and reload the page — the cards should appear with no curtain animation. Then turn it back off and watch the full reveal.

### Scoping CSS custom properties to a class
A CSS custom property (`--card-a`) is inherited by descendants, and you can *redefine* it at any level of the tree. That means you can declare a variable once in a component's shared rules and give each instance its own value by putting the definition on a modifier class. We wrote `.reveal-card::after { background: linear-gradient(135deg, var(--card-a), var(--card-b)); }` once, then set `.card-academic { --card-a: var(--purple-mid); --card-b: var(--purple-deep); }`, `.card-social { ... }`, and so on. Each card renders a different gradient from the *same* rule. This is the CSS-only version of passing props to a component, and it keeps the per-card colours in one readable place instead of scattered across three near-identical blocks.

**Try it yourself:** Add a `.card-alumni` modifier with its own `--card-a` / `--card-b` values and a matching card in the HTML — you should get a new gradient without touching the `::after` rule.

---

## 2026-09-06 (session 4)

### Canvas and `requestAnimationFrame` for interactive graphics
The HTML `<canvas>` element is a blank drawing surface you control entirely with JavaScript. You get a 2D context (`canvas.getContext('2d')`) and draw shapes by calling methods like `ctx.arc()` for circles and `ctx.fillStyle` for colour. `requestAnimationFrame` tells the browser to call your draw function before the next screen repaint — this gives you smooth 60fps animation without blocking the page. We used this today to draw dots at grid intersections and redraw them every frame as the mouse moves.

**Try it yourself:** In `WeeklyEvents.jsx`, change `BASE_R = 2.5` to `BASE_R = 6`. Save and hover over the section — the dots will be noticeably larger at rest. Change it back when done.

---

### Proximity-based interactivity with `Math.hypot`
`Math.hypot(dx, dy)` calculates the straight-line distance between two points using the Pythagorean theorem — same as `Math.sqrt(dx*dx + dy*dy)` but cleaner. We used it to measure how far each dot is from the mouse cursor, then computed a `proximity` value between 0 and 1 (`1 - dist / GLOW_R`). That single number drives both the dot's colour opacity and its size — the closer the cursor, the brighter and bigger the dot.

**Try it yourself:** Change `GLOW_R = 130` to `GLOW_R = 250` in `WeeklyEvents.jsx`. Move your mouse over the section and notice how many more dots glow at once. Then try `GLOW_R = 50` for a tight, focused effect.

---

### Layering with z-index — CSS, canvas, and content
Today we had three layers inside `.weekly`: the CSS `::before` grid lines, the canvas dots, and the actual section content. Each layer needs its own `z-index` to stack correctly — `0` for lines, `1` for canvas, `2` for content. If the canvas had a higher z-index than the content, it would block all clicks and hover interactions. `pointer-events: none` on the canvas is also essential — it makes the canvas invisible to the mouse so events pass through to the real content underneath.

**Try it yourself:** Temporarily remove `pointer-events: none` from `.weekly-grid-canvas` in `index.css`. Try hovering over the "Join on Discord" button — it won't respond because the canvas is intercepting the event. Put it back.

---

## 2026-09-06 (session 3)

### CSS `clamp()` — fluid sizing between a min and max
`clamp(min, preferred, max)` lets a value grow and shrink with the viewport without jumping between fixed breakpoints. The middle value is usually a `vw` (viewport-width) unit — so the size scales proportionally as the window resizes, but never goes below `min` or above `max`. We used it today for section padding (`clamp(48px, 8vw, 90px)`) and event row spacing (`clamp(32px, 4vw, 56px)`) so everything scales smoothly on any screen size.

**Try it yourself:** Change the padding on `.weekly` to `clamp(20px, 5vw, 200px)`, resize the browser window slowly, and watch the padding grow and shrink. Then put it back.

---

### CSS transitions on layout properties
CSS can animate many properties — not just colours and opacity, but also `height`, `border-radius`, `padding`, and `max-width`. We used this today so the navbar logo smoothly shrinks from 40px to 28px as the nav collapses into its pill shape. The key is listing the property name in `transition` with a duration and easing curve. If you forget to add a property to the `transition` list, it will snap instead of animate.

**Try it yourself:** In `index.css`, remove `height 0.45s cubic-bezier(...)` from `.nav-logo img`'s transition. Scroll up and down and notice the logo size jumps instantly instead of transitioning. Put it back.

---

### Inline SVG icons in JSX
Instead of importing icon libraries, you can paste SVG code directly inside JSX. Each SVG is just an `<svg>` tag with `viewBox`, `width`, `height`, and path data inside. We used this for the pin (location) and clock (time) icons in the weekly event cards — small, self-contained, no dependencies. Using `aria-hidden="true"` hides the icon from screen readers since the text beside it already describes what it is.

**Try it yourself:** Find the clock SVG in `WeeklyEvents.jsx` and change `strokeWidth="1.4"` to `strokeWidth="3"`. Save and look at how much bolder the icon becomes. Change it back.

---

## 2026-09-06 (session 2)

### CSS `::after` pseudo-element for decorative underlines
A pseudo-element like `::after` lets you attach a purely visual element to any tag without adding extra HTML. It doesn't exist in the DOM — CSS creates it. We used it today to add a purple bar beneath the "Weekly Events" heading: `content: ''` creates the element, `display: block` puts it on its own line below the text, and `background-color` gives it its colour. The heading needed `display: inline-block` so the underline only spans the width of the text rather than the full container.

**Try it yourself:** Add `::after` to `.weekly-sub` in `index.css` with `content: ''`, `display: block`, `height: 2px`, and `background: red`. Save and look at the page — then remove it.

---

### Passing multiple targets to GSAP
`gsap.from()` doesn't just accept a single element — you can pass an array like `gsap.from([headingRef.current, subRef.current], { ... })`. GSAP will animate all of them with the same settings. Adding `stagger: 0.08` makes each element start slightly after the previous one, creating a cascading feel. We used this so the heading and subtitle both slide in from the left together but with a tiny delay between them.

**Try it yourself:** In `WeeklyEvents.jsx`, change `stagger: 0.08` to `stagger: 0.3` and scroll to that section — you'll see the gap between the heading and subtitle grow noticeably.

---

### Scroll-driven class toggling with `useEffect`
A common pattern in React is to listen for browser events (like `scroll`) inside a `useEffect` and update state based on them. We used `window.addEventListener('scroll', ...)` to check `window.scrollY > 60` and toggle a `scrolled` boolean. That boolean becomes a CSS class on the `<nav>`, which lets CSS do all the visual work via the `nav.scrolled` selector. The cleanup function (`return () => removeEventListener(...)`) is important — it prevents memory leaks by removing the listener when the component unmounts.

**Try it yourself:** Change the threshold `60` to `300` in `Navbar.jsx`. Scroll slowly and notice how much further down you have to go before the pill appears. Try `10` and see how instantly it triggers.

---

## 2026-09-06

### ScrollTrigger `start` and `end` — controlling animation speed
ScrollTrigger ties an animation to how far you've scrolled. The `start` and `end` values tell GSAP when to begin and finish the animation — expressed as positions like `'top 90%'` (when the element's top hits 90% down the viewport) or `'top -50%'` (20% past the top of the screen). The further apart these two points are, the more scroll distance the animation covers, which makes it feel slower. We used this today to slow down the About Us heading slide-in by pushing `end` from `'top 20%'` all the way to `'top -50%'`.

**Try it yourself:** Open `AboutUs.jsx` and change `end: 'top -50%'` to `end: 'top -100%'`. Scroll through the About Us section and notice how much slower the heading arrives. Then try `end: 'top 80%'` and see how snappy it becomes.

---

### `pin: true` and scroll distance — why section height matters
When GSAP pins a section, it freezes it in place at the top of the viewport and adds extra scroll space equal to the `end` value. If the section is shorter than the viewport, the next section peeks in below it the whole time — the pin doesn't hide it. We fixed this today by adding `min-height: 100vh` to `.about`, which forces the section to fill the full screen so the events section stays completely hidden while the words reveal.

**Try it yourself:** Temporarily remove `min-height: 100vh` from `.about` in `index.css`, scroll to the About Us section, and watch the Weekly Events section bleed in underneath. Then put it back and see the difference.

---

### `useRef` — getting a direct handle on a DOM element
In React, you normally don't touch the DOM directly — React manages it for you. But for animations, you need a real reference to the actual HTML element so GSAP can move it. `useRef` gives you that. You call `const headingRef = useRef(null)`, attach it to a JSX element with `ref={headingRef}`, and then inside `useEffect` you can access the real DOM node via `headingRef.current`. We used this today to add the slide-in animation to the Weekly Events heading.

**Try it yourself:** In `WeeklyEvents.jsx`, add `console.log(headingRef.current)` inside the `useEffect`, open your browser console, and refresh. You'll see the actual `<h2>` DOM node printed — that's the object GSAP is animating.

---

### Cleanup functions in `useEffect`
Every `useEffect` that sets up something ongoing (like a ScrollTrigger or animation) should clean it up when the component unmounts. The `return () => { ... }` at the end of a `useEffect` is the cleanup function — React calls it automatically when the component is removed from the page. Without it, old animations pile up every time the component re-renders and can cause weird bugs. We always call `.kill()` on GSAP animations and ScrollTriggers in the cleanup to free them properly.

**Try it yourself:** Look at the `return () => { ... }` block at the bottom of the `useEffect` in `AboutUs.jsx`. Count how many things are being killed. Each one corresponds to something that was set up above it in the same `useEffect`.

---
