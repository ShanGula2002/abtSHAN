import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useIsPresent, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { useBrand } from '../context/brand.js'
import { EASE_EXPO, EASE_IN_OUT, clamp, easeInCubic, easeInOutCubic, easeOutQuad, lerp } from '../lib/motion.js'
import photo from '../assets/photo1.png'
import logo from '../assets/logo.png'

// How it works
// ------------
// The hero keeps an empty "slot" where the portrait belongs. This component draws the
// portrait in a fixed layer on top of that slot. As the visitor scrolls (progress 0 → 1)
// the layer travels from the slot to the round badge in the navbar, its arch frame
// becomes a circle, a scan line "digitises" the photo, and the logo spins into place.
// At the very end the real navbar logo takes over and this layer hides, so there is
// only ever one logo on screen. Scrolling back up plays it in reverse.

const ARRIVE = 0.9 // the layer reaches the badge here
const DOCKED = 0.995 // the real navbar logo takes over here

// The still version of the portrait, used when the visitor prefers reduced motion.
export function Portrait() {
  return (
    <div className="portrait">
      <div className="portrait-backdrop" />
      <img className="portrait-photo" src={photo} alt="" width="433" height="577" />
      <div className="portrait-scanlines" />
      <div className="portrait-bezel" />
    </div>
  )
}

