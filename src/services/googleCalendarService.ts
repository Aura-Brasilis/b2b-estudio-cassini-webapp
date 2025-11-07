import { api } from './api'
import type {
  GoogleAuthUrlResponse,
  GoogleConnectRequest,
  GoogleConnectResponse,
  GoogleDisconnectResponse,
  CalendarConfigUpdateRequest,
  CalendarConfigUpdateResponse,
  CalendarSlotsResponse,
  GoogleConnectionStatus,
} from '@/types/calendar'

const getEnterpriseSlug = () => {
  return import.meta.env.VITE_ENTERPRISE_SLUG || 'sua-empresa'
}

export const googleCalendarService = {
  // Get connection status
  async getConnectionStatus(): Promise<GoogleConnectionStatus> {
    const slug = getEnterpriseSlug()
    const response = await api.get<GoogleConnectionStatus>(
      `/enterprises/${slug}/google-calendar/status`
    )
    return response.data
  },

  // Get Google OAuth URL
  async getAuthUrl(): Promise<GoogleAuthUrlResponse> {
    const slug = getEnterpriseSlug()
    const response = await api.get<GoogleAuthUrlResponse>(
      `/enterprises/${slug}/google-calendar/auth-url`
    )
    return response.data
  },

  // Connect with authorization code (alternative to callback)
  async connect(data: GoogleConnectRequest): Promise<GoogleConnectResponse> {
    const slug = getEnterpriseSlug()
    const response = await api.post<GoogleConnectResponse>(
      `/enterprises/${slug}/google-calendar/connect`,
      data
    )
    return response.data
  },

  // Disconnect Google Calendar
  async disconnect(): Promise<GoogleDisconnectResponse> {
    const slug = getEnterpriseSlug()
    const response = await api.delete<GoogleDisconnectResponse>(
      `/enterprises/${slug}/google-calendar/disconnect`
    )
    return response.data
  },

  // Update calendar configuration
  async updateConfig(data: CalendarConfigUpdateRequest): Promise<CalendarConfigUpdateResponse> {
    const slug = getEnterpriseSlug()
    const response = await api.patch<CalendarConfigUpdateResponse>(
      `/enterprises/${slug}/google-calendar/config`,
      data
    )
    return response.data
  },

  // Get available slots
  async getSlots(daysAhead = 14): Promise<CalendarSlotsResponse> {
    const slug = getEnterpriseSlug()
    const response = await api.get<CalendarSlotsResponse>(
      `/enterprises/${slug}/google-calendar/slots`,
      {
        params: { daysAhead },
      }
    )
    return response.data
  },
}
