import { motion } from 'motion/react'
import { workCategories } from '../data/projects.js'
import { EASE_EXPO, inViewOnce } from '../lib/motion.js'
import { countLabel } from '../lib/portfolio.js'
import RevealText from './RevealText.jsx'
import PortfolioCard from './PortfolioCard.jsx'
import './WorkSection.css'

export default function WorkSection() {
  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <header className="section-head">
          <RevealText id="work-title" className="section-title" text="Selected work" />
          <motion.p
            className="section-intro"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_EXPO }}
          >
            Websites, graphics, and short-form video. Choose a category to see the full collection.
          </motion.p>
        </header>

        <ul className="work-grid">
          {workCategories.map((category, i) => (
            <li key={category.slug}>
              <PortfolioCard category={category} count={countLabel(category.kind)} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
