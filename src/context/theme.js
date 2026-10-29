import { createContext, useContext } from 'react'

export const THEMES = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'white', label: 'White' },
]

// The same key is read by the small script in index.html before the page paints.
export const THEME_STORAGE_KEY = 'kh-theme'

export const isTheme = (value) => THEMES.some((t) => t.id === value)

export const ThemeContext = createContext({ theme: 'dark', setTheme: () => {} })

export const useTheme = () => useContext(ThemeContext)
