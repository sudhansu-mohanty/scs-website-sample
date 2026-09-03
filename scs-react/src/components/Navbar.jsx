import { motion } from 'framer-motion'

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          strokeLinecap="round"
          viewBox="0 0 32 32"
          overflow="visible"
        >
          {/* Main body — sun is a smaller circle, moon is larger */}
          <circle cx="16" cy="16" r={isDark ? 10 : 8} />

          {/* Crescent cutout — bg-coloured circle slides in from the right
              to partially cover the main circle, creating a crescent shape.
              CSS transform (x) works reliably on SVG elements in all browsers. */}
          <motion.circle
            cx="20" cy="12" r="9"
            fill="var(--color-nav-bg)"
            initial={false}
            animate={{ x: isDark ? 0 : 22 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
          />

          {/* Sun rays — shrink and fade out when switching to moon */}
          <motion.g
            initial={false}
            animate={{ scale: isDark ? 0.4 : 1, opacity: isDark ? 0 : 1 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <path d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
          </motion.g>
        </svg>
      </button>
    </nav>
  )
}
