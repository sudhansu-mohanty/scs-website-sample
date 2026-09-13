import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DETAILS = {
  COMPETITIONS: {
    description:
      'Test your skills, build under pressure, and go head-to-head with the best. SCS organises and supports competitions spanning hackathons, programming contests, and industry challenges — all open to Concordia students.',
    events: [
      {
        image: 'https://scsconcordia.com/src/pics/hw.jpg',
        title: 'Hello World Hackathon',
        desc: "New to coding? The Hello World Competition is the perfect starting point. Explore programming, showcase your creativity, and build your first project — held mid-September.",
      },
      {
        image: 'https://scsconcordia.com/src/pics/csgames.jpg',
        title: 'CS Games',
        desc: 'Face off against the sharpest minds from universities across the country. Tryouts run January–February, with the national competition in March.',
      },
      {
        image: 'https://scsconcordia.com/src/pics/cybersci.jpg',
        title: 'CyberSci',
        desc: "Canada's national cybersecurity competition. Regional qualifiers and national finals covering ethical hacking, digital forensics, and more — held mid-November.",
      },
      {
        image: 'https://scsconcordia.com/src/pics/nsec.jpg',
        title: 'NorthSec',
        desc: 'One of the largest applied security events in North America, featuring a world-class Capture The Flag competition with international participation every May.',
      },
      {
        image: 'https://scsconcordia.com/src/pics/icc.jpg',
        title: 'ICPC',
        desc: 'A global programming competition where teams solve complex algorithmic problems under time pressure. Fall tryouts, worldwide representation.',
      },
    ],
  },
}

const ITEMS = [
  { label: 'COMPETITIONS', image: 'https://picsum.photos/seed/scs-dd/300/300' },
  { label: 'ACADEMIC', image: 'https://picsum.photos/seed/scs-bb/300/300' },
  { label: 'SOCIAL', image: 'https://picsum.photos/seed/scs-cc/300/300' },
  {
    label: 'WINE & CHEESE',
    image: 'https://picsum.photos/seed/scs-ee/300/300',
  },
  {
    label: 'WEEKLY',
    image: 'https://picsum.photos/seed/scs-aa/300/300',
    href: '#weekly',
  },
]

const wordVariants = {
  visible: {
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.025, staggerDirection: -1 },
  },
}

const charVariants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    y: '-110%',
    transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] },
  },
}

export default function HomeEvents() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(ITEMS[0])
  const current = hovered ?? selected
  const isActive = hovered !== null

  const getTheme = () =>
    document.documentElement.getAttribute('data-theme') || 'dark'
  const [theme, setTheme] = useState(getTheme)

  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(getTheme()))
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => obs.disconnect()
  }, [])

  const isDark = theme === 'dark'
  const colorRest = isDark ? '#0a0a0a' : '#433079'
  const colorActive = isDark ? '#7bc880' : '#b6a5eb'

  return (
    <section className="he-section">
      {/* ── Scroll-in label ── */}
      <motion.p
        className="he-label"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Click to learn more about our events...
      </motion.p>

      {/* ── Image strip ── */}
      <div className="he-strip">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className={`he-thumb${hovered === item ? ' is-active' : ''}${selected === item ? ' is-selected' : ''}`}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              if (item.href) { window.location.href = item.href; return; }
              setSelected(item)
            }}
          >
            <img src={item.image} alt={item.label} draggable={false} />
          </div>
        ))}
      </div>

      {/* ── Giant animated text ── */}
      <motion.div
        className="he-display"
        animate={{ color: isActive ? colorActive : colorRest }}
        transition={{ duration: 0.45 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.label}
            className="he-word"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {current.label.split('').map((char, i) => (
              <span key={i} className="he-char-wrap">
                <motion.span className="he-char" variants={charVariants}>
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Detail panel ── */}
      <AnimatePresence mode="wait">
        {DETAILS[selected.label] && (
          <motion.div
            key={selected.label}
            className="he-detail"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="he-detail-desc">{DETAILS[selected.label].description}</p>
            <div className="he-detail-grid">
              {DETAILS[selected.label].events.map((ev, i, arr) => (
                <div
                  key={ev.title}
                  className="he-detail-card"
                  style={arr.length % 2 !== 0 && i === arr.length - 1 ? { gridColumn: '1 / -1' } : undefined}
                >
                  <img src={ev.image} alt={ev.title} className="he-detail-card-img" />
                  <div className="he-detail-card-body">
                    <h4 className="he-detail-card-title">{ev.title}</h4>
                    <p className="he-detail-card-desc">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
