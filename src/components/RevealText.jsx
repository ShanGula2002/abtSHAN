import { Fragment } from 'react'
import { motion } from 'motion/react'
import { EASE_EXPO, inViewOnce } from '../lib/motion.js'

// A heading whose words rise out of a mask when it scrolls into view.
// The words stay real text, so screen readers and search engines read the heading normally.
export default function RevealText({ as: Tag = 'h2', text, id, className = '', delay = 0 }) {
  const words = text.split(' ')
  return (
    <Tag id={id} className={className}>
      <motion.span
        className="split"
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
      >
        {/* The space sits outside each clipped word box; inside it would collapse. */}
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="split-mask">
              <motion.span
                className="split-word"
                variants={{ hidden: { y: '108%' }, show: { y: '0%', transition: { duration: 0.85, ease: EASE_EXPO } } }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  )
}
