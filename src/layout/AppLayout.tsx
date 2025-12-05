import { Outlet } from 'react-router-dom'
import { Suspense, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  useTheme()

  return (
    <div className="min-h-screen bg-background">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />

        <main
          className={cn(
            'flex-1 transition-all duration-300 p-6',
            sidebarOpen ? 'ml-64' : 'ml-0'
          )}
        >
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default AppLayout
