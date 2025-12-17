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
      )}
    </div>
  )
}

export default Transacoes
