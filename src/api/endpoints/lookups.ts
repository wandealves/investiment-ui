import { ApiClient } from '../client'
import { Ativo } from '@/types'
import { ApiPaginatedResponse, PaginatedResponse } from '@/types/api.types'

interface LookupsParams {
  page?: number
  pageSize?: number
  orderBy?: string
  filter?: string
}

// Helper para transformar resposta da API no formato esperado
function adaptPaginatedResponse<T>(
  apiResponse: ApiPaginatedResponse<T>,
  params: LookupsParams
): PaginatedResponse<T> {
  const page = params.page || 1
  const pageSize = params.pageSize || 100
  const totalPages = Math.ceil(apiResponse.count / pageSize)

  return {
    data: apiResponse.data,
    total: apiResponse.count,
    page,
    pageSize,
    totalPages,
  }
}

export const lookupsEndpoints = {
  getAtivos: async (searchTerm?: string): Promise<PaginatedResponse<Ativo>> => {
    const params: LookupsParams = {
      page: 1,
      pageSize: 100,
      orderBy: 'codigo asc',
    }

    // Adiciona filtro se houver termo de busca
    if (searchTerm && searchTerm.trim()) {
      const upperTerm = searchTerm.toUpperCase()
      params.filter = `codigo=*${upperTerm}`
    }

    const queryParams: any = {
      Page: params.page,
      PageSize: params.pageSize,
      OrderBy: params.orderBy,
    }

    if (params.filter) {
      queryParams.Filter = params.filter
    }

    const apiResponse = await ApiClient.get<ApiPaginatedResponse<Ativo>>(
      'lookups',
      {
        params: queryParams,
      }
    )

    return adaptPaginatedResponse(apiResponse, params)
  },
}
