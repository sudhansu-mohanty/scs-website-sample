import { useState } from 'react'

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
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('scs-theme', next)
  }

  return { theme, toggleTheme }
}
