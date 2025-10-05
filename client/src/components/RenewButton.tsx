import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from '@/lib/toast'
import { RefreshCw } from 'lucide-react'
import { UI_TEXT } from '@/config/constants'

interface RenewButtonProps {
  tokenId: string
  isRenewing?: boolean
  onRenew: (id: string) => Promise<void>
}

export function RenewButton({ tokenId, isRenewing = false, onRenew }: RenewButtonProps) {
  const handleRenew = async () => {
    try {
      await onRenew(tokenId)
      toast.success(UI_TEXT.TOAST.TOKEN_RENEWED, {
        description: UI_TEXT.TOAST.TOKEN_RENEWED_DESC,
      })
    } catch (error) {
      toast.error(UI_TEXT.TOAST.FAILED_TO_RENEW, {
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      })
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleRenew}
          disabled={isRenewing}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRenewing ? 'animate-spin' : ''}`} />
          {isRenewing ? UI_TEXT.FORM.RENEWING : UI_TEXT.FORM.RENEW}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{UI_TEXT.TOOLTIP.RENEW_TOKEN}</p>
      </TooltipContent>
    </Tooltip>
  )
}
