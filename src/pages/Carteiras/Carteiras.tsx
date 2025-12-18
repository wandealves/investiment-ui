import { Plus, Wallet as WalletIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCarteiras } from '@/features/carteiras/hooks/useCarteiras'
import CarteiraCard from '@/features/carteiras/components/CarteiraCard'
import CarteiraFormModal from '@/features/carteiras/components/CarteiraFormModal'
import CarteiraDeleteDialog from '@/features/carteiras/components/CarteiraDeleteDialog'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Pagination from '@/components/common/Pagination'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import type { Carteira } from '@/types/entities.types'

const Carteiras = () => {
  // Local state for pagination params to enable proper data fetching
  const [localPage, setLocalPage] = useState(1)
  const [localPageSize, setLocalPageSize] = useState(20)

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCarteira, setSelectedCarteira] = useState<Carteira | null>(null)

  // Fetch data with local pagination state
  const { data, isLoading, isFetching } = useCarteiras({
    page: localPage,
    pageSize: localPageSize,
  })

  const carteiras = data?.data || []
  const totalItems = data?.total || 0

  // Use pagination hook with totalItems now available
  const { currentPage, pageSize, goToPage, setPageSize } = usePagination({
    initialPage: 1,
    initialPageSize: 20,
    totalItems: totalItems,
    storageKey: 'pagination-carteiras',
  })

  // Sync local state with pagination hook
  useEffect(() => {
    setLocalPage(currentPage)
    setLocalPageSize(pageSize)
  }, [currentPage, pageSize])

  // Modal handlers
  const handleCreate = () => {
    setSelectedCarteira(null)
    setIsFormModalOpen(true)
  }

  const handleEdit = (carteira: Carteira) => {
    setSelectedCarteira(carteira)
    setIsFormModalOpen(true)
  }

  const handleDelete = (carteira: Carteira) => {
    setSelectedCarteira(carteira)
    setIsDeleteDialogOpen(true)
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false)
    setSelectedCarteira(null)
  }

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedCarteira(null)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Carteiras"
        description="Gerencie suas carteiras de investimento"
        action={
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Carteira
          </Button>
        }
      />

      {totalItems === 0 ? (
        <EmptyState
          icon={WalletIcon}
          title="Nenhuma carteira encontrada"
          description="Crie sua primeira carteira para começar a gerenciar seus investimentos"
          actionLabel="Criar Carteira"
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {carteiras.map((carteira, index) => (
                <div
                  key={carteira.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'backwards',
                  }}
                >
                  <CarteiraCard
                    carteira={carteira}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
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
      <CarteiraFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        carteira={selectedCarteira}
      />

      <CarteiraDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        carteira={selectedCarteira}
      />
    </div>
  )
}

export default Carteiras
