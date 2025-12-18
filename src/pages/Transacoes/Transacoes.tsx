import { Plus, ArrowLeftRight, Pencil, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTransacoes } from '@/features/transacoes/hooks/useTransacoes'
import TransacaoFormModal from '@/features/transacoes/components/TransacaoFormModal'
import TransacaoDeleteDialog from '@/features/transacoes/components/TransacaoDeleteDialog'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Pagination from '@/components/common/Pagination'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import type { Transacao } from '@/types/entities.types'

const Transacoes = () => {
  // Local state for pagination params to enable proper data fetching
  const [localPage, setLocalPage] = useState(1)
  const [localPageSize, setLocalPageSize] = useState(20)

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTransacao, setSelectedTransacao] = useState<Transacao | null>(null)

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

  // Modal handlers
  const handleCreate = () => {
    setSelectedTransacao(null)
    setIsFormModalOpen(true)
  }

  const handleEdit = (transacao: Transacao) => {
    setSelectedTransacao(transacao)
    setIsFormModalOpen(true)
  }

  const handleDelete = (transacao: Transacao) => {
    setSelectedTransacao(transacao)
    setIsDeleteDialogOpen(true)
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false)
    setSelectedTransacao(null)
  }

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedTransacao(null)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transações"
        description="Histórico de todas as suas transações"
        action={
          <Button onClick={handleCreate}>
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
                      <th className="text-left p-4 text-sm font-semibold">Data</th>
                      <th className="text-left p-4 text-sm font-semibold">Tipo</th>
                      <th className="text-left p-4 text-sm font-semibold">Ativo</th>
                      <th className="text-right p-4 text-sm font-semibold">Quantidade</th>
                      <th className="text-right p-4 text-sm font-semibold">Preço</th>
                      <th className="text-right p-4 text-sm font-semibold">Valor Total</th>
                      <th className="text-right p-4 text-sm font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacoes.map((transacao, index) => (
                      <motion.tr
                        key={transacao.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="group border-b last:border-b-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent hover:shadow-[inset_3px_0_0_0] hover:shadow-primary"
                      >
                        <td className="p-4 text-sm">{formatDate(transacao.dataTransacao)}</td>
                        <td className="p-4">
                          <span
                            className={cn(
                              'px-2 py-1 rounded-full text-xs font-medium transition-all duration-300',
                              transacao.tipoTransacao === 'Compra' &&
                                'bg-success/10 text-success group-hover:bg-success/20',
                              transacao.tipoTransacao === 'Venda' &&
                                'bg-error/10 text-error group-hover:bg-error/20',
                              transacao.tipoTransacao === 'Dividendo' &&
                                'bg-info/10 text-info group-hover:bg-info/20',
                              transacao.tipoTransacao === 'JCP' &&
                                'bg-info/10 text-info group-hover:bg-info/20',
                              (transacao.tipoTransacao === 'Bonus' ||
                                transacao.tipoTransacao === 'Split' ||
                                transacao.tipoTransacao === 'Grupamento') &&
                                'bg-warning/10 text-warning group-hover:bg-warning/20'
                            )}
                          >
                            {transacao.tipoTransacao}
                          </span>
                        </td>
                        <td className="p-4 font-semibold group-hover:text-primary transition-colors duration-300">
                          {transacao.ativoCodigo || '-'}
                        </td>
                        <td className="p-4 text-right font-mono">{transacao.quantidade}</td>
                        <td className="p-4 text-right font-mono">
                          {formatCurrency(transacao.preco)}
                        </td>
                        <td className="p-4 text-right font-semibold font-mono">
                          {formatCurrency(transacao.valorTotal)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEdit(transacao)
                                }}
                                className="h-8 w-8 text-primary hover:bg-primary/10"
                                aria-label="Editar transação"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDelete(transacao)
                                }}
                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                aria-label="Excluir transação"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </td>
                      </motion.tr>
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
      <TransacaoFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        transacao={selectedTransacao}
      />

      <TransacaoDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        transacao={selectedTransacao}
      />
    </div>
  )
}

export default Transacoes
