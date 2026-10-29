// The four-point Y2K star used across the site.
export default function Sparkle({ size = 16, className = '', style }) {
  return (
    <svg className={`sparkle ${className}`} style={style} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 0C12.9 7.4 16.6 11.1 24 12 16.6 12.9 12.9 16.6 12 24 11.1 16.6 7.4 12.9 0 12 7.4 11.1 11.1 7.4 12 0Z" fill="currentColor" />
    </svg>
  )
}
