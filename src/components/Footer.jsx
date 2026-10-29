import { Link } from 'react-router'
import { site } from '../data/site.js'
import RevealText from './RevealText.jsx'
import Magnetic from './Magnetic.jsx'
import Sparkle from './Sparkle.jsx'
import Icon from './Icon.jsx'
import './Footer.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container">
        <div className="footer-cta">
          <Sparkle size={28} className="footer-spark" />
          <RevealText as="h2" className="footer-title" text="Let’s create something" />
          <p className="footer-text">Have a website, a campaign, or a video in mind? Send me a message and tell me about it.</p>
          <div className="footer-actions">
            <Magnetic>
              <a className="btn btn-primary btn-lg" href={`mailto:${site.email}`}>
                <Icon name="mail" />
                Email me
              </a>
            </Magnetic>
            <a className="footer-email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          {site.socials.length > 0 && (
            <ul className="footer-socials">
              {site.socials.map((social) => (
                <li key={social.url}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.label}
                    <Icon name="external" size={15} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {YEAR} {site.name}
          </p>
          <nav aria-label="Footer">
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/#about">About</Link>
              </li>
              <li>
                <Link to="/#work">Work</Link>
              </li>
            </ul>
          </nav>
          <button type="button" className="footer-top" onClick={toTop}>
            Back to top
            <Icon name="arrowUp" size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
