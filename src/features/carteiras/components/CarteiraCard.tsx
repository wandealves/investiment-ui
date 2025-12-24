import { Carteira } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'
import { TrendingUp, TrendingDown, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { HoverBorderGradient } from '@/components/aceternity'
import { motion } from 'framer-motion'

interface CarteiraCardProps {
  carteira: Carteira
  onEdit?: (carteira: Carteira) => void
  onDelete?: (carteira: Carteira) => void
}

const CarteiraCard = ({ carteira, onEdit, onDelete }: CarteiraCardProps) => {
  const navigate = useNavigate()
  const rentabilidade = carteira.rentabilidadeTotal ?? 0
  const valorTotal = carteira.valorTotal ?? 0
  const isPositive = rentabilidade >= 0

  return (
    <HoverBorderGradient
      containerClassName="rounded-lg"
      className="bg-card text-card-foreground p-0"
      duration={2}
    >
      <motion.div
        onClick={() => navigate(`/carteiras/${carteira.id}`)}
        className="group relative p-6 cursor-pointer overflow-hidden"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(120deg, transparent 0%, hsl(var(--primary) / 0.05) 50%, transparent 100%)`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Action buttons - slide in from right */}
        {(onEdit || onDelete) && (
          <motion.div
            className="absolute top-4 right-4 flex gap-1 z-10"
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {onEdit && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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
              </motion.div>
            )}
            {onDelete && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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
              </motion.div>
            )}
          </motion.div>
        )}

        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold font-display group-hover:text-primary transition-colors duration-300">
                {carteira.nome}
              </h3>
              {carteira.descricao && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {carteira.descricao}
                </p>
              )}
            </div>
            <motion.div
              className={cn(
                'rounded-full p-2 transition-all duration-300',
                isPositive
                  ? 'bg-success/10 group-hover:bg-success/20'
                  : 'bg-error/10 group-hover:bg-error/20'
              )}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              {isPositive ? (
                <TrendingUp className={cn(
                  'h-5 w-5 text-success transition-transform duration-300',
                  'group-hover:scale-110'
                )} />
              ) : (
                <TrendingDown className={cn(
                  'h-5 w-5 text-error transition-transform duration-300',
                  'group-hover:scale-110'
                )} />
              )}
            </motion.div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Valor Total</p>
              <p className="text-2xl font-bold font-mono mt-1">
                {formatCurrency(valorTotal)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Rentabilidade</p>
              <p
                className={cn(
                  'text-lg font-semibold font-mono mt-1',
                  isPositive ? 'text-success' : 'text-error'
                )}
              >
                {formatPercent(rentabilidade)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </HoverBorderGradient>
  )
}

export default CarteiraCard
