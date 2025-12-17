import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number
  className?: string
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        'group relative rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 overflow-hidden',
        'hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50',
        className
      )}
    >
      {/* Subtle glare effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(120deg, transparent 0%, rgba(var(--primary), 0.05) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend !== undefined && (
            <p
              className={cn(
                'text-sm mt-1 font-medium',
                trend >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
              )}
            >
              {trend >= 0 ? '+' : ''}
              {trend.toFixed(2)}%
            </p>
          )}
        </div>
        <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/15 transition-colors duration-300">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  )
}

export default MetricCard
