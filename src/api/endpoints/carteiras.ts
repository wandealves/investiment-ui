import { ApiClient } from '../client'
import {
  Carteira,
  CreateCarteiraDto,
  UpdateCarteiraDto,
  CarteiraAtivo,
} from '@/types'
import { PaginationParams, PaginatedResponse } from '@/types/api.types'

export const carteirasEndpoints = {
  getAll: (params?: PaginationParams) =>
    ApiClient.get<PaginatedResponse<Carteira>>('/api/v1/carteiras', {
      params: {
        Page: params?.page || 1,
        PageSize: params?.pageSize || 20,
      },
    }),

  getById: (id: string) => ApiClient.get<Carteira>(`/carteiras/${id}`),

  create: (data: CreateCarteiraDto) =>
    ApiClient.post<Carteira>('/api/v1/carteiras', data),

  update: (id: string, data: UpdateCarteiraDto) =>
    ApiClient.put<Carteira>(`/carteiras/${id}`, data),

  delete: (id: string) => ApiClient.delete(`/carteiras/${id}`),

  getAtivos: (id: string) =>
    ApiClient.get<CarteiraAtivo[]>(`/carteiras/${id}/ativos`),
}
