# SCS Website — Lesson Plan

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
