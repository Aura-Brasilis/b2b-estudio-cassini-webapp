import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { BotToggle } from './BotToggle'
import type { User } from '@/types/user'

interface UserTableRowProps {
  user: User
}

export function UserTableRow({ user }: UserTableRowProps) {
  const formattedDate = format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user.number}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.botActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {user.botActive ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.state}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formattedDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <BotToggle userNumber={user.number} botActive={user.botActive} />
      </td>
    </tr>
  )
}
