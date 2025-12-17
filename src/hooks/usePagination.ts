import { useState, useCallback, useEffect, useMemo } from 'react'

export interface UsePaginationProps {
  initialPage?: number
  initialPageSize?: number
  totalItems?: number
  storageKey?: string
}

export interface UsePaginationReturn {
  currentPage: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  goToPage: (page: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
  setPageSize: (size: number) => void
  resetPagination: () => void
}

export const usePagination = ({
  initialPage = 1,
  initialPageSize = 20,
  totalItems = 0,
  storageKey,
}: UsePaginationProps): UsePaginationReturn => {
  // Load initial state from sessionStorage if storageKey is provided
  const getInitialState = useCallback(() => {
    if (storageKey) {
      try {
        const saved = sessionStorage.getItem(storageKey)
        if (saved) {
          const parsed = JSON.parse(saved)
          return {
            page: parsed.page || initialPage,
            pageSize: parsed.pageSize || initialPageSize,
          }
        }
      } catch (error) {
        console.error('Error loading pagination state from sessionStorage:', error)
      }
    }
    return { page: initialPage, pageSize: initialPageSize }
  }, [storageKey, initialPage, initialPageSize])

  const [currentPage, setCurrentPage] = useState<number>(getInitialState().page)
  const [pageSize, setPageSizeState] = useState<number>(getInitialState().pageSize)

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!totalItems || totalItems === 0) return 1
    return Math.ceil(totalItems / pageSize)
  }, [totalItems, pageSize])

  // Calculate pagination states
  const hasNextPage = useMemo(() => currentPage < totalPages, [currentPage, totalPages])
  const hasPreviousPage = useMemo(() => currentPage > 1, [currentPage])

  // Save to sessionStorage whenever page or pageSize changes
  useEffect(() => {
    if (storageKey) {
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({ page: currentPage, pageSize })
        )
      } catch (error) {
        console.error('Error saving pagination state to sessionStorage:', error)
      }
    }
  }, [currentPage, pageSize, storageKey])

  // Navigation functions
  const goToPage = useCallback(
    (page: number) => {
      // Validate page bounds
      if (page < 1) {
        setCurrentPage(1)
      } else if (page > totalPages && totalPages > 0) {
        setCurrentPage(totalPages)
      } else {
        setCurrentPage(page)
      }
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [totalPages]
  )

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      goToPage(currentPage + 1)
    }
  }, [currentPage, hasNextPage, goToPage])

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      goToPage(currentPage - 1)
    }
  }, [currentPage, hasPreviousPage, goToPage])

  const goToFirstPage = useCallback(() => {
    goToPage(1)
  }, [goToPage])

  const goToLastPage = useCallback(() => {
    if (totalPages > 0) {
      goToPage(totalPages)
    }
  }, [totalPages, goToPage])

  const setPageSize = useCallback(
    (size: number) => {
      setPageSizeState(size)
      // Reset to first page when page size changes
      setCurrentPage(1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    []
  )

  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage)
    setPageSizeState(initialPageSize)
    if (storageKey) {
      try {
        sessionStorage.removeItem(storageKey)
      } catch (error) {
        console.error('Error removing pagination state from sessionStorage:', error)
      }
    }
  }, [initialPage, initialPageSize, storageKey])

  return {
    currentPage,
    pageSize,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    setPageSize,
    resetPagination,
  }
}
