import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Tiers ──────────────────────────────────────────────────
const TIERS = [
  { id: 'president', label: 'Presidents' },
  { id: 'vp',        label: 'VPs' },
  { id: 'director',  label: 'Directors & Leads' },
]

// ── Filter teams ───────────────────────────────────────────
const TEAMS = [
  { id: 'all',          label: 'ALL TEAMS' },
  { id: 'presidents',   label: 'PRESIDENTS' },
  { id: 'external',     label: 'EXTERNAL' },
  { id: 'internal',     label: 'INTERNAL' },
  { id: 'academic',     label: 'ACADEMIC' },
  { id: 'social',       label: 'SOCIAL' },
  { id: 'competitions', label: 'COMPETITIONS' },
  { id: 'marketing',    label: 'MARKETING', subteams: ['ALL', 'DESIGN', 'CONTENT'] },
  { id: 'finance',      label: 'FINANCE' },
  { id: 'projects',     label: 'PROJECTS' },
]

// ── Members ─────────────────────────────────────────────────
// tier: 'president' | 'vp' | 'director'
// Replace stock images & placeholder links with real data.
const ALL_MEMBERS = [
  { name: 'Alex Chen',       role: 'Co-President',          tier: 'president', team: 'presidents',   bio: 'CS & Software Engineering double major. Leading SCS with a focus on industry connections and student growth.',                            email: 'alex.chen@example.com',       linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Maya Patel',      role: 'Co-President',          tier: 'president', team: 'presidents',   bio: 'Specializing in AI and distributed systems. Passionate about making CS education accessible to every Concordia student.',               email: 'maya.patel@example.com',      linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/44.jpg' },

  { name: 'Jordan Kim',      role: 'VP External',           tier: 'vp',        team: 'external',     bio: 'Building bridges between SCS and the tech industry. Previously interned at two Fortune 500 companies.',                                email: 'jordan.kim@example.com',      linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/15.jpg' },
  { name: 'Liam Thompson',   role: 'VP Internal',           tier: 'vp',        team: 'internal',     bio: 'Keeping SCS running behind the scenes — from logistics to governance and everything in between.',                                      email: 'liam.thompson@example.com',   linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/41.jpg' },

  { name: 'Sarah Nguyen',    role: 'External Relations',    tier: 'director',  team: 'external',     bio: 'Coordinating partnerships and outreach programs that connect students to real-world opportunities.',                                   email: 'sarah.nguyen@example.com',    linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Carlos Rivera',   role: 'Sponsorship Lead',      tier: 'director',  team: 'external',     bio: 'Securing the funding that keeps our events free and our community thriving.',                                                          email: 'carlos.rivera@example.com',   linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/29.jpg' },
  { name: 'Priya Shah',      role: 'Industry Liaison',      tier: 'director',  team: 'external',     bio: 'Maintaining relationships with alumni and professionals to create mentorship opportunities for students.',                             email: 'priya.shah@example.com',      linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/31.jpg' },

  { name: 'Emma Dubois',     role: 'Internal Affairs',      tier: 'director',  team: 'internal',     bio: 'Managing internal communications and ensuring every team has what they need to succeed.',                                             email: 'emma.dubois@example.com',     linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/19.jpg' },
  { name: 'Noah Martin',     role: 'Secretary',             tier: 'director',  team: 'internal',     bio: 'Documenting decisions, coordinating meetings, and making sure nothing falls through the cracks.',                                     email: 'noah.martin@example.com',     linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/53.jpg' },

  { name: 'Sophia Larsson',  role: 'Academic Events Lead',  tier: 'director',  team: 'academic',     bio: 'Designing programs that sharpen technical skills and prepare students for the job market.',                                           email: 'sophia.larsson@example.com',  linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/67.jpg' },
  { name: 'Daniel Park',     role: 'Workshop Coordinator',  tier: 'director',  team: 'academic',     bio: 'Organising hands-on sessions across web dev, data structures, ML, and more.',                                                        email: 'daniel.park@example.com',     linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/63.jpg' },
  { name: 'Isabella Moore',  role: 'Mentorship Coord.',     tier: 'director',  team: 'academic',     bio: 'Matching students with industry mentors who provide guidance and career advice.',                                                     email: 'isabella.moore@example.com',  linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/57.jpg' },
  { name: 'Ethan Wilson',    role: 'Guest Speaker Manager', tier: 'director',  team: 'academic',     bio: 'Curating a lineup of speakers from top tech companies for panels and info nights.',                                                   email: 'ethan.wilson@example.com',    linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/71.jpg' },

  { name: 'Ava Johnson',     role: 'Social Events Lead',    tier: 'director',  team: 'social',       bio: 'Creating the social glue that holds the SCS community together — one event at a time.',                                              email: 'ava.johnson@example.com',     linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/9.jpg' },
  { name: 'Oliver Davis',    role: 'Events Coordinator',    tier: 'director',  team: 'social',       bio: 'Handling the on-the-ground logistics that make every social event smooth and memorable.',                                            email: 'oliver.davis@example.com',    linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { name: 'Amelia Brown',    role: 'Community Manager',     tier: 'director',  team: 'social',       bio: 'Growing the SCS community online and offline, making sure every student feels welcome.',                                             email: 'amelia.brown@example.com',    linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/12.jpg' },

  { name: 'Lucas Garcia',    role: 'Competitions Lead',     tier: 'director',  team: 'competitions', bio: 'Overseeing all competition initiatives and building a culture of technical excellence at Concordia.',                                email: 'lucas.garcia@example.com',    linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/89.jpg' },
  { name: 'Charlotte Lewis', role: 'Hackathon Coordinator', tier: 'director',  team: 'competitions', bio: 'Organising Hello World and connecting students to hackathon opportunities across North America.',                                     email: 'charlotte.lewis@example.com', linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/45.jpg' },
  { name: 'Benjamin Hall',   role: 'CS Games Director',     tier: 'director',  team: 'competitions', bio: "Running tryouts and preparing Concordia's team for the national CS Games competition every March.",                                  email: 'benjamin.hall@example.com',   linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/77.jpg' },
  { name: 'Mia Clark',       role: 'CyberSci Lead',         tier: 'director',  team: 'competitions', bio: 'Leading the charge in cybersecurity competitions including CyberSci and NorthSec CTF.',                                              email: 'mia.clark@example.com',       linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { name: 'Henry Young',     role: 'ICPC Coordinator',      tier: 'director',  team: 'competitions', bio: "Coordinating Concordia's ICPC team — from fall tryouts to the worldwide competition stage.",                                        email: 'henry.young@example.com',     linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/83.jpg' },

  { name: 'Lily Adams',      role: 'Marketing Lead',        tier: 'director',  team: 'marketing', subteam: 'ALL',     bio: "Directing the full marketing strategy to amplify SCS's presence on campus and beyond.",                             email: 'lily.adams@example.com',      linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/26.jpg' },
  { name: 'James Wright',    role: 'Head of Design',        tier: 'director',  team: 'marketing', subteam: 'DESIGN',  bio: 'Leading the visual identity of SCS — every poster, banner, and pixel is in his hands.',                             email: 'james.wright@example.com',    linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/35.jpg' },
  { name: 'Grace Scott',     role: 'Graphic Designer',      tier: 'director',  team: 'marketing', subteam: 'DESIGN',  bio: "Crafting the visuals that tell SCS's story across print and digital channels.",                                     email: 'grace.scott@example.com',     linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/48.jpg' },
  { name: 'Ryan Torres',     role: 'UI/UX Designer',        tier: 'director',  team: 'marketing', subteam: 'DESIGN',  bio: 'Designing digital experiences that are both beautiful and intuitive for students.',                                  email: 'ryan.torres@example.com',     linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/50.jpg' },
  { name: 'Zoe Mitchell',    role: 'Head of Content',       tier: 'director',  team: 'marketing', subteam: 'CONTENT', bio: 'Shaping the voice of SCS through campaigns, announcements, and storytelling.',                                      email: 'zoe.mitchell@example.com',    linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/58.jpg' },
  { name: 'Tyler Perez',     role: 'Social Media Manager',  tier: 'director',  team: 'marketing', subteam: 'CONTENT', bio: "Growing SCS's online community and keeping students in the loop across all platforms.",                             email: 'tyler.perez@example.com',     linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/62.jpg' },
  { name: 'Chloe Roberts',   role: 'Copywriter',            tier: 'director',  team: 'marketing', subteam: 'CONTENT', bio: 'Writing the words that move people — from event descriptions to sponsorship proposals.',                            email: 'chloe.roberts@example.com',   linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/70.jpg' },

  { name: 'Nathan Campbell', role: 'Finance Lead',          tier: 'director',  team: 'finance',      bio: "Managing SCS's budget to ensure every team has the resources to run world-class events.",                                           email: 'nathan.campbell@example.com', linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/88.jpg' },
  { name: 'Victoria Evans',  role: 'Treasurer',             tier: 'director',  team: 'finance',      bio: "Tracking expenditures and keeping SCS's finances transparent and accountable.",                                                     email: 'victoria.evans@example.com',  linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/77.jpg' },
  { name: 'William Turner',  role: 'Budget Analyst',        tier: 'director',  team: 'finance',      bio: 'Analysing spending trends and helping teams plan events within their allocations.',                                                  email: 'william.turner@example.com',  linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/91.jpg' },

  { name: 'Ella Phillips',   role: 'Projects Director',     tier: 'director',  team: 'projects',     bio: 'Driving the upcoming projects division — turning student ideas into real, shipped products.',                                       email: 'ella.phillips@example.com',   linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/85.jpg' },
  { name: 'Jack Cooper',     role: 'Lead Developer',        tier: 'director',  team: 'projects',     bio: 'Architecting the technical foundations for SCS student-built projects.',                                                            email: 'jack.cooper@example.com',     linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/men/92.jpg' },
  { name: 'Sophie Bailey',   role: 'Product Manager',       tier: 'director',  team: 'projects',     bio: 'Keeping projects on track from ideation to launch with clear goals and timelines.',                                                 email: 'sophie.bailey@example.com',   linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/92.jpg' },
  { name: 'Lena Fischer',    role: 'Full-Stack Developer',  tier: 'director',  team: 'projects',     bio: 'Building across the stack — from databases to polished user interfaces.',                                                           email: 'lena.fischer@example.com',    linkedin: '#', link: '#', image: 'https://randomuser.me/api/portraits/women/95.jpg' },
]

// ── Icons ──────────────────────────────────────────────────
const IconEmail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const IconLinkedIn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const IconLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)
const IconFilter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
)

// ── Animation variants ─────────────────────────────────────
const wordVariants = {
  visible: { transition: { staggerChildren: 0.04 } },
  exit:    { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
}
const charVariants = {
  hidden:  { y: '110%' },
  visible: { y: '0%',    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
  exit:    { y: '-110%', transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] } },
}

// ── MemberCard ─────────────────────────────────────────────
function MemberCard({ member, isFlipped, onFlip }) {
  const stopAndFlip = (e) => { e.stopPropagation(); onFlip() }

  return (
    <motion.div
      layout
      className="mtt-card-scene"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`mtt-card-inner${isFlipped ? ' is-flipped' : ''}`}
        onClick={onFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onFlip()}
        aria-label={`View ${member.name}'s profile`}
      >
        {/* Front */}
        <div className="mtt-card-front">
          <div className="mtt-card-photo-wrap">
            <img src={member.image} alt={member.name} className="mtt-card-photo" />
            {member.subteam && member.subteam !== 'ALL' && (
              <span className="mtt-card-sub-badge">{member.subteam}</span>
            )}
          </div>
          <div className="mtt-card-info">
            <h4 className="mtt-card-name">{member.name}</h4>
            <p className="mtt-card-role">{member.role}</p>
          </div>
          <div className="mtt-card-socials" onClick={(e) => e.stopPropagation()}>
            <a href={`mailto:${member.email}`} className="mtt-social-btn" title="Email"><IconEmail /></a>
            <a href={member.linkedin} target="_blank" rel="noreferrer" className="mtt-social-btn" title="LinkedIn"><IconLinkedIn /></a>
            <a href={member.link} target="_blank" rel="noreferrer" className="mtt-social-btn" title="Link"><IconLink /></a>
          </div>
          <span className="mtt-flip-hint">click to learn more</span>
        </div>

        {/* Back */}
        <div className="mtt-card-back">
          <button className="mtt-card-close" onClick={stopAndFlip} aria-label="Flip back">✕</button>
          <img src={member.image} alt={member.name} className="mtt-back-photo" />
          <div className="mtt-back-info">
            <h4 className="mtt-card-name">{member.name}</h4>
            <p className="mtt-card-role">{member.role}</p>
          </div>
          <p className="mtt-back-bio">{member.bio}</p>
          <div className="mtt-back-socials" onClick={(e) => e.stopPropagation()}>
            <a href={`mailto:${member.email}`} className="mtt-back-social-btn" title="Email"><IconEmail /></a>
            <a href={member.linkedin} target="_blank" rel="noreferrer" className="mtt-back-social-btn" title="LinkedIn"><IconLinkedIn /></a>
            <a href={member.link} target="_blank" rel="noreferrer" className="mtt-back-social-btn" title="Link"><IconLink /></a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main ───────────────────────────────────────────────────
export default function MeetTheTeam() {
  const [activeTeam,    setActiveTeam]    = useState(TEAMS[0])
  const [activeSubteam, setActiveSubteam] = useState('ALL')
  const [filterOpen,    setFilterOpen]    = useState(false)
  const [flipped,       setFlipped]       = useState({})

  const handleTeamChange = (team) => {
    setActiveTeam(team)
    setActiveSubteam('ALL')
    setFlipped({})
  }

  const handleSubteamChange = (sub) => {
    setActiveSubteam(sub)
    setFlipped({})
  }

  const clearFilter = (e) => {
    e.stopPropagation()
    setActiveTeam(TEAMS[0])
    setActiveSubteam('ALL')
    setFlipped({})
  }

  const toggleFlip = (name) =>
    setFlipped((prev) => ({ ...prev, [name]: !prev[name] }))

  const isFiltered = activeTeam.id !== 'all'

  const visibleMembers = ALL_MEMBERS.filter((m) => {
    if (!isFiltered) return true
    if (m.team !== activeTeam.id) return false
    if (activeTeam.subteams && activeSubteam !== 'ALL') {
      return m.subteam === activeSubteam || m.subteam === 'ALL'
    }
    return true
  })

  const filterLabel = activeTeam.subteams && activeSubteam !== 'ALL'
    ? activeSubteam
    : activeTeam.label

  return (
    <section className="mtt-section">

      {/* ── Heading ── */}
      <motion.h2
        className="mtt-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true }}
      >
        Meet the Team
      </motion.h2>

      {/* ── Group photo ── */}
      {/* Replace src with your actual team photo, e.g. "/team-photo.jpg" */}
      <motion.div
        className="mtt-group-photo"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <img src="https://picsum.photos/seed/scs-team-banner/1400/480" alt="SCS Team" />
        <div className="mtt-group-photo-overlay" />
        <div className="mtt-group-photo-tag">SCS 2024–25</div>
      </motion.div>

      {/* ── Big animated display label ── */}
      <div className="mtt-display-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTeam.id + activeSubteam}
            className="mtt-display"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filterLabel.split('').map((char, i) => (
              <span key={i} className="he-char-wrap">
                <motion.span className="he-char" variants={charVariants}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Filter toggle button ── */}
      <div className="mtt-filter-wrap">
        <button
          className={`mtt-filter-btn${filterOpen ? ' open' : ''}${isFiltered ? ' active' : ''}`}
          onClick={() => setFilterOpen((v) => !v)}
        >
          <IconFilter />
          {isFiltered ? filterLabel : 'FILTER'}
          {isFiltered && (
            <span className="mtt-filter-clear" onClick={clearFilter} title="Clear filter">✕</span>
          )}
          <motion.span
            className="mtt-filter-chevron"
            animate={{ rotate: filterOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            ▾
          </motion.span>
        </button>

        {/* ── Filter panel (slides down) ── */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              className="mtt-filter-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mtt-tabs">
                {TEAMS.map((team) => (
                  <button
                    key={team.id}
                    className={`mtt-tab${activeTeam.id === team.id ? ' active' : ''}`}
                    onClick={() => handleTeamChange(team)}
                  >
                    {team.label}
                    {team.subteams && (
                      <span className="mtt-tab-badge">{team.subteams.length - 1}</span>
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {activeTeam.subteams && (
                  <motion.div
                    className="mtt-subtabs"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {activeTeam.subteams.map((sub) => (
                      <button
                        key={sub}
                        className={`mtt-subtab${activeSubteam === sub ? ' active' : ''}`}
                        onClick={() => handleSubteamChange(sub)}
                      >
                        {sub}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Tier boxes ── */}
      <div className="mtt-tiers">
        {TIERS.map((tier) => {
          const members = visibleMembers.filter((m) => m.tier === tier.id)
          if (!members.length) return null
          return (
            <div key={tier.id} className="mtt-tier-box">
              <p className="mtt-tier-label">{tier.label}</p>
              <motion.div className="mtt-tier-grid" layout>
                <AnimatePresence mode="popLayout">
                  {members.map((member) => (
                    <MemberCard
                      key={member.name}
                      member={member}
                      isFlipped={!!flipped[member.name]}
                      onFlip={() => toggleFlip(member.name)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
