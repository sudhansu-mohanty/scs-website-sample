import { useEffect, useRef } from 'react'

/*
  A good example of when useRef + useEffect replaces vanilla JS event listeners.

  Old vanilla approach:
    const circle = document.getElementById('cursor-invert')
    document.addEventListener('mousemove', (e) => { circle.style.left = ... })

  React approach:
    - useRef gives us a reference to the div without querying the DOM
    - useEffect sets up the listeners after render and cleans them up on unmount
      (preventing memory leaks — something vanilla JS often forgets to handle)
*/
export default function CursorCircle() {
  const ref = useRef(null)

  useEffect(() => {
    const circle = ref.current

    const handleMove = (e) => {
      circle.style.left = e.clientX + 'px'
      circle.style.top = e.clientY + 'px'
    }

    const handleLeave = () => {
      circle.style.left = '-200px'
      circle.style.top = '-200px'
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)

    // Cleanup removes listeners when the component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, []) // [] = run once on mount only

  return <div id="cursor-invert" ref={ref} />
}
