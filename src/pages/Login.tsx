import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import LoginForm from '@/features/auth/components/LoginForm'

const Login = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Investment Manager</h1>
          <p className="text-muted-foreground mt-2">
            Entre para gerenciar seus investimentos
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
