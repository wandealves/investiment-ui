import { useState, useEffect } from 'react'

export type ScrollDirection = 'up' | 'down' | null

/**
 * Custom hook to detect scroll direction
 * Used for hiding/showing navbar on scroll
 *
 * @param threshold - Minimum scroll amount to trigger direction change (default: 10px)
 * @returns 'up' | 'down' | null
 */
export const useScrollDirection = (threshold = 10): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)

  useEffect(() => {
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrollDirection
}
