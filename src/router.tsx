import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { UsersPage } from '@/pages/UsersPage'
import { GoogleAuthPage } from '@/pages/GoogleAuthPage'
import { GoogleCallbackPage } from '@/pages/GoogleCallbackPage'
import { CalendarConfigPage } from '@/pages/CalendarConfigPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/users" replace />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'google-auth',
        element: <GoogleAuthPage />,
      },
      {
        path: 'calendar-config',
        element: <CalendarConfigPage />,
      },
    ],
  },
  {
    path: '/google-callback',
    element: <GoogleCallbackPage />,
  },
  {
    path: '/enterprises/:slug/google-calendar/callback',
    element: <GoogleCallbackPage />,
  },
])
