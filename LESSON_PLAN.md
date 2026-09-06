# SCS Website — Lesson Plan

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
