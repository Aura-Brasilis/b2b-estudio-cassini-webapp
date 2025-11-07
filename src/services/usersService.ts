import { api } from './api'
import type { UsersResponse, ToggleBotRequest, ToggleBotResponse } from '@/types/user'

const getEnterpriseSlug = () => {
  return import.meta.env.VITE_ENTERPRISE_SLUG || 'sua-empresa'
}

export const usersService = {
  // List users with pagination
  async getUsers(page = 1, limit = 50): Promise<UsersResponse> {
    const slug = getEnterpriseSlug()
    const response = await api.get<UsersResponse>(`/enterprises/${slug}/services`, {
      params: { page, limit },
    })
    return response.data
  },

  // Search users by phone number
  async searchUsers(number: string, page = 1, limit = 50): Promise<UsersResponse> {
    const slug = getEnterpriseSlug()
    const response = await api.get<UsersResponse>(`/enterprises/${slug}/services/search`, {
      params: { number, page, limit },
    })
    return response.data
  },

  // Toggle bot for a specific user
  async toggleBot(data: ToggleBotRequest): Promise<ToggleBotResponse> {
    const slug = getEnterpriseSlug()
    const response = await api.post<ToggleBotResponse>(`/enterprises/${slug}/toggle-bot`, data)
    return response.data
  },
}
