import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query'
import {
  dashboardEndpoints,
  DashboardMetrics,
  AlocacaoData,
  EvolucaoPatrimonioData,
  ProventoRecente,
  UltimaTransacao,
  DistribuicaoCarteira,
} from '@/api/endpoints/dashboard'

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

export const useProventosRecentes = (quantidade = 10) => {
  return useQuery({
    queryKey: ['dashboard', 'proventos-recentes', quantidade],
    queryFn: () => dashboardEndpoints.getProventosRecentes(quantidade),
  })
}

export const useUltimasTransacoes = (quantidade = 10) => {
  return useQuery({
    queryKey: ['dashboard', 'ultimas-transacoes', quantidade],
    queryFn: () => dashboardEndpoints.getUltimasTransacoes(quantidade),
  })
}

export const useDistribuicaoCarteiras = () => {
  return useQuery({
    queryKey: ['dashboard', 'distribuicao-carteiras'],
    queryFn: dashboardEndpoints.getDistribuicaoCarteiras,
  })
}

// Re-export types for convenience
export type {
  DashboardMetrics,
  AlocacaoData,
  EvolucaoPatrimonioData,
  ProventoRecente,
  UltimaTransacao,
  DistribuicaoCarteira,
}
