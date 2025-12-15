import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useCarteira, useCarteiraAtivos } from '@/features/carteiras/hooks/useCarteiras'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatPercent } from '@/utils/formatters'

const CarteiraDetalhes = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: carteira, isLoading } = useCarteira(id!)
  const { data: ativos, isLoading: loadingAtivos } = useCarteiraAtivos(id!)

  if (isLoading || loadingAtivos) {
    return <LoadingSpinner />
  }

  if (!carteira) {
    return <div>Carteira não encontrada</div>
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={carteira.nome}
        description={carteira.descricao || 'Detalhes da carteira'}
        action={
          <Button variant="outline" onClick={() => navigate('/carteiras')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">
            Valor Total
          </p>
          <p className="text-2xl font-bold mt-2">
            {formatCurrency(carteira.valorTotal)}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">
            Rentabilidade
          </p>
          <p className="text-2xl font-bold mt-2">
            {formatPercent(carteira.rentabilidade)}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">
            Quantidade de Ativos
          </p>
          <p className="text-2xl font-bold mt-2">{ativos?.length || 0}</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Ativos na Carteira</h3>
        </div>
        <div className="p-6">
          {!ativos || ativos.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhum ativo nesta carteira
            </p>
          ) : (
            <div className="space-y-4">
              {ativos.map((item) => (
                <div
                  key={item.ativoId}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div>
                    <p className="font-semibold">{item.ativoCodigo}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.ativoNome}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(item.valorAtual || 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantidade: {item.quantidadeAtual}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarteiraDetalhes
