import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS = [
  { label: 'SCS',       image: 'https://picsum.photos/seed/scs-aa/300/300' },
  { label: 'EVENTS',    image: 'https://picsum.photos/seed/scs-bb/300/300' },
  { label: 'HACKS',     image: 'https://picsum.photos/seed/scs-cc/300/300' },
  { label: 'WORKSHOPS', image: 'https://picsum.photos/seed/scs-dd/300/300' },
  { label: 'NETWORK',   image: 'https://picsum.photos/seed/scs-ee/300/300' },
  { label: 'COMMUNITY', image: 'https://picsum.photos/seed/scs-ff/300/300' },
  { label: 'CODE',      image: 'https://picsum.photos/seed/scs-gg/300/300' },
  { label: 'BUILD',     image: 'https://picsum.photos/seed/scs-hh/300/300' },
  { label: 'CONNECT',   image: 'https://picsum.photos/seed/scs-ii/300/300' },
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
  hidden:  { y: '110%' },
  visible: { y: '0%',    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  exit:    { y: '-110%', transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] } },
}

export default function InvertedSection() {
  const [hovered, setHovered] = useState(null)
  const current  = hovered ?? ITEMS[0]
  const isActive = hovered !== null

  return (
    <section className="inv-section">

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
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2.5 12.5L12.5 2.5M12.5 2.5H5.5M12.5 2.5V9.5"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        animate={{ color: isActive ? '#433079' : '#0a0a0a' }}
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
