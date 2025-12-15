import { Wallet, TrendingUp, PieChart, Activity } from 'lucide-react'
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData'
import MetricCard from '@/features/dashboard/components/MetricCard'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { formatCurrency } from '@/utils/formatters'

const Dashboard = () => {
  const { data: metrics, isLoading } = useDashboardData()

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral dos seus investimentos"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Alocação por Ativo</h3>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>Gráfico de alocação (implementar Chart.js)</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">
            Evolução do Patrimônio
          </h3>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>Gráfico de evolução (implementar Chart.js)</p>
          </div>
        </div>
      </div>

      {metrics && metrics.melhorAtivo && metrics.piorAtivo && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Melhor Ativo</h3>
            <p className="text-2xl font-bold text-green-600">
              {metrics.melhorAtivo.codigo}
            </p>
            <p className="text-sm text-muted-foreground">
              +{metrics.melhorAtivo.rentabilidade.toFixed(2)}%
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Pior Ativo</h3>
            <p className="text-2xl font-bold text-red-600">
              {metrics.piorAtivo.codigo}
            </p>
            <p className="text-sm text-muted-foreground">
              {metrics.piorAtivo.rentabilidade.toFixed(2)}%
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
