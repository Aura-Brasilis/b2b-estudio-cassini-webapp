import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersService } from '@/services/usersService'
import type { ToggleBotRequest } from '@/types/user'
import toast from 'react-hot-toast'

export function useUsers(page = 1, limit = 50) {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => usersService.getUsers(page, limit),
  })
}

export function useSearchUsers(number: string, page = 1, limit = 50) {
  return useQuery({
    queryKey: ['users', 'search', number, page, limit],
    queryFn: () => usersService.searchUsers(number, page, limit),
    enabled: number.length > 0,
  })
}

export function useToggleBot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ToggleBotRequest) => usersService.toggleBot(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(data.message)
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar bot: ${error.message}`)
    },
  })
}
