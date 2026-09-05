/*
  Props — data passed INTO a component from its parent, like function arguments.
  This component receives:
    - theme: 'dark' | 'light'   (so it knows which icon to show)
    - onToggle: function         (called when the button is clicked)

  The parent (App.jsx) owns the theme state and passes it down.
  Navbar never modifies theme directly — it just calls onToggle and
  lets the parent decide what to do. This is called "lifting state up".
*/
export default function Navbar({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <nav aria-label="Main navigation">
      <div className="nav-logo">
        <img src="/logo_full.svg" alt="SCS Concordia" />
      </div>

      <ul className="nav-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">Who we are</a>
        </li>
        <li>
          <a href="#">What we do</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      <button
        className="theme-toggle"
        onClick={onToggle}
        aria-label="Toggle colour mode"
      >
        {/*
          Skiper-UI Button 3 animation — pure CSS transitions driven by
          [data-theme] on <html>. framer-motion SVG animations are unreliable
          (transform-origin conflicts, clipPath restrictions), so CSS transitions
          are used instead for guaranteed cross-browser behaviour.

          Two moving parts:
            1. .crescent — a nav-bg–coloured circle that slides in from the right
               to carve a crescent out of the main body circle.
            2. .rays — the sun ray dots that shrink and fade out in dark mode.
        */}
        <svg
          className="skiper-svg"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          strokeLinecap="round"
          viewBox="0 0 32 32"
          overflow="visible"
        >
          {/* Main body — snaps between sun size (r=8) and moon size (r=10) */}
          <circle cx="16" cy="16" r={isDark ? 10 : 8} />

          {/* Crescent cutout */}
          <circle className="crescent" cx="20" cy="12" r="9" fill="var(--color-nav-bg)" />

          {/* Sun rays */}
          <g className="rays" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </g>
        </svg>
      </button>
    </nav>
  )
}
