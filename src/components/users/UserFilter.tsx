import { Search } from 'lucide-react'
import { Input } from '@/components/common/Input'

interface UserFilterProps {
  value: string
  onChange: (value: string) => void
}

export function UserFilter({ value, onChange }: UserFilterProps) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={20} />
      </div>
      <Input
        type="text"
        placeholder="Buscar por número de telefone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full md:w-96"
      />
    </div>
  )
}
