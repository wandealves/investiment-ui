export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Investment Manager'
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  CARTEIRAS: '/carteiras',
  ATIVOS: '/ativos',
  TRANSACOES: '/transacoes',
  RELATORIOS: '/relatorios',
} as const

export const TRANSACTION_TYPES = {
  COMPRA: 'COMPRA',
  VENDA: 'VENDA',
  DIVIDENDO: 'DIVIDENDO',
  JCP: 'JCP',
  SPLIT: 'SPLIT',
} as const

export const ASSET_TYPES = {
  ACAO: 'ACAO',
  FII: 'FII',
  RENDA_FIXA: 'RENDA_FIXA',
  CRIPTO: 'CRIPTO',
  OUTRO: 'OUTRO',
} as const
