import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { useGoogleAuthUrl, useGoogleDisconnect, useGoogleConnectionStatus } from '@/hooks/useGoogleAuth'
import { useEnterpriseStore } from '@/store/enterpriseStore'
import { Calendar, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

export function GoogleAuthPage() {
  const googleConnected = useEnterpriseStore((state) => state.googleConnected)
  const { refetch: getAuthUrl, isFetching } = useGoogleAuthUrl()
  const { refetch: refreshStatus, isRefetching } = useGoogleConnectionStatus()
  const disconnect = useGoogleDisconnect()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const { data } = await getAuthUrl()
      if (data?.authUrl) {
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error('Error getting auth URL:', error)
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    if (confirm('Tem certeza que deseja desconectar o Google Calendar?')) {
      disconnect.mutate()
    }
  }

  const handleRefreshStatus = async () => {
    await refreshStatus()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="text-blue-600" size={32} />
        <h2 className="text-2xl font-bold text-gray-900">Google Calendar</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Status da Conexão</h3>
            <p className="text-sm text-gray-600 mt-1">
              Gerencie a conexão com o Google Calendar
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              {googleConnected ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={24} />
                  <span className="font-medium">Conectado</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle size={24} />
                  <span className="font-medium">Desconectado</span>
                </div>
              )}
            </div>
            <Button
              onClick={handleRefreshStatus}
              variant="secondary"
              isLoading={isRefetching}
              title="Verificar status real no banco de dados"
              className="px-3 py-2"
            >
              <RefreshCw size={16} />
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-2">Instruções</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Conecte sua conta do Google para sincronizar eventos do calendário</li>
            <li>Você poderá visualizar e gerenciar slots disponíveis</li>
            <li>Configure horários de trabalho e disponibilidade</li>
            <li>A desconexão pode ser feita a qualquer momento</li>
          </ul>
        </div>

        <div className="flex gap-4">
          {!googleConnected ? (
            <Button
              onClick={handleConnect}
              isLoading={isFetching || isConnecting}
              className="w-full sm:w-auto"
            >
              Conectar Google Calendar
            </Button>
          ) : (
            <Button
              onClick={handleDisconnect}
              variant="danger"
              isLoading={disconnect.isPending}
              className="w-full sm:w-auto"
            >
              Desconectar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
