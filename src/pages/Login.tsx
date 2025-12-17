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
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      {/* Content */}
      <div className="relative w-full max-w-md p-8 space-y-6 bg-card/80 backdrop-blur-sm rounded-lg shadow-2xl border border-border/50 animate-scale-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Investment Manager
          </h1>
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
