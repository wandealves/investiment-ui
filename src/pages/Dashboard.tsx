import { Wallet, TrendingUp, PieChart, Activity, DollarSign, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react'
import {
  useDashboardData,
  useProventosRecentes,
  useUltimasTransacoes,
  useDistribuicaoCarteiras,
} from '@/features/dashboard/hooks/useDashboardData'
import MetricCard from '@/features/dashboard/components/MetricCard'
import AlocacaoChart from '@/features/dashboard/components/AlocacaoChart'
import EvolucaoChart from '@/features/dashboard/components/EvolucaoChart'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { formatCurrency } from '@/utils/formatters'
import { GridBackground } from '@/components/aceternity'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const Dashboard = () => {
  const { data: metrics, isLoading: isLoadingMetrics } = useDashboardData()
  const { data: proventos, isLoading: isLoadingProventos } = useProventosRecentes(5)
  const { data: transacoes, isLoading: isLoadingTransacoes } = useUltimasTransacoes(5)
  const { data: distribuicaoCarteiras } = useDistribuicaoCarteiras()

  if (isLoadingMetrics) {
    return <LoadingSpinner />
  }

  return (
    <div className="relative min-h-screen">
      {/* Grid Background */}
      <GridBackground className="absolute inset-0 -z-10" />

      <div className="relative z-10 space-y-6">
        <PageHeader
          title="Dashboard"
          description="Visão geral dos seus investimentos"
        />

        {/* Métricas Principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
          <MetricCard
            title="Patrimônio Total"
            value={formatCurrency(metrics?.patrimonioTotal || 0)}
            icon={Wallet}
            trend={metrics?.rentabilidadeTotal}
          />
          <MetricCard
            title="Rentabilidade"
            value={`${(metrics?.rentabilidadeTotal || 0).toFixed(2)}%`}
            icon={TrendingUp}
          />
          <MetricCard
            title="Carteiras"
            value={metrics?.quantidadeCarteiras || 0}
            icon={PieChart}
          />
          <MetricCard
            title="Ativos"
            value={metrics?.quantidadeAtivos || 0}
            icon={Activity}
          />
        </div>

        {/* Cards de Proventos */}
        <div className="grid gap-4 md:grid-cols-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="group rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Investido</h3>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{formatCurrency(metrics?.valorInvestidoTotal || 0)}</p>
          </div>

          <div className="group rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-green-500/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Proventos 30 dias</h3>
              <Calendar className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(metrics?.proventosRecebidos30Dias || 0)}
            </p>
          </div>

          <div className="group rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-green-500/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Proventos no Ano</h3>
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(metrics?.proventosRecebidosAno || 0)}
            </p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="group rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <h3 className="text-lg font-semibold mb-4">Alocação por Tipo de Ativo</h3>
            <AlocacaoChart />
          </div>

          <div className="group rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <h3 className="text-lg font-semibold mb-4">Evolução do Patrimônio</h3>
            <EvolucaoChart />
          </div>
        </div>

        {/* Melhor e Pior Ativo */}
        {metrics && metrics.melhorAtivo && metrics.piorAtivo && (
          <div className="grid gap-4 md:grid-cols-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-success/20 hover:border-success/50">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Melhor Ativo</h3>
                  <p className="text-3xl font-bold font-mono text-success">
                    {metrics.melhorAtivo.codigo}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-4 w-4" />
                    +{metrics.melhorAtivo.rentabilidade.toFixed(2)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-error/20 hover:border-error/50">
              <div className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pior Ativo</h3>
                  <p className="text-3xl font-bold font-mono text-error">
                    {metrics.piorAtivo.codigo}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono flex items-center gap-1 mt-1">
                    <ArrowDownRight className="h-4 w-4" />
                    {metrics.piorAtivo.rentabilidade.toFixed(2)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-error rotate-180" />
              </div>
            </div>
          </div>
        )}

        {/* Distribuição por Carteira */}
        {distribuicaoCarteiras && distribuicaoCarteiras.length > 0 && (
          <div className="rounded-lg border bg-card p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h3 className="text-lg font-semibold mb-4">Distribuição por Carteira</h3>
            <div className="space-y-3">
              {distribuicaoCarteiras.map((carteira) => (
                <div key={carteira.carteiraId} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{carteira.carteiraNome}</span>
                      <span className="text-sm text-muted-foreground">
                        {carteira.quantidadeAtivos} {carteira.quantidadeAtivos === 1 ? 'ativo' : 'ativos'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                          style={{ width: `${carteira.percentual}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono w-16 text-right">{carteira.percentual.toFixed(1)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{formatCurrency(carteira.valor)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Últimas Transações e Proventos Recentes */}
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
          {/* Últimas Transações */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Últimas Transações</h3>
            {isLoadingTransacoes ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : transacoes && transacoes.length > 0 ? (
              <div className="space-y-3">
                {transacoes.map((transacao) => (
                  <div
                    key={transacao.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{transacao.ativoCodigo}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            transacao.tipoTransacao === 'Compra'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : transacao.tipoTransacao === 'Venda'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}
                        >
                          {transacao.tipoTransacao}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>{transacao.carteiraNome}</span>
                        <span>•</span>
                        <span>{format(new Date(transacao.dataTransacao), 'dd/MM/yyyy', { locale: ptBR })}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(transacao.valorTotal)}</p>
                      <p className="text-xs text-muted-foreground">
                        {transacao.quantidade} × {formatCurrency(transacao.preco)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Nenhuma transação recente</p>
            )}
          </div>

          {/* Proventos Recentes */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Proventos Recentes</h3>
            {isLoadingProventos ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : proventos && proventos.length > 0 ? (
              <div className="space-y-3">
                {proventos.map((provento) => (
                  <div
                    key={provento.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{provento.ativoCodigo}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                          {provento.tipoProvento}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>{provento.ativoNome}</span>
                        <span>•</span>
                        <span>{format(new Date(provento.dataPagamento), 'dd/MM/yyyy', { locale: ptBR })}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(provento.valorPorCota)}
                      </p>
                      <p className="text-xs text-muted-foreground">{provento.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Nenhum provento recente</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
