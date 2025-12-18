import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export const GridBackground = ({ className, children }: GridBackgroundProps) => {
  return (
    <div className={cn('relative w-full h-full', className)}>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {children}
    </div>
  )
}

// Adicionar ao tailwind.config.js (ou usar inline style):
// backgroundImage: {
//   'grid-white': 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
// }
