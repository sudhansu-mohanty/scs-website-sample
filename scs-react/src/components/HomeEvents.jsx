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
  ACADEMIC: {
    description:
      'Sharpen your skills and grow your career. SCS runs workshops, panels, and prep sessions designed to help Concordia CS students thrive — in class, in interviews, and beyond.',
    events: [
      {
        image: 'https://picsum.photos/seed/acad-1/400/260',
        title: 'Technical Interview Prep',
        desc: "Mock interviews, LeetCode walkthroughs, and whiteboard practice led by students who've landed top internships. Runs every fall and winter.",
      },
      {
        image: 'https://picsum.photos/seed/acad-2/400/260',
        title: 'Resume Workshop',
        desc: "Get your resume reviewed by peers and industry mentors. Learn how to frame your projects, highlight your skills, and pass the recruiter's first scan.",
      },
      {
        image: 'https://picsum.photos/seed/acad-3/400/260',
        title: 'Industry Panel',
        desc: 'Hear directly from engineers, PMs, and founders at top tech companies. Ask real questions, make real connections — held each semester.',
      },
      {
        image: 'https://picsum.photos/seed/acad-4/400/260',
        title: 'Coding Workshops',
        desc: 'Hands-on sessions covering web dev, data structures, machine learning, and more. Open to all skill levels, run by fellow students.',
      },
      {
        image: 'https://picsum.photos/seed/acad-5/400/260',
        title: 'Study Hall',
        desc: 'Structured peer study sessions before midterms and finals. Bring your notes, find your group, and tackle the hardest courses together.',
      },
      {
        image: 'https://picsum.photos/seed/acad-6/400/260',
        title: 'Grad School Info Night',
        desc: "Thinking about a master's or PhD? Current grad students and professors break down the application process, research opportunities, and funding.",
      },
    ],
  },
  SOCIAL: {
    description:
      'CS is better with company. SCS brings the Concordia computing community together through events that are fun, welcoming, and genuinely worth showing up for.',
    events: [
      {
        image: 'https://picsum.photos/seed/soc-1/400/260',
        title: 'Welcome Back BBQ',
        desc: 'Kick off the fall semester with free food, good vibes, and a chance to meet your future teammates and friends. Held on the first week of school.',
      },
      {
        image: 'https://picsum.photos/seed/soc-2/400/260',
        title: 'Halloween Bash',
        desc: 'Costumes encouraged, candy guaranteed. Our annual Halloween event is one of the most anticipated nights of the fall semester.',
      },
      {
        image: 'https://picsum.photos/seed/soc-3/400/260',
        title: 'End-of-Year Gala',
        desc: "Celebrate the year's achievements in style. The gala wraps up the winter semester with awards, speeches, and a night to remember.",
      },
      {
        image: 'https://picsum.photos/seed/soc-4/400/260',
        title: 'Game Night',
        desc: 'Board games, video games, and everything in between. A low-key evening to unwind, compete, and connect with the SCS community.',
      },
      {
        image: 'https://picsum.photos/seed/soc-5/400/260',
        title: 'Movie Night',
        desc: 'Chill out with the community. We screen fan favourites and cult classics — popcorn included, attendance always free.',
      },
      {
        image: 'https://picsum.photos/seed/soc-6/400/260',
        title: 'Networking Mixer',
        desc: 'A casual evening connecting students with alumni and industry professionals. No formal agenda — just great conversations and new opportunities.',
      },
    ],
  },
  'WINE & CHEESE': {
    description:
      'Our flagship annual event. Wine & Cheese brings together students, faculty, and industry professionals for an evening of networking, good food, and great conversation — held every fall semester.',
    events: [
      {
        image: 'https://picsum.photos/seed/wnc-hero/1200/500',
        title: 'Wine & Cheese',
        desc: 'A night of networking, fine bites, and the SCS community at its best. Dress sharp, bring your curiosity, and leave with new connections.',
      },
    ],
  },
}

const ITEMS = [
  { label: 'COMPETITIONS', image: 'https://picsum.photos/seed/scs-dd/300/300', hash: 'competitions' },
  { label: 'ACADEMIC', image: 'https://picsum.photos/seed/scs-bb/300/300', hash: 'academic' },
  { label: 'SOCIAL', image: 'https://picsum.photos/seed/scs-cc/300/300', hash: 'social' },
  {
    label: 'WINE & CHEESE',
    image: 'https://picsum.photos/seed/scs-ee/300/300',
    hash: 'wine',
  },
  {
    label: 'WEEKLY',
    image: 'https://picsum.photos/seed/scs-aa/300/300',
    href: '#weekly',
  },
]

const HASH_TO_ITEM = Object.fromEntries(
  ITEMS.filter((i) => i.hash).map((i) => [i.hash, i])
)

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

  // Sync selected tab with URL hash (e.g. #academic, #social, #competitions)
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace('#', '')
      const match = HASH_TO_ITEM[hash]
      if (match) setSelected(match)
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

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
      {/* ── Hash anchors for navbar deep-links ── */}
      {ITEMS.filter((i) => i.hash).map((i) => (
        <span key={i.hash} id={i.hash} className="he-anchor" />
      ))}

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
              {DETAILS[selected.label].events.map((ev) => (
                <div key={ev.title} className="he-detail-card">
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
