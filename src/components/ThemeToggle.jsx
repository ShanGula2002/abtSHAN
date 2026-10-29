import { useId } from 'react'
import { motion } from 'motion/react'
import { THEMES, useTheme } from '../context/theme.js'
import Icon from './Icon.jsx'
import './ThemeToggle.css'

const ICONS = { dark: 'moon', light: 'sun', white: 'square' }

// Three real radio buttons, so arrow keys and screen readers work as expected.
export default function ThemeToggle({ className = '' }) {
  const { theme, setTheme } = useTheme()
  const name = useId()

  const choose = (id, event) => {
    const box = event.currentTarget.closest('label')?.getBoundingClientRect()
    setTheme(id, box ? { x: box.left + box.width / 2, y: box.top + box.height / 2 } : undefined)
  }

  return (
    <fieldset className={`theme-toggle ${className}`}>
      <legend className="sr-only">Colour theme</legend>
      {THEMES.map((t) => {
        const active = theme === t.id
        return (
          <label key={t.id} className="theme-option" data-active={active || undefined}>
            <input
              type="radio"
              className="sr-only"
              name={name}
              value={t.id}
              checked={active}
              onChange={(event) => choose(t.id, event)}
            />
            {active && <motion.span layoutId={`theme-pill${name}`} className="theme-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <Icon name={ICONS[t.id]} size={15} />
            <span className="theme-label">{t.label}</span>
          </label>
        )
      })}
    </fieldset>
  )
}
