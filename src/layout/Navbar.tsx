import { Menu, Bell, User, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store'
import { useLogout } from '@/features/auth/hooks/useLogout'
import ThemeToggle from '@/components/common/ThemeToggle'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  onToggleSidebar: () => void
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const user = useAuthStore((state) => state.user)
  const { mutate: logout } = useLogout()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="mr-2"
        >
          <Menu className="h-6 w-6" />
        </Button>

        <h1 className="text-xl font-bold">Investment Manager</h1>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-md bg-accent">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">{user?.nome || 'Usuário'}</span>
          </div>

          <Button variant="ghost" size="icon" onClick={() => logout()}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
