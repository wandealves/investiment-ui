import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuthStore } from '@/store'
import { toast } from '@/hooks/useToast'

export const useLogout = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout()
      queryClient.clear()
      toast.success('Logout realizado com sucesso!')
      navigate('/login')
    },
    onError: () => {
      // Mesmo com erro, fazer logout local
      logout()
      queryClient.clear()
      navigate('/login')
    },
  })
}
