import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useBrand } from '../context/brand.js'
import { site } from '../data/site.js'
import { EASE_OUT } from '../lib/motion.js'
import logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle.jsx'
import Magnetic from './Magnetic.jsx'
import Icon from './Icon.jsx'
import './Navbar.css'

const LINKS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/#about' },
  { id: 'work', label: 'Work', to: '/#work' },
]

export default function Navbar() {
  const { logoTargetRef, logoVisible, activeSection } = useBrand()
  const { pathname, key } = useLocation()
  // The menu remembers the navigation it was opened on, so any navigation closes it.
  const [openedAt, setOpenedAt] = useState(null)
  const open = openedAt === key
  const setOpen = (value) => setOpenedAt(value ? key : null)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 16))

  const active = pathname === '/' ? activeSection : pathname.startsWith('/work') ? 'work' : null

  // Escape or a tap outside closes the menu; opening it moves focus to the first link.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpenedAt(null)
        buttonRef.current?.focus()
      }
    }
    const onPointer = (event) => {
      if (!menuRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) setOpenedAt(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    menuRef.current?.querySelector('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  // Growing the window to desktop width closes the mobile menu.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)')
    const onChange = (event) => event.matches && setOpen(false)
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  // The travelling hero photo steps aside while the menu is open.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-menu-open', open)
    return () => document.documentElement.removeAttribute('data-menu-open')
  }, [open])

  return (
    <>
      <header className="nav" data-solid={scrolled || open || undefined}>
        <div className="nav-inner">
          <button
            ref={buttonRef}
            type="button"
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="burger" data-open={open || undefined} aria-hidden="true">
              <span />
              <span />
            </span>
            <span>{open ? 'Close' : 'Menu'}</span>
          </button>

          <nav className="nav-links" aria-label="Main">
            <ul>
              {LINKS.map((link) => (
                <li key={link.id}>
                  <Link to={link.to} className="nav-link" aria-current={active === link.id ? 'true' : undefined}>
                    {active === link.id && (
                      <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="nav-link-text">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <ThemeToggle className="nav-theme" />
            <Magnetic className="nav-email">
              <a className="btn btn-primary btn-sm" href={`mailto:${site.email}`}>
                <Icon name="mail" size={16} />
                Email me
              </a>
            </Magnetic>
            <Link to="/" className="nav-logo" aria-label={`${site.name}, home`}>
              <span className="logo-badge" ref={logoTargetRef}>
                <motion.img className="logo-art" src={logo} alt="" width="462" height="540" style={{ opacity: logoVisible }} />
              </span>
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.16 } }}
            transition={{ duration: 0.26, ease: EASE_OUT }}
          >
            <nav aria-label="Mobile">
              <ul>
                {LINKS.map((link) => (
                  <li key={link.id}>
                    <Link to={link.to} className="mobile-link" aria-current={active === link.id ? 'true' : undefined}>
                      {link.label}
                      <Icon name="arrowRight" size={20} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mobile-menu-foot">
              <ThemeToggle />
              <a className="btn btn-primary" href={`mailto:${site.email}`}>
                <Icon name="mail" size={18} />
                Email me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
