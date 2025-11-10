import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { googleCalendarService } from '@/services/googleCalendarService'
import { useEnterpriseStore } from '@/store/enterpriseStore'
import toast from 'react-hot-toast'

export function useGoogleConnectionStatus() {
  const setGoogleConnected = useEnterpriseStore((state) => state.setGoogleConnected)

  return useQuery({
    queryKey: ['google-connection-status'],
    queryFn: async () => {
      const status = await googleCalendarService.getConnectionStatus()
      // Usa isConnected da API
      setGoogleConnected(status.isConnected)
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: googleCalendarService.disconnect,
    onSuccess: (data) => {
      setGoogleConnected(false)
      toast.success(data.message)
      // Invalida o cache para forçar verificação no próximo acesso
      queryClient.invalidateQueries({ queryKey: ['google-connection-status'] })
    },
    onError: async (error: Error) => {
      toast.error(`Erro ao desconectar: ${error.message}`)
      // Verifica o status real no banco de dados após erro
      try {
        const status = await googleCalendarService.getConnectionStatus()
        setGoogleConnected(status.isConnected)
        queryClient.setQueryData(['google-connection-status'], status)

        if (!status.isConnected) {
          toast.success('Status sincronizado com o banco de dados')
        }
      } catch (syncError) {
        console.error('Erro ao sincronizar status:', syncError)
      }
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
