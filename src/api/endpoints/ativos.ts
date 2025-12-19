import { ApiClient } from '../client'
import { Ativo, CreateAtivoDto, UpdateAtivoDto } from '@/types'
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

export const ativosEndpoints = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Ativo>> => {
    const paginationParams = {
      page: params?.page || 1,
      pageSize: params?.pageSize || 20,
    }

    const apiResponse = await ApiClient.get<ApiPaginatedResponse<Ativo>>(
      'ativos',
      {
        params: {
          Page: paginationParams.page,
          PageSize: paginationParams.pageSize,
          orderBy: 'id desc',
        },
      }
    )

    return adaptPaginatedResponse(apiResponse, paginationParams)
  },

  getById: (id: string) => ApiClient.get<Ativo>(`ativos/${id}`),

  search: async (query: string, params?: PaginationParams): Promise<PaginatedResponse<Ativo>> => {
    const paginationParams = {
      page: params?.page || 1,
      pageSize: params?.pageSize || 20,
    }

    const apiResponse = await ApiClient.get<ApiPaginatedResponse<Ativo>>(
      'ativos/search',
      {
        params: {
          q: query,
          Page: paginationParams.page,
          PageSize: paginationParams.pageSize,
        },
      }
    )

    return adaptPaginatedResponse(apiResponse, paginationParams)
  },

  create: (data: CreateAtivoDto) => ApiClient.post<Ativo>('ativos', data),

  update: (id: string, data: UpdateAtivoDto) =>
    ApiClient.put<Ativo>(`ativos/${id}`, data),

  delete: (id: string) => ApiClient.delete(`ativos/${id}`),
}
