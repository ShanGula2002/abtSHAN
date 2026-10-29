import { designs, videos, webProjects } from '../data/projects.js'

export const ITEMS = { web: webProjects, design: designs, video: videos }

const NOUNS = { web: ['project', 'projects'], design: ['design', 'designs'], video: ['video', 'videos'] }

// "4 demo projects" while everything is a placeholder, "5 projects" once real work is in.
export function countLabel(kind) {
  const items = ITEMS[kind]
  const [one, many] = NOUNS[kind]
  const allDemo = items.length > 0 && items.every((item) => item.demo)
  return `${items.length} ${allDemo ? 'demo ' : ''}${items.length === 1 ? one : many}`
}
