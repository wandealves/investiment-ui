import { ApiClient } from '../client'

export interface DashboardMetrics {
  patrimonioTotal: number
  rentabilidadeTotal: number
  quantidadeCarteiras: number
  quantidadeAtivos: number
  melhorAtivo: { codigo: string; rentabilidade: number } | null
  piorAtivo: { codigo: string; rentabilidade: number } | null
  proventosRecebidos30Dias: number
  proventosRecebidosAno: number
  valorInvestidoTotal: number
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

export interface ProventoRecente {
  id: number
  ativoCodigo: string
  ativoNome: string
  tipoProvento: string
  valorPorCota: number
  dataPagamento: string
  status: string
}

export interface UltimaTransacao {
  id: string
  ativoCodigo: string
  carteiraNome: string
  tipoTransacao: string
  quantidade: number
  preco: number
  valorTotal: number
  dataTransacao: string
}

export interface DistribuicaoCarteira {
  carteiraId: number
  carteiraNome: string
  valor: number
  percentual: number
  quantidadeAtivos: number
}

export const dashboardEndpoints = {
  getMetrics: () => ApiClient.get<DashboardMetrics>('dashboard/metrics'),
  getAlocacao: () => ApiClient.get<AlocacaoData[]>('dashboard/alocacao'),
  getEvolucao: () => ApiClient.get<EvolucaoPatrimonioData[]>('dashboard/evolucao'),
  getProventosRecentes: (quantidade = 10) =>
    ApiClient.get<ProventoRecente[]>(`dashboard/proventos-recentes?quantidade=${quantidade}`),
  getUltimasTransacoes: (quantidade = 10) =>
    ApiClient.get<UltimaTransacao[]>(`dashboard/ultimas-transacoes?quantidade=${quantidade}`),
  getDistribuicaoCarteiras: () =>
    ApiClient.get<DistribuicaoCarteira[]>('dashboard/distribuicao-carteiras'),
}
