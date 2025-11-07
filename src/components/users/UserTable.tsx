import { UserTableRow } from './UserTableRow'
import { Button } from '@/components/common/Button'
import { Loading } from '@/components/common/Loading'
import type { User } from '@/types/user'

interface UserTableProps {
  users: User[]
  isLoading: boolean
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function UserTable({ users, isLoading, page, totalPages, onPageChange }: UserTableProps) {
  if (isLoading) {
    return <Loading text="Carregando usuários..." />
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum usuário encontrado
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Número
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status Bot
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Criado em
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserTableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <Button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            variant="secondary"
          >
            Anterior
          </Button>
          <Button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            variant="secondary"
          >
            Próxima
          </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Página <span className="font-medium">{page}</span> de{' '}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              variant="secondary"
            >
              Anterior
            </Button>
            <Button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              variant="secondary"
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
