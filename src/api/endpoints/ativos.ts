import { ApiClient } from '../client'
import { Ativo, CreateAtivoDto, UpdateAtivoDto } from '@/types'

export const ativosEndpoints = {
  getAll: () => ApiClient.get<Ativo[]>('/ativos'),

  getById: (id: string) => ApiClient.get<Ativo>(`/ativos/${id}`),

  search: (query: string) =>
    ApiClient.get<Ativo[]>(`/ativos/search?q=${query}`),

  create: (data: CreateAtivoDto) => ApiClient.post<Ativo>('/ativos', data),

  update: (id: string, data: UpdateAtivoDto) =>
    ApiClient.put<Ativo>(`/ativos/${id}`, data),

  delete: (id: string) => ApiClient.delete(`/ativos/${id}`),
}
