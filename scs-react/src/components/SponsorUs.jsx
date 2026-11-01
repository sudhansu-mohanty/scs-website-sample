import { motion } from 'framer-motion'

const METRICS = [
  { value: '600+', label: 'Active Members' },
  { value: '20+', label: 'Events per Year' },
  { value: '5', label: 'Competition Teams' },
  { value: '10+', label: 'Years Running' },
]

// Replace these with real sponsor names/logos.
// Each item can be { name: 'Ubisoft', logo: '/sponsors/ubisoft.svg' }
// When a logo is provided, render <img src={s.logo} alt={s.name} /> instead of the text.
const SPONSORS = [
  { name: 'Ubisoft' },
  { name: 'CAE' },
  { name: 'Morgan Stanley' },
  { name: 'Deloitte' },
  { name: 'Unity' },
  { name: 'Intact' },
  { name: 'Bell' },
  { name: 'Genetec' },
  { name: 'Coveo' },
  { name: 'Lightspeed' },
  { name: 'BDC' },
  { name: 'Nasdaq' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function SponsorUs() {
  return (
    <section className="sp-section">
      {/* ── Top content ── */}
      <div className="sp-inner">
        {/* Heading */}
        <motion.h2
          className="sp-heading"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Support the next generation
          <br />
          of CS talent by Sponsoring SCS.
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          className="sp-sub"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Partnering with SCS puts your brand in front of hundreds of motivated
          computer science students at Concordia University — future engineers,
          designers, and founders actively looking for opportunities.
        </motion.p>

        {/* Metrics */}
        <motion.div
          className="sp-metrics"
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {METRICS.map((m) => (
            <div key={m.label} className="sp-metric">
              <span className="sp-metric-value">{m.value}</span>
              <span className="sp-metric-label">{m.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        {/* Replace href with the actual sponsorship package URL or file path */}
        <motion.a
          href="#"
          className="sp-cta"
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ gap: '16px' }}
        >
          View Sponsorship Package
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>

      {/* ── Previous sponsors marquee ── */}
      <div className="sp-marquee-section">
        <motion.p
          className="sp-marquee-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Previous Sponsors
        </motion.p>

        <div className="sp-marquee">
          {/* Two identical tracks create a seamless infinite loop */}
          <div className="sp-track">
            {[...SPONSORS, ...SPONSORS].map((s, i) => (
              <div key={i} className="sp-logo">
                {s.logo ? (
                  <img src={s.logo} alt={s.name} />
                ) : (
                  <span>{s.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
