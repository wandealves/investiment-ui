import { Menu, Bell, User, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store'
import { useLogout } from '@/features/auth/hooks/useLogout'
import ThemeToggle from '@/components/common/ThemeToggle'
import { Button } from '@/components/ui/button'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onToggleSidebar: () => void
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const user = useAuthStore((state) => state.user)
  const { mutate: logout } = useLogout()
  const scrollDirection = useScrollDirection()

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full',
        'bg-background/60 backdrop-blur-xl border-b border-border/50',
        'transition-all duration-300',
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="mr-2 hover:bg-primary/10 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </Button>

        <h1 className="text-xl font-bold font-display bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
          Investment Manager
        </h1>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10 transition-colors"
          >
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-error animate-pulse" />
          </Button>

          <div className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <User className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{user?.nome || 'Usuário'}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => logout()}
            className="hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
