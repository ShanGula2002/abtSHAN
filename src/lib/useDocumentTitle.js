import { useEffect } from 'react'
import { site } from '../data/site.js'

// Sets the browser tab title for a page.
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | Web Developer & Digital Creative`
  }, [title])
}
