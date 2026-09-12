import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS = [
  {
    label: 'WEEKLY',
    image: 'https://picsum.photos/seed/scs-aa/300/300',
    href: '#weekly',
  },
  { label: 'ACADEMIC', image: 'https://picsum.photos/seed/scs-bb/300/300' },
  { label: 'SOCIAL', image: 'https://picsum.photos/seed/scs-cc/300/300' },
  { label: 'COMPETITIONS', image: 'https://picsum.photos/seed/scs-dd/300/300' },
  {
    label: 'WINE & CHEESE',
    image: 'https://picsum.photos/seed/scs-ee/300/300',
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

export default function InvertedSection() {
  const [hovered, setHovered] = useState(null)
  const current = hovered ?? ITEMS[0]
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
    <section className="inv-section">
      {/* ── Scroll-in label ── */}
      <motion.p
        className="inv-label"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        learn more about our events...
      </motion.p>

      {/* ── Image strip ── */}
      <div className="inv-strip">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className={`inv-thumb${hovered === item ? ' is-active' : ''}`}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={item.image} alt={item.label} draggable={false} />

            <AnimatePresence>
              {hovered === item && (
                <motion.button
                  className="inv-cta"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  aria-label={`Learn more about ${item.label}`}
                  onClick={() =>
                    item.href && (window.location.href = item.href)
                  }
                  style={{ cursor: item.href ? 'pointer' : 'default' }}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M2.5 12.5L12.5 2.5M12.5 2.5H5.5M12.5 2.5V9.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* ── Giant animated text ── */}
      <motion.div
        className="inv-display"
        animate={{ color: isActive ? colorActive : colorRest }}
        transition={{ duration: 0.45 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.label}
            className="inv-word"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {current.label.split('').map((char, i) => (
              <span key={i} className="inv-char-wrap">
                <motion.span className="inv-char" variants={charVariants}>
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
