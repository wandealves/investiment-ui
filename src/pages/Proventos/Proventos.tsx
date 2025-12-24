import { Plus, DollarSign } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useProventos } from '@/features/proventos/hooks/useProventos'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Pagination from '@/components/common/Pagination'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import ProventoFormModal from '@/features/proventos/components/ProventoFormModal'
import ProventoDeleteDialog from '@/features/proventos/components/ProventoDeleteDialog'
import ProventoActions from '@/features/proventos/components/ProventoActions'
import type { Provento } from '@/types/entities.types'
import { formatCurrency } from '@/utils/formatters'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const Proventos = () => {
  // Local state for pagination params
  const [localPage, setLocalPage] = useState(1)
  const [localPageSize, setLocalPageSize] = useState(20)

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProvento, setSelectedProvento] = useState<Provento | null>(null)

  // Fetch data
  const { data, isLoading, isFetching } = useProventos({
    page: localPage,
    pageSize: localPageSize,
  })

  const proventos = data?.data || []
  const totalItems = data?.total || 0

  // Pagination hook
  const { currentPage, pageSize, goToPage, setPageSize } = usePagination({
    initialPage: 1,
    initialPageSize: 20,
    totalItems: totalItems,
    storageKey: 'pagination-proventos',
  })

  // Sync local state with pagination hook
  useEffect(() => {
    setLocalPage(currentPage)
    setLocalPageSize(pageSize)
  }, [currentPage, pageSize])

  // Modal handlers
  const handleCreate = () => {
    setSelectedProvento(null)
    setIsFormModalOpen(true)
  }

  const handleEdit = (provento: Provento) => {
    setSelectedProvento(provento)
    setIsFormModalOpen(true)
  }

  const handleDelete = (provento: Provento) => {
    setSelectedProvento(provento)
    setIsDeleteDialogOpen(true)
  }

  const handleModalClose = () => {
    setIsFormModalOpen(false)
    setSelectedProvento(null)
  }

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false)
    setSelectedProvento(null)
  }

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendado':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'Pago':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'Cancelado':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  // Tipo badge color
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Dividendo':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'JCP':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
      case 'RendimentoFII':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      case 'Bonificacao':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Proventos"
        description="Gerencie dividendos, JCP e outros proventos dos seus ativos"
        action={
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Provento
          </Button>
        }
      />

      <div className="mt-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : proventos.length === 0 ? (
          <EmptyState
            icon={DollarSign}
            title="Nenhum provento cadastrado"
            description="Comece adicionando o primeiro provento dos seus ativos"
            actionLabel="Adicionar Provento"
            onAction={handleCreate}
          />
        ) : (
          <>
            <div className="rounded-lg border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Ativo</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Tipo</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Valor/Cota</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Data COM</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Pagamento</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {proventos.map((provento) => (
                      <tr
                        key={provento.id}
                        className={cn(
                          'hover:bg-muted/50 transition-colors',
                          isFetching && 'opacity-50'
                        )}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{provento.ativoCodigo}</div>
                            <div className="text-sm text-muted-foreground">
                              {provento.ativoNome}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                              getTipoColor(provento.tipoProvento)
                            )}
                          >
                            {provento.tipoProventoDescricao}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          {formatCurrency(provento.valorPorCota)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {format(new Date(provento.dataCom), 'dd/MM/yyyy', { locale: ptBR })}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {format(new Date(provento.dataPagamento), 'dd/MM/yyyy', { locale: ptBR })}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                              getStatusColor(provento.status)
                            )}
                          >
                            {provento.statusDescricao}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end">
                            <ProventoActions
                              provento={provento}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / pageSize)}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={goToPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          </>
        )}
      </div>

      <ProventoFormModal
        isOpen={isFormModalOpen}
        onClose={handleModalClose}
        provento={selectedProvento}
      />

      <ProventoDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        provento={selectedProvento}
      />
    </div>
  )
}

export default Proventos
