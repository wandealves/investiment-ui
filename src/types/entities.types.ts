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
}

export type TipoTransacao = 'Compra' | 'Venda' | 'Dividendo' | 'JCP' | 'Bonus' | 'Split' | 'Grupamento'