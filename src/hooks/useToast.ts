import { useCallback } from 'react'
import { toast as sonnerToast } from 'sonner'

export const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  info: (message: string) => sonnerToast.info(message),
}

export const useToast = () => {
  return {
    success: useCallback((message: string) => toast.success(message), []),
    error: useCallback((message: string) => toast.error(message), []),
    info: useCallback((message: string) => toast.info(message), []),
  }
}
