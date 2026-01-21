import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton (can be a Tailwind class or CSS value) */
  width?: string
  /** Height of the skeleton (can be a Tailwind class or CSS value) */
  height?: string
}

function Skeleton({ className, width, height, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
      style={{
        width: width && !width.startsWith('w-') ? width : undefined,
        height: height && !height.startsWith('h-') ? height : undefined,
        ...style,
      }}
      {...props}
    />
  )
}

// Pre-built skeleton components for common use cases
function SkeletonText({ className, lines = 1, ...props }: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-4 space-y-3', className)} {...props}>
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
  columns?: number
}

function SkeletonTable({ rows = 5, columns = 5, className, ...props }: SkeletonTableProps) {
  return (
    <div className={cn('rounded-lg border bg-card overflow-hidden', className)} {...props}>
      {/* Header */}
      <div className="border-b bg-muted/50 p-4">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
      </div>
      {/* Rows */}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="flex gap-4 items-center">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  className={cn(
                    'h-4 flex-1',
                    colIndex === 0 && 'max-w-[100px]',
                    colIndex === columns - 1 && 'max-w-[80px]'
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonTable }
