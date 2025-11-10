import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username, password) => {
        const validUsername = import.meta.env.VITE_AUTH_USERNAME
        const validPassword = import.meta.env.VITE_AUTH_PASSWORD

        if (username === validUsername && password === validPassword) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
