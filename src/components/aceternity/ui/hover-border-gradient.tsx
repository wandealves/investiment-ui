import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface HoverBorderGradientProps {
  children: React.ReactNode
  containerClassName?: string
  className?: string
  as?: React.ElementType
  duration?: number
  clockwise?: boolean
}

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = 'div',
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps & React.HTMLAttributes<HTMLElement>) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Tag
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        'relative flex items-center justify-center rounded-lg p-[1px] overflow-hidden',
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          'absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500',
          isHovering && 'opacity-100'
        )}
        style={{
          background: `conic-gradient(from ${clockwise ? '0deg' : '360deg'} at 50% 50%,
            hsl(var(--primary)) 0deg,
            hsl(var(--secondary)) 120deg,
            hsl(var(--primary)) 240deg,
            hsl(var(--primary)) 360deg
          )`,
          animation: isHovering
            ? `spin ${duration}s linear infinite ${clockwise ? '' : 'reverse'}`
            : 'none',
        }}
      />
      <div className={cn('relative z-10 w-full h-full rounded-lg', className)}>
        {children}
      </div>
    </Tag>
  )
}

// Nota: Certifique-se de que tailwind.config.js tenha a animação spin configurada (já vem por padrão)
