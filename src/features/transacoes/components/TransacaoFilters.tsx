import { X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import AtivoCombobox from '@/components/common/AtivoCombobox'
import { cn } from '@/lib/utils'
import type { TipoTransacao } from '@/types/entities.types'

const tipoOptions: (TipoTransacao | '')[] = [
  '',
  'Compra',
  'Venda',
  'Dividendo',
  'JCP',
  'Bonus',
  'Split',
  'Grupamento',
]

interface TransacaoFiltersProps {
  tipoFilter: string
  ativoFilter: number
  onTipoChange: (tipo: string) => void
  onAtivoChange: (ativoId: number) => void
  onClearFilters: () => void
}

const TransacaoFilters = ({
  tipoFilter,
  ativoFilter,
  onTipoChange,
  onAtivoChange,
  onClearFilters,
}: TransacaoFiltersProps) => {
  const hasActiveFilters = tipoFilter !== '' || ativoFilter !== 0

  return (
    <div className="mb-6 rounded-lg border bg-card p-4">
      <div className="flex items-end gap-4">
        {/* Tipo Filter */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="tipo-filter">Tipo de Transação</Label>
          <select
            id="tipo-filter"
            value={tipoFilter}
            onChange={(e) => onTipoChange(e.target.value)}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-all duration-300'
            )}
          >
            <option value="">Todos os tipos</option>
            {tipoOptions.slice(1).map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        {/* Ativo Filter */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="ativo-filter">Ativo</Label>
          <AtivoCombobox
            value={ativoFilter}
            onChange={onAtivoChange}
            placeholder="Todos os ativos"
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={onClearFilters}
            className="h-10"
          >
            <X className="mr-2 h-4 w-4" />
            Limpar Filtros
          </Button>
        )}
      </div>
    </div>
  )
}

export default TransacaoFilters
