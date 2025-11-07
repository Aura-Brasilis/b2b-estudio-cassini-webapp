import { NavLink } from 'react-router-dom'
import { Users, Calendar, Settings } from 'lucide-react'
import { useEnterpriseStore } from '@/store/enterpriseStore'

const navItems = [
  {
    to: '/users',
    icon: Users,
    label: 'Usuários',
  },
  {
    to: '/google-auth',
    icon: Calendar,
    label: 'Google Calendar',
  },
  {
    to: '/calendar-config',
    icon: Settings,
    label: 'Configurações',
    requiresGoogleAuth: true,
  },
]

export function Sidebar() {
  const googleConnected = useEnterpriseStore((state) => state.googleConnected)

  const visibleNavItems = navItems.filter((item) => {
    if (item.requiresGoogleAuth && !googleConnected) {
      return false
    }
    return true
  })

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {visibleNavItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
