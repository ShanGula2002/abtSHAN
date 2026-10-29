import { motion } from 'motion/react'
import { webProjects } from '../data/projects.js'
import { EASE_EXPO, inViewOnce, pageTransition } from '../lib/motion.js'
import { countLabel } from '../lib/portfolio.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icon.jsx'
import './pages.css'

export default function WebDevelopment() {
  useDocumentTitle('Web Development')

  return (
    <motion.main id="main" className="page" {...pageTransition}>
      <PageHeader
        title="Web Development"
        intro="Responsive websites designed to combine clean interfaces, practical functionality, and modern visual experiences. Open any project to visit the live site."
        count={countLabel('web')}
      />
      <section className="container" aria-label="Website projects">
        <ul className="web-grid">
          {webProjects.map((project, i) => (
            <li key={project.id}>
              <WebCard project={project} index={i} />
            </li>
          ))}
        </ul>
      </section>
    </motion.main>
  )
}

function WebCard({ project, index }) {
  return (
    <motion.article
      className="web-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.8, delay: (index % 2) * 0.08, ease: EASE_EXPO }}
    >
      {/* The thumbnail is a second way in for mouse users; keyboard users get the button below. */}
      <a className="web-thumb" href={project.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
        <img
          src={project.image}
          alt=""
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
          style={{ objectPosition: project.position ?? 'center top' }}
        />
        <span className="web-thumb-cta">
          Visit site
          <Icon name="external" size={16} />
        </span>
      </a>
      <div className="web-body">
        <div className="item-heading">
          <h2 className="web-title">{project.title}</h2>
          {project.demo && <span className="demo-badge">Demo</span>}
        </div>
        <p className="web-desc">{project.description}</p>
        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
        <a className="btn btn-primary" href={project.url} target="_blank" rel="noopener noreferrer">
          Visit site
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
          <Icon name="external" />
        </a>
      </div>
    </motion.article>
  )
}
