import { useState, useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import IntroOverlay from './components/IntroOverlay'
import Hero from './components/Hero'
// import CursorCircle from './components/CursorCircle'
import AboutUs from './components/AboutUs'

/*
  App is the root component — it owns the state that multiple
  child components need to share.

  State that lives here:
    - theme / toggleTheme  (via useTheme hook)
    - showIntro            (should we render the intro overlay?)
    - handsIn / textIn     (trigger animations in Hero after intro)

  This pattern — keeping shared state at the top and passing it down
  as props — is called "lifting state up". It's a core React pattern.
*/
export default function App() {
  const { theme, toggleTheme } = useTheme()

  const [showIntro, setShowIntro] = useState(true)

  /*
    Hands and text start hidden and animate in after the intro ends.
  */
  const [handsIn, setHandsIn] = useState(false)
  const [textIn, setTextIn] = useState(false)

  /*
    useEffect to lock/unlock scroll.
    Runs whenever showIntro changes.
  */
  useEffect(() => {
    if (showIntro) {
      document.body.classList.add('intro-loading')
    } else {
      document.body.classList.remove('intro-loading')
    }
  }, [showIntro])

  /*
    Called by IntroOverlay when its fade-out transition ends.
    We update state here — React re-renders automatically.
  */
  const handleIntroComplete = () => {
    setShowIntro(false)
    setHandsIn(true)
    setTextIn(true)
  }

  return (
    <>
      {/*
        Conditional rendering — IntroOverlay only exists in the DOM
        while showIntro is true. When setShowIntro(false) is called,
        React removes it entirely. No display:none hacks needed.
      */}
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}

      <Navbar theme={theme} onToggle={toggleTheme} />

      <Hero handsIn={handsIn} textIn={textIn} />

      <AboutUs />

      {/* <CursorCircle /> */}
    </>
  )
}
