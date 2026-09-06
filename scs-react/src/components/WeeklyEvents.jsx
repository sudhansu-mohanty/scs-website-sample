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
    location: 'H-430',
    time: 'Mondays · 6:00 – 8:00 PM',
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
    location: 'H-430',
    time: 'Wednesdays · 6:00 – 8:00 PM',
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
  const canvasRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const rowRefs = useRef([])

  // Canvas dot-grid effect
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')
    const GRID = 60
    const BASE_R = 2.5
    const GLOW_R = 130
    let mouseX = -9999
    let mouseY = -9999
    let raf

    const resize = () => {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const restColor = isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)'
      const glowColor = isLight
        ? (p) => `rgba(110,80,200,${0.2 + p * 0.7})`
        : (p) => `rgba(182,165,235,${0.18 + p * 0.75})`

      for (let x = 0; x <= canvas.width; x += GRID) {
        for (let y = 0; y <= canvas.height; y += GRID) {
          const dist = Math.hypot(x - mouseX, y - mouseY)
          const p = Math.max(0, 1 - dist / GLOW_R)
          ctx.beginPath()
          ctx.arc(x, y, BASE_R + p * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = p > 0 ? glowColor(p) : restColor
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999 }

    resize()
    draw()
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean)
    if (!rows.length) return

    const headingAnim = gsap.from([headingRef.current, subRef.current], {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        end: 'top -50%',
        scrub: true,
      },
    })

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
      headingAnim.scrollTrigger?.kill()
      headingAnim.kill()
      anims.forEach((tl) => {
        tl.scrollTrigger?.kill()
        tl.kill()
      })
    }
  }, [])

  return (
    <section className="weekly" id="weekly" ref={sectionRef}>
      <canvas ref={canvasRef} className="weekly-grid-canvas" aria-hidden="true" />
      <div className="weekly-inner">
        <div className="weekly-intro">
          <h2 className="weekly-heading" ref={headingRef}>
            Weekly Events
          </h2>
          <p className="weekly-sub" ref={subRef}>
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
              <h3 className="weekly-event-title">{event.name}</h3>
              <div className="weekly-meta">
                <span className="weekly-meta-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                  {event.location}
                </span>
                <span className="weekly-meta-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {event.time}
                </span>
              </div>
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
