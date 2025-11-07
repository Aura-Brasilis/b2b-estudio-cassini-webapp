import { useState } from 'react'
import { UserTable } from '@/components/users/UserTable'
import { UserFilter } from '@/components/users/UserFilter'
import { useUsers, useSearchUsers } from '@/hooks/useUsers'
import { useDebounce } from '@/hooks/useDebounce'

export function UsersPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data: usersData, isLoading: isLoadingUsers } = useUsers(page, 50)
  const { data: searchData, isLoading: isLoadingSearch } = useSearchUsers(
    debouncedSearch,
    page,
    50
  )

  const isSearching = debouncedSearch.length > 0
  const data = isSearching ? searchData : usersData
  const isLoading = isSearching ? isLoadingSearch : isLoadingUsers

  const users = data?.data?.services || []
  const totalPages = data?.data?.totalPages || 1

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Usuários</h2>
        {data?.data && (
          <p className="text-sm text-gray-600">
            Total: {data.data.total} usuários
          </p>
        )}
      </div>

      <UserFilter value={searchTerm} onChange={setSearchTerm} />

      <UserTable
        users={users}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
