import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import './VideoPlayer.css'

const VOLUME_KEY = 'kh-video-volume'
const DEFAULT_VOLUME = 0.8

// iPhones and iPads keep the volume at 100% (only their side buttons change it), so the slider is hidden there.
const CAN_SET_VOLUME = (() => {
  try {
    const probe = document.createElement('audio')
    probe.volume = 0.5
    return probe.volume === 0.5
  } catch {
    return true
  }
})()

// The last volume a visitor chose, so every video opens at their level.
function savedVolume() {
  try {
    const value = Number(localStorage.getItem(VOLUME_KEY))
    return value > 0 && value <= 1 ? value : DEFAULT_VOLUME
  } catch {
    return DEFAULT_VOLUME
  }
}

const clock = (seconds) => {
  const s = Math.max(0, Math.floor(seconds || 0))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

const clamp01 = (n) => Math.min(1, Math.max(0, n))

function setLevel(el, level) {
  el.volume = clamp01(Math.round(level * 100) / 100)
  el.muted = el.volume === 0
}

function togglePlay(el) {
  if (el.paused || el.ended) el.play().catch(() => {})
  else el.pause()
}

function toggleFullscreen(shell, el) {
  if (document.fullscreenElement) document.exitFullscreen?.()
  else if (shell.requestFullscreen) shell.requestFullscreen().catch(() => {})
  else el.webkitEnterFullscreen?.() // iPhone
}

// A video player with its own controls: play/pause, seeking, a volume slider with mute,
// and full screen. Keyboard: Space or K play/pause, M mute, Up/Down volume,
// Left/Right skip 5 seconds, F full screen.
export default function VideoPlayer({ sources, poster, title }) {
  const video = useRef(null)
  const shell = useRef(null)
  const idleTimer = useRef(0)
  const keyHandler = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(savedVolume)
  const [muted, setMuted] = useState(false)
  const [idle, setIdle] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  // The saved volume applies before the first sound plays.
  useLayoutEffect(() => {
    video.current.volume = savedVolume()
  }, [])

  // Controls fade out while the video plays and nothing moves.
  const wake = () => {
    setIdle(false)
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setIdle(true), 2500)
  }
  useEffect(() => () => clearTimeout(idleTimer.current), [])

  // Smooth progress while playing (timeupdate alone moves in jumps).
  useEffect(() => {
    if (!playing) return
    let frame = requestAnimationFrame(function tick() {
      setTime(video.current?.currentTime ?? 0)
      frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [playing])

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === shell.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  useLayoutEffect(() => {
    keyHandler.current = (event) => {
      const el = video.current
      if (!el || event.altKey || event.ctrlKey || event.metaKey) return
      const tag = event.target.tagName
      const onControl = tag === 'BUTTON' || tag === 'A' || tag === 'INPUT'
      const key = event.key.toLowerCase()
      if (key === 'k' || (key === ' ' && !onControl)) togglePlay(el)
      else if (key === 'm') el.muted = !el.muted
      else if (key === 'f') toggleFullscreen(shell.current, el)
      else if (tag === 'INPUT') return // sliders handle their own arrow keys
      else if (key === 'arrowleft') el.currentTime = Math.max(0, el.currentTime - 5)
      else if (key === 'arrowright') el.currentTime = Math.min(el.duration || 0, el.currentTime + 5)
      else if (key === 'arrowup' && CAN_SET_VOLUME) setLevel(el, el.volume + 0.1)
      else if (key === 'arrowdown' && CAN_SET_VOLUME) setLevel(el, el.volume - 0.1)
      else return
      event.preventDefault()
      wake()
    }
  })

  useEffect(() => {
    const listener = (event) => keyHandler.current?.(event)
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])

  const onVolumeChange = () => {
    const el = video.current
    setVolume(el.volume)
    setMuted(el.muted)
    if (el.volume > 0) {
      try {
        localStorage.setItem(VOLUME_KEY, String(el.volume))
      } catch {
        // Storage can be unavailable (private windows); the volume still works for this visit.
      }
    }
  }

  const toggleMute = () => {
    const el = video.current
    if (el.muted || el.volume === 0) {
      if (el.volume === 0) el.volume = 0.5
      el.muted = false
    } else el.muted = true
  }

  const level = muted ? 0 : volume
  const levelIcon = level === 0 ? 'volumeMute' : level < 0.5 ? 'volumeLow' : 'volume'
  const progress = duration ? (time / duration) * 100 : 0

  return (
    <div
      ref={shell}
      className="player"
      role="group"
      aria-label={`Video player: ${title}`}
      data-playing={playing || undefined}
      data-idle={(playing && idle) || undefined}
      onPointerMove={wake}
      onPointerDown={wake}
    >
      <video
        ref={video}
        className="player-video"
        poster={poster}
        autoPlay
        playsInline
        preload="auto"
        onClick={() => togglePlay(video.current)}
        onPlay={() => {
          setPlaying(true)
          wake()
        }}
        onPause={() => {
          setPlaying(false)
          setTime(video.current.currentTime)
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onTimeUpdate={() => !playing && setTime(video.current.currentTime)}
        onLoadedMetadata={() => setDuration(video.current.duration)}
        onDurationChange={() => setDuration(video.current.duration)}
        onVolumeChange={onVolumeChange}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
        Your browser cannot play this video.
      </video>

      {waiting && playing && <span className="player-spinner" aria-hidden="true" />}

      {!playing && (
        <button type="button" className="player-big-play" tabIndex={-1} aria-hidden="true" onClick={() => togglePlay(video.current)}>
          <Icon name="play" size={26} />
        </button>
      )}

      <div className="player-bar">
        <input
          type="range"
          className="player-range player-seek"
          min="0"
          max={duration || 0}
          step="0.01"
          value={Math.min(time, duration || 0)}
          style={{ '--fill': `${progress}%` }}
          aria-label="Seek"
          aria-valuetext={`${clock(time)} of ${clock(duration)}`}
          onChange={(event) => {
            const t = Number(event.target.value)
            video.current.currentTime = t
            setTime(t)
          }}
        />
        <div className="player-row">
          <button type="button" className="player-btn" aria-label={playing ? 'Pause' : 'Play'} onClick={() => togglePlay(video.current)}>
            <Icon name={playing ? 'pause' : 'play'} size={20} />
          </button>
          <span className="player-time">
            {clock(time)} <span className="player-time-total">/ {clock(duration)}</span>
          </span>

          <div className="player-volume">
            <button type="button" className="player-btn" aria-label={level === 0 ? 'Unmute' : 'Mute'} onClick={toggleMute}>
              <Icon name={levelIcon} size={21} />
            </button>
            {CAN_SET_VOLUME && (
              <>
                <input
                  type="range"
                  className="player-range player-vol"
                  min="0"
                  max="100"
                  step="1"
                  value={Math.round(level * 100)}
                  style={{ '--fill': `${level * 100}%` }}
                  aria-label="Volume"
                  aria-valuetext={`${Math.round(level * 100)}%`}
                  onChange={(event) => setLevel(video.current, Number(event.target.value) / 100)}
                />
                <span className="player-vol-value" aria-hidden="true">
                  {Math.round(level * 100)}%
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            className="player-btn"
            aria-label={fullscreen ? 'Exit full screen' : 'Full screen'}
            onClick={() => toggleFullscreen(shell.current, video.current)}
          >
            <Icon name={fullscreen ? 'collapse' : 'expand'} size={19} />
          </button>
        </div>
      </div>
    </div>
  )
}
