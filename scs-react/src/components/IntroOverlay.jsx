import { useEffect, useRef } from 'react'

/*
  useRef — gives you a stable reference to a DOM element or any value
  that persists across renders WITHOUT triggering a re-render when changed.
  Think of it as a box you can read/write that React doesn't watch.

  Here we use refs to directly access the overlay and logo DOM nodes
  so we can add event listeners and apply inline styles — the same things
  we did with querySelector() in vanilla JS.

  onComplete — a callback prop. When the intro finishes, this component
  calls onComplete() and the parent (App.jsx) decides what happens next.
*/
export default function IntroOverlay({ onComplete }) {
  const overlayRef = useRef(null)
  const logoFullRef = useRef(null)
  const introLogoRef = useRef(null)

  /*
    useEffect — runs AFTER the component has rendered and the DOM is ready.
    Equivalent to putting code at the bottom of a <script> tag in vanilla JS.

    The empty array [] at the end means "run this effect only once,
    when the component first mounts". Without it, it would run after
    every re-render.

    The function you return from useEffect is the CLEANUP — it runs
    when the component unmounts (like window.removeEventListener).
  */
  useEffect(() => {
    const overlay = overlayRef.current
    const logoFull = logoFullRef.current
    const introLogo = introLogoRef.current

    // Measure both logos and align intro logo to hero logo pixel-perfectly
    requestAnimationFrame(() => {
      const heroLogo = document.querySelector('.hero-logo-wrap')
      if (!heroLogo || !introLogo) return
      const diff =
        heroLogo.getBoundingClientRect().top -
        introLogo.getBoundingClientRect().top
      if (Math.abs(diff) > 0.5) introLogo.style.marginTop = diff + 'px'
    })

    // When the fill animation ends, fade the overlay out then signal completion
    const handleAnimationEnd = () => {
      setTimeout(() => {
        overlay.classList.add('outro')
        overlay.addEventListener('transitionend', onComplete, { once: true })
      }, 350)
    }

    logoFull.addEventListener('animationend', handleAnimationEnd, { once: true })

    // Cleanup — remove the listener if the component unmounts early
    return () => {
      logoFull.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [onComplete])

  return (
    <div className="intro-overlay" ref={overlayRef}>
      <div className="intro-logo-wrap" ref={introLogoRef}>
        <img className="intro-logo-hollow" src="/logo_hollow.svg" alt="" />
        <img
          className="intro-logo-full"
          src="/logo_full.svg"
          alt=""
          ref={logoFullRef}
        />
      </div>
    </div>
  )
}
