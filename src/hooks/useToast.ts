import { useCallback } from 'react'

// Simplified toast implementation
export const toast = {
  success: (message: string) => {
    console.log('✅ Success:', message)
    // TODO: Implementar com biblioteca (sonner ou react-hot-toast)
  },
  error: (message: string) => {
    console.error('❌ Error:', message)
    // TODO: Implementar com biblioteca
  },
  info: (message: string) => {
    console.info('ℹ️ Info:', message)
    // TODO: Implementar com biblioteca
  },
}

export const useToast = () => {
  return {
    success: useCallback((message: string) => toast.success(message), []),
    error: useCallback((message: string) => toast.error(message), []),
    info: useCallback((message: string) => toast.info(message), []),
  }
}
