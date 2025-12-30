import { useQuery } from '@tanstack/react-query'
import { lookupsEndpoints } from '@/api/endpoints/lookups'
import { queryKeys } from '@/lib/react-query'

export const useAtivosLookup = (searchTerm?: string) => {
  return useQuery({
    queryKey: queryKeys.lookups.ativos(searchTerm),
    queryFn: () => lookupsEndpoints.getAtivos(searchTerm),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export const useAnosLookup = () => {
  return useQuery({
    queryKey: queryKeys.lookups.anos,
    queryFn: () => lookupsEndpoints.getAnos(),
    staleTime: 60 * 60 * 1000, // 1 hora - anos não mudam com frequência
  })
}

export const useCarteirasLookup = (searchTerm?: string) => {
  return useQuery({
    queryKey: queryKeys.lookups.carteiras(searchTerm),
    queryFn: () => lookupsEndpoints.getCarteiras(searchTerm),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
