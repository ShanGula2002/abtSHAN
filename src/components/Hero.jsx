import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router'
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { site } from '../data/site.js'
import { EASE_EXPO, EASE_OUT, clamp } from '../lib/motion.js'
import PhotoLogoTransition, { Portrait } from './PhotoLogoTransition.jsx'
import Magnetic from './Magnetic.jsx'
import Sparkle from './Sparkle.jsx'
import Icon from './Icon.jsx'
import './Hero.css'

// Sparkle positions in percent of the hero, with size and twinkle delay.
const STARS = [
  { x: 6, y: 22, s: 18, d: 0 },
  { x: 17, y: 62, s: 10, d: 1.4 },
  { x: 29, y: 14, s: 12, d: 2.6 },
  { x: 38, y: 78, s: 9, d: 0.8 },
  { x: 61, y: 10, s: 14, d: 2 },
  { x: 71, y: 70, s: 11, d: 3.1 },
  { x: 84, y: 30, s: 20, d: 1.1 },
  { x: 93, y: 58, s: 10, d: 2.3 },
  { x: 52, y: 88, s: 12, d: 0.4 },
  { x: 76, y: 90, s: 8, d: 1.8 },
]

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
})

export default function Hero() {
  const heroRef = useRef(null)
  const slotRef = useRef(null)
  const statusRef = useRef(null)
  const percentRef = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(heroRef)

  // Morph progress: 0 at the top of the page, 1 after about 60% of a screen of scrolling.
  const progress = useMotionValue(0)
  const distance = useRef(600)
  const { scrollY } = useScroll()

  useLayoutEffect(() => {
    const measure = () => {
      distance.current = Math.max(280, window.innerHeight * 0.6)
      progress.set(clamp(window.scrollY / distance.current))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [progress])

  useMotionValueEvent(scrollY, 'change', (value) => progress.set(clamp(value / distance.current)))

  // The little "identity.exe" window reports the transformation as it happens.
  const meter = useTransform(progress, [0, 1], [0.04, 1])
  useMotionValueEvent(progress, 'change', (p) => {
    if (percentRef.current) percentRef.current.textContent = `${Math.round(p * 100)}%`
    if (statusRef.current) statusRef.current.textContent = p >= 0.99 ? 'Logo docked' : p > 0 ? 'Transforming…' : 'Scroll to transform'
  })

  // A soft light and the floating windows follow the mouse a little.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20 })
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20 })
  const panelX = useTransform(smoothX, (v) => v * -0.018)
  const panelY = useTransform(smoothY, (v) => v * -0.018)
  const spotX = useTransform(smoothX, (v) => v - 320)
  const spotY = useTransform(smoothY, (v) => v - 320)

  useLayoutEffect(() => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (rect) {
      pointerX.jump(rect.width * 0.5)
      pointerY.jump(rect.height * 0.4)
    }
  }, [pointerX, pointerY])

  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse' || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    pointerX.set(event.clientX - rect.left)
    pointerY.set(event.clientY - rect.top)
  }

  const name = site.name.split(' ')
  let charIndex = 0

  return (
    <section id="home" ref={heroRef} className="hero" data-paused={!inView || undefined} aria-labelledby="hero-title" onPointerMove={onPointerMove}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-aurora" />
        <div className="hero-floor" />
        <div className="hero-dust" />
        {STARS.map((star, i) => (
          <Sparkle key={i} size={star.s} className="hero-star" style={{ left: `${star.x}%`, top: `${star.y}%`, animationDelay: `${star.d}s` }} />
        ))}
        <motion.div className="hero-spot" style={{ x: spotX, y: spotY }} />
        <div className="hero-scanlines" />
      </div>

      <div className="hero-inner">
        <h1 id="hero-title" className="hero-name">
          <span className="sr-only">{site.name}</span>
          <span aria-hidden="true" className="hero-name-art">
            {name.map((word, w) => (
              <span className="hero-word" key={word + w}>
                {[...word].map((char) => {
                  const i = charIndex++
                  return (
                    <span className="char-mask" key={i}>
                      <motion.span
                        className="char"
                        initial={{ y: '112%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.9, delay: 0.25 + i * 0.035, ease: EASE_EXPO }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  )
                })}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero-stage">
          <div className="hero-aura" aria-hidden="true" />
          <div className="orbit orbit-a" aria-hidden="true">
            <Sparkle size={14} className="orbit-satellite" />
          </div>
          <div className="orbit orbit-b" aria-hidden="true" />
          <div ref={slotRef} className="hero-photo-slot" role="img" aria-label={`Portrait of ${site.name}`}>
            {reduce && <Portrait />}
          </div>
        </div>

        <div className="hero-copy">
          <motion.p className="status-label" {...fadeUp(0.55)}>
            <span className="status-dot" aria-hidden="true" />
            {site.statusLabel}
          </motion.p>
          <motion.p className="hero-lede" {...fadeUp(0.65)}>
            {site.heroIntro}
          </motion.p>
          <motion.div className="hero-actions" {...fadeUp(0.75)}>
            <Magnetic>
              <Link to="/#work" className="btn btn-primary">
                View my work
                <Icon name="arrowRight" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/#about" className="btn btn-ghost">
                About me
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.aside className="hero-panels" aria-label="Quick profile" style={{ x: panelX, y: panelY }}>
          <motion.div
            className="ui-window hero-window"
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE_OUT }}
          >
            <div className="ui-window-bar">
              <span className="ui-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="ui-window-title">profile.sys</span>
            </div>
            <dl className="ui-list">
              <div>
                <dt>Name</dt>
                <dd>{site.name}</dd>
              </div>
              <div>
                <dt>Program</dt>
                <dd>BS Information Systems</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Web, graphics, video</dd>
              </div>
            </dl>
          </motion.div>

          {!reduce && (
            <motion.div
              className="ui-window hero-window hero-window-morph"
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease: EASE_OUT }}
            >
              <div className="ui-window-bar">
                <span className="ui-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="ui-window-title">identity.exe</span>
              </div>
              <div className="morph-body">
                <p className="morph-files">
                  <span>photo1.png</span>
                  <Icon name="arrowRight" size={14} />
                  <span>logo.png</span>
                </p>
                <div className="morph-meter" aria-hidden="true">
                  <motion.span style={{ scaleX: meter }} />
                </div>
                <p className="morph-status">
                  <span ref={statusRef}>Scroll to transform</span>
                  <span ref={percentRef} className="morph-percent">
                    0%
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </motion.aside>

        <motion.div className="hero-cue-wrap" {...fadeUp(1.05)}>
          <Link to="/#about" className="scroll-cue">
            <span className="scroll-cue-track" aria-hidden="true">
              <span className="scroll-cue-dot" />
            </span>
            Scroll to explore
          </Link>
        </motion.div>
      </div>

      {!reduce && <PhotoLogoTransition slotRef={slotRef} progress={progress} />}
    </section>
  )
}
