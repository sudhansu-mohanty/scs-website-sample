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

    // Position the intro logo to match the hero logo pixel-perfectly.
    // We switch the intro logo to position:absolute inside the fixed overlay
    // and set top/left directly from the hero logo's measured rect.
    // This avoids flex margin-halving math and is zoom-independent.
    requestAnimationFrame(() => {
      const heroLogo = document.querySelector('.hero-logo-wrap')
      if (!heroLogo || !introLogo) return
      const heroRect = heroLogo.getBoundingClientRect()
      introLogo.style.position = 'absolute'
      introLogo.style.top = heroRect.top + 'px'
      introLogo.style.left = heroRect.left + 'px'
      introLogo.style.width = heroRect.width + 'px'
      introLogo.style.margin = '0'
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
        <img className="intro-logo-hollow" src={`${import.meta.env.BASE_URL}logo_hollow.svg`} alt="" />
        <img
          className="intro-logo-full"
          src={`${import.meta.env.BASE_URL}logo_full.svg`}
          alt=""
          ref={logoFullRef}
        />
      </div>
    </div>
  )
}
