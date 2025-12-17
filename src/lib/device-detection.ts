/**
 * Device and motion preference detection utilities
 * Used to optimize animations and effects based on device capabilities
 */

/**
 * Check if the current device is mobile (width < 768px)
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Check if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Determine if animations should be enabled
 * Returns false if on mobile or user prefers reduced motion
 */
export const shouldAnimate = (): boolean => {
  return !isMobile() && !prefersReducedMotion()
}

/**
 * Check if the device supports hover interactions
 */
export const supportsHover = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/**
 * Check if the current connection is slow
 * Uses Network Information API if available
 */
export const isSlowConnection = (): boolean => {
  if (typeof navigator === 'undefined') return false

  // @ts-ignore - NetworkInformation is not in TypeScript types yet
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  if (!connection) return false

  // Check for slow connection types or low effective connection type
  if (connection.effectiveType) {
    return ['slow-2g', '2g', '3g'].includes(connection.effectiveType)
  }

  if (connection.type) {
    return ['cellular', '2g', '3g'].includes(connection.type)
  }

  return false
}

/**
 * Get the optimal animation configuration based on device capabilities
 */
export const getAnimationConfig = () => {
  const mobile = isMobile()
  const reducedMotion = prefersReducedMotion()
  const slowConnection = isSlowConnection()

  return {
    enableAnimations: !mobile && !reducedMotion && !slowConnection,
    enableComplexAnimations: !mobile && !reducedMotion && !slowConnection,
    enableHoverEffects: supportsHover() && !reducedMotion,
    reducedMotion,
    mobile,
    slowConnection,
  }
}
