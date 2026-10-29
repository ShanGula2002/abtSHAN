import { Link } from 'react-router'
import { motion } from 'motion/react'
import { pageTransition } from '../lib/motion.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'
import Icon from '../components/Icon.jsx'
import './pages.css'

export default function NotFound() {
  useDocumentTitle('Page not found')

  return (
    <motion.main id="main" className="page not-found container" {...pageTransition}>
      <p className="status-label">
        <span className="status-dot" aria-hidden="true" />
        Error 404
      </p>
      <h1 className="page-title chrome-text">Signal lost</h1>
      <p className="page-intro">This page does not exist or has moved.</p>
      <Link to="/" className="btn btn-primary">
        <Icon name="arrowLeft" />
        Back to home
      </Link>
    </motion.main>
  )
}
