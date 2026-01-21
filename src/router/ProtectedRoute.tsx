import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { useEffect, useState } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Pequeno delay para garantir que o store foi hidratado do localStorage
    setTimeout(() => {
      setIsReady(true)
    }, 50)
  }, [])

  if (!isReady) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>
  }

  if (!isAuthenticated) {
    console.warn('[ProtectedRoute] Not authenticated, redirecting to /login')
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default ProtectedRoute
