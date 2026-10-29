import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE_EXPO, EASE_OUT, inViewOnce } from '../lib/motion.js'
import Icon from './Icon.jsx'
import './DesignLayouts.css'

// The three ways a design category can be shown on the Graphic Design page.
// Pick one per category with layout: 'campaign', 'listing' or 'feed' in src/data/projects.js.

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: inViewOnce }
const pad = (n) => String(n).padStart(2, '0')

// A design's image as a button that opens the large view.
function DesignButton({ design, className = '', onOpen }) {
  return (
    <button
      type="button"
      className={`design-thumb ${className}`}
      aria-haspopup="dialog"
      aria-label={`View ${design.title} larger`}
      onClick={() => onOpen(design.id)}
    >
      <img src={design.thumb ?? design.image} alt={design.alt} width={design.width} height={design.height} loading="lazy" decoding="async" />
      <span className="design-zoom" aria-hidden="true">
        <Icon name="zoom" size={20} />
      </span>
    </button>
  )
}

// Ad variations side by side, each headed by its number and style. A swipeable row on small screens.
export function CampaignBoard({ items, onOpen }) {
  return (
    <ul className="campaign">
      {items.map((design, i) => (
        <motion.li key={design.id} className="campaign-card" {...reveal} transition={{ duration: 0.75, delay: i * 0.08, ease: EASE_EXPO }}>
          <p className="campaign-tag">
            <span className="campaign-num">{pad(i + 1)}</span>
            {design.label ?? design.title}
          </p>
          <DesignButton design={design} onOpen={onOpen} />
          <div className="design-caption">
            <h3 className="design-title">{design.title}</h3>
            <p className="design-desc">{design.description}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

// A product page's image viewer: thumbnails pick the large image, which opens the large view.
export function ListingViewer({ items, onOpen }) {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const id = useId()
  const design = items[active] ?? items[0]

  const onKeyDown = (event) => {
    const last = items.length - 1
    const forward = active === last ? 0 : active + 1
    const back = active === 0 ? last : active - 1
    const next = { ArrowRight: forward, ArrowDown: forward, ArrowLeft: back, ArrowUp: back, Home: 0, End: last }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <motion.div className="listing" {...reveal} transition={{ duration: 0.8, ease: EASE_EXPO }}>
      <div className="listing-rail" role="tablist" aria-label="Listing images" onKeyDown={onKeyDown}>
        {items.map((item, i) => (
          <button
            key={item.id}
            ref={(element) => {
              tabs.current[i] = element
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            className="listing-tab"
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onPointerEnter={(event) => event.pointerType === 'mouse' && setActive(i)}
          >
            <span className="listing-tab-img">
              <img src={item.thumb ?? item.image} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" />
            </span>
            <span className="listing-tab-label">{item.label ?? item.title}</span>
          </button>
        ))}
      </div>

      <div className="listing-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
        <button
          type="button"
          className="design-thumb listing-stage"
          aria-haspopup="dialog"
          aria-label={`View ${design.title} larger`}
          onClick={() => onOpen(design.id)}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={design.id}
              src={design.image}
              alt={design.alt}
              width={design.width}
              height={design.height}
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            />
          </AnimatePresence>
          <span className="design-zoom" aria-hidden="true">
            <Icon name="zoom" size={20} />
          </span>
        </button>

        <div className="listing-info">
          <p className="listing-count">
            Image {active + 1} of {items.length}
          </p>
          <h3 className="listing-title">{design.title}</h3>
          <p className="listing-desc">{design.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Posts framed the way they appear in a feed: header, image, actions and caption.
export function FeedPosts({ items, onOpen }) {
  return (
    <ul className="feed">
      {items.map((design, i) => (
        <motion.li key={design.id} className="post" {...reveal} transition={{ duration: 0.75, delay: i * 0.08, ease: EASE_EXPO }}>
          <div className="post-head">
            <span className="post-avatar" aria-hidden="true" />
            <p className="post-who">
              <span className="post-type">{design.label ?? 'Post'}</span>
              <span className="post-format">
                {design.width} × {design.height}
              </span>
            </p>
          </div>
          <DesignButton design={design} className="post-media" onOpen={onOpen} />
          <div className="post-actions" aria-hidden="true">
            <Icon name="heart" size={22} />
            <Icon name="comment" size={22} />
            <Icon name="send" size={22} />
            <Icon name="bookmark" size={22} className="post-save" />
          </div>
          <div className="post-caption">
            <h3 className="post-title">{design.title}</h3>
            <p className="post-desc">{design.description}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}
