import { useQuery } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '@/store'
import { queryKeys } from '@/lib/react-query'

export const useCurrentUser = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setUser = useAuthStore((state) => state.setUser)

  return useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: authService.getCurrentUser,
    enabled: isAuthenticated,
    onSuccess: (data: any) => {
      setUser(data)
    },
  })
}
