import { useCallback, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { THEME_STORAGE_KEY, ThemeContext, isTheme } from './theme.js'

const BROWSER_BAR = { dark: '#05070d', light: '#e9eef5', white: '#ffffff' }

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function ThemeProvider({ children }) {
  // index.html has already applied the saved theme (or dark) to <html>.
  const [theme, setThemeState] = useState(() => {
    const current = document.documentElement.dataset.theme
    return isTheme(current) ? current : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BROWSER_BAR[theme])
  }, [theme])

  // origin: the point the new theme grows from (the button that was pressed).
  const setTheme = useCallback((next, origin) => {
    if (!isTheme(next)) return
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }

    const apply = () => {
      document.documentElement.dataset.theme = next
      flushSync(() => setThemeState(next))
    }

    if (!document.startViewTransition || !origin || prefersReducedMotion()) {
      apply()
      return
    }

    // A circle of the new theme grows out of the pressed button.
    const { x, y } = origin
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(apply)
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => {})
  }, [])

  // Keep several open tabs in step.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === THEME_STORAGE_KEY && isTheme(event.newValue)) setThemeState(event.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])
  return <ThemeContext value={value}>{children}</ThemeContext>
}
