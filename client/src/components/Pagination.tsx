import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PAGE_SIZE_OPTIONS, UI_TEXT, UI_STYLES, PARSE_CONFIG } from '@/config/constants'

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange
}: PaginationProps) {
  if (totalItems === 0) {
    return null
  }

  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t bg-muted/30">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {UI_TEXT.PAGINATION.ITEMS_PER_PAGE}
        </span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) =>
            onItemsPerPageChange(parseInt(value, PARSE_CONFIG.INT_RADIX))
          }
        >
          <SelectTrigger className={UI_STYLES.SELECT_TRIGGER_WIDTH}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <span className="text-sm font-medium text-muted-foreground">
          {UI_TEXT.PAGINATION.PAGE_OF(currentPage, totalPages)}
        </span>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canGoPrevious}
            className="gap-1 h-8 px-2 sm:px-3"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{UI_TEXT.PAGINATION.PREVIOUS}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canGoNext}
            className="gap-1 h-8 px-2 sm:px-3"
          >
            <span className="hidden sm:inline">{UI_TEXT.PAGINATION.NEXT}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
