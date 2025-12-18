import React, { createContext, useContext, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface CardContextType {
  isHovering: boolean
  mouseX: number
  mouseY: number
}

const CardContext = createContext<CardContextType>({
  isHovering: false,
  mouseX: 0,
  mouseY: 0,
})

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMouseX(x)
    setMouseY(y)
  }

  return (
    <CardContext.Provider value={{ isHovering, mouseX, mouseY }}>
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsHovering(false)
          setMouseX(0)
          setMouseY(0)
        }}
        className={cn('flex items-center justify-center', containerClassName)}
      >
        <div
          className={cn('relative transition-all duration-200 ease-linear', className)}
          style={{
            transform: isHovering
              ? `perspective(1000px) rotateX(${(mouseY - 0.5) * 10}deg) rotateY(${(mouseX - 0.5) * -10}deg) scale3d(1.02, 1.02, 1.02)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          }}
        >
          {children}
        </div>
      </div>
    </CardContext.Provider>
  )
}

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('w-full h-full [transform-style:preserve-3d]', className)}>
      {children}
    </div>
  )
}

export const CardItem = ({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  [key: string]: any
}) => {
  const { isHovering } = useContext(CardContext)

  return (
    <Tag
      className={cn('transition-all duration-200 ease-linear', className)}
      style={{
        transform: isHovering
          ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
          : 'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
