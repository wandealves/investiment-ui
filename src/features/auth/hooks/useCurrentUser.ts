import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { authService } from '../services/authService'
import { useAuthStore } from '@/store'
import { queryKeys } from '@/lib/react-query'

export const useCurrentUser = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setUser = useAuthStore((state) => state.setUser)

  const query = useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: authService.getCurrentUser,
    enabled: isAuthenticated,
  })

  useEffect(() => {
    if (query.data) {
      setUser(query.data as any)
    }
  }, [query.data, setUser])

  return query
}
