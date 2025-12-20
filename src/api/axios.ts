import axios, { AxiosError } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // CRÍTICO: Envia cookies automaticamente (httpOnly)
})

// Request interceptor - Não precisa mais adicionar token manualmente
// O cookie httpOnly é enviado automaticamente pelo navegador
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

// Flag para prevenir múltiplos redirects simultâneos
let isRedirecting = false

// Response interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Prevenir loop infinito: não redirecionar se já estiver em /login
      const currentPath = window.location.pathname
      if (currentPath !== '/login' && !isRedirecting) {
        isRedirecting = true
        
        // Limpar estado de autenticação local
        localStorage.removeItem('auth-storage')

        // Redirecionar para login
        window.location.href = '/login'

        // Reset flag após 1 segundo
        setTimeout(() => {
          isRedirecting = false
        }, 1000)
      }
    }
    return Promise.reject(error)
  }
)

export default api
