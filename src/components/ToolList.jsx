import Icon from './Icon.jsx'
import './ToolList.css'

// "Made with Photoshop · Canva": the tools behind a design or a group of designs.
export default function ToolList({ tools, className = '' }) {
  if (!tools?.length) return null
  return (
    <div className={`tool-line ${className}`}>
      <span className="tool-line-label">Made with</span>
      <ul className="tool-list">
        {tools.map((tool) => (
          <li key={tool} className="tool-chip">
            <Icon name="layers" size={14} />
            {tool}
          </li>
        ))}
      </ul>
    </div>
  )
}
