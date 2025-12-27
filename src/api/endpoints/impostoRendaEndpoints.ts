import { ApiClient } from '../client'
import { CalculoIR, CalcularIRDto } from '@/types'

export const impostoRendaEndpoints = {
  calcular: (data: CalcularIRDto) =>
    ApiClient.post<CalculoIR>('impostoderenda/calcular', data),

  recalcular: (id: string) =>
    ApiClient.put<CalculoIR>(`impostoderenda/${id}/recalcular`, {}),

  obterHistorico: () =>
    ApiClient.get<CalculoIR[]>('impostoderenda/historico'),

  excluir: (id: string) =>
    ApiClient.delete(`impostoderenda/${id}`),
}
