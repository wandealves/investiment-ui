import { ApiClient } from '../client'
import { Transacao, CreateTransacaoDto, UpdateTransacaoDto } from '@/types'
import { PaginationParams, PaginatedResponse } from '@/types/api.types'

export const transacoesEndpoints = {
  getAll: (params?: PaginationParams) =>
    ApiClient.get<PaginatedResponse<Transacao>>('/api/v1/transacoes', {
      params: {
        Page: params?.page || 1,
        PageSize: params?.pageSize || 20,
      },
    }),

  getById: (id: string) => ApiClient.get<Transacao>(`/transacoes/${id}`),

  getByCarteira: (carteiraId: string, params?: PaginationParams) =>
    ApiClient.get<PaginatedResponse<Transacao>>(`/transacoes/carteira/${carteiraId}`, {
      params: {
        Page: params?.page || 1,
        PageSize: params?.pageSize || 20,
      },
    }),

  create: (data: CreateTransacaoDto) =>
    ApiClient.post<Transacao>('/api/v1/transacoes', data),

  update: (id: string, data: UpdateTransacaoDto) =>
    ApiClient.put<Transacao>(`/transacoes/${id}`, data),

  delete: (id: string) => ApiClient.delete(`/transacoes/${id}`),
}
