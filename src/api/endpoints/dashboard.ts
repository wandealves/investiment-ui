import { ApiClient } from '../client'

export interface DashboardMetrics {
  patrimonioTotal: number
  rentabilidadeTotal: number
  quantidadeCarteiras: number
  quantidadeAtivos: number
  melhorAtivo: { codigo: string; rentabilidade: number }
  piorAtivo: { codigo: string; rentabilidade: number }
}

export interface AlocacaoData {
  tipo: string
  valor: number
  percentual: number
}

export interface EvolucaoPatrimonioData {
  data: string
  valor: number
}

export const dashboardEndpoints = {
  getMetrics: () => ApiClient.get<DashboardMetrics>('/api/v1/dashboard/metrics'),
  getAlocacao: () => ApiClient.get<AlocacaoData[]>('/api/v1/dashboard/alocacao'),
  getEvolucao: () => ApiClient.get<EvolucaoPatrimonioData[]>('/api/v1/dashboard/evolucao'),
}
