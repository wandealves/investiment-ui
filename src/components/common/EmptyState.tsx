import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
      <div className="rounded-full bg-gradient-to-br from-muted to-muted/50 p-6 mb-4 animate-scale-in">
        <Icon className="h-12 w-12 text-muted-foreground animate-glow" />
      </div>
      <h3 className="text-lg font-semibold mb-2 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  )
}

export default EmptyState
