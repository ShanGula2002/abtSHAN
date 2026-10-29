import { Link } from 'react-router'
import RevealText from './RevealText.jsx'
import Icon from './Icon.jsx'

// The top of each Work page: a way back, the title, a short introduction and the count.
export default function PageHeader({ title, intro, count }) {
  return (
    <header className="page-head container">
      <Link to="/#work" className="back-link">
        <Icon name="arrowLeft" />
        Back to work
      </Link>
      <RevealText as="h1" className="page-title" text={title} />
      <p className="page-intro">{intro}</p>
      <p className="page-count">
        <span className="status-dot" aria-hidden="true" />
        {count}
      </p>
    </header>
  )
}
