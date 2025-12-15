import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query'
import { dashboardEndpoints, DashboardMetrics, AlocacaoData, EvolucaoPatrimonioData } from '@/api/endpoints/dashboard'

export const useDashboardData = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.metrics,
    queryFn: dashboardEndpoints.getMetrics,
  })
}

export const useAlocacaoData = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.alocacao,
    queryFn: dashboardEndpoints.getAlocacao,
  })
}

export const useEvolucaoData = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.evolucao,
    queryFn: dashboardEndpoints.getEvolucao,
  })
}

// Re-export types for convenience
export type { DashboardMetrics, AlocacaoData, EvolucaoPatrimonioData }
