import { useState, useEffect, useRef, memo, useCallback, useId } from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useCarteirasLookup } from '@/hooks/useLookups'
import LoadingSpinner from './LoadingSpinner'
import type { Carteira } from '@/types/entities.types'

interface CarteiraComboboxProps {
  value: number | null
  onChange: (value: number | null) => void
  disabled?: boolean
  error?: string
  allowNull?: boolean
}

const CarteiraCombobox = memo(({
  value,
  onChange,
  disabled,
  error,
  allowNull = true
}: CarteiraComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [selectedCarteiraCache, setSelectedCarteiraCache] = useState<Carteira | null>(null)
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

  const { data, isLoading } = useCarteirasLookup(debouncedSearch)
  const carteiras = data?.data || []

  // Find selected carteira - first try in current list, then use cache
  const selectedCarteira = value
    ? (carteiras.find((carteira) => carteira.id === value) ||
       (selectedCarteiraCache?.id === value ? selectedCarteiraCache : null))
    : null

  // Update cache when a selected carteira is found in the list
  useEffect(() => {
    if (value && !selectedCarteiraCache) {
      const found = carteiras.find((carteira) => carteira.id === value)
      if (found) {
        setSelectedCarteiraCache(found)
      }
    }
  }, [value, carteiras, selectedCarteiraCache])

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

  const handleSelect = useCallback((carteira: Carteira | null) => {
    if (carteira) {
      setSelectedCarteiraCache(carteira)
      onChange(carteira.id)
    } else {
      setSelectedCarteiraCache(null)
      onChange(null)
    }
    setOpen(false)
    setSearchTerm('')
    setHighlightedIndex(-1)
  }, [onChange])

  // Reset highlighted index when list changes
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [carteiras])

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
          prev < carteiras.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < carteiras.length) {
          handleSelect(carteiras[highlightedIndex])
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
  }, [open, carteiras, highlightedIndex, handleSelect])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listboxRef.current) {
      const items = listboxRef.current.querySelectorAll('[role="option"]')
      items[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  return (
    <div ref={comboboxRef} className="relative">
      <span id={labelId} className="sr-only">Selecionar carteira</span>
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
          {selectedCarteira
            ? `${selectedCarteira?.id ? selectedCarteira?.id + ' - ' : ''}${selectedCarteira.nome}`
            : (allowNull ? 'Todas as carteiras' : 'Selecione uma carteira')}
        </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-8"
                autoFocus
                aria-label="Buscar carteira"
              />
            </div>
          </div>

          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-label="Lista de carteiras"
            className="max-h-[300px] overflow-y-auto p-1"
          >
            {isLoading ? (
              <div className="flex items-center justify-center p-4" role="status" aria-live="polite">
                <LoadingSpinner size="sm" />
                <span className="sr-only">Carregando carteiras...</span>
              </div>
            ) : (
              <>
                {carteiras.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground" role="status" aria-live="polite">
                    {searchTerm ? 'Nenhuma carteira encontrada' : 'Digite para buscar carteiras'}
                  </div>
                ) : (
                  carteiras.map((carteira, index) => (
                    <button
                      key={carteira.id}
                      type="button"
                      role="option"
                      aria-selected={value === carteira.id}
                      onClick={() => handleSelect(carteira)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={cn(
                        'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:bg-accent focus:text-accent-foreground',
                        'transition-colors',
                        value === carteira.id && 'bg-accent',
                        highlightedIndex === index && 'bg-accent text-accent-foreground'
                      )}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === carteira.id ? 'opacity-100' : 'opacity-0'
                        )}
                        aria-hidden="true"
                      />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{carteira.nome}</span>
                        {carteira.descricao && (
                          <span className="text-xs text-muted-foreground">{carteira.descricao}</span>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-destructive mt-1" role="alert">{error}</p>}
    </div>
  )
})

CarteiraCombobox.displayName = 'CarteiraCombobox'

export default CarteiraCombobox
