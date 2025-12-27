import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-300',
            'hover:border-primary/50',
            'focus:border-primary focus:shadow-[0_0_12px_rgba(var(--primary),0.15)]',
            'cursor-pointer',
            error && 'border-destructive focus:border-destructive focus:ring-destructive',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="text-sm text-destructive mt-1 animate-slide-up">{error}</p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
