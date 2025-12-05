import { QueryClient } from '@tanstack/react-query'

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
    detail: (id: string) => ['carteiras', id] as const,
    ativos: (id: string) => ['carteiras', id, 'ativos'] as const,
  },
  ativos: {
    all: ['ativos'] as const,
    detail: (id: string) => ['ativos', id] as const,
    search: (query: string) => ['ativos', 'search', query] as const,
  },
  transacoes: {
    all: ['transacoes'] as const,
    byCarteira: (carteiraId: string) => ['transacoes', 'carteira', carteiraId] as const,
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
} as const
