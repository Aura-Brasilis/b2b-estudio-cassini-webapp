export interface Enterprise {
  id: number
  slug: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface EnterpriseConfig {
  workStartHour: number
  workEndHour: number
  workDays: string
  slotDurationMinutes: number
}
