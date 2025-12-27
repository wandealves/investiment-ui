export interface Usuario {
  id: string
  nome: string
  email: string
  dataCriacao: string
  dataAtualizacao?: string
}

export interface Carteira {
  id: number
  usuarioId: string
  nome: string
  descricao?: string
  valorTotal?: number
  lucroTotal?: number
  rentabilidadeTotal?: number
  criadaEm: string
  totalAtivos?: number
  totalTransacoes?: number
  ativos?: CarteiraAtivo[]
}

export enum TipoAtivo {
  Acao = 'Acao',
  ETF = 'ETF',
  FII = 'FII',
  Cripto = 'Cripto',
  RF = 'RF'
}

export interface Ativo {
  id: number
  codigo: string
  nome: string
  tipo: TipoAtivo
  descricao?: string
}

export interface CarteiraAtivo {
  ativoId: number
  ativoNome: string
  ativoCodigo: string
  ativoTipo: TipoAtivo
  quantidadeAtual: number
  precoMedio: number
  valorInvestido: number
  precoAtual?: number
  valorAtual?: number
  lucro?: number
  rentabilidade?: number
  dividendosRecebidos: number
  dataPrimeiraCompra?: string
  dataUltimaTransacao?: string
}

export interface Transacao {
  id: string
  carteiraId: number
  ativoId: number
  ativoNome?: string
  ativoCodigo?: string
  quantidade: number
  preco: number
  valorTotal: number
  tipoTransacao: string
  dataTransacao: string
  proventoId?: number
}

export type TipoTransacao = 'Compra' | 'Venda' | 'Dividendo' | 'JCP' | 'Bonus' | 'Split' | 'Grupamento'

export enum TipoProvento {
  Dividendo = 'Dividendo',
  JCP = 'JCP',
  RendimentoFII = 'RendimentoFII',
  Bonificacao = 'Bonificacao'
}

export enum StatusProvento {
  Agendado = 'Agendado',
  Pago = 'Pago',
  Cancelado = 'Cancelado'
}

export interface Provento {
  id: number
  ativoId: number
  ativoNome: string
  ativoCodigo: string
  tipoProvento: TipoProvento
  tipoProventoDescricao: string
  valorPorCota: number
  dataCom: string
  dataEx?: string
  dataPagamento: string
  status: StatusProvento
  statusDescricao: string
  observacao?: string
  criadoEm: string
}

export interface ProventoComTransacoes extends Provento {
  ativo: Ativo
  transacoes: Transacao[]
  valorTotalPago: number
}

export interface CalculoIR {
  id: string
  ano: number | null
  dataCalculo: string
  valorTotalInvestido: number
  valorTotalAtual: number | null
  totalTaxasRateadas: number
  totalGanhoCapital: number
  totalIRDevido: number
  itens: ItemCalculoIR[]
}

export interface ItemCalculoIR {
  ativoId: number
  ativoNome: string
  ativoCodigo: string
  ativoTipo: TipoAtivo
  quantidade: number
  totalInvestido: number
  precoMedio: number
  precoAtual: number | null
  rendimento: number | null
  taxasRateadas: number
  ganhoCapital: number
  irDevido: number
  aliquotaIR: number
  historicoCompras: HistoricoCompra[]
}

export interface HistoricoCompra {
  transacaoId: string
  dataCompra: string
  quantidade: number
  preco: number
  taxa: number
  taxaRateada: number
  totalComTaxas: number
}

export interface AnoLookup {
  ano: number
}