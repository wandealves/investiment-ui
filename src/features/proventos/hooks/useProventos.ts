import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { proventosEndpoints, ProventoFilterParams } from '@/api/endpoints/proventos'
import { queryKeys } from '@/lib/react-query'
import { toast } from '@/hooks/useToast'
import { CreateProventoDto, UpdateProventoDto } from '@/types'
import { AxiosApiError, getErrorMessage } from '@/types/api.types'

export const useProventos = (params?: ProventoFilterParams) => {
  return useQuery({
    queryKey: queryKeys.proventos.list(params),
    queryFn: () => proventosEndpoints.getAll(params),
  })
}

export const useProvento = (id: number) => {
  return useQuery({
    queryKey: queryKeys.proventos.detail(id),
    queryFn: () => proventosEndpoints.getById(id),
    enabled: !!id,
  })
}

export const useProventoComDetalhes = (id: number) => {
  return useQuery({
    queryKey: queryKeys.proventos.detalhes(id),
    queryFn: () => proventosEndpoints.getByIdComDetalhes(id),
    enabled: !!id,
  })
}

export const useProventosAgendados = () => {
  return useQuery({
    queryKey: queryKeys.proventos.agendados,
    queryFn: () => proventosEndpoints.getAgendados(),
  })
}

export const useProventosByAtivo = (ativoId: number) => {
  return useQuery({
    queryKey: queryKeys.proventos.byAtivo(ativoId),
    queryFn: () => proventosEndpoints.getByAtivo(ativoId),
    enabled: !!ativoId,
  })
}

export const useProventosByPeriodo = (inicio: string, fim: string) => {
  return useQuery({
    queryKey: queryKeys.proventos.byPeriodo(inicio, fim),
    queryFn: () => proventosEndpoints.getByPeriodo(inicio, fim),
    enabled: !!inicio && !!fim,
  })
}

export const useCreateProvento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProventoDto) => proventosEndpoints.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.proventos.all })
      toast.success('Provento criado com sucesso!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao criar provento'))
    },
  })
}

export const useUpdateProvento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProventoDto }) =>
      proventosEndpoints.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.proventos.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.proventos.detail(variables.id) })
      toast.success('Provento atualizado com sucesso!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao atualizar provento'))
    },
  })
}

export const useMarcarComoPago = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => proventosEndpoints.marcarComoPago(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.proventos.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.proventos.detail(id) })
      toast.success('Provento marcado como pago!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao marcar provento como pago'))
    },
  })
}

export const useCancelarProvento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => proventosEndpoints.cancelar(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.proventos.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.proventos.detail(id) })
      toast.success('Provento cancelado!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao cancelar provento'))
    },
  })
}

export const useDeleteProvento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => proventosEndpoints.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.proventos.all })
      toast.success('Provento excluído com sucesso!')
    },
    onError: (error: AxiosApiError) => {
      toast.error(getErrorMessage(error, 'Erro ao excluir provento'))
    },
  })
}
