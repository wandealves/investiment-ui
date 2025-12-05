import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@/api/client'
import { queryKeys } from '@/lib/react-query'
import { AlocacaoData, EvolucaoPatrimonioData } from '@/types'

export interface DashboardMetrics {
  patrimonioTotal: number
  rentabilidadeTotal: number
  quantidadeCarteiras: number
  quantidadeAtivos: number
  melhorAtivo: {
    ticker: string
    rentabilidade: number
  }
  piorAtivo: {
    ticker: string
    rentabilidade: number
  }
}

export const useDashboardData = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.metrics,
    queryFn: () => ApiClient.get<DashboardMetrics>('/dashboard/metrics'),
  })
}

export const useAlocacaoData = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.alocacao,
    queryFn: () => ApiClient.get<AlocacaoData[]>('/dashboard/alocacao'),
  })
}

export const useEvolucaoData = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.evolucao,
    queryFn: () => ApiClient.get<EvolucaoPatrimonioData[]>('/dashboard/evolucao'),
  })
}
