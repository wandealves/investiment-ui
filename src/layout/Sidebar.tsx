import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  ArrowLeftRight,
  DollarSign,
  FileText,
  Calculator,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
}

const menuItems = [
  {
    title: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Carteiras',
    path: '/carteiras',
    icon: Wallet,
  },
  {
    title: 'Ativos',
    path: '/ativos',
    icon: TrendingUp,
  },
  {
    title: 'Transações',
    path: '/transacoes',
    icon: ArrowLeftRight,
  },
  {
    title: 'Proventos',
    path: '/proventos',
    icon: DollarSign,
  },
  {
    title: 'Imposto de Renda',
    path: '/impostoderenda',
    icon: Calculator,
  },
  {
    title: 'Relatórios',
    path: '/relatorios',
    icon: FileText,
  },
]

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64',
        'bg-card/80 backdrop-blur-xl border-r border-border/50',
        'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <nav className="space-y-2 p-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg',
                'transition-all duration-200',
                'hover:bg-accent/50 hover:text-accent-foreground',
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
