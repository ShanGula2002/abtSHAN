import { useRef } from 'react'
import { useInView } from 'motion/react'
import Sparkle from './Sparkle.jsx'

const WORDS = ['Web development', 'Graphic design', 'Content creation', 'Motion design', 'Interactive experiences']

// A slow band of chrome words between About and Work. Decorative only: the same
// interests are listed in the About section for screen readers.
export default function InterestMarquee() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const run = [...WORDS, ...WORDS]

  return (
    <div ref={ref} className="marquee" data-paused={!inView || undefined} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {run.map((word, i) => (
              <span className="marquee-item" key={i}>
                {word}
                <Sparkle size={22} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
