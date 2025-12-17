import { ApiClient } from '../client'
import { Ativo, CreateAtivoDto, UpdateAtivoDto } from '@/types'
import { PaginationParams, PaginatedResponse } from '@/types/api.types'

export const ativosEndpoints = {
  getAll: (params?: PaginationParams) =>
    ApiClient.get<PaginatedResponse<Ativo>>('ativos', {
      params: {
        Page: params?.page || 1,
        PageSize: params?.pageSize || 20,
      },
    }),

  getById: (id: string) => ApiClient.get<Ativo>(`/ativos/${id}`),

  search: (query: string, params?: PaginationParams) =>
    ApiClient.get<PaginatedResponse<Ativo>>('/ativos/search', {
      params: {
        q: query,
        Page: params?.page || 1,
        PageSize: params?.pageSize || 20,
      },
    }),

  create: (data: CreateAtivoDto) => ApiClient.post<Ativo>('ativos', data),

  update: (id: string, data: UpdateAtivoDto) =>
    ApiClient.put<Ativo>(`/ativos/${id}`, data),

  delete: (id: string) => ApiClient.delete(`/ativos/${id}`),
}
