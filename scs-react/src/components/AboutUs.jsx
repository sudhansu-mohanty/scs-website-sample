import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutUs() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const textEl = textRef.current
    if (!section || !heading || !textEl) return

    // Split each span's text into individual word spans
    const spans = textEl.querySelectorAll('span.white, span.muted')
    spans.forEach((span) => {
      const words = span.textContent.trim().split(/\s+/)
      span.innerHTML = words
        .map((w) => `<span class="about-word">${w}</span>`)
        .join(' ')
    })

    const allWords = textEl.querySelectorAll('.about-word')

    // Scroll-pinned word reveal
    const wordTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=' + window.innerHeight * 1.5,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        allWords.forEach((word, i) => {
          word.classList.toggle('lit', progress > i / allWords.length)
        })
      },
    })

    // Heading slide-in on scroll
    const headingAnim = gsap.from(heading, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        end: 'top 20%',
        scrub: true,
      },
    })

    return () => {
      wordTrigger.kill()
      headingAnim.scrollTrigger?.kill()
      headingAnim.kill()
    }
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-inner">
        <div>
          <h2 className="about-heading" ref={headingRef}>
            About Us
          </h2>
        </div>
        <div>
          <p className="about-text" ref={textRef}>
            <span className="white">
              We are the Software Engineering and Computer Science Society at
              Concordia University — a student-run organization built by and for
              CS and SE students.
            </span>
            <span className="muted">
              Our mission is to bridge the gap between students and the tech
              industry, fostering collaboration, growth, and community through
              events, hackathons, and workshops.
            </span>
            <span className="muted">
              Whether you&apos;re a first-year finding your footing or a senior
              preparing to launch your career, SCS Concordia is your home on
              campus.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
