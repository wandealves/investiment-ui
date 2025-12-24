import { memo } from 'react'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { tipoAtivoLabels } from '@/utils/tipoAtivoLabels'

interface AtivoFiltersProps {
  codigoFilter: string
  nomeFilter: string
  tipoFilter: string
  onCodigoChange: (value: string) => void
  onNomeChange: (value: string) => void
  onTipoChange: (value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

const AtivoFilters = memo(({
  codigoFilter,
  nomeFilter,
  tipoFilter,
  onCodigoChange,
  onNomeChange,
  onTipoChange,
  onClearFilters,
  hasActiveFilters,
}: AtivoFiltersProps) => {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="codigo-filter">Código</Label>
          <Input
            id="codigo-filter"
            placeholder="Filtrar por código..."
            value={codigoFilter}
            onChange={(e) => onCodigoChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nome-filter">Nome</Label>
          <Input
            id="nome-filter"
            placeholder="Filtrar por nome..."
            value={nomeFilter}
            onChange={(e) => onNomeChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo-filter">Tipo</Label>
          <select
            id="tipo-filter"
            value={tipoFilter}
            onChange={(e) => onTipoChange(e.target.value)}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-all duration-300',
              'hover:border-primary/50',
              'focus:border-primary focus:shadow-[0_0_12px_rgba(var(--primary),0.15)]'
            )}
          >
            <option value="">Todos os tipos</option>
            {Object.entries(tipoAtivoLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
        </div>
      </div>
    </div>
  )
})

AtivoFilters.displayName = 'AtivoFilters'

export default AtivoFilters
