import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ativosEndpoints } from '@/api/endpoints/ativos'
import { queryKeys } from '@/lib/react-query'
import { toast } from '@/hooks/useToast'
import { CreateAtivoDto, UpdateAtivoDto } from '@/types'
import { PaginationParams, AtivoFilterParams, AxiosApiError, getErrorMessage } from '@/types/api.types'

export const useAtivos = (params?: AtivoFilterParams) => {
  return useQuery({
    queryKey: queryKeys.ativos.list(params),
    queryFn: () => ativosEndpoints.getAll(params),
  })
}

export const useAtivo = (id: string) => {
  return useQuery({
    queryKey: queryKeys.ativos.detail(id),
    queryFn: () => ativosEndpoints.getById(id),
    enabled: !!id,
  })
}

export const useSearchAtivos = (query: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.ativos.search(query, params),
    queryFn: () => ativosEndpoints.search(query, params),
    enabled: query.length > 0,
  })
}

export const useCreateAtivo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateAtivoDto) => ativosEndpoints.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ativos.all })
      toast.success('Ativo criado com sucesso!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao criar ativo'))
    },
  })
}

export const useUpdateAtivo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAtivoDto }) =>
      ativosEndpoints.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ativos.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.ativos.detail(variables.id) })
      toast.success('Ativo atualizado com sucesso!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao atualizar ativo'))
    },
  })
}

export const useDeleteAtivo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ativosEndpoints.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ativos.all })
      toast.success('Ativo excluído com sucesso!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao excluir ativo'))
    },
  })
}
