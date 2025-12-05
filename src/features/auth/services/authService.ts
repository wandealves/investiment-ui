import { ApiClient } from '@/api/client'
import { LoginDto, LoginResponseDto, RegisterDto } from '@/types'

export const authService = {
  login: async (credentials: LoginDto): Promise<LoginResponseDto> => {
    return ApiClient.post<LoginResponseDto>('/auth/login', credentials)
  },

  register: async (data: RegisterDto): Promise<LoginResponseDto> => {
    return ApiClient.post<LoginResponseDto>('/auth/register', data)
  },

  logout: async (): Promise<void> => {
    return ApiClient.post('/auth/logout')
  },

  refreshToken: async (): Promise<{ token: string }> => {
    return ApiClient.post('/auth/refresh')
  },

  getCurrentUser: async () => {
    return ApiClient.get('/auth/me')
  },
}
