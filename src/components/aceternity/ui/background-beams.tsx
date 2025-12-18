import React from 'react'
import { cn } from '@/lib/utils'

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
    >
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Beams */}
        <g className="animate-pulse-slow">
          <line
            x1="10%"
            y1="0%"
            x2="20%"
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="2"
            className="animate-fade-in"
          />
          <line
            x1="40%"
            y1="0%"
            x2="45%"
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="1.5"
            className="animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          />
          <line
            x1="70%"
            y1="0%"
            x2="75%"
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="2"
            className="animate-fade-in"
            style={{ animationDelay: '1s' }}
          />
          <line
            x1="90%"
            y1="0%"
            x2="85%"
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="1"
            className="animate-fade-in"
            style={{ animationDelay: '1.5s' }}
          />
        </g>
      </svg>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
    </div>
  )
}
