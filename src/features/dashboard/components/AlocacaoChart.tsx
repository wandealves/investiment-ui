import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useAlocacaoData } from '../hooks/useDashboardData'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { formatCurrency } from '@/utils/formatters'

ChartJS.register(ArcElement, Tooltip, Legend)

const AlocacaoChart = () => {
  const { data, isLoading } = useAlocacaoData()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p>Nenhum dado de alocação disponível</p>
      </div>
    )
  }

  const chartData = {
    labels: data.map((item) => item.tipo),
    datasets: [
      {
        label: 'Alocação',
        data: data.map((item) => item.valor),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',  // Indigo
          'rgba(168, 85, 247, 0.8)',  // Purple
          'rgba(236, 72, 153, 0.8)',  // Pink
          'rgba(251, 146, 60, 0.8)',  // Orange
          'rgba(34, 197, 94, 0.8)',   // Green
          'rgba(59, 130, 246, 0.8)',  // Blue
          'rgba(234, 179, 8, 0.8)',   // Yellow
          'rgba(239, 68, 68, 0.8)',   // Red
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
          color: 'hsl(var(--foreground))',
        },
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const label = context.label || ''
            const value = formatCurrency(context.parsed)
            const percentage = data[context.dataIndex]?.percentual.toFixed(2) || '0.00'
            return `${label}: ${value} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <div className="h-64">
      <Doughnut data={chartData} options={options} />
    </div>
  )
}

export default AlocacaoChart
