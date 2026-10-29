import { useEffect, useLayoutEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE_OUT } from '../lib/motion.js'
import Icon from './Icon.jsx'
import './Modal.css'

const PANEL_MOTION = {
  initial: { opacity: 0, scale: 0.96, y: 14 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.18 } },
  transition: { duration: 0.36, ease: EASE_OUT },
}

// A native <dialog>: the browser traps focus inside it, makes the page behind inert
// and closes it on Escape. Clicking the dark backdrop closes it too.
// panelMotion replaces the panel's default entrance and exit (initial, animate, exit, transition).
export default function Modal({ open, onClose, labelledBy, className = '', onKeyDown, panelMotion, children }) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog onClose={onClose} labelledBy={labelledBy} className={className} onKeyDown={onKeyDown} panelMotion={panelMotion}>
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  )
}

function Dialog({ onClose, labelledBy, className, onKeyDown, panelMotion = PANEL_MOTION, children }) {
  const ref = useRef(null)
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useLayoutEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement
    const root = document.documentElement
    const overflow = root.style.overflow
    if (!dialog.open) dialog.showModal()
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = overflow
      if (dialog.open) dialog.close()
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true })
    }
  }, [])

  return (
    <motion.dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault()
        closeRef.current()
      }}
      // If the browser closes the dialog on its own (a double Escape), keep React in step.
      // A close event can arrive late, after the dialog has opened again (React's development
      // mode mounts it twice), so only an actually closed dialog counts.
      onClose={(event) => {
        if (!event.currentTarget.open) closeRef.current()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeRef.current()
      }}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
    >
      <motion.div className="modal-panel" {...panelMotion}>
        <button type="button" className="modal-close" onClick={() => closeRef.current()}>
          <Icon name="close" size={20} />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </motion.div>
    </motion.dialog>
  )
}
