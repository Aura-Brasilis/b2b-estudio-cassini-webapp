import { useEnterpriseStore } from '@/store/enterpriseStore'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { Building2, LogOut } from 'lucide-react'
import { Button } from '@/components/common/Button'
import toast from 'react-hot-toast'

export function Header() {
  const slug = useEnterpriseStore((state) => state.slug)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logout realizado com sucesso!')
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="text-blue-600" size={24} />
          <h1 className="text-xl font-semibold text-gray-900">
            Gerenciamento - {slug}
          </h1>
        </div>

        <Button
          variant="secondary"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut size={18} />
          Sair
        </Button>
      </div>
    </header>
  )
}
