import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transacoesEndpoints } from '@/api/endpoints/transacoes'
import { queryKeys } from '@/lib/react-query'
import { toast } from '@/hooks/useToast'
import { CreateTransacaoDto, UpdateTransacaoDto } from '@/types'
import { PaginationParams, TransacaoFilterParams, AxiosApiError, getErrorMessage } from '@/types/api.types'

export const useTransacoes = (params?: TransacaoFilterParams) => {
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
      queryClient.invalidateQueries({ queryKey: queryKeys.transacoes.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.carteiras.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.metrics })
      toast.success('Transação criada com sucesso!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao criar transação'))
    },
  })
}

export const useUpdateTransacao = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTransacaoDto }) =>
      transacoesEndpoints.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transacoes.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.carteiras.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.metrics })
      toast.success('Transação atualizada com sucesso!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao atualizar transação'))
    },
  })
}

export const useDeleteTransacao = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => transacoesEndpoints.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transacoes.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.carteiras.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.metrics })
      toast.success('Transação excluída com sucesso!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao excluir transação'))
    },
  })
}
