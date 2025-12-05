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
      login(data.token, data.usuario)
      toast.success('Login realizado com sucesso!')
      navigate('/')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao fazer login')
    },
  })
}
