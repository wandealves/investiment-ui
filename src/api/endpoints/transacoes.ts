import { ApiClient } from '../client'
import { Transacao, CreateTransacaoDto, UpdateTransacaoDto } from '@/types'
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

export const transacoesEndpoints = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Transacao>> => {
    const paginationParams = {
      page: params?.page || 1,
      pageSize: params?.pageSize || 20,
    }

    const apiResponse = await ApiClient.get<ApiPaginatedResponse<Transacao>>(
      'transacoes',
      {
        params: {
          Page: paginationParams.page,
          PageSize: paginationParams.pageSize,
        },
      }
    )

    return adaptPaginatedResponse(apiResponse, paginationParams)
  },

  getById: (id: string) => ApiClient.get<Transacao>(`transacoes/${id}`),

  getByCarteira: async (
    carteiraId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Transacao>> => {
    const paginationParams = {
      page: params?.page || 1,
      pageSize: params?.pageSize || 20,
    }

    const apiResponse = await ApiClient.get<ApiPaginatedResponse<Transacao>>(
      `carteiras/${carteiraId}/transacoes`,
      {
        params: {
          Page: paginationParams.page,
          PageSize: paginationParams.pageSize,
        },
      }
    )

    return adaptPaginatedResponse(apiResponse, paginationParams)
  },

  create: (data: CreateTransacaoDto) =>
    ApiClient.post<Transacao>('transacoes', data),

  update: (id: string, data: UpdateTransacaoDto) =>
    ApiClient.put<Transacao>(`transacoes/${id}`, data),

  delete: (id: string) => ApiClient.delete(`transacoes/${id}`),
}
