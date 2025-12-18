import React from 'react'
import { cn } from '@/lib/utils'

interface MovingBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: string
  children: React.ReactNode
  containerClassName?: string
  borderClassName?: string
  duration?: number
  className?: string
}

export const MovingBorderButton = ({
  borderRadius = '0.75rem',
  children,
  containerClassName,
  borderClassName,
  duration = 2000,
  className,
  ...otherProps
}: MovingBorderButtonProps) => {
  return (
    <button
      className={cn(
        'relative inline-flex overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className={cn(
          'absolute inset-0',
          borderClassName
        )}
        style={{
          background: `
            radial-gradient(circle at var(--x, 50%) var(--y, 50%),
              hsl(var(--primary)) 0%,
              hsl(var(--secondary)) 50%,
              transparent 100%
            )
          `,
          animation: `move-border ${duration}ms linear infinite`,
        }}
      />

      <span
        className={cn(
          'relative z-10 flex items-center justify-center w-full h-full bg-card text-card-foreground rounded-lg px-4 py-2 transition-colors',
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} - 1px)`,
        }}
      >
        {children}
      </span>
    </button>
  )
}

// Adicionar ao global CSS ou tailwind.config.js:
// @keyframes move-border {
//   0%, 100% { --x: 0%; --y: 0%; }
//   25% { --x: 100%; --y: 0%; }
//   50% { --x: 100%; --y: 100%; }
//   75% { --x: 0%; --y: 100%; }
// }
