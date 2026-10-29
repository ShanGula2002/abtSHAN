import { useMemo, useRef, useState } from 'react'
import { useMotionValue } from 'motion/react'
import { BrandContext } from './brand.js'

export default function BrandProvider({ children }) {
  const logoTargetRef = useRef(null)
  const logoVisible = useMotionValue(1)
  const [activeSection, setActiveSection] = useState('home')

  const value = useMemo(
    () => ({ logoTargetRef, logoVisible, activeSection, setActiveSection }),
    [logoVisible, activeSection],
  )
  return <BrandContext value={value}>{children}</BrandContext>
}
