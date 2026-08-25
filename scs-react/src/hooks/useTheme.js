import { useState } from 'react'
import { flushSync } from 'react-dom'

/*
  Custom hook — a function that starts with "use" and packages up
  state + logic so any component can use it without repeating code.

  This hook owns everything about theming:
    - the current theme value
    - how to toggle it
    - the view transition animation

  Usage in any component:
    const { theme, toggleTheme } = useTheme()
*/
export function useTheme() {
  /*
    useState — React's way of storing data that can change.
    The value passed in is the INITIAL state (runs once on mount).
    We read localStorage so the correct theme is set from the start.

    Returns [currentValue, setterFunction].
    When the setter is called, React re-renders any component using this state.
  */
  const [theme, setTheme] = useState(
    () => localStorage.getItem('scs-theme') || 'dark'
  )

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'

    if (document.startViewTransition) {
      /*
        View Transitions API needs the DOM to update synchronously inside
        its callback so it can diff old vs new. React normally batches and
        delays state updates — flushSync forces it to update immediately.
      */
      const t = document.startViewTransition(() => {
        flushSync(() => setTheme(next))
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem('scs-theme', next)
      })

      // Animate the circular wipe once the transition is ready
      t.ready.then(() => {
        document.documentElement.animate(
          { clipPath: ['circle(0% at 50% 0%)', 'circle(150% at 50% 0%)'] },
          {
            duration: 700,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
    } else {
      // Fallback for browsers that don't support View Transitions
      setTheme(next)
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('scs-theme', next)
    }
  }

  return { theme, toggleTheme }
}
