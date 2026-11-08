import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/*
  createRoot finds the <div id="root"> in index.html and hands it to React.
  React then controls everything inside that div.

  Note: StrictMode is intentionally removed here. In development, StrictMode
  deliberately runs effects twice to catch bugs — but this breaks our intro
  animation (it would play twice). We'll add it back once we've refactored
  the animation to handle that gracefully.
*/
// Prevent the browser from restoring the previous scroll position on reload
history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(<App />)
