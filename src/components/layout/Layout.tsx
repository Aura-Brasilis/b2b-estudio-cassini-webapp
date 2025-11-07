import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { useGoogleConnectionStatus } from '@/hooks/useGoogleAuth'

export function Layout() {
  // Check Google connection status when the app loads
  useGoogleConnectionStatus()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
