import { ApiClient } from '../client'
import { Provento, ProventoComTransacoes } from '@/types/entities.types'
import { CreateProventoDto, UpdateProventoDto } from '@/types/dto.types'
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

export interface ProventoFilterParams extends PaginationParams {
  ativoId?: number
  status?: string
  dataInicio?: string
  dataFim?: string
}

export const proventosEndpoints = {
  getAll: async (params?: ProventoFilterParams): Promise<PaginatedResponse<Provento>> => {
    const paginationParams = {
      page: params?.page || 1,
      pageSize: params?.pageSize || 20,
    }

    const queryParams: any = {
      Page: paginationParams.page,
      PageSize: paginationParams.pageSize,
      orderBy: 'dataPagamento desc',
    }

    // Adiciona filtros se fornecidos
    let query = ''
    if (params?.ativoId) {
      query = `ativoId=${params.ativoId}`
    }
    if (params?.status) {
      query += `${query.length ? ',' : ''}status=${params.status}`
    }

    if (query) {
      queryParams.Filter = query
    }

    const apiResponse = await ApiClient.get<ApiPaginatedResponse<Provento>>(
      'proventos',
      {
        params: queryParams,
      }
    )

    return adaptPaginatedResponse(apiResponse, paginationParams)
  },

  getById: (id: number) => ApiClient.get<Provento>(`proventos/${id}`),

  getByIdComDetalhes: (id: number) =>
    ApiClient.get<ProventoComTransacoes>(`proventos/${id}/detalhes`),

  getAgendados: () => ApiClient.get<Provento[]>('proventos/agendados'),

  getByAtivo: (ativoId: number) =>
    ApiClient.get<Provento[]>(`proventos/ativo/${ativoId}`),

  getByPeriodo: (inicio: string, fim: string) =>
    ApiClient.get<Provento[]>('proventos/periodo', {
      params: { inicio, fim },
    }),

  create: (data: CreateProventoDto) => ApiClient.post<Provento>('proventos', data),

  update: (id: number, data: UpdateProventoDto) =>
    ApiClient.put<Provento>(`proventos/${id}`, data),

  marcarComoPago: (id: number) =>
    ApiClient.patch<Provento>(`proventos/${id}/marcar-pago`, {}),

  cancelar: (id: number) =>
    ApiClient.patch<Provento>(`proventos/${id}/cancelar`, {}),

  delete: (id: number) => ApiClient.delete(`proventos/${id}`),
}
