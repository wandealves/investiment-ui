import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuthStore } from '@/store'
import { LoginDto } from '@/types'
import { toast } from '@/hooks/useToast'

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
    onError: (error: any) => {
      console.error('Login error:', error)
      console.error('Error response:', error.response)
      toast.error(error.response?.data?.errors?.[0] || error.response?.data?.message || 'Erro ao fazer login')
    },
  })
}
