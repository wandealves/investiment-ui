import { ApiClient } from '../client'
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

    const response = await ApiClient.get<ApiPaginatedResponse<Carteira> | Carteira[]>(
      'carteiras',
      {
        params: {
          Page: paginationParams.page,
          PageSize: paginationParams.pageSize,
          orderBy: 'id desc',
        },
      }
    )

    // Se a API retornar array direto, converter para formato paginado
    if (Array.isArray(response)) {
      const apiResponse: ApiPaginatedResponse<Carteira> = {
        data: response,
        count: response.length,
      }
      return adaptPaginatedResponse(apiResponse, paginationParams)
    }

    return adaptPaginatedResponse(response, paginationParams)
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
