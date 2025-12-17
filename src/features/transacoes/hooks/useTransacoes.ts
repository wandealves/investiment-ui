import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transacoesEndpoints } from '@/api/endpoints/transacoes'
import { queryKeys } from '@/lib/react-query'
import { toast } from '@/hooks/useToast'
import { CreateTransacaoDto } from '@/types'
import { PaginationParams } from '@/types/api.types'

export const useTransacoes = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.transacoes.list(params),
    queryFn: () => transacoesEndpoints.getAll(params),
  })
}

export const useTransacoesByCarteira = (
  carteiraId: string,
  params?: PaginationParams
) => {
  return useQuery({
    queryKey: queryKeys.transacoes.byCarteira(carteiraId, params),
    queryFn: () => transacoesEndpoints.getByCarteira(carteiraId, params),
    enabled: !!carteiraId,
  })
}

export const useCreateTransacao = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTransacaoDto) => transacoesEndpoints.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transacoes'] })
      queryClient.invalidateQueries({ queryKey: ['carteiras'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success('Transação criada com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar transação')
    },
  })
}

export const useDeleteTransacao = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => transacoesEndpoints.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transacoes'] })
      queryClient.invalidateQueries({ queryKey: ['carteiras'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success('Transação excluída com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir transação')
    },
  })
}
