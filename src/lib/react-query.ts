import { QueryClient } from '@tanstack/react-query'
import { PaginationParams, TransacaoFilterParams } from '@/types/api.types'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
})

export const queryKeys = {
  auth: {
    user: ['auth', 'user'] as const,
  },
  carteiras: {
    all: ['carteiras'] as const,
    list: (params?: PaginationParams) => ['carteiras', 'list', params] as const,
    detail: (id: string) => ['carteiras', id] as const,
    ativos: (id: string) => ['carteiras', id, 'ativos'] as const,
  },
  ativos: {
    all: ['ativos'] as const,
    list: (params?: PaginationParams) => ['ativos', 'list', params] as const,
    detail: (id: string) => ['ativos', id] as const,
    search: (query: string, params?: PaginationParams) =>
      ['ativos', 'search', query, params] as const,
  },
  transacoes: {
    all: ['transacoes'] as const,
    list: (params?: TransacaoFilterParams) => ['transacoes', 'list', params] as const,
    byCarteira: (carteiraId: string, params?: PaginationParams) =>
      ['transacoes', 'carteira', carteiraId, params] as const,
    byAtivo: (ativoId: string) => ['transacoes', 'ativo', ativoId] as const,
  },
  relatorios: {
    rentabilidade: (carteiraId?: string) => ['relatorios', 'rentabilidade', carteiraId] as const,
    movimentacoes: (filtros: any) => ['relatorios', 'movimentacoes', filtros] as const,
  },
  dashboard: {
    metrics: ['dashboard', 'metrics'] as const,
    alocacao: ['dashboard', 'alocacao'] as const,
    evolucao: ['dashboard', 'evolucao'] as const,
  },
  lookups: {
    ativos: (searchTerm?: string) => ['lookups', 'ativos', searchTerm] as const,
    anos: ['lookups', 'anos'] as const,
    carteiras: (searchTerm?: string) => ['lookups', 'carteiras', searchTerm] as const,
  },
} as const
