import { useState, useEffect, useRef, memo } from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useAtivosLookup } from '@/hooks/useLookups'
import LoadingSpinner from './LoadingSpinner'
import type { Ativo } from '@/types/entities.types'
import { TipoAtivo } from '@/types/entities.types'

interface AtivoComboboxProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
  error?: string
  initialAtivo?: { id: number; codigo: string; nome: string }
}

const AtivoCombobox = memo(({ value, onChange, disabled, error, initialAtivo }: AtivoComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedAtivoCache, setSelectedAtivoCache] = useState<Ativo | null>(
    initialAtivo ? { ...initialAtivo, tipo: TipoAtivo.Acao, descricao: '' } : null
  )
  const comboboxRef = useRef<HTMLDivElement>(null)

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data, isLoading } = useAtivosLookup(debouncedSearch)
  const ativos = data?.data || []

  // Find selected ativo - first try in current list, then use cache
  const selectedAtivo = ativos.find((ativo) => ativo.id === value) ||
    (selectedAtivoCache?.id === value ? selectedAtivoCache : null)

  // Update cache when initialAtivo changes (e.g., editing different transactions)
  useEffect(() => {
    if (initialAtivo && initialAtivo.id !== selectedAtivoCache?.id) {
      setSelectedAtivoCache({ ...initialAtivo, tipo: TipoAtivo.Acao, descricao: '' })
    }
  }, [initialAtivo])

  // Update cache when a selected ativo is found in the list
  useEffect(() => {
    if (value && !selectedAtivoCache) {
      const found = ativos.find((ativo) => ativo.id === value)
      if (found) {
        setSelectedAtivoCache(found)
      }
    }
  }, [value, ativos, selectedAtivoCache])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleSelect = (ativo: Ativo) => {
    // Cache the selected ativo so we can display it even when it's not in the current filtered list
    setSelectedAtivoCache(ativo)
    onChange(ativo.id)
    setOpen(false)
    setSearchTerm('')
  }

  return (
    <div ref={comboboxRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-all duration-300',
          'hover:border-primary/50',
          error && 'border-destructive focus:border-destructive focus:ring-destructive'
        )}
      >
        <span className={cn(!value && 'text-muted-foreground')}>
          {selectedAtivo ? `${selectedAtivo.codigo} - ${selectedAtivo.nome}` : 'Selecione um ativo'}
        </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por código ou nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto p-1">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <LoadingSpinner size="sm" />
              </div>
            ) : ativos.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {searchTerm ? 'Nenhum ativo encontrado' : 'Digite para buscar ativos'}
              </div>
            ) : (
              ativos.map((ativo) => (
                <button
                  key={ativo.id}
                  type="button"
                  onClick={() => handleSelect(ativo)}
                  className={cn(
                    'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none',
                    'hover:bg-accent hover:text-accent-foreground',
                    'transition-colors',
                    value === ativo.id && 'bg-accent'
                  )}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === ativo.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{ativo.codigo}</span>
                    <span className="text-xs text-muted-foreground">{ativo.nome}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  )
})

AtivoCombobox.displayName = 'AtivoCombobox'

export default AtivoCombobox
