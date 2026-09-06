import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playHover, playClick } from '../utils/sfx'

gsap.registerPlugin(ScrollTrigger)

/*
  Weekly recurring events — one full-width row per event, media and info
  alternating sides. Content sourced from SCS_Concordia.md › Recurring Events.
*/
const EVENTS = [
  {
    name: 'AlgoTime',
    when: 'Every Monday · 6–8 PM',
    image: 'https://picsum.photos/seed/algotime-scs/1000/760',
    blurb:
      'Weekly LeetCode practice sessions where we work through coding challenges together, break down patterns, and get faster at the kind of problems that show up in technical interviews.',
    points: [
      'Open to every experience level',
      'A fresh curated problem set each week',
      'Solve alongside other students, not alone',
    ],
  },
  {
    name: 'Tech Hour',
    when: 'Every Wednesday · 6–8 PM',
    image: 'https://picsum.photos/seed/techhour-scs/1000/760',
    blurb:
      'Hands-on build sessions where you ship a small software project in under two hours. Bring an idea or borrow one of ours, then try out the newest APIs and AI tools while you build.',
    points: [
      'Go from empty repo to demo in one sitting',
      'Experiment with the latest APIs and AI tooling',
      'Build in a room full of people doing the same',
    ],
  },
]

function Check() {
  return (
    <span className="weekly-check" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function WeeklyEvents() {
  const sectionRef = useRef(null)
  const rowRefs = useRef([])

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean)
    if (!rows.length) return

    const anims = rows.map((row, i) => {
      const media = row.querySelector('.weekly-media')
      const info = row.querySelector('.weekly-info')
      const fromLeft = i % 2 === 0 // AlgoTime: media left / Tech Hour: media right

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          end: 'top 40%',
          scrub: true,
        },
      })
      tl.from(media, { x: fromLeft ? -110 : 110, opacity: 0, ease: 'power2.out' }, 0)
      tl.from(info, { x: fromLeft ? 90 : -90, opacity: 0, ease: 'power2.out' }, 0)
      return tl
    })

    return () => {
      anims.forEach((tl) => {
        tl.scrollTrigger?.kill()
        tl.kill()
      })
    }
  }, [])

  return (
    <section className="weekly" id="weekly" ref={sectionRef}>
      <div className="weekly-inner">
        <div className="weekly-intro">
          <span className="weekly-label">Weekly Events</span>
          <h2 className="weekly-heading">
            Show up every week,<br />leave a little sharper.
          </h2>
          <p className="weekly-sub">
            Two standing sessions run every week during the semester — drop in
            whenever, no signup required.
          </p>
        </div>

        {EVENTS.map((event, i) => (
          <div
            className={`weekly-event${i % 2 ? ' reverse' : ''}`}
            key={event.name}
            ref={(el) => (rowRefs.current[i] = el)}
          >
            <div className="weekly-media">
              <img src={event.image} alt="" loading="lazy" />
            </div>

            <div className="weekly-info">
              <span className="weekly-badge">{event.when}</span>
              <h3 className="weekly-event-title">{event.name}</h3>
              <p className="weekly-event-blurb">{event.blurb}</p>

              <ul className="weekly-checklist">
                {event.points.map((point) => (
                  <li key={point}>
                    <Check />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                className="weekly-cta"
                href="https://discord.gg/scsconcordia"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                Join on Discord
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
