import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEnterpriseStore } from '@/store/enterpriseStore'
import { Loading } from '@/components/common/Loading'
import { CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export function GoogleCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const setGoogleConnected = useEnterpriseStore((state) => state.setGoogleConnected)
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const success = searchParams.get('success')
  const email = searchParams.get('email')
  const error = searchParams.get('error')

  useEffect(() => {
    // Process backend callback response
    if (success === 'true' && email) {
      setStatus('success')
      setGoogleConnected(true)
      toast.success(`Google Calendar conectado: ${decodeURIComponent(email)}`)

      setTimeout(() => {
        navigate('/google-auth')
      }, 2000)
      return
    }

    // Handle error from backend
    if (error || success === 'false') {
      setStatus('error')
      setErrorMessage(error ? decodeURIComponent(error) : 'Erro ao conectar Google Calendar')
      toast.error(errorMessage || 'Erro ao conectar Google Calendar')

      setTimeout(() => {
        navigate('/google-auth')
      }, 3000)
      return
    }

    // If no recognized parameters, show error
    if (!success && !error) {
      setStatus('error')
      setErrorMessage('Resposta inválida do servidor')

      setTimeout(() => {
        navigate('/google-auth')
      }, 3000)
    }
  }, [success, email, error, setGoogleConnected, navigate, errorMessage])

  if (status === 'processing') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loading text="Processando autenticação com Google..." />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center space-y-4">
        {status === 'success' ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Sucesso!</h2>
            <p className="text-gray-600">
              Google Calendar conectado com sucesso. Redirecionando...
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Erro</h2>
            <p className="text-gray-600">{errorMessage || 'Erro ao conectar Google Calendar'}</p>
            <p className="text-sm text-gray-500">Redirecionando...</p>
          </>
        )}
      </div>
    </div>
  )
}
