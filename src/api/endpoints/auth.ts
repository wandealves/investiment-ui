import { ApiClient } from '../client'
import { LoginDto, LoginResponseDto, RegisterDto, Usuario } from '@/types'

export const authEndpoints = {
  login: (data: LoginDto) =>
    ApiClient.post<LoginResponseDto>('/api/v1/auth/login', data),

  register: (data: RegisterDto) =>
    ApiClient.post<LoginResponseDto>('/api/v1/auth/register', data),

  logout: () => ApiClient.post('/api/v1/auth/logout'),

  me: () => ApiClient.get<Usuario>('/api/v1/auth/me'),

  refreshToken: () => ApiClient.post<{ token: string }>('/api/v1/auth/refresh'),
}
