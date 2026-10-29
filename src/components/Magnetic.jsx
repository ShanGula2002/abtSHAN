import { useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'

// Pulls its child slightly toward the mouse pointer. Touch and reduced motion get a still button.
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const spring = { stiffness: 260, damping: 20, mass: 0.5 }
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span ref={ref} className={`magnetic ${className}`} style={{ x, y }} onPointerMove={onPointerMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  )
}
