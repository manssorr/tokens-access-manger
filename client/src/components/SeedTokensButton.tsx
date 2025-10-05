/**
 * SeedTokensButton component
 * Button to seed random tokens for testing
 */

import { useState } from 'react'
import { Sprout, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { showSuccess, showError } from '@/lib/toast'

interface SeedTokensButtonProps {
  onSeed: (count?: number) => Promise<void>
}

export function SeedTokensButton({ onSeed }: SeedTokensButtonProps) {
  const [isSeeding, setIsSeeding] = useState(false)

  const handleSeed = async () => {
    setIsSeeding(true)
    try {
      await onSeed(10)
      showSuccess('Seeded 10 random tokens successfully')
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Failed to seed tokens'
      )
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleSeed}
          disabled={isSeeding}
          variant="outline"
          size="default"
        >
          {isSeeding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sprout className="h-4 w-4" />
          )}
          <span className="ml-2">Seed Tokens</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Generate 10 random tokens (mix of active and expired)</p>
      </TooltipContent>
    </Tooltip>
  )
}
