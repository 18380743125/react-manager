import { RouteObject, Navigate, createBrowserRouter } from 'react-router-dom'

import Welcome from '@/views/welcome'
import Layout from '@/layout'
import Login from '@/views/login/Login'
import Error404 from '@/views/404'
import Error403 from '@/views/403'

const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

const router = createBrowserRouter(routes)

export default router
