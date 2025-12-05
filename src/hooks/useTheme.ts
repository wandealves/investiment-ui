import { useEffect } from 'react'
import { useThemeStore } from '@/store'

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}
