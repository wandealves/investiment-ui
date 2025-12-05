import { Plus, ArrowLeftRight } from 'lucide-react'
import { useTransacoes } from '@/features/transacoes/hooks/useTransacoes'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/utils/formatters'

const Transacoes = () => {
  const { data: transacoes, isLoading } = useTransacoes()

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

      {!transacoes || transacoes.length === 0 ? (
        <EmptyState
          icon={ArrowLeftRight}
          title="Nenhuma transação encontrada"
          description="Registre suas primeiras transações para começar a rastrear seus investimentos"
          actionLabel="Adicionar Transação"
          onAction={() => console.log('Adicionar transação')}
        />
      ) : (
        <div className="rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Data</th>
                  <th className="text-left p-4">Tipo</th>
                  <th className="text-left p-4">Ativo</th>
                  <th className="text-right p-4">Quantidade</th>
                  <th className="text-right p-4">Preço</th>
                  <th className="text-right p-4">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map((transacao) => (
                  <tr key={transacao.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">{formatDate(transacao.data)}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {transacao.tipo}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">
                      {transacao.ativo?.ticker || '-'}
                    </td>
                    <td className="p-4 text-right">{transacao.quantidade}</td>
                    <td className="p-4 text-right">
                      {formatCurrency(transacao.preco)}
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {formatCurrency(transacao.valor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Transacoes
