import { useState } from 'react'
import { playHover, playClick, isMuted, setMuted } from '../utils/sfx'

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
  const [muted, setMutedState] = useState(isMuted())

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    setMutedState(next)
    if (!next) playClick() // confirm unmute with a sound
  }

  return (
    <nav
      aria-label="Main navigation"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="nav-logo">
        <img src={`${import.meta.env.BASE_URL}logo_full.svg`} alt="SCS Concordia" />
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
              <div className="nav-dropdown">
                <div className="nav-dropdown-panel">
                  {item.children.map((child) => (
                    <a key={child.label} href={child.href} onMouseEnter={playHover} onClick={playClick}>
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
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

      <div className="nav-controls">
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

        <button
          className="theme-toggle"
          onClick={toggleMute}
          onMouseEnter={playHover}
          aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
        >
          {muted ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none" />
              <line x1="16" y1="9" x2="22" y2="15" />
              <line x1="22" y1="9" x2="16" y2="15" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none" />
              <path d="M15.5 8.5 a6 6 0 0 1 0 7" />
              <path d="M18.5 5.5 a10 10 0 0 1 0 13" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
