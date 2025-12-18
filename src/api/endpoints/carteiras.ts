import { ApiClient } from '../client'
import { api } from '../axios'
import {
  Carteira,
  CreateCarteiraDto,
  UpdateCarteiraDto,
  CarteiraAtivo,
} from '@/types'
import { ApiPaginatedResponse, PaginatedResponse, PaginationParams } from '@/types/api.types'

// Helper para transformar resposta da API no formato esperado
function adaptPaginatedResponse<T>(
  apiResponse: ApiPaginatedResponse<T>,
  params: PaginationParams
): PaginatedResponse<T> {
  const page = params.page || 1
  const pageSize = params.pageSize || 20
  const totalPages = Math.ceil(apiResponse.count / pageSize)

  return {
    data: apiResponse.data,
    total: apiResponse.count,
    page,
    pageSize,
    totalPages,
  }
}

export const carteirasEndpoints = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Carteira>> => {
    const paginationParams = {
      page: params?.page || 1,
      pageSize: params?.pageSize || 20,
    }

    // Usar axios diretamente para acessar headers
    const response = await api.get<ApiPaginatedResponse<Carteira> | Carteira[]>(
      'carteiras',
      {
        params: {
          Page: paginationParams.page,
          PageSize: paginationParams.pageSize,
          orderBy: 'id desc',
        },
      }
    )

    const data = response.data

    // Se a API retornar array direto, tentar obter total dos headers
    if (Array.isArray(data)) {
      // Verificar headers comuns de paginação
      const totalCount =
        response.headers['x-total-count'] ||
        response.headers['X-Total-Count'] ||
        response.headers['x-total'] ||
        response.headers['X-Total']

      const count = totalCount ? parseInt(totalCount, 10) : data.length

      const apiResponse: ApiPaginatedResponse<Carteira> = {
        data: data,
        count: count,
      }
      return adaptPaginatedResponse(apiResponse, paginationParams)
    }

    return adaptPaginatedResponse(data, paginationParams)
  },

  getById: (id: string) => ApiClient.get<Carteira>(`carteiras/${id}`),

  create: (data: CreateCarteiraDto) =>
    ApiClient.post<Carteira>('carteiras', data),

  update: (id: string, data: UpdateCarteiraDto) =>
    ApiClient.put<Carteira>(`carteiras/${id}`, data),

  delete: (id: string) => ApiClient.delete(`carteiras/${id}`),

  getAtivos: (id: string) =>
    ApiClient.get<CarteiraAtivo[]>(`carteiras/${id}/ativos`),
}
