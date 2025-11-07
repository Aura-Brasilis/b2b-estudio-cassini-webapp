import { useMutation, useQuery } from '@tanstack/react-query'
import { googleCalendarService } from '@/services/googleCalendarService'
import { useEnterpriseStore } from '@/store/enterpriseStore'
import toast from 'react-hot-toast'

export function useGoogleConnectionStatus() {
  const setGoogleConnected = useEnterpriseStore((state) => state.setGoogleConnected)

  return useQuery({
    queryKey: ['google-connection-status'],
    queryFn: async () => {
      const status = await googleCalendarService.getConnectionStatus()
      setGoogleConnected(status.connected)
      return status
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}

export function useGoogleAuthUrl() {
  return useQuery({
    queryKey: ['google-auth-url'],
    queryFn: () => googleCalendarService.getAuthUrl(),
    enabled: false, // Only fetch when manually triggered
  })
}

export function useGoogleConnect() {
  const setGoogleConnected = useEnterpriseStore((state) => state.setGoogleConnected)

  return useMutation({
    mutationFn: googleCalendarService.connect,
    onSuccess: (data) => {
      setGoogleConnected(true)
      toast.success(`Conectado com sucesso: ${data.googleEmail}`)
    },
    onError: (error: Error) => {
      toast.error(`Erro ao conectar: ${error.message}`)
    },
  })
}

export function useGoogleDisconnect() {
  const setGoogleConnected = useEnterpriseStore((state) => state.setGoogleConnected)

  return useMutation({
    mutationFn: googleCalendarService.disconnect,
    onSuccess: (data) => {
      setGoogleConnected(false)
      toast.success(data.message)
    },
    onError: (error: Error) => {
      toast.error(`Erro ao desconectar: ${error.message}`)
    },
  })
}

export function useCalendarConfig() {
  return useMutation({
    mutationFn: googleCalendarService.updateConfig,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar configuração: ${error.message}`)
    },
  })
}

export function useCalendarSlots(daysAhead = 14) {
  return useQuery({
    queryKey: ['calendar-slots', daysAhead],
    queryFn: () => googleCalendarService.getSlots(daysAhead),
  })
}
