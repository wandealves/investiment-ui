import { X, Filter } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  dataInicio: string
  dataFim: string
  onTipoChange: (tipo: string) => void
  onAtivoChange: (ativoId: number) => void
  onDataInicioChange: (date: string) => void
  onDataFimChange: (date: string) => void
  onClearFilters: () => void
  onApplyFilters: () => void
}

const TransacaoFilters = ({
  tipoFilter,
  ativoFilter,
  dataInicio,
  dataFim,
  onTipoChange,
  onAtivoChange,
  onDataInicioChange,
  onDataFimChange,
  onClearFilters,
  onApplyFilters,
}: TransacaoFiltersProps) => {
  const hasLocalFilters = tipoFilter !== '' || ativoFilter !== 0 || dataInicio !== '' || dataFim !== ''

  // Validation: check if end date is before start date
  const dateError = dataInicio && dataFim && dataFim < dataInicio
    ? 'Data fim deve ser maior ou igual à data início'
    : ''

  return (
    <div className="mb-6 rounded-lg border bg-card p-4">
      <div className="space-y-4">
        {/* First row: Tipo and Ativo filters */}
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
            />
          </div>
        </div>

        {/* Second row: Date filters and Clear button */}
        <div className="flex items-end gap-4">
          {/* Data Início Filter */}
          <div className="flex-1 space-y-2">
            <Label htmlFor="data-inicio-filter">Data Início</Label>
            <Input
              id="data-inicio-filter"
              type="date"
              value={dataInicio}
              onChange={(e) => onDataInicioChange(e.target.value)}
              max={dataFim || undefined}
              className={dateError ? 'border-destructive' : ''}
            />
          </div>

          {/* Data Fim Filter */}
          <div className="flex-1 space-y-2">
            <Label htmlFor="data-fim-filter">Data Fim</Label>
            <Input
              id="data-fim-filter"
              type="date"
              value={dataFim}
              onChange={(e) => onDataFimChange(e.target.value)}
              min={dataInicio || undefined}
              className={dateError ? 'border-destructive' : ''}
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Apply Filters Button - Always visible */}
            <Button
              type="button"
              onClick={onApplyFilters}
              disabled={!!dateError || !hasLocalFilters}
              className="h-10"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>

            {/* Clear Filters Button */}
            {hasLocalFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={onClearFilters}
                className="h-10"
              >
                <X className="mr-2 h-4 w-4" />
                Limpar
              </Button>
            )}
          </div>
        </div>

        {/* Display validation error message if dates are invalid */}
        {dateError && (
          <p className="text-sm text-destructive animate-in fade-in duration-200">
            {dateError}
          </p>
        )}
      </div>
    </div>
  )
}

export default TransacaoFilters
