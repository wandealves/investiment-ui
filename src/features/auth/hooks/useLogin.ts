import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuthStore } from '@/store'
import { LoginDto } from '@/types'
import { toast } from '@/hooks/useToast'

// Tipo específico para erros de login (API retorna errors como array de strings)
interface LoginApiError {
  response?: {
    data?: {
      message?: string
      errors?: string[]
    }
    status?: number
  }
  message?: string
}

const getLoginErrorMessage = (error: LoginApiError): string => {
  return error.response?.data?.errors?.[0] || error.response?.data?.message || error.message || 'Erro ao fazer login'
}

export const useLogin = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  return useMutation({
    mutationFn: (credentials: LoginDto) => authService.login(credentials),
    onSuccess: (data) => {
      // Token está no cookie httpOnly - só armazena o usuário
      if (data.usuario) {
        login(data.usuario)
        toast.success('Login realizado com sucesso!')

        // Adicionar delay para garantir que o store foi atualizado
        setTimeout(() => {
          navigate('/')
        }, 100)
      } else {
        console.error('Login response missing usuario field:', data)
        toast.error('Erro: resposta inválida do servidor')
      }
    },
    onError: (error: LoginApiError) => {
      console.error('Login error:', error)
      toast.error(getLoginErrorMessage(error))
    },
  })
}
