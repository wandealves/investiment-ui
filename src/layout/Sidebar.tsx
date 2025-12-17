import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  ArrowLeftRight,
  FileText,
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
    title: 'Relatórios',
    path: '/relatorios',
    icon: FileText,
  },
]

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background/95 backdrop-blur-sm',
        'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium overflow-hidden',
                'transition-all duration-300',
                isActive
                  ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                {/* Hover gradient effect for non-active items */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <item.icon
                  className={cn(
                    'h-5 w-5 relative z-10 transition-transform duration-300',
                    'group-hover:scale-110'
                  )}
                />
                <span className="relative z-10">{item.title}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
