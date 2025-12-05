import { ApiClient } from '../client'
import { LoginDto, LoginResponseDto, RegisterDto, Usuario } from '@/types'

export const authEndpoints = {
  login: (data: LoginDto) =>
    ApiClient.post<LoginResponseDto>('/auth/login', data),

  register: (data: RegisterDto) =>
    ApiClient.post<LoginResponseDto>('/auth/register', data),

  logout: () => ApiClient.post('/auth/logout'),

  me: () => ApiClient.get<Usuario>('/auth/me'),

  refreshToken: () => ApiClient.post<{ token: string }>('/auth/refresh'),
}
