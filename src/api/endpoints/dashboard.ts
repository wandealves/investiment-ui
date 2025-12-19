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
  getMetrics: () => ApiClient.get<DashboardMetrics>('dashboard/metrics'),
  getAlocacao: () => ApiClient.get<AlocacaoData[]>('dashboard/alocacao'),
  getEvolucao: () => ApiClient.get<EvolucaoPatrimonioData[]>('dashboard/evolucao'),
}
