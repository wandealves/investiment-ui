import { Plus, TrendingUp, X } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useAtivos } from '@/features/ativos/hooks/useAtivos'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Pagination from '@/components/common/Pagination'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import AtivoFormModal from '@/features/ativos/components/AtivoFormModal'
import AtivoDeleteDialog from '@/features/ativos/components/AtivoDeleteDialog'
import AtivoActions from '@/features/ativos/components/AtivoActions'
import AtivoFilters from '@/features/ativos/components/AtivoFilters'
import type { Ativo } from '@/types/entities.types'
import { getTipoAtivoLabel } from '@/utils/tipoAtivoLabels'

const Ativos = () => {
  // Local state for pagination params to enable proper data fetching
  const [localPage, setLocalPage] = useState(1)
  const [localPageSize, setLocalPageSize] = useState(20)

  // Filter states - immediate values (what user types)
  const [codigoFilterInput, setCodigoFilterInput] = useState('')
  const [nomeFilterInput, setNomeFilterInput] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')

  // Debounced filter states (what gets sent to API)
  const [codigoFilter, setCodigoFilter] = useState('')
  const [nomeFilter, setNomeFilter] = useState('')

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAtivo, setSelectedAtivo] = useState<Ativo | null>(null)

  // Debounce text filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setCodigoFilter(codigoFilterInput)
    }, 500)
    return () => clearTimeout(timer)
  }, [codigoFilterInput])

  useEffect(() => {
    const timer = setTimeout(() => {
      setNomeFilter(nomeFilterInput)
    }, 500)
    return () => clearTimeout(timer)
  }, [nomeFilterInput])

  // Fetch data with local pagination state and filters
  const { data, isLoading, isFetching } = useAtivos({
    page: localPage,
    pageSize: localPageSize,
    codigo: codigoFilter || undefined,
    nome: nomeFilter || undefined,
    tipo: tipoFilter || undefined,
  })

  const ativos = data?.data || []
  const totalItems = data?.total || 0

  // Use pagination hook with totalItems now available
  const { currentPage, pageSize, goToPage, setPageSize } = usePagination({
    initialPage: 1,
    initialPageSize: 20,
    totalItems: totalItems,
    storageKey: 'pagination-ativos',
  })

  // Sync local state with pagination hook
  useEffect(() => {
    setLocalPage(currentPage)
    setLocalPageSize(pageSize)
  }, [currentPage, pageSize])

  // Reset to page 1 when debounced filters change (not on every keystroke)
  useEffect(() => {
    if (codigoFilter || nomeFilter || tipoFilter) {
      goToPage(1)
    }
  }, [codigoFilter, nomeFilter, tipoFilter])

  // Modal handlers
  const handleCreate = () => {
    setSelectedAtivo(null)
    setIsFormModalOpen(true)
  }

  const handleEdit = (ativo: Ativo) => {
    setSelectedAtivo(ativo)
    setIsFormModalOpen(true)
  }

  const handleDelete = (ativo: Ativo) => {
    setSelectedAtivo(ativo)
    setIsDeleteDialogOpen(true)
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false)
    setSelectedAtivo(null)
  }

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedAtivo(null)
  }

  const handleCodigoChange = useCallback((value: string) => {
    setCodigoFilterInput(value)
  }, [])

  const handleNomeChange = useCallback((value: string) => {
    setNomeFilterInput(value)
  }, [])

  const handleTipoChange = useCallback((value: string) => {
    setTipoFilter(value)
  }, [])

  const handleClearFilters = useCallback(() => {
    setCodigoFilterInput('')
    setNomeFilterInput('')
    setCodigoFilter('')
    setNomeFilter('')
    setTipoFilter('')
    goToPage(1)
  }, [goToPage])

  const hasActiveFilters = codigoFilterInput || nomeFilterInput || tipoFilter

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ativos"
        description="Gerencie seus ativos financeiros"
        action={
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Ativo
          </Button>
        }
      />

      {/* Filters Section */}
      <AtivoFilters
        codigoFilter={codigoFilterInput}
        nomeFilter={nomeFilterInput}
        tipoFilter={tipoFilter}
        onCodigoChange={handleCodigoChange}
        onNomeChange={handleNomeChange}
        onTipoChange={handleTipoChange}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {totalItems === 0 ? (
        hasActiveFilters ? (
          <div className="rounded-lg border bg-card p-8 text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Nenhum ativo encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Nenhum ativo corresponde aos filtros aplicados
            </p>
            <Button variant="outline" onClick={handleClearFilters}>
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <EmptyState
            icon={TrendingUp}
            title="Nenhum ativo encontrado"
            description="Adicione ativos para começar a rastrear seus investimentos"
            actionLabel="Adicionar Ativo"
            onAction={handleCreate}
          />
        )
      ) : (
        <>
          <div className={cn('relative', isFetching && 'opacity-60 pointer-events-none')}>
            {isFetching && (
              <div className="absolute top-4 right-4 z-10">
                <LoadingSpinner size="sm" />
              </div>
            )}
            <div className="rounded-lg border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-4 text-sm font-semibold">Código</th>
                      <th className="text-left p-4 text-sm font-semibold">Nome</th>
                      <th className="text-left p-4 text-sm font-semibold">Tipo</th>
                      <th className="text-right p-4 text-sm font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ativos.map((ativo, index) => (
                      <tr
                        key={ativo.id}
                        className="group border-b last:border-b-0 transition-all duration-300 hover:bg-primary/5 hover:shadow-[inset_3px_0_0_0] hover:shadow-primary cursor-pointer animate-fade-in"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: 'backwards',
                        }}
                      >
                        <td className="p-4 font-semibold group-hover:text-primary transition-colors duration-300">
                          {ativo.codigo}
                        </td>
                        <td className="p-4">{ativo.nome}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs group-hover:bg-primary/20 transition-colors duration-300">
                            {getTipoAtivoLabel(ativo.tipo)}
                          </span>
                        </td>
                        <td className="p-4">
                          <AtivoActions
                            ativo={ativo}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 1}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={goToPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </>
      )}

      {/* Modals */}
      <AtivoFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        ativo={selectedAtivo}
      />

      <AtivoDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        ativo={selectedAtivo}
      />
    </div>
  )
}

export default Ativos
