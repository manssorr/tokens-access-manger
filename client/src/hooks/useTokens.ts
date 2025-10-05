/**
 * useTokens hook
 * Centralized token state management and API operations
 */

import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  fetchTokens as apiFetchTokens,
  renewToken as apiRenewToken,
  deleteToken as apiDeleteToken,
  seedTokens as apiSeedTokens,
} from '@/api/tokens.api'
import { getTokenStatus } from '@/lib/helpers'
import { ALL_SERVICES_FILTER } from '@/config/constants'
import type { Token } from '@/types/token'

export type SortField = 'serviceName' | 'expiryDate' | 'status'
export type SortDirection = 'asc' | 'desc'

interface UseTokensOptions {
  autoFetch?: boolean
}

interface UseTokensReturn {
  tokens: Token[]
  loading: boolean
  error: Error | null
  serviceFilter: string
  showExpiredOnly: boolean
  sortField: SortField
  sortDirection: SortDirection
  uniqueServices: string[]
  filteredTokens: Token[]
  sortedTokens: Token[]
  setServiceFilter: (filter: string) => void
  setShowExpiredOnly: (show: boolean) => void
  setSortField: (field: SortField) => void
  setSortDirection: (direction: SortDirection) => void
  toggleSort: (field: SortField) => void
  fetchTokens: (silent?: boolean) => Promise<void>
  renewToken: (id: string) => Promise<void>
  deleteToken: (id: string) => Promise<void>
  seedTokens: (count?: number) => Promise<void>
  refreshTokens: () => Promise<void>
}

/**
 * Custom hook for token management
 */
export function useTokens(options: UseTokensOptions = {}): UseTokensReturn {
  const { autoFetch = true } = options

  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [serviceFilter, setServiceFilter] = useState<string>(ALL_SERVICES_FILTER)
  const [showExpiredOnly, setShowExpiredOnly] = useState(false)
  const [sortField, setSortField] = useState<SortField>('serviceName')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Fetch tokens from API
  const fetchTokens = useCallback(async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true)
        setError(null)
      }

      const data = await apiFetchTokens()

      // Update status based on expiry date
      const updatedTokens = data.map((token) => ({
        ...token,
        status: getTokenStatus(token.expiryDate),
      }))

      setTokens(updatedTokens)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch tokens')
      setError(error)
      console.error('Failed to fetch tokens:', err)
    } finally {
      if (!silent) {
        setLoading(false)
      }
    }
  }, [])

  // Renew a token
  const renewToken = useCallback(async (id: string) => {
    // 1. Immediately show loading state
    setTokens((prevTokens) =>
      prevTokens.map((token) =>
        token.id === id ? { ...token, isRenewing: true } : token
      )
    )

    try {
      // 2. Call backend
      const renewedToken = await apiRenewToken(id)

      // 3. Validate backend response
      if (!renewedToken || !renewedToken.id || !renewedToken.expiryDate) {
        throw new Error('Invalid response from server')
      }

      // 4. Update with backend data
      setTokens((prevTokens) =>
        prevTokens.map((token) =>
          token.id === id ? { ...renewedToken, isRenewing: false } : token
        )
      )
    } catch (err) {
      // 5. Clear loading state on error
      setTokens((prevTokens) =>
        prevTokens.map((token) =>
          token.id === id ? { ...token, isRenewing: false } : token
        )
      )
      const error = err instanceof Error ? err : new Error('Failed to renew token')
      throw error
    }
  }, [])

  // Delete a token
  const deleteToken = useCallback(async (id: string) => {
    try {
      await apiDeleteToken(id)

      // Update - remove token from state
      setTokens((prevTokens) => prevTokens.filter((token) => token.id !== id))
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete token')
      throw error
    }
  }, [])

  // Seed random tokens
  const seedTokens = useCallback(async (count = 10) => {
    try {
      const newTokens = await apiSeedTokens(count)

      // Update tokens with seeded tokens
      setTokens((prevTokens) => [
        ...prevTokens,
        ...newTokens.map((token) => ({
          ...token,
          status: getTokenStatus(token.expiryDate),
        })),
      ])
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to seed tokens')
      throw error
    }
  }, [])

  // Toggle sort direction or change field
  const toggleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        // Same field, toggle direction
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      } else {
        // Different field, set to asc
        setSortField(field)
        setSortDirection('asc')
      }
    },
    [sortField]
  )

  // Refresh tokens
  const refreshTokens = useCallback(() => fetchTokens(false), [fetchTokens])

  // Get unique service names for filter
  const uniqueServices = useMemo(() => {
    const services = new Set(tokens.map((token) => token.serviceName))
    return Array.from(services).sort()
  }, [tokens])

  // Filter tokens based on selected filters
  const filteredTokens = useMemo(() => {
    return tokens.filter((token) => {
      // Service filter
      const matchesService =
        serviceFilter === ALL_SERVICES_FILTER || token.serviceName === serviceFilter

      // Expiry filter
      const matchesExpiry = !showExpiredOnly || token.status === 'expired'

      return matchesService && matchesExpiry
    })
  }, [tokens, serviceFilter, showExpiredOnly])

  // Sort filtered tokens
  const sortedTokens = useMemo(() => {
    const sorted = [...filteredTokens]

    sorted.sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'serviceName':
          comparison = a.serviceName.localeCompare(b.serviceName)
          break
        case 'expiryDate':
          comparison = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
          break
        case 'status':
          comparison = a.status.localeCompare(b.status)
          break
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [filteredTokens, sortField, sortDirection])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchTokens()
    }
  }, [autoFetch, fetchTokens])

  return {
    tokens,
    loading,
    error,
    serviceFilter,
    showExpiredOnly,
    sortField,
    sortDirection,
    uniqueServices,
    filteredTokens,
    sortedTokens,
    setServiceFilter,
    setShowExpiredOnly,
    setSortField,
    setSortDirection,
    toggleSort,
    fetchTokens,
    renewToken,
    deleteToken,
    seedTokens,
    refreshTokens,
  }
}
