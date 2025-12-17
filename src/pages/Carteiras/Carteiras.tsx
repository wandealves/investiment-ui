import { Plus, Wallet as WalletIcon } from 'lucide-react'
import { useCarteiras } from '@/features/carteiras/hooks/useCarteiras'
import CarteiraCard from '@/features/carteiras/components/CarteiraCard'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Pagination from '@/components/common/Pagination'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'

const Carteiras = () => {
  const { currentPage, pageSize, goToPage, setPageSize } = usePagination({
    initialPage: 1,
    initialPageSize: 20,
    storageKey: 'pagination-carteiras',
  })

  const { data, isLoading, isFetching } = useCarteiras({
    page: currentPage,
    pageSize: pageSize,
  })

  const carteiras = data?.data || []
  const totalItems = data?.total || 0

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Carteiras"
        description="Gerencie suas carteiras de investimento"
        action={
          <Button>
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
          onAction={() => console.log('Criar carteira')}
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
                  <CarteiraCard carteira={carteira} />
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
    </div>
  )
}

export default Carteiras
