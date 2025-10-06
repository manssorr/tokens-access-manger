import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { RenewButton } from './RenewButton'
import { Pagination } from './Pagination'
import { UI_TEXT } from '@/config/constants'
import { toast } from '@/lib/toast'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { Token } from '@/types/token'
import type { SortField, SortDirection } from '@/hooks/useTokens'
import { maskToken, formatDate } from '@/lib/helpers'
import { ArrowUpDown, ArrowUp, ArrowDown, Copy, Trash2 } from 'lucide-react'

interface TokenTableProps {
  tokens: Token[]
  onRenew: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  loading: boolean
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

export function TokenTable({
  tokens,
  onRenew,
  onDelete,
  loading,
  sortField,
  sortDirection,
  onSort,
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: TokenTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tokenToDelete, setTokenToDelete] = useState<Token | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [dontShowDeleteWarning, setDontShowDeleteWarning] = useLocalStorage<boolean>(
    'tokens-skip-delete-warning',
    false
  )

  const handleCopyToken = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token)
      toast.success('Token copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy token')
    }
  }

  const handleDeleteClick = async (token: Token) => {
    setTokenToDelete(token)

    // If "don't show again" is checked, delete immediately without dialog
    if (dontShowDeleteWarning) {
      await performDelete(token)
    } else {
      setDeleteDialogOpen(true)
    }
  }

  const performDelete = async (token: Token) => {
    setIsDeleting(true)
    try {
      await onDelete(token.id)
      toast.success('Token deleted successfully', {
        description: `Removed token for ${token.serviceName}`,
      })
      setDeleteDialogOpen(false)
      setTokenToDelete(null)
    } catch (error) {
      toast.error('Failed to delete token', {
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!tokenToDelete) return
    await performDelete(tokenToDelete)
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">{UI_TEXT.TABLE.LOADING}</div>
      </div>
    )
  }

  if (tokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground text-lg">{UI_TEXT.TABLE.NO_TOKENS_FOUND}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {UI_TEXT.TABLE.TRY_ADJUSTING_FILTERS}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="table-fixed min-w-full lg:min-w-0">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold w-[22%] min-w-[150px]">
                  <button
                    onClick={() => onSort('serviceName')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    {UI_TEXT.TABLE.SERVICE_NAME}
                    <SortIcon field="serviceName" />
                  </button>
                </TableHead>
                <TableHead className="font-semibold w-[26%] min-w-[180px]">{UI_TEXT.TABLE.TOKEN}</TableHead>
                <TableHead className="font-semibold w-[14%] min-w-[110px]">
                  <button
                    onClick={() => onSort('expiryDate')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    {UI_TEXT.TABLE.EXPIRY_DATE}
                    <SortIcon field="expiryDate" />
                  </button>
                </TableHead>
                <TableHead className="font-semibold w-[12%] min-w-[100px]">
                  <button
                    onClick={() => onSort('status')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    {UI_TEXT.TABLE.STATUS}
                    <SortIcon field="status" />
                  </button>
                </TableHead>
                <TableHead className="font-semibold w-[26%] min-w-[160px] text-right">
                  {UI_TEXT.TABLE.ACTIONS}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell className="font-medium w-[22%] min-w-[150px]">{token.serviceName}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground w-[26%] min-w-[180px]">
                    {maskToken(token.token)}
                  </TableCell>
                  <TableCell className="w-[14%] min-w-[110px]">{formatDate(token.expiryDate)}</TableCell>
                  <TableCell className="w-[12%] min-w-[100px]">
                    <Badge
                      variant={token.status === 'active' ? 'default' : 'destructive'}
                      className={
                        token.status === 'expired'
                          ? 'bg-red-500/90 text-white hover:bg-red-500/80'
                          : ''
                      }
                    >
                      {token.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[26%] min-w-[160px] text-right">
                    <div className="flex justify-end gap-2">
                      <RenewButton tokenId={token.id} isRenewing={token.isRenewing} onRenew={onRenew} />

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyToken(token.token)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{UI_TEXT.TOOLTIP.COPY_TOKEN}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(token)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{UI_TEXT.TOOLTIP.DELETE_TOKEN}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px] data-[state=open]:slide-in-from-bottom-4 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=closed]:slide-out-to-left-0">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Token</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the token for{' '}
              <span className="font-semibold">{tokenToDelete?.serviceName}</span>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex items-center space-x-2 py-4">
            <Checkbox
              id="dont-show-again"
              checked={dontShowDeleteWarning}
              onCheckedChange={(checked) => setDontShowDeleteWarning(checked as boolean)}
            />
            <Label
              htmlFor="dont-show-again"
              className="text-sm font-normal cursor-pointer"
            >
              Don't show this warning again
            </Label>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
