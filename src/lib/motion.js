// Shared motion settings, so every animation on the site speaks the same language.

export const EASE_OUT = [0.22, 1, 0.36, 1]
export const EASE_EXPO = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT = [0.76, 0, 0.24, 1]

// Page-to-page: the old page fades quickly, the new one rises in.
export const pageTransition = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

// Reveals fire once, when the element is about 88% of the way down the screen.
export const inViewOnce = { once: true, margin: '0px 0px -12% 0px' }

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
export const easeOutQuad = (t) => 1 - (1 - t) ** 2
export const easeInCubic = (t) => t * t * t
