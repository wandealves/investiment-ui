import { TipoAtivo, TipoTransacao } from './entities.types'

// Auth DTOs
export interface LoginDto {
  email: string
  senha: string
}

export interface LoginResponseDto {
  token: string
  usuario: {
    id: string
    nome: string
    email: string
  }
}

export interface RegisterDto {
  nome: string
  email: string
  senha: string
}

// Carteira DTOs
export interface CreateCarteiraDto {
  nome: string
  descricao?: string
}

export interface UpdateCarteiraDto {
  nome?: string
  descricao?: string
}

export interface CarteiraResponseDto {
  id: string
  nome: string
  descricao?: string
  valorTotal: number
  rentabilidade: number
  quantidadeAtivos: number
  dataCriacao: string
}

// Ativo DTOs
export interface CreateAtivoDto {
  ticker: string
  nome: string
  tipo: TipoAtivo
  setor?: string
  descricao?: string
}

export interface UpdateAtivoDto {
  ticker?: string
  nome?: string
  tipo?: TipoAtivo
  setor?: string
  descricao?: string
}

// Transação DTOs
export interface CreateTransacaoDto {
  carteiraId: string
  ativoId: string
  tipo: TipoTransacao
  quantidade: number
  preco: number
  taxas?: number
  data: string
  observacoes?: string
}

export interface UpdateTransacaoDto {
  tipo?: TipoTransacao
  quantidade?: number
  preco?: number
  taxas?: number
  data?: string
  observacoes?: string
}

// Relatório DTOs
export interface RelatorioRentabilidadeDto {
  carteiraId?: string
  dataInicio?: string
  dataFim?: string
}

export interface RelatorioMovimentacoesDto {
  carteiraId?: string
  ativoId?: string
  tipoTransacao?: TipoTransacao
  dataInicio?: string
  dataFim?: string
}

export interface ExportarCsvDto {
  tipo: 'TRANSACOES' | 'ATIVOS' | 'RENTABILIDADE'
  filtros?: any
}
