import { useState, useEffect, useRef, memo } from 'react'
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
  const [selectedCarteiraCache, setSelectedCarteiraCache] = useState<Carteira | null>(null)
  const comboboxRef = useRef<HTMLDivElement>(null)

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

  const handleSelect = (carteira: Carteira | null) => {
    if (carteira) {
      setSelectedCarteiraCache(carteira)
      onChange(carteira.id)
    } else {
      setSelectedCarteiraCache(null)
      onChange(null)
    }
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
          {selectedCarteira
            ? `${selectedCarteira?.id ? selectedCarteira?.id + ' - ' : ''}${selectedCarteira.nome}`
            : (allowNull ? 'Todas as carteiras' : 'Selecione uma carteira')}
        </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
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
            ) : (
              <>
                
                {carteiras.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    {searchTerm ? 'Nenhuma carteira encontrada' : 'Digite para buscar carteiras'}
                  </div>
                ) : (
                  carteiras.map((carteira) => (
                    <button
                      key={carteira.id}
                      type="button"
                      onClick={() => handleSelect(carteira)}
                      className={cn(
                        'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none',
                        'hover:bg-accent hover:text-accent-foreground',
                        'transition-colors',
                        value === carteira.id && 'bg-accent'
                      )}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === carteira.id ? 'opacity-100' : 'opacity-0'
                        )}
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

      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  )
})

CarteiraCombobox.displayName = 'CarteiraCombobox'

export default CarteiraCombobox
