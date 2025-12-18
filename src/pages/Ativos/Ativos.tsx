import { Plus, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
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
import type { Ativo } from '@/types/entities.types'

const Ativos = () => {
  // Local state for pagination params to enable proper data fetching
  const [localPage, setLocalPage] = useState(1)
  const [localPageSize, setLocalPageSize] = useState(20)

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAtivo, setSelectedAtivo] = useState<Ativo | null>(null)

  // Fetch data with local pagination state
  const { data, isLoading, isFetching } = useAtivos({
    page: localPage,
    pageSize: localPageSize,
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

      {totalItems === 0 ? (
        <EmptyState
          icon={TrendingUp}
          title="Nenhum ativo encontrado"
          description="Adicione ativos para começar a rastrear seus investimentos"
          actionLabel="Adicionar Ativo"
          onAction={handleCreate}
        />
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
                            {ativo.tipo}
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
