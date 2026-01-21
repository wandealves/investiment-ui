import { useState, useEffect, useRef, memo, useCallback, useId } from 'react'
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [selectedAtivoCache, setSelectedAtivoCache] = useState<Ativo | null>(
    initialAtivo ? { ...initialAtivo, tipo: TipoAtivo.Acao, descricao: '' } : null
  )
  const comboboxRef = useRef<HTMLDivElement>(null)
  const listboxRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const labelId = useId()

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

  const handleSelect = useCallback((ativo: Ativo) => {
    // Cache the selected ativo so we can display it even when it's not in the current filtered list
    setSelectedAtivoCache(ativo)
    onChange(ativo.id)
    setOpen(false)
    setSearchTerm('')
    setHighlightedIndex(-1)
  }, [onChange])

  // Reset highlighted index when list changes
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [ativos])

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < ativos.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < ativos.length) {
          handleSelect(ativos[highlightedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        setHighlightedIndex(-1)
        break
      case 'Tab':
        setOpen(false)
        setHighlightedIndex(-1)
        break
    }
  }, [open, ativos, highlightedIndex, handleSelect])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listboxRef.current) {
      const items = listboxRef.current.querySelectorAll('[role="option"]')
      items[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  return (
    <div ref={comboboxRef} className="relative">
      <span id={labelId} className="sr-only">Selecionar ativo</span>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-labelledby={labelId}
        aria-invalid={!!error}
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
        <ChevronsUpDown className="h-4 w-4 opacity-50" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Buscar por código ou nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-8"
                autoFocus
                aria-label="Buscar ativo"
              />
            </div>
          </div>

          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-label="Lista de ativos"
            className="max-h-[300px] overflow-y-auto p-1"
          >
            {isLoading ? (
              <div className="flex items-center justify-center p-4" role="status" aria-live="polite">
                <LoadingSpinner size="sm" />
                <span className="sr-only">Carregando ativos...</span>
              </div>
            ) : ativos.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground" role="status" aria-live="polite">
                {searchTerm ? 'Nenhum ativo encontrado' : 'Digite para buscar ativos'}
              </div>
            ) : (
              ativos.map((ativo, index) => (
                <button
                  key={ativo.id}
                  type="button"
                  role="option"
                  aria-selected={value === ativo.id}
                  onClick={() => handleSelect(ativo)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus:bg-accent focus:text-accent-foreground',
                    'transition-colors',
                    value === ativo.id && 'bg-accent',
                    highlightedIndex === index && 'bg-accent text-accent-foreground'
                  )}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === ativo.id ? 'opacity-100' : 'opacity-0'
                    )}
                    aria-hidden="true"
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

      {error && <p className="text-sm text-destructive mt-1" role="alert">{error}</p>}
    </div>
  )
})

AtivoCombobox.displayName = 'AtivoCombobox'

export default AtivoCombobox