export default function PhotoLogoTransition({ slotRef, progress }) {
  const { logoTargetRef, logoVisible } = useBrand()
  const isPresent = useIsPresent()
  const present = useRef(true)
  const geo = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const width = useMotionValue(0)
  const height = useMotionValue(0)
  const radiusTop = useMotionValue(0)
  const radiusBottom = useMotionValue(0)
  const layerOpacity = useMotionValue(0)

  // What happens inside the frame along the way.
  const backdropOpacity = useTransform(progress, [0.25, 0.75], [1, 0])
  const badgeOpacity = useTransform(progress, [0.25, 0.75], [0, 1])
  const photoOpacity = useTransform(progress, [0.45, 0.82], [1, 0])
  const photoScale = useTransform(progress, [0, 0.6], [1, 1.12])
  const photoFilter = useTransform(progress, (p) => {
    const grey = clamp((p - 0.3) / 0.3)
    const glow = clamp((p - 0.45) / 0.35)
    return `grayscale(${grey}) brightness(${1 + glow * 0.5}) blur(${glow * 6}px)`
  })
  const logoOpacity = useTransform(progress, [0.55, 0.85], [0, 1])
  const logoScale = useTransform(progress, [0.55, ARRIVE], [0.35, 1])
  const logoRotate = useTransform(progress, [0.55, ARRIVE], [-160, 0])
  const sweepY = useTransform(progress, [0.3, 0.78], ['-120%', '120%'])
  const sweepOpacity = useTransform(progress, [0.28, 0.34, 0.72, 0.8], [0, 1, 1, 0])
  const bezelOpacity = useTransform(progress, [0.8, ARRIVE], [1, 0])
  const ringScale = useTransform(progress, [0.86, 0.98], [1, 1.9])
  const ringOpacity = useTransform(progress, [0.86, 0.9, 0.98], [0, 0.9, 0])

  const update = useCallback(() => {
    const g = geo.current
    if (!g) return
    const p = progress.get()
    const t = clamp(p / ARRIVE)
    // The photo lifts off where it sits (the page scrolls on beneath it), shrinks early,
    // and glides on a straight line from the hero to the badge.
    const travel = easeInOutCubic(t)
    const shrink = easeOutQuad(t)
    const w = lerp(g.slotW, g.badge, shrink)
    const h = lerp(g.slotH, g.badge, shrink)
    const cx = lerp(g.slotX + g.slotW / 2, g.badgeX + g.badge / 2, travel)
    const cy = lerp(g.slotY + g.slotH / 2, g.badgeY + g.badge / 2, travel)

    x.set(cx - w / 2)
    y.set(cy - h / 2)
    width.set(w)
    height.set(h)
    radiusTop.set(w / 2)
    radiusBottom.set(lerp(g.slotRadius, g.badge / 2, easeInCubic(t)))

    const docked = p >= DOCKED || !present.current
    layerOpacity.set(docked ? 0 : 1)
    logoVisible.set(docked ? 1 : 0)
    if (logoTargetRef.current) logoTargetRef.current.dataset.state = docked ? 'docked' : 'waiting'
  }, [progress, x, y, width, height, radiusTop, radiusBottom, layerOpacity, logoVisible, logoTargetRef])

  const measure = useCallback(() => {
    const slot = slotRef.current
    const badge = logoTargetRef.current
    if (!slot || !badge) return
    const s = slot.getBoundingClientRect()
    const b = badge.getBoundingClientRect()
    if (!s.width || !b.width) return
    // offsetWidth ignores the badge's hover scale; centre the untransformed size on the box.
    const size = badge.offsetWidth
    geo.current = {
      slotX: s.left,
      slotY: s.top + window.scrollY,
      slotW: s.width,
      slotH: s.height,
      slotRadius: parseFloat(getComputedStyle(slot).borderBottomLeftRadius) || 24,
      badgeX: b.left + b.width / 2 - size / 2,
      badgeY: b.top + b.height / 2 - size / 2,
      badge: size,
    }
    update()
  }, [slotRef, logoTargetRef, update])

  useLayoutEffect(() => {
    measure()
    const observer = new ResizeObserver(measure)
    if (slotRef.current) observer.observe(slotRef.current)
    observer.observe(document.body)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, slotRef])

  useMotionValueEvent(progress, 'change', update)

  // While the home page is leaving, hand over to the navbar logo straight away.
  useEffect(() => {
    present.current = isPresent
    update()
  }, [isPresent, update])

  // Leaving the home page: the navbar logo always shows on other pages.
  useEffect(
    () => () => {
      logoVisible.set(1)
      if (logoTargetRef.current) delete logoTargetRef.current.dataset.state
    },
    [logoVisible, logoTargetRef],
  )

  return createPortal(
    <motion.div
      className="flyer"
      aria-hidden="true"
      style={{
        x,
        y,
        width,
        height,
        opacity: layerOpacity,
        borderTopLeftRadius: radiusTop,
        borderTopRightRadius: radiusTop,
        borderBottomLeftRadius: radiusBottom,
        borderBottomRightRadius: radiusBottom,
      }}
    >
      <motion.div className="flyer-outline" style={{ opacity: badgeOpacity }} />
      <motion.div
        className="flyer-frame"
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.1, delay: 0.1, ease: EASE_IN_OUT }}
      >
        <motion.div className="portrait-backdrop" style={{ opacity: backdropOpacity }} />
        <motion.div className="badge-skin" style={{ opacity: badgeOpacity }} />
        <motion.div
          className="flyer-photo"
          initial={{ scale: 1.14, filter: 'blur(8px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, delay: 0.1, ease: EASE_EXPO }}
        >
          <motion.img className="portrait-photo" src={photo} alt="" style={{ opacity: photoOpacity, scale: photoScale, filter: photoFilter }} />
        </motion.div>
        <motion.img className="logo-art flyer-logo" src={logo} alt="" style={{ opacity: logoOpacity, scale: logoScale, rotate: logoRotate }} />
        <motion.div className="flyer-sweep" style={{ y: sweepY, opacity: sweepOpacity }} />
        <div className="portrait-scanlines" />
        <motion.div className="portrait-bezel" style={{ opacity: bezelOpacity }} />
        {/* A bright line rides the edge of the opening reveal. */}
        <motion.div
          className="flyer-load-scan"
          initial={{ y: '100%', opacity: 1 }}
          animate={{ y: '0%', opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE_IN_OUT, opacity: { duration: 0.3, delay: 1.05 } }}
        />
      </motion.div>
      <motion.div className="flyer-ring" style={{ scale: ringScale, opacity: ringOpacity }} />
    </motion.div>,
    document.body,
  )
}
