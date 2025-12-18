import { useEffect, useState } from 'react'

/**
 * Hook para animar contagem de números
 * @param target - Valor alvo a ser alcançado
 * @param duration - Duração da animação em milissegundos (padrão: 1000ms)
 * @param decimals - Número de casas decimais (padrão: 2)
 * @returns Valor animado como string formatada
 */
export const useCountUp = (target: number, duration = 1000, decimals = 2): string => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (target === 0) {
      setValue(0)
      return
    }

    const startTime = Date.now()
    const startValue = 0

    const updateValue = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function: easeOutCubic para um efeito mais suave
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      const currentValue = startValue + (target - startValue) * easedProgress

      setValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateValue)
      } else {
        setValue(target)
      }
    }

    const animationFrame = requestAnimationFrame(updateValue)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return value.toFixed(decimals)
}

/**
 * Hook alternativo usando Framer Motion (se disponível)
 * Requer: npm install framer-motion
 */
// import { useSpring, useTransform } from 'framer-motion'
// export const useCountUpFramer = (target: number) => {
//   const spring = useSpring(0, { duration: 1000 })
//   const display = useTransform(spring, (value) => value.toFixed(2))
//
//   useEffect(() => {
//     spring.set(target)
//   }, [target, spring])
//
//   return display
// }
