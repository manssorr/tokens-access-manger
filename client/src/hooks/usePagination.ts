/**
 * usePagination hook
 * Reusable pagination logic with localStorage persistence
 */

import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { DEFAULT_PAGE_SIZE, STORAGE_KEYS } from '@/config/constants'

interface UsePaginationOptions {
  totalItems: number
  persistKey?: string
}

interface UsePaginationReturn {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  resetToFirstPage: () => void
}

/**
 * Custom hook for pagination logic
 */
export function usePagination({ totalItems, persistKey }: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(1)

  const [itemsPerPage, setItemsPerPage] = useLocalStorage<number>(
    persistKey || STORAGE_KEYS.ITEMS_PER_PAGE,
    DEFAULT_PAGE_SIZE
  )

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  const resetToFirstPage = useCallback(() => setCurrentPage(1), [])

  // Update itemsPerPage and reset to first page
  const handleSetItemsPerPage = useCallback((items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }, [setItemsPerPage])

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    setCurrentPage,
    setItemsPerPage: handleSetItemsPerPage,
    resetToFirstPage,
  }
}
