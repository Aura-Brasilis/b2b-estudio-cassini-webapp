export interface User {
  id: number
  number: string
  name: string
  botActive: boolean
  state: string
  createdAt: string
  updatedAt: string
}

export interface UsersResponse {
  success: boolean
  data: {
    services: User[]
    total: number
    page: number
    limit: number
    totalPages?: number
  }
}

export interface ToggleBotRequest {
  clientNumber: string
  botActive: boolean
}

export interface ToggleBotResponse {
  success: boolean
  message: string
  data: {
    number: string
    botActive: boolean
  }
}
