/**
 * Token generation utility
 * Generates random tokens based on service name with appropriate prefixes
 */

import {
  SERVICE_PREFIXES,
  DEFAULT_TOKEN_PREFIX,
  GENERATED_TOKEN_LENGTH,
} from '@/config/constants'

/**
 * Generate a random string of specified length
 */
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from(
    { length },
    () => chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('')
}

/**
 * Get the appropriate token prefix for a service name
 */
function getServicePrefix(serviceName: string): string {
  const serviceKey = serviceName.toLowerCase()

  // Find matching service prefix
  const matchingKey = Object.keys(SERVICE_PREFIXES).find((key) =>
    serviceKey.includes(key)
  )

  return matchingKey ? SERVICE_PREFIXES[matchingKey] : DEFAULT_TOKEN_PREFIX
}

/**
 * Generate a token based on service name
 * @param serviceName - Name of the service
 * @returns Generated token with appropriate prefix
 *
 * @example
 * generateToken('GitHub API') // => 'ghp_abcd1234...'
 * generateToken('AWS S3') // => 'AKIAabcd1234...'
 * generateToken('My Custom Service') // => 'tok_abcd1234...'
 */
export function generateToken(serviceName: string): string {
  const prefix = getServicePrefix(serviceName)
  const randomPart = generateRandomString(GENERATED_TOKEN_LENGTH)

  return prefix + randomPart
}
