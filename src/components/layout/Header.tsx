import { useEnterpriseStore } from '@/store/enterpriseStore'
import { Building2 } from 'lucide-react'

export function Header() {
  const slug = useEnterpriseStore((state) => state.slug)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex items-center gap-3">
        <Building2 className="text-blue-600" size={24} />
        <h1 className="text-xl font-semibold text-gray-900">
          Gerenciamento - {slug}
        </h1>
      </div>
    </header>
  )
}
