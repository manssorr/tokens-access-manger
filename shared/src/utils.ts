/**
 * Shared utility functions used across client and server
 */

import type { TokenStatus } from './constants'

/**
 * Check if a date string represents an expired date
 */
export function isExpired(dateString: string): boolean {
  return new Date(dateString) <= new Date()
}

/**
 * Get token status based on expiry date
 */
export function getTokenStatus(expiryDate: string): TokenStatus {
  return isExpired(expiryDate) ? 'expired' : 'active'
}

/**
 * Validate if a date string is in valid ISO 8601 format
 */
export function isValidISODate(dateString: string): boolean {
  const date = new Date(dateString)
  return !isNaN(date.getTime()) && dateString === date.toISOString()
}
