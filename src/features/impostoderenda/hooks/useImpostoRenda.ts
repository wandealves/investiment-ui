import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { impostoRendaEndpoints } from '@/api/endpoints/impostoRendaEndpoints'
import { CalcularIRDto } from '@/types'
import { toast } from 'sonner'

const queryKeys = {
  all: ['impostoderenda'] as const,
  historico: () => [...queryKeys.all, 'historico'] as const,
  calculo: (id: string) => [...queryKeys.all, id] as const,
}

export const useHistoricoCalculosIR = (enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.historico(),
    queryFn: () => impostoRendaEndpoints.obterHistorico(),
    enabled,
  })
}

export const useCalcularIR = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CalcularIRDto) => impostoRendaEndpoints.calcular(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('Cálculo de IR realizado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao calcular IR')
    },
  })
}

export const useRecalcularIR = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => impostoRendaEndpoints.recalcular(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('Cálculo recalculado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao recalcular IR')
    },
  })
}

export const useExcluirCalculoIR = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => impostoRendaEndpoints.excluir(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('Cálculo excluído com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir cálculo')
    },
  })
}

export const useVisualizacaoIR = (
  ano: number | null,
  mes: number | null,
  carteiraId: number | null
) => {
  const enabled = !!ano && !!carteiraId

  return useQuery({
    queryKey: [...queryKeys.all, 'visualizacao', ano, mes, carteiraId] as const,
    queryFn: () => {
      if (!ano || !carteiraId) {
        throw new Error('Ano e Carteira são obrigatórios')
      }
      return impostoRendaEndpoints.obterVisualizacao({
        ano,
        mes: mes || undefined,
        carteiraId,
      })
    },
    enabled,
  })
}
