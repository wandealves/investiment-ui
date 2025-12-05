import { Carteira } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface CarteiraCardProps {
  carteira: Carteira
}

const CarteiraCard = ({ carteira }: CarteiraCardProps) => {
  const navigate = useNavigate()
  const isPositive = carteira.rentabilidade >= 0

  return (
    <div
      onClick={() => navigate(`/carteiras/${carteira.id}`)}
      className="rounded-lg border bg-card p-6 cursor-pointer transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{carteira.nome}</h3>
          {carteira.descricao && (
            <p className="text-sm text-muted-foreground mt-1">
              {carteira.descricao}
            </p>
          )}
        </div>
        {isPositive ? (
          <TrendingUp className="h-5 w-5 text-green-600" />
        ) : (
          <TrendingDown className="h-5 w-5 text-red-600" />
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div>
          <p className="text-sm text-muted-foreground">Valor Total</p>
          <p className="text-2xl font-bold">
            {formatCurrency(carteira.valorTotal)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Rentabilidade</p>
          <p
            className={cn(
              'text-lg font-semibold',
              isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            {formatPercent(carteira.rentabilidade)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CarteiraCard
