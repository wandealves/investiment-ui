import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transacoesEndpoints } from '@/api/endpoints/transacoes'
import { queryKeys } from '@/lib/react-query'
import { toast } from '@/hooks/useToast'
import { CreateTransacaoDto } from '@/types'

export const useTransacoes = () => {
  return useQuery({
    queryKey: queryKeys.transacoes.all,
    queryFn: transacoesEndpoints.getAll,
  })
}

export const useTransacoesByCarteira = (carteiraId: string) => {
  return useQuery({
    queryKey: queryKeys.transacoes.byCarteira(carteiraId),
    queryFn: () => transacoesEndpoints.getByCarteira(carteiraId),
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
      queryClient.invalidateQueries({ queryKey: queryKeys.transacoes.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.carteiras.all })
      toast.success('Transação excluída com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir transação')
    },
  })
}
