import { Plus, ArrowLeftRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTransacoes } from '@/features/transacoes/hooks/useTransacoes'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Pagination from '@/components/common/Pagination'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'

const Transacoes = () => {
  // Local state for pagination params to enable proper data fetching
  const [localPage, setLocalPage] = useState(1)
  const [localPageSize, setLocalPageSize] = useState(20)

  // Fetch data with local pagination state
  const { data, isLoading, isFetching } = useTransacoes({
    page: localPage,
    pageSize: localPageSize,
  })

  const transacoes = data?.data || []
  const totalItems = data?.total || 0

  // Use pagination hook with totalItems now available
  const { currentPage, pageSize, goToPage, setPageSize } = usePagination({
    initialPage: 1,
    initialPageSize: 20,
    totalItems: totalItems,
    storageKey: 'pagination-transacoes',
  })

  // Sync local state with pagination hook
  useEffect(() => {
    setLocalPage(currentPage)
    setLocalPageSize(pageSize)
  }, [currentPage, pageSize])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transações"
        description="Histórico de todas as suas transações"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Transação
          </Button>
        }
      />

      {totalItems === 0 ? (
        <EmptyState
          icon={ArrowLeftRight}
          title="Nenhuma transação encontrada"
          description="Registre suas primeiras transações para começar a rastrear seus investimentos"
          actionLabel="Adicionar Transação"
          onAction={() => console.log('Adicionar transação')}
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
                      <th className="text-left p-4 text-sm font-semibold">Data</th>
                      <th className="text-left p-4 text-sm font-semibold">Tipo</th>
                      <th className="text-left p-4 text-sm font-semibold">Ativo</th>
                      <th className="text-right p-4 text-sm font-semibold">Quantidade</th>
                      <th className="text-right p-4 text-sm font-semibold">Preço</th>
                      <th className="text-right p-4 text-sm font-semibold">Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacoes.map((transacao, index) => (
                      <tr
                        key={transacao.id}
                        className="group border-b last:border-b-0 transition-all duration-300 hover:bg-primary/5 hover:shadow-[inset_3px_0_0_0] hover:shadow-primary cursor-pointer animate-fade-in"
                        style={{
                          animationDelay: `${index * 30}ms`,
                          animationFillMode: 'backwards',
                        }}
                      >
                        <td className="p-4">{formatDate(transacao.dataTransacao)}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs group-hover:bg-primary/20 transition-colors duration-300">
                            {transacao.tipoTransacao}
                          </span>
                        </td>
                        <td className="p-4 font-semibold group-hover:text-primary transition-colors duration-300">
                          {transacao.ativoCodigo || '-'}
                        </td>
                        <td className="p-4 text-right">{transacao.quantidade}</td>
                        <td className="p-4 text-right">
                          {formatCurrency(transacao.preco)}
                        </td>
                        <td className="p-4 text-right font-semibold">
                          {formatCurrency(transacao.valorTotal)}
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
    </div>
  )
}

export default Transacoes
