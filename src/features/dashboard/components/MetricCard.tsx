import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CardContainer, CardBody, CardItem } from '@/components/aceternity'

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
    <CardContainer className="inter-var">
      <CardBody
        className={cn(
          'group relative rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 overflow-hidden',
          'hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50',
          className
        )}
      >
        {/* Subtle glare effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(120deg, transparent 0%, hsl(var(--primary) / 0.05) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />

        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <CardItem
              as="p"
              translateZ="50"
              className="text-sm font-medium text-muted-foreground"
            >
              {title}
            </CardItem>
            <CardItem
              as="h3"
              translateZ="60"
              className="text-2xl font-bold font-mono mt-2"
            >
              {value}
            </CardItem>
            {trend !== undefined && (
              <CardItem
                as="p"
                translateZ="40"
                className={cn(
                  'text-sm mt-1 font-medium font-mono',
                  trend >= 0 ? 'text-success' : 'text-error'
                )}
              >
                {trend >= 0 ? '+' : ''}
                {trend.toFixed(2)}%
              </CardItem>
            )}
          </div>
          <CardItem
            translateZ="80"
            className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-all duration-300"
          >
            <Icon className="h-6 w-6 text-primary" />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}

export default MetricCard
