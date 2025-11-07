import { useToggleBot } from '@/hooks/useUsers'

interface BotToggleProps {
  userNumber: string
  botActive: boolean
}

export function BotToggle({ userNumber, botActive }: BotToggleProps) {
  const toggleBot = useToggleBot()

  const handleToggle = () => {
    toggleBot.mutate({
      clientNumber: userNumber,
      botActive: !botActive,
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={toggleBot.isPending}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        botActive ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          botActive ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}
