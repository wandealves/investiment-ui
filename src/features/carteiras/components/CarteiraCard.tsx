import { Carteira } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'
import { TrendingUp, TrendingDown, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface CarteiraCardProps {
  carteira: Carteira
  onEdit?: (carteira: Carteira) => void
  onDelete?: (carteira: Carteira) => void
}

const CarteiraCard = ({ carteira, onEdit, onDelete }: CarteiraCardProps) => {
  const navigate = useNavigate()
  const isPositive = (carteira.rentabilidade || 0) >= 0

  return (
    <div
      onClick={() => navigate(`/carteiras/${carteira.id}`)}
      className={cn(
        'group relative rounded-lg border bg-card p-6 cursor-pointer overflow-hidden',
        'transition-all duration-300',
        'hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 hover:scale-[1.02]',
        'active:scale-[0.98]'
      )}
    >
      {/* Animated gradient border effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(120deg, transparent 0%, hsl(var(--primary) / 0.1) 50%, transparent 100%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Action buttons - top right corner */}
      {(onEdit || onDelete) && (
        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(carteira)
              }}
              className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary/10 text-primary"
              aria-label="Editar carteira"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(carteira)
              }}
              className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-destructive/10 text-destructive"
              aria-label="Excluir carteira"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
              {carteira.nome}
            </h3>
            {carteira.descricao && (
              <p className="text-sm text-muted-foreground mt-1">
                {carteira.descricao}
              </p>
            )}
          </div>
          <div className={cn(
            'rounded-full p-2 transition-all duration-300',
            isPositive
              ? 'bg-green-500/10 group-hover:bg-green-500/20'
              : 'bg-red-500/10 group-hover:bg-red-500/20'
          )}>
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-500 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <p className="text-sm text-muted-foreground">Valor Total</p>
            <p className="text-2xl font-bold">
              {formatCurrency(carteira.valorTotal || 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Rentabilidade</p>
            <p
              className={cn(
                'text-lg font-semibold',
                isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
              )}
            >
              {formatPercent(carteira.rentabilidade || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarteiraCard
