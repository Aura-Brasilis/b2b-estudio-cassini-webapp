import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/common/Button'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center space-y-6 p-8">
        <div className="space-y-3">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900">
            Página não encontrada
          </h2>
          <p className="text-gray-600">
            A página que você está procurando não existe ou foi removida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={18} />
            Voltar
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 justify-center"
          >
            <Home size={18} />
            Ir para Home
          </Button>
        </div>
      </div>
    </div>
  )
}
