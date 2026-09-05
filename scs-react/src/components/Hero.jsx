import { useState, useEffect } from 'react'
import DotGrid from './DotGrid'

const LINE1 = 'Welcome to SCS Concordia'
const CYCLING_LINES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna.',
  'Ut enim ad minim veniam, quis nostrud exercitation.',
  'Duis aute irure dolor in reprehenderit in voluptate velit.',
]
const TYPE_DELAY = 42   // ms per character typed
const DELETE_DELAY = 22 // ms per character deleted
const HOLD_MS = 1800    // pause before deleting

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

export default function Hero({ handsIn, textIn }) {
  const [typed1, setTyped1] = useState('')
  const [typed2, setTyped2] = useState('')
  const [cursorLine, setCursorLine] = useState(0) // 0=hidden, 1=line1, 2=line2

  useEffect(() => {
    if (!textIn) return
    let cancelled = false

    const run = async () => {
      // Type line 1 once
      setCursorLine(1)
      for (let i = 1; i <= LINE1.length; i++) {
        if (cancelled) return
        await wait(TYPE_DELAY)
        setTyped1(LINE1.slice(0, i))
      }
      await wait(280)
      if (cancelled) return

      // Cycle through LINE2 options indefinitely
      setCursorLine(2)
      let idx = 0
      while (!cancelled) {
        const line = CYCLING_LINES[idx % CYCLING_LINES.length]
        // Type
        for (let i = 1; i <= line.length; i++) {
          if (cancelled) return
          await wait(TYPE_DELAY)
          setTyped2(line.slice(0, i))
        }
        // Hold
        await wait(HOLD_MS)
        // Delete
        for (let i = line.length - 1; i >= 0; i--) {
          if (cancelled) return
          await wait(DELETE_DELAY)
          setTyped2(line.slice(0, i))
        }
        await wait(300)
        idx++
      }
    }

    run()
    return () => { cancelled = true }
  }, [textIn])

  return (
    <section className="hero">
      <DotGrid handsIn={handsIn} />

      <img
        className={`hand hand-left${handsIn ? ' hand-in' : ''}`}
        src={`${import.meta.env.BASE_URL}SVG/right_hand.svg`}
        alt=""
      />

      <div className="hero-content">
        <div className="hero-logo-wrap">
          <img
            className="hero-logo-full"
            src={`${import.meta.env.BASE_URL}logo_full.svg`}
            alt="SCS Concordia"
          />
        </div>

        <div className="body-text">
          <p className="typewriter-line">
            {typed1}
            {cursorLine === 1 && <span className="tw-cursor" />}
          </p>
          <p className="typewriter-line">
            {typed2}
            {cursorLine === 2 && <span className="tw-cursor" />}
          </p>
        </div>
      </div>

      <img
        className={`hand hand-right${handsIn ? ' hand-in' : ''}`}
        src={`${import.meta.env.BASE_URL}SVG/left_hand.svg`}
        alt=""
      />
    </section>
  )
}
