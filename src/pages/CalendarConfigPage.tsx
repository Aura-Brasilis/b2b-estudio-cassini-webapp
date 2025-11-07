import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { useCalendarConfig } from '@/hooks/useGoogleAuth'
import { useEnterpriseStore } from '@/store/enterpriseStore'
import { Settings, AlertCircle } from 'lucide-react'

const DAYS_OF_WEEK = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda' },
  { value: 2, label: 'Terça' },
  { value: 3, label: 'Quarta' },
  { value: 4, label: 'Quinta' },
  { value: 5, label: 'Sexta' },
  { value: 6, label: 'Sábado' },
]

const SLOT_DURATIONS = [15, 30, 45, 60, 90, 120]

export function CalendarConfigPage() {
  const navigate = useNavigate()
  const googleConnected = useEnterpriseStore((state) => state.googleConnected)

  const [workStartHour, setWorkStartHour] = useState(9)
  const [workEndHour, setWorkEndHour] = useState(18)
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5])
  const [slotDuration, setSlotDuration] = useState(60)

  const updateConfig = useCalendarConfig()

  useEffect(() => {
    if (!googleConnected) {
      navigate('/google-auth')
    }
  }, [googleConnected, navigate])

  if (!googleConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Google Calendar não conectado
            </h3>
            <p className="text-yellow-800">
              Você precisa conectar sua conta do Google Calendar antes de acessar as configurações.
              Redirecionando...
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleDayToggle = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (workStartHour >= workEndHour) {
      alert('O horário de início deve ser menor que o horário de término')
      return
    }

    if (selectedDays.length === 0) {
      alert('Selecione pelo menos um dia da semana')
      return
    }

    updateConfig.mutate({
      workStartHour,
      workEndHour,
      workDays: selectedDays.sort().join(','),
      slotDurationMinutes: slotDuration,
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="text-blue-600" size={32} />
        <h2 className="text-2xl font-bold text-gray-900">Configurações do Calendário</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Horário de Trabalho</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Hora de Início"
              min={0}
              max={23}
              value={workStartHour}
              onChange={(e) => setWorkStartHour(Number(e.target.value))}
            />
            <Input
              type="number"
              label="Hora de Término"
              min={0}
              max={23}
              value={workEndHour}
              onChange={(e) => setWorkEndHour(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dias da Semana</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day.value}
                type="button"
                onClick={() => handleDayToggle(day.value)}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  selectedDays.includes(day.value)
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Duração dos Slots (minutos)
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {SLOT_DURATIONS.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => setSlotDuration(duration)}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  slotDuration === duration
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button type="submit" isLoading={updateConfig.isPending} className="w-full md:w-auto">
            Salvar Configurações
          </Button>
        </div>
      </form>
    </div>
  )
}
