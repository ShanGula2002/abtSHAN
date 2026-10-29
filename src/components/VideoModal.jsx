import Modal from './Modal.jsx'
import Icon from './Icon.jsx'
import VideoPlayer from './VideoPlayer.jsx'

// Plays one video. Files play in the site's own player (play/pause, seeking, volume
// slider, mute, full screen); YouTube, Vimeo and other official embeds load in a frame;
// anything else gets a button to the original post.
// '16 / 9' → true, '9 / 16' or nothing → false
const isWide = (aspect) => {
  const [w, h] = String(aspect || '').split('/').map(Number)
  return w > 0 && h > 0 && w / h > 1
}

// origin: how far the clicked card's centre is from the screen's centre, so the
// player pops out of the card and shrinks back into it.
const popFrom = (origin) => ({
  initial: { opacity: 0, scale: 0.3, x: origin.x, y: origin.y },
  animate: { opacity: 1, scale: 1, x: 0, y: 0 },
  exit: {
    opacity: 0,
    scale: 0.3,
    x: origin.x,
    y: origin.y,
    transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1], opacity: { duration: 0.2, delay: 0.12 } },
  },
  transition: { type: 'spring', stiffness: 260, damping: 26, mass: 0.9, opacity: { duration: 0.18 } },
})

const SHORTCUTS = [
  ['Space', 'Play or pause'],
  ['↑ ↓', 'Volume'],
  ['M', 'Mute'],
  ['← →', 'Skip 5 seconds'],
  ['F', 'Full screen'],
]

export default function VideoModal({ video, origin, onClose }) {
  return (
    <Modal
      open={Boolean(video)}
      onClose={onClose}
      labelledBy="video-title"
      className="video-modal"
      panelMotion={origin ? popFrom(origin) : undefined}
    >
      {video && (
        <div className={`video-layout${isWide(video.aspect) ? ' video-layout--wide' : ''}`}>
          <div className="video-frame" style={video.aspect ? { aspectRatio: video.aspect } : undefined}>
            <VideoSource video={video} />
          </div>
          <div className="video-info">
            <h2 id="video-title" className="video-title">
              {video.title}
            </h2>
            {video.demo && <span className="demo-badge">Demo clip</span>}
            <p className="video-desc">{video.description}</p>
            {video.source.type === 'file' && (
              <dl className="video-keys" aria-label="Keyboard shortcuts">
                {SHORTCUTS.map(([key, action]) => (
                  <div key={key}>
                    <dt>
                      <kbd>{key}</kbd>
                    </dt>
                    <dd>{action}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}

function VideoSource({ video }) {
  const { source, title, thumbnail } = video

  if (source.type === 'file') {
    const sources = Array.isArray(source.src) ? source.src : [{ src: source.src }]
    return <VideoPlayer sources={sources} poster={thumbnail} title={title} />
  }

  const embeds = {
    youtube: () => `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&playsinline=1`,
    vimeo: () => `https://player.vimeo.com/video/${source.id}?autoplay=1`,
    embed: () => source.url,
  }
  if (embeds[source.type]) {
    return (
      <iframe
        className="video-player"
        src={embeds[source.type]()}
        title={title}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      />
    )
  }

  // 'link': platforms that only play on their own site.
  return (
    <div className="video-external">
      {thumbnail && <img src={thumbnail} alt="" />}
      <div className="video-external-body">
        <p>This video plays on {source.platform || 'its original site'}.</p>
        <a className="btn btn-primary" href={source.url} target="_blank" rel="noopener noreferrer">
          Watch on {source.platform || 'the original site'}
          <Icon name="external" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}
