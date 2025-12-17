import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { carteirasEndpoints } from '@/api/endpoints/carteiras'
import { queryKeys } from '@/lib/react-query'
import { toast } from '@/hooks/useToast'
import { CreateCarteiraDto, UpdateCarteiraDto } from '@/types'
import { PaginationParams } from '@/types/api.types'

export const useCarteiras = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.carteiras.list(params),
    queryFn: () => carteirasEndpoints.getAll(params),
  })
}

export const useCarteira = (id: string) => {
  return useQuery({
    queryKey: queryKeys.carteiras.detail(id),
    queryFn: () => carteirasEndpoints.getById(id),
    enabled: !!id,
  })
}

export const useCarteiraAtivos = (id: string) => {
  return useQuery({
    queryKey: queryKeys.carteiras.ativos(id),
    queryFn: () => carteirasEndpoints.getAtivos(id),
    enabled: !!id,
  })
}

export const useCreateCarteira = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCarteiraDto) => carteirasEndpoints.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carteiras'] })
      toast.success('Carteira criada com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar carteira')
    },
  })
}

export const useUpdateCarteira = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCarteiraDto }) =>
      carteirasEndpoints.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['carteiras'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.carteiras.detail(variables.id) })
      toast.success('Carteira atualizada com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar carteira')
    },
  })
}

export const useDeleteCarteira = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => carteirasEndpoints.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carteiras'] })
      toast.success('Carteira excluída com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir carteira')
    },
  })
}
