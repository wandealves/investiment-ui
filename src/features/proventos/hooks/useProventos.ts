import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { proventosEndpoints, ProventoFilterParams } from '@/api/endpoints/proventos'
import { queryKeys } from '@/lib/react-query'
import { toast } from '@/hooks/useToast'
import { CreateProventoDto, UpdateProventoDto } from '@/types'

export const useProventos = (params?: ProventoFilterParams) => {
  return useQuery({
    queryKey: ['proventos', 'list', params],
    queryFn: () => proventosEndpoints.getAll(params),
  })
}

export const useProvento = (id: number) => {
  return useQuery({
    queryKey: ['proventos', 'detail', id],
    queryFn: () => proventosEndpoints.getById(id),
    enabled: !!id,
  })
}

export const useProventoComDetalhes = (id: number) => {
  return useQuery({
    queryKey: ['proventos', 'detalhes', id],
    queryFn: () => proventosEndpoints.getByIdComDetalhes(id),
    enabled: !!id,
  })
}

export const useProventosAgendados = () => {
  return useQuery({
    queryKey: ['proventos', 'agendados'],
    queryFn: () => proventosEndpoints.getAgendados(),
  })
}

export const useProventosByAtivo = (ativoId: number) => {
  return useQuery({
    queryKey: ['proventos', 'ativo', ativoId],
    queryFn: () => proventosEndpoints.getByAtivo(ativoId),
    enabled: !!ativoId,
  })
}

export const useProventosByPeriodo = (inicio: string, fim: string) => {
  return useQuery({
    queryKey: ['proventos', 'periodo', inicio, fim],
    queryFn: () => proventosEndpoints.getByPeriodo(inicio, fim),
    enabled: !!inicio && !!fim,
  })
}

export const useCreateProvento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProventoDto) => proventosEndpoints.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proventos'] })
      toast.success('Provento criado com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar provento')
    },
  })
}

export const useUpdateProvento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProventoDto }) =>
      proventosEndpoints.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['proventos'] })
      queryClient.invalidateQueries({ queryKey: ['proventos', 'detail', variables.id] })
      toast.success('Provento atualizado com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar provento')
    },
  })
}

export const useMarcarComoPago = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => proventosEndpoints.marcarComoPago(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['proventos'] })
      queryClient.invalidateQueries({ queryKey: ['proventos', 'detail', id] })
      toast.success('Provento marcado como pago!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao marcar provento como pago')
    },
  })
}

export const useCancelarProvento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => proventosEndpoints.cancelar(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['proventos'] })
      queryClient.invalidateQueries({ queryKey: ['proventos', 'detail', id] })
      toast.success('Provento cancelado!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao cancelar provento')
    },
  })
}

export const useDeleteProvento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => proventosEndpoints.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proventos'] })
      toast.success('Provento excluído com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir provento')
    },
  })
}
