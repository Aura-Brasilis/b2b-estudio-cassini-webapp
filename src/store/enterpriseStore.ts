import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EnterpriseState {
  slug: string
  googleConnected: boolean
  setSlug: (slug: string) => void
  setGoogleConnected: (connected: boolean) => void
}

export const useEnterpriseStore = create<EnterpriseState>()(
  persist(
    (set) => ({
      slug: import.meta.env.VITE_ENTERPRISE_SLUG || 'sua-empresa',
      googleConnected: false,
      setSlug: (slug) => set({ slug }),
      setGoogleConnected: (connected) => set({ googleConnected: connected }),
    }),
    {
      name: 'enterprise-storage',
    }
  )
)
