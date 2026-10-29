import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useBrand } from '../context/brand.js'
import { pageTransition } from '../lib/motion.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import InterestMarquee from '../components/InterestMarquee.jsx'
import WorkSection from '../components/WorkSection.jsx'

const SECTIONS = ['home', 'about', 'work']

export default function Home() {
  const { setActiveSection } = useBrand()
  useDocumentTitle()

  // Highlight the navbar link of whichever section crosses the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of SECTIONS) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <motion.main id="main" className="page-home" {...pageTransition}>
      <Hero />
      <About />
      <InterestMarquee />
      <WorkSection />
    </motion.main>
  )
}
