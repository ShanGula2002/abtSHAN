import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { site } from '../data/site.js'
import { EASE_EXPO, EASE_OUT, inViewOnce } from '../lib/motion.js'
import photo from '../assets/photo1.png'
import logo from '../assets/logo.png'
import RevealText from './RevealText.jsx'
import Sparkle from './Sparkle.jsx'
import Icon from './Icon.jsx'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <header className="section-head">
          <RevealText id="about-title" className="section-title" text="About me" />
        </header>

        <div className="about-grid">
          <IdCard />

          <div className="about-copy">
            {site.about.map((paragraph, i) => (
              <motion.p
                key={i}
                className={i === 0 ? 'about-lead' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_EXPO }}
              >
                {paragraph}
              </motion.p>
            ))}

            <h3 className="about-subhead">Interests</h3>
            <motion.ul
              className="interest-list"
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              {site.interests.map((interest) => (
                <motion.li
                  key={interest}
                  className="interest"
                  variants={{ hidden: { opacity: 0, y: 12, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } } }}
                >
                  <Sparkle size={11} />
                  {interest}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <SkillConsole />
          <ResumePanel />
          <ExperiencePanel />
        </div>
      </div>
    </section>
  )
}

// A holographic ID card that tilts toward the mouse.
function IdCard() {
  const reduce = useReducedMotion()
  const tiltX = useSpring(0, { stiffness: 150, damping: 18 })
  const tiltY = useSpring(0, { stiffness: 150, damping: 18 })
  const sheen = useTransform(tiltY, [-8, 8], ['0% 50%', '100% 50%'])

  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 14)
    tiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 12)
  }
  const reset = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <motion.div
      className="id-card-wrap"
      initial={{ opacity: 0, y: 36, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.9, ease: EASE_EXPO }}
    >
      <motion.div
        className="id-card"
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
      >
        <div className="id-card-top">
          <span className="id-chip" aria-hidden="true" />
          <span className="id-card-label">Creator ID</span>
          <span className="id-logo" aria-hidden="true">
            <img src={logo} alt="" width="462" height="540" />
          </span>
        </div>

        <div className="id-card-body">
          <div className="id-photo">
            <img src={photo} alt={`Portrait of ${site.name}`} width="433" height="577" loading="lazy" />
          </div>
          <dl className="id-fields">
            <div>
              <dt>Name</dt>
              <dd>{site.name}</dd>
            </div>
            <div>
              <dt>Program</dt>
              <dd>{site.education}</dd>
            </div>
            <div>
              <dt>Roles</dt>
              <dd>{site.roles.join(' · ')}</dd>
            </div>
          </dl>
        </div>

        <div className="id-barcode" aria-hidden="true" />
        <motion.div className="id-sheen" style={{ backgroundPosition: sheen }} aria-hidden="true" />
      </motion.div>
    </motion.div>
  )
}

// Three tabs: Develop, Design, Create. Arrow keys move between them.
function SkillConsole() {
  const groups = site.skillGroups
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const group = groups[active]

  const onKeyDown = (event) => {
    const last = groups.length - 1
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <motion.div
      className="ui-window skill-console"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
    >
      <div className="ui-window-bar">
        <span className="ui-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ui-window-title">skills.exe</span>
      </div>

      <div className="skill-tabs" role="tablist" aria-label="Skill areas" onKeyDown={onKeyDown}>
        {groups.map((g, i) => (
          <button
            key={g.id}
            ref={(element) => {
              tabs.current[i] = element
            }}
            type="button"
            role="tab"
            id={`skill-tab-${g.id}`}
            className="skill-tab"
            aria-selected={i === active}
            aria-controls={`skill-panel-${g.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {i === active && <motion.span layoutId="skill-tab-pill" className="skill-tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span className="skill-tab-text">{g.label}</span>
          </button>
        ))}
      </div>

      <div className="skill-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={group.id}
            role="tabpanel"
            id={`skill-panel-${group.id}`}
            aria-labelledby={`skill-tab-${group.id}`}
            className="skill-panel"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <h3>{group.title}</h3>
            <p>{group.text}</p>
            <ul className="skill-list">
              {group.skills.map((skill, i) => (
                <motion.li
                  key={skill}
                  className="skill-chip"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 + i * 0.05, ease: EASE_OUT }}
                >
                  <Sparkle size={10} />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Each list in resume (src/data/site.js) names its fields its own way; this gives every entry one shape.
const toEntries = (list, title, place) =>
  (list ?? []).map((item) => ({ title: item[title], place: item[place], date: item.date, details: item.details, link: item.link }))

// An entry's title, linked when the entry has a link.
function EntryTitle({ entry }) {
  if (!entry.link) return entry.title
  return (
    <a href={entry.link} target="_blank" rel="noopener noreferrer">
      {entry.title}
      <Icon name="external" size={15} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

// Education, certifications and the PDF download, from resume in src/data/site.js.
function ResumePanel() {
  const { resume } = site
  const rows = [
    { label: 'Education', entries: toEntries(resume.education, 'degree', 'school') },
    { label: 'Certifications', entries: toEntries(resume.certifications, 'name', 'issuer') },
  ]

  return (
    <motion.div
      className="ui-window resume-panel"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
    >
      <div className="ui-window-bar">
        <span className="ui-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ui-window-title">resume.pdf</span>
      </div>
      <div className="resume-body">
        <div className="resume-head">
          <h3>Resume</h3>
          {resume.url ? (
            <a className="btn btn-primary" href={resume.url} download={resume.fileName}>
              <Icon name="download" />
              Download resume
            </a>
          ) : (
            <p className="status-chip">
              <Icon name="clock" size={16} />
              Resume PDF coming soon
            </p>
          )}
        </div>
        <dl className="resume-rows">
          {rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              {row.entries.length > 0 ? (
                row.entries.map((entry, i) => (
                  <dd key={i}>
                    <p className="entry-title">
                      <EntryTitle entry={entry} />
                    </p>
                    {(entry.place || entry.date) && (
                      <p className="entry-meta">
                        {entry.place}
                        {entry.place && entry.date && ' · '}
                        {entry.date && <span className="entry-date">{entry.date}</span>}
                      </p>
                    )}
                    {entry.details && <p className="entry-details">{entry.details}</p>}
                  </dd>
                ))
              ) : (
                <dd className="pending">To be added</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </motion.div>
  )
}

// Work history, full width under the skills and resume panels, from resume.experience in src/data/site.js.
function ExperiencePanel() {
  const entries = toEntries(site.resume.experience, 'role', 'company')

  return (
    <motion.div
      className="ui-window experience-panel"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
    >
      <div className="ui-window-bar">
        <span className="ui-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ui-window-title">experience.log</span>
      </div>
      <div className="experience-body">
        <h3>Experience</h3>
        {entries.length > 0 ? (
          <motion.ul
            className="experience-list"
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
          >
            {entries.map((entry, i) => (
              <motion.li
                key={i}
                className="experience-item"
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } } }}
              >
                <h4 className="entry-title">
                  <EntryTitle entry={entry} />
                </h4>
                {entry.place && <p className="entry-meta">{entry.place}</p>}
                {entry.date && <p className="experience-date">{entry.date}</p>}
                {entry.details && <p className="entry-details">{entry.details}</p>}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p className="pending">To be added</p>
        )}
      </div>
    </motion.div>
  )
}
