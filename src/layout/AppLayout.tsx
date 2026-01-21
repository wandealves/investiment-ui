import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  useTheme()

  return (
    <div className="min-h-screen bg-background">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />

        <main
          className={cn(
            'flex-1 transition-all duration-300',
            'p-4 sm:p-6 lg:p-8', // Responsive padding
            sidebarOpen ? 'ml-[280px] sm:ml-64' : 'ml-0'
          )}
        >
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64" role="status" aria-live="polite">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" aria-hidden="true" />
                <span className="sr-only">Carregando página...</span>
              </div>
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default AppLayout
