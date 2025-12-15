import { ApiClient } from '../client'
import { Transacao, CreateTransacaoDto, UpdateTransacaoDto } from '@/types'

export const transacoesEndpoints = {
  getAll: () => ApiClient.get<Transacao[]>('/api/v1/transacoes'),

  getById: (id: string) => ApiClient.get<Transacao>(`/transacoes/${id}`),

  getByCarteira: (carteiraId: string) =>
    ApiClient.get<Transacao[]>(`/transacoes/carteira/${carteiraId}`),

  create: (data: CreateTransacaoDto) =>
    ApiClient.post<Transacao>('/api/v1/transacoes', data),

  update: (id: string, data: UpdateTransacaoDto) =>
    ApiClient.put<Transacao>(`/transacoes/${id}`, data),

  delete: (id: string) => ApiClient.delete(`/transacoes/${id}`),
}
