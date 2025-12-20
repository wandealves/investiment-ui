import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  nome: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      // Login agora só recebe o usuário (token está no cookie httpOnly)
      login: (user) => {
        set({ user, isAuthenticated: true })
        // Verificar se foi persistido
        setTimeout(() => {
          const stored = localStorage.getItem('auth-storage')
        }, 10)
      },
      // Logout limpa apenas o estado local
      // O cookie será limpo pelo endpoint /auth/logout no backend
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
