export interface Usuario {
  id: string
  nome: string
  email: string
  dataCriacao: string
  dataAtualizacao?: string
}

export interface Carteira {
  id: string
  usuarioId: string
  nome: string
  descricao?: string
  valorTotal: number
  rentabilidade: number
  dataCriacao: string
  dataAtualizacao?: string
  ativos?: CarteiraAtivo[]
}

export interface Ativo {
  id: string
  ticker: string
  nome: string
  tipo: TipoAtivo
  setor?: string
  descricao?: string
  dataCriacao: string
  dataAtualizacao?: string
}

export interface CarteiraAtivo {
  id: string
  carteiraId: string
  ativoId: string
  ativo: Ativo
  quantidade: number
  precoMedio: number
  valorInvestido: number
  valorAtual: number
  rentabilidade: number
  percentualCarteira: number
  dataCriacao: string
  dataAtualizacao?: string
}

export interface Transacao {
  id: string
  carteiraId: string
  ativoId: string
  ativo?: Ativo
  tipo: TipoTransacao
  quantidade: number
  preco: number
  valor: number
  taxas?: number
  data: string
  observacoes?: string
  dataCriacao: string
}

export type TipoAtivo = 'ACAO' | 'FII' | 'RENDA_FIXA' | 'CRIPTO' | 'OUTRO'

export type TipoTransacao = 'COMPRA' | 'VENDA' | 'DIVIDENDO' | 'JCP' | 'SPLIT'
