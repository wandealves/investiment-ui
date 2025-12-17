import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  message?: string
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

const LoadingSpinner = ({ size = 'md', className, message }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="relative">
        {/* Pulsing background circle */}
        <div className={cn(
          'absolute inset-0 rounded-full bg-primary/20 animate-glow',
          size === 'sm' && 'blur-sm',
          size === 'md' && 'blur-md',
          size === 'lg' && 'blur-lg'
        )} />
        {/* Spinner */}
        <Loader2
          className={cn('animate-spin text-primary relative z-10', sizeMap[size], className)}
        />
      </div>
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner
