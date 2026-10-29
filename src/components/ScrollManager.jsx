import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const USER_INPUT = ['wheel', 'touchstart', 'keydown', 'pointerdown']

// Where a section sits in the page, minus its scroll margin. offsetTop ignores transforms,
// so a page that is still sliding in does not throw the position off.
function pageTop(element) {
  let y = 0
  for (let node = element; node; node = node.offsetParent) y += node.offsetTop
  return y - (parseFloat(getComputedStyle(element).scrollMarginTop) || 0)
}

// The one place that scrolls after a navigation:
//   same page, #section   smooth scroll to the section
//   same page, no hash    smooth scroll to the top (the Home link)
//   new page / first load wait until the new page is in the document (the old one fades out
//                         first), then jump to the top or to #section and keep the section
//                         aligned while fonts and images settle, until the visitor scrolls.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const last = useRef({ key: null, pathname: null, first: true, samePage: false, oldPage: null })

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    // React's development mode runs effects twice; treat a re-run of the same navigation the same way.
    if (last.current.key !== key) {
      const first = last.current.key === null
      last.current = {
        key,
        pathname,
        first,
        samePage: !first && last.current.pathname === pathname,
        oldPage: first ? null : document.getElementById('main'),
      }
    }
    const { samePage, oldPage } = last.current
    const id = hash ? decodeURIComponent(hash.slice(1)) : null

    if (samePage) {
      const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
      const target = id && document.getElementById(id)
      if (!id) window.scrollTo({ top: 0, behavior })
      else if (target) window.scrollTo({ top: pageTop(target), behavior })
      return
    }

    let frame = 0
    let stopped = false
    let tries = 0
    let settleUntil = 0
    let ownY = null // where this component last left the page
    const stop = () => {
      stopped = true
      cancelAnimationFrame(frame)
    }
    USER_INPUT.forEach((type) => window.addEventListener(type, stop, { passive: true }))

    const step = () => {
      if (stopped) return
      const page = document.getElementById('main')
      const target = page && page !== oldPage && (id ? document.getElementById(id) : page)
      if (!target) {
        if (tries++ < 180) frame = requestAnimationFrame(step)
        return
      }
      if (!id) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }
      // Small drifts come from fonts and images settling; a big one means the visitor scrolled
      // away (for example by dragging the scrollbar), so stop correcting.
      if (ownY !== null && Math.abs(window.scrollY - ownY) > 40) return stop()
      const top = pageTop(target)
      if (Math.abs(window.scrollY - top) > 1) window.scrollTo({ top, behavior: 'auto' })
      ownY = window.scrollY
      if (!settleUntil) settleUntil = performance.now() + 2500
      if (performance.now() < settleUntil) frame = requestAnimationFrame(step)
    }
    step()

    return () => {
      stop()
      USER_INPUT.forEach((type) => window.removeEventListener(type, stop))
    }
  }, [pathname, hash, key])

  return null
}
