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
          <a href="#">What we do</a>
        </li>
        <li>
          <a href="#">Who we are</a>
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
          Conditional rendering — show sun in dark mode (click = go light),
          show moon in light mode (click = go dark).
          The ternary operator: condition ? valueIfTrue : valueIfFalse
        */}
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  )
}

/* Small SVG components — defined here since they're only used in Navbar */
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
