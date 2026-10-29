import { Link } from 'react-router'
import { motion, useReducedMotion, useSpring } from 'motion/react'
import { EASE_EXPO, inViewOnce } from '../lib/motion.js'
import Icon from './Icon.jsx'

// One Work category: a small collage of its first three pieces, then the details.
// The whole card is clickable through the "View more" link stretched over it.
export default function PortfolioCard({ category, count, index }) {
  const { slug, title, description, tags, previews, kind } = category
  const reduce = useReducedMotion()
  const tiltX = useSpring(0, { stiffness: 160, damping: 20 })
  const tiltY = useSpring(0, { stiffness: 160, damping: 20 })

  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 8)
    tiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 6)
  }
  const reset = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <motion.article
      className={`work-card work-card--${kind}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.85, delay: index * 0.09, ease: EASE_EXPO }}
      style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <div className="work-media" aria-hidden="true">
        <div className="work-media-grid" />
        {previews.map((src, i) => (
          <img key={`${src}-${i}`} className={`work-thumb work-thumb-${i}`} src={src} alt="" loading="lazy" decoding="async" />
        ))}
        {kind === 'video' && (
          <span className="work-play">
            <Icon name="play" size={20} />
          </span>
        )}
        <span className="work-sheen" />
      </div>

      <div className="work-body">
        <p className="work-count">{count}</p>
        <h3 className="work-title">{title}</h3>
        <p className="work-desc">{description}</p>
        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
        <Link to={`/work/${slug}`} className="btn btn-ghost work-link">
          View more<span className="sr-only"> {title} work</span>
          <Icon name="arrowRight" />
        </Link>
      </div>
    </motion.article>
  )
}
