export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  statusCode: number
}

// Tipo para erros do Axios com resposta da API
export interface AxiosApiError {
  response?: {
    data?: {
      message?: string
      errors?: Record<string, string[]>
    }
    status?: number
  }
  message?: string
}

// Helper para extrair mensagem de erro de forma type-safe
export const getErrorMessage = (error: AxiosApiError, fallback: string): string => {
  return error.response?.data?.message || error.message || fallback
}

// Formato real retornado pela API
export interface ApiPaginatedResponse<T> {
  count: number
  data: T[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface FilterParams {
  search?: string
  [key: string]: any
}

export interface AtivoFilterParams extends PaginationParams {
  codigo?: string
  nome?: string
  tipo?: string
}

export interface TransacaoFilterParams extends PaginationParams {
  tipoTransacao?: string
  ativoId?: number
  dataInicio?: string  // Format: YYYY-MM-DD
  dataFim?: string     // Format: YYYY-MM-DD
}
