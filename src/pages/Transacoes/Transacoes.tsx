import { Plus, ArrowLeftRight, Pencil, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTransacoes } from '@/features/transacoes/hooks/useTransacoes'
import TransacaoFormModal from '@/features/transacoes/components/TransacaoFormModal'
import TransacaoDeleteDialog from '@/features/transacoes/components/TransacaoDeleteDialog'
import TransacaoFilters from '@/features/transacoes/components/TransacaoFilters'
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

  // Local filter states (what user is typing/selecting)
  const [localTipoFilter, setLocalTipoFilter] = useState<string>('')
  const [localAtivoFilter, setLocalAtivoFilter] = useState<number>(0)
  const [localDataInicio, setLocalDataInicio] = useState<string>('')
  const [localDataFim, setLocalDataFim] = useState<string>('')

  // Applied filter states (what goes to API)
  const [tipoFilter, setTipoFilter] = useState<string>('')
  const [ativoFilter, setAtivoFilter] = useState<number>(0)
  const [dataInicio, setDataInicio] = useState<string>('')
  const [dataFim, setDataFim] = useState<string>('')

  // Fetch data with filters sent to backend
  const { data, isLoading, isFetching } = useTransacoes({
    page: localPage,
    pageSize: localPageSize,
    tipoTransacao: tipoFilter || undefined,
    ativoId: ativoFilter || undefined,
    dataInicio: dataInicio || undefined,
    dataFim: dataFim || undefined,
  })

  const transacoes = data?.data || []
  const totalItems = data?.total || 0
  const hasActiveFilters = tipoFilter !== '' || ativoFilter !== 0 || dataInicio !== '' || dataFim !== ''

  // Apply filters handler
  const handleApplyFilters = () => {
    setTipoFilter(localTipoFilter)
    setAtivoFilter(localAtivoFilter)
    setDataInicio(localDataInicio)
    setDataFim(localDataFim)
  }

  // Clear filters handler
  const handleClearFilters = () => {
    setLocalTipoFilter('')
    setLocalAtivoFilter(0)
    setLocalDataInicio('')
    setLocalDataFim('')
    setTipoFilter('')
    setAtivoFilter(0)
    setDataInicio('')
    setDataFim('')
  }

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

  // Reset to page 1 when filters change
  useEffect(() => {
    goToPage(1)
  }, [tipoFilter, ativoFilter, dataInicio, dataFim, goToPage])

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

      <TransacaoFilters
        tipoFilter={localTipoFilter}
        ativoFilter={localAtivoFilter}
        dataInicio={localDataInicio}
        dataFim={localDataFim}
        onTipoChange={setLocalTipoFilter}
        onAtivoChange={setLocalAtivoFilter}
        onDataInicioChange={setLocalDataInicio}
        onDataFimChange={setLocalDataFim}
        onClearFilters={handleClearFilters}
        onApplyFilters={handleApplyFilters}
      />

      {totalItems === 0 ? (
        <EmptyState
          icon={ArrowLeftRight}
          title={hasActiveFilters ? 'Nenhum resultado encontrado' : 'Nenhuma transação encontrada'}
          description={
            hasActiveFilters
              ? 'Tente ajustar os filtros para ver mais resultados'
              : 'Registre suas primeiras transações para começar a rastrear seus investimentos'
          }
          actionLabel={!hasActiveFilters ? 'Adicionar Transação' : undefined}
          onAction={!hasActiveFilters ? handleCreate : undefined}
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
                <table className="w-full min-w-[700px]">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b bg-muted/50 backdrop-blur-sm">
                      <th scope="col" className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold whitespace-nowrap">Data</th>
                      <th scope="col" className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold whitespace-nowrap">Tipo</th>
                      <th scope="col" className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold whitespace-nowrap">Ativo</th>
                      <th scope="col" className="text-right p-3 sm:p-4 text-xs sm:text-sm font-semibold whitespace-nowrap">Quantidade</th>
                      <th scope="col" className="text-right p-3 sm:p-4 text-xs sm:text-sm font-semibold whitespace-nowrap">Preço</th>
                      <th scope="col" className="text-right p-3 sm:p-4 text-xs sm:text-sm font-semibold whitespace-nowrap">Valor Total</th>
                      <th scope="col" className="text-right p-3 sm:p-4 text-xs sm:text-sm font-semibold whitespace-nowrap">Ações</th>
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
                        <td className="p-3 sm:p-4 text-xs sm:text-sm whitespace-nowrap">{formatDate(transacao.dataTransacao)}</td>
                        <td className="p-3 sm:p-4">
                          <span
                            className={cn(
                              'px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap',
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
                        <td className="p-3 sm:p-4 font-semibold group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                          {transacao.ativoCodigo || '-'}
                        </td>
                        <td className="p-3 sm:p-4 text-right font-mono text-xs sm:text-sm">{transacao.quantidade}</td>
                        <td className="p-3 sm:p-4 text-right font-mono text-xs sm:text-sm whitespace-nowrap">
                          {formatCurrency(transacao.preco)}
                        </td>
                        <td className="p-3 sm:p-4 text-right font-semibold font-mono text-xs sm:text-sm whitespace-nowrap">
                          {formatCurrency(transacao.valorTotal)}
                        </td>
                        <td className="p-3 sm:p-4">
                          <div className="flex items-center justify-end gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
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
