import { useState } from 'react'
import { playHover, playClick } from '../utils/sfx'

const NAV_ITEMS = [
  { label: 'Home', href: '#' },
  {
    label: 'Who we are',
    children: [
      { label: 'About Us', href: '#about' },
      { label: 'Meet the Team', href: '#team' },
    ],
  },
  {
    label: 'What we do',
    children: [
      { label: 'Weekly Events', href: '#weekly' },
      { label: 'Academic Events', href: '#academic' },
      { label: 'Social Events', href: '#social' },
      { label: 'Wine & Cheese', href: '#wine' },
    ],
  },
  {
    label: 'Contact',
    children: [
      { label: 'Instagram', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Discord', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'Newsletter', href: '#' },
      { label: 'Email', href: '#' },
    ],
  },
  { label: 'Links', href: 'https://linktr.ee/scsconcordia', external: true },
]

function Chevron({ open }) {
  return (
    <svg
      className={`nav-chevron${open ? ' open' : ''}`}
      width="10" height="10" viewBox="0 0 10 10" fill="none"
    >
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Navbar({ theme, onToggle }) {
  const isDark = theme === 'dark'
  const [openMenu, setOpenMenu] = useState(null)

  const activeChildren = NAV_ITEMS.find((i) => i.label === openMenu)?.children ?? []

  return (
    <nav
      className={openMenu ? 'nav-open' : ''}
      aria-label="Main navigation"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="nav-bar">
        <div className="nav-logo">
          <img src="/logo_full.svg" alt="SCS Concordia" />
        </div>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <li
                key={item.label}
                className={`nav-item${openMenu === item.label ? ' active' : ''}`}
                onMouseEnter={() => { playHover(); setOpenMenu(item.label) }}
              >
                <button className="nav-trigger" onClick={playClick}>
                  {item.label}
                  <Chevron open={openMenu === item.label} />
                </button>
              </li>
            ) : (
              <li key={item.label} className="nav-item" onMouseEnter={() => { playHover(); setOpenMenu(null) }}>
                <a href={item.href} onClick={playClick} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {item.label}
                </a>
              </li>
            )
          )}
        </ul>

        <button
          className="theme-toggle"
          onClick={() => { playClick(); onToggle() }}
          onMouseEnter={playHover}
          aria-label="Toggle colour mode"
        >
          <svg
            className="skiper-svg"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            strokeLinecap="round"
            viewBox="0 0 32 32"
            overflow="visible"
          >
            <circle cx="16" cy="16" r={isDark ? 10 : 8} />
            <circle className="crescent" cx="20" cy="12" r="9" fill="var(--color-nav-bg)" />
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
      </div>

      {/* Expanding panel — lives inside the nav pill */}
      <div className="nav-panel">
        <div className="nav-panel-inner">
          {activeChildren.map((child) => (
            <a key={child.label} href={child.href} onMouseEnter={playHover} onClick={playClick}>
              {child.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
