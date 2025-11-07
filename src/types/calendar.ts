export interface GoogleAuthUrlResponse {
  authUrl: string
}

export interface GoogleConnectRequest {
  authorizationCode: string
}

export interface GoogleConnectResponse {
  success: boolean
  googleEmail: string
}

export interface GoogleDisconnectResponse {
  success: boolean
  message: string
}

export interface CalendarConfig {
  workStartHour: number
  workEndHour: number
  workDays: string
  slotDurationMinutes: number
}

export interface CalendarConfigUpdateRequest {
  workStartHour?: number
  workEndHour?: number
  workDays?: string
  slotDurationMinutes?: number
}

export interface CalendarConfigUpdateResponse {
  success: boolean
  message: string
}

export interface CalendarSlot {
  date: string
  time: string
  dateTime: string
}

export interface CalendarSlotsResponse {
  slots: CalendarSlot[]
}

export interface GoogleConnectionStatus {
  connected: boolean
  googleEmail?: string
}
