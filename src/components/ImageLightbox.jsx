import { AnimatePresence, motion } from 'motion/react'
import { EASE_OUT } from '../lib/motion.js'
import Modal from './Modal.jsx'
import Icon from './Icon.jsx'
import ToolList from './ToolList.jsx'

// Large preview of one design, with previous/next. Arrow keys move through the set.
export default function ImageLightbox({ items, index, onIndexChange, onClose }) {
  const open = index !== null && index >= 0 && index < items.length
  const item = open ? items[index] : null

  const step = (direction) => onIndexChange((index + direction + items.length) % items.length)

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    }
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="lightbox-title" className="lightbox" onKeyDown={onKeyDown}>
      {item && (
        <div className="lightbox-layout">
          <div className="lightbox-stage">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={item.id}
                className="lightbox-image"
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </AnimatePresence>
          </div>

          <div className="lightbox-info">
            <p className="lightbox-count" aria-live="polite">
              {index + 1} of {items.length}
            </p>
            <h2 id="lightbox-title" className="lightbox-title">
              {item.title}
            </h2>
            <p className="lightbox-meta">
              <span>{item.categoryTitle ?? item.category}</span>
              {item.label && <span className="tag">{item.label}</span>}
              {item.demo && <span className="demo-badge">Demo</span>}
            </p>
            <p className="lightbox-desc">{item.description}</p>
            <ToolList tools={item.tools} className="lightbox-tools" />
            {items.length > 1 && (
              <div className="lightbox-nav">
                <button type="button" className="btn btn-ghost" onClick={() => step(-1)}>
                  <Icon name="chevronLeft" />
                  Previous
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => step(1)}>
                  Next
                  <Icon name="chevronRight" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}
