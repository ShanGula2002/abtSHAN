import { useState } from 'react'
import { motion } from 'motion/react'
import { videos } from '../data/projects.js'
import { EASE_EXPO, inViewOnce, pageTransition } from '../lib/motion.js'
import { countLabel } from '../lib/portfolio.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'
import PageHeader from '../components/PageHeader.jsx'
import VideoModal from '../components/VideoModal.jsx'
import Icon from '../components/Icon.jsx'
import './pages.css'

export default function ContentCreation() {
  useDocumentTitle('Content Creation')
  const [active, setActive] = useState(null)

  return (
    <motion.main id="main" className="page" {...pageTransition}>
      <PageHeader
        title="Content Creation"
        intro="Short-form vertical videos with cinematic editing, motion design and product storytelling. Select a video to watch it with sound."
        count={countLabel('video')}
      />
      <section className="container" aria-label="Videos">
        <ul className="video-grid">
          {videos.map((video, i) => (
            <motion.li
              key={video.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.75, delay: (i % 3) * 0.08, ease: EASE_EXPO }}
            >
              <button
                type="button"
                className="video-card"
                aria-haspopup="dialog"
                aria-label={`Play ${video.title}`}
                onClick={(event) => {
                  // The player pops out of this card: remember how far its centre is from the screen's.
                  const box = event.currentTarget.getBoundingClientRect()
                  const origin = { x: box.left + box.width / 2 - window.innerWidth / 2, y: box.top + box.height / 2 - window.innerHeight / 2 }
                  setActive({ video, origin })
                }}
              >
                <span className="video-thumb">
                  <img src={video.thumbnail} alt="" width="720" height="1280" loading="lazy" decoding="async" />
                  <span className="video-play" aria-hidden="true">
                    <Icon name="play" size={22} />
                  </span>
                  {video.duration && (
                    <span className="video-duration">
                      <Icon name="volume" size={14} />
                      {video.duration}
                    </span>
                  )}
                </span>
              </button>
              <div className="video-card-body">
                <div className="item-heading">
                  <h2 className="video-card-title">{video.title}</h2>
                  {video.demo && <span className="demo-badge">Demo</span>}
                </div>
                <p className="video-card-desc">{video.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
      <VideoModal video={active?.video} origin={active?.origin} onClose={() => setActive(null)} />
    </motion.main>
  )
}
