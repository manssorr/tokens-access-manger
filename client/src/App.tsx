import { useEffect, useMemo } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { FilterBar } from '@/components/FilterBar'
import { TokenTable } from '@/components/TokenTable'
import { AddTokenDialog } from '@/components/AddTokenDialog'
import { SeedTokensButton } from '@/components/SeedTokensButton'
import { useTokens } from '@/hooks/useTokens'
import { usePagination } from '@/hooks/usePagination'
import { UI_TEXT } from '@/config/constants'

function App() {
  // Token management hook
  const {
    loading,
    serviceFilter,
    showExpiredOnly,
    sortField,
    sortDirection,
    uniqueServices,
    filteredTokens,
    sortedTokens,
    setServiceFilter,
    setShowExpiredOnly,
    toggleSort,
    renewToken,
    deleteToken,
    seedTokens,
    refreshTokens,
  } = useTokens()

  // Pagination hook
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    setCurrentPage,
    setItemsPerPage,
    resetToFirstPage,
  } = usePagination({
    totalItems: filteredTokens.length,
  })

  // Reset to page 1 when filters change
  useEffect(() => {
    resetToFirstPage()
  }, [serviceFilter, showExpiredOnly, resetToFirstPage])

  // Paginated tokens (from sorted tokens)
  const paginatedTokens = useMemo(() => {
    return sortedTokens.slice(startIndex, endIndex)
  }, [sortedTokens, startIndex, endIndex])

  return (
    <ThemeProvider defaultTheme="system" storageKey="access-manager-theme">
      <TooltipProvider delayDuration={300}>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
            {/* Header - Stack on mobile */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 sm:mb-2">{UI_TEXT.APP.TITLE}</h1>
                <p className="text-sm sm:text-base text-muted-foreground">{UI_TEXT.APP.SUBTITLE}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <ThemeToggle />
                <SeedTokensButton onSeed={seedTokens} />
                <AddTokenDialog onTokenAdded={refreshTokens} />
              </div>
            </div>

          <FilterBar
            serviceFilter={serviceFilter}
            onServiceFilterChange={setServiceFilter}
            showExpiredOnly={showExpiredOnly}
            onShowExpiredChange={setShowExpiredOnly}
            services={uniqueServices}
          />

          <TokenTable
            tokens={paginatedTokens}
            onRenew={renewToken}
            onDelete={deleteToken}
            loading={loading}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={toggleSort}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredTokens.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />

          <div className="mt-6 text-sm text-muted-foreground text-center">
            {UI_TEXT.APP.SHOWING_TOKENS(
              filteredTokens.length === 0 ? 0 : startIndex + 1,
              Math.min(endIndex, filteredTokens.length),
              filteredTokens.length,
              filteredTokens.length !== uniqueServices.length,
              uniqueServices.length
            )}
          </div>
        </div>

          <Toaster />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
