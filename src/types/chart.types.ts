export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
}

export interface AlocacaoData {
  ativo: string
  ticker: string
  valor: number
  percentual: number
  cor: string
}

export interface EvolucaoPatrimonioData {
  data: string
  valor: number
  rentabilidade: number
}

export interface RentabilidadePorAtivoData {
  ticker: string
  nome: string
  rentabilidade: number
  valorInvestido: number
  valorAtual: number
}
