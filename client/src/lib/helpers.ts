/**
 * Client-specific helper functions
 * For shared business logic, see @palm/shared package
 */

// Re-export shared utilities
export { isExpired, getTokenStatus, isValidISODate } from '@palm/shared'
export type { TokenStatus } from '@/config/constants'

/**
 * Mask a token to show only first 8 and last 4 characters
 * Example: "ghp_abcdefghijklmnop1234" -> "ghp_abcd...1234"
 */
export function maskToken(token: string): string {
  const MIN_LENGTH_TO_MASK = 12
  const START_CHARS = 8
  const END_CHARS = 4

  if (token.length <= MIN_LENGTH_TO_MASK) {
    return token
  }

  const start = token.slice(0, START_CHARS)
  const end = token.slice(-END_CHARS)
  return `${start}...${end}`
}

/**
 * Format ISO date string to human-readable format
 * Example: "2026-03-15T00:00:00.000Z" -> "Mar 15, 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
