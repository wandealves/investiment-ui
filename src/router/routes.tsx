import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AppLayout from '@/layout/AppLayout'

// Lazy loading das páginas
const Login = lazy(() => import('@/pages/Login'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Carteiras = lazy(() => import('@/pages/Carteiras/Carteiras'))
const CarteiraDetalhes = lazy(() => import('@/pages/Carteiras/CarteiraDetalhes'))
const Ativos = lazy(() => import('@/pages/Ativos/Ativos'))
const AtivoDetalhes = lazy(() => import('@/pages/Ativos/AtivoDetalhes'))
const Transacoes = lazy(() => import('@/pages/Transacoes/Transacoes'))
const Proventos = lazy(() => import('@/pages/Proventos/Proventos'))
const Relatorios = lazy(() => import('@/pages/Relatorios/Relatorios'))

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'carteiras',
        element: <Carteiras />,
      },
      {
        path: 'carteiras/:id',
        element: <CarteiraDetalhes />,
      },
      {
        path: 'ativos',
        element: <Ativos />,
      },
      {
        path: 'ativos/:id',
        element: <AtivoDetalhes />,
      },
      {
        path: 'transacoes',
        element: <Transacoes />,
      },
      {
        path: 'proventos',
        element: <Proventos />,
      },
      {
        path: 'relatorios',
        element: <Relatorios />,
      },
    ],
  },
]
