import { TipoTransacao, TipoAtivo, TipoProvento, StatusProvento } from './entities.types'

// Auth DTOs
export interface LoginDto {
  email: string
  senha: string
}

export interface LoginResponseDto {
  // Token agora vem via cookie httpOnly - não mais no response body
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
  codigo: string
  nome: string
  tipo: TipoAtivo
  descricao?: string
}

export interface UpdateAtivoDto {
  codigo?: string
  nome?: string
  tipo?: TipoAtivo
  descricao?: string
}

// Transação DTOs
export interface CreateTransacaoDto {
  carteiraId: number
  ativoId: number
  tipoTransacao: string
  quantidade: number
  preco: number
  dataTransacao: string
}

export interface UpdateTransacaoDto {
  carteiraId?: number
  ativoId?: number
  tipoTransacao?: string
  quantidade?: number
  preco?: number
  dataTransacao?: string
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

// Provento DTOs
export interface CreateProventoDto {
  ativoId: number
  tipoProvento: TipoProvento
  valorPorCota: number
  dataCom: string
  dataEx?: string
  dataPagamento: string
  status: StatusProvento
  observacao?: string
}

export interface UpdateProventoDto {
  ativoId?: number
  tipoProvento?: TipoProvento
  valorPorCota?: number
  dataCom?: string
  dataEx?: string
  dataPagamento?: string
  status?: StatusProvento
  observacao?: string
}
