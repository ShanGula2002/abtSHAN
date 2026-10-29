import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { designCategories, designs } from '../data/projects.js'
import { EASE_EXPO, inViewOnce, pageTransition } from '../lib/motion.js'
import { countLabel } from '../lib/portfolio.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'
import PageHeader from '../components/PageHeader.jsx'
import ImageLightbox from '../components/ImageLightbox.jsx'
import ToolList from '../components/ToolList.jsx'
import { CampaignBoard, FeedPosts, ListingViewer } from '../components/DesignLayouts.jsx'
import './pages.css'

const LAYOUTS = { campaign: CampaignBoard, listing: ListingViewer, feed: FeedPosts }

// A design whose category is not in designCategories still shows, in a group of its own.
const OTHER = { id: 'more-designs', title: 'More Designs', layout: 'campaign' }
const known = (design) => designCategories.some((category) => category.id === design.category)

const groups = [...designCategories, OTHER]
  .map((category) => ({
    category,
    items: designs
      .filter((design) => (category === OTHER ? !known(design) : design.category === category.id))
      .map((design) => ({ ...design, categoryTitle: category.title, tools: design.tools ?? category.tools })),
  }))
  .filter((group) => group.items.length > 0)

// Every design in page order, for previous/next in the large view.
const ordered = groups.flatMap((group) => group.items)
const pad = (n) => String(n).padStart(2, '0')

export default function GraphicDesign() {
  useDocumentTitle('Graphic Design')
  const [index, setIndex] = useState(null)
  const open = (id) => setIndex(ordered.findIndex((design) => design.id === id))

  return (
    <motion.main id="main" className="page" {...pageTransition}>
      <PageHeader
        title="Graphic Design"
        intro="Advertising, Amazon listing images, and social media posts, each shown the way people see it: side by side, on a product page, and in a feed. Select any design to see it larger."
        count={countLabel('design')}
      />

      <nav className="container design-jump" aria-label="Design categories">
        <ul>
          {groups.map(({ category, items }) => (
            <li key={category.id}>
              <Link to={`#${category.id}`} className="design-jump-link">
                {category.title}
                <span className="design-jump-count">{items.length}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map(({ category, items }, i) => {
        const Layout = LAYOUTS[category.layout] ?? CampaignBoard
        return (
          <section
            key={category.id}
            id={category.id}
            className={`container design-group design-group--${category.layout}`}
            aria-labelledby={`${category.id}-title`}
          >
            <motion.header
              className="design-group-head"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.75, ease: EASE_EXPO }}
            >
              <p className="design-group-index">
                {pad(i + 1)} / {pad(groups.length)}
              </p>
              <h2 id={`${category.id}-title`} className="design-group-title">
                {category.title}
              </h2>
              {category.description && <p className="design-group-desc">{category.description}</p>}
              <ToolList tools={category.tools} />
            </motion.header>
            <Layout items={items} onOpen={open} />
          </section>
        )
      })}

      <ImageLightbox items={ordered} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
    </motion.main>
  )
}
