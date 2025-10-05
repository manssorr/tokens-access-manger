/**
 * Shared constants used across client and server
 */

// Filter constants
export const ALL_SERVICES_FILTER = 'all' as const

// Pagination constants
export const DEFAULT_PAGE_SIZE = 5
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100] as const

// Token service prefixes for generation/validation
export const SERVICE_PREFIXES: Record<string, string> = {
  github: 'ghp_',
  aws: 'AKIA',
  stripe: 'sk_live_',
  sendgrid: 'SG.',
  google: 'ya29.',
  vercel: 'vercel_',
  auth0: 'auth0_pk_live_',
  twilio: 'AC',
  mongodb: 'mongodb+srv://',
  supabase: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.',
} as const

// Default token prefix for unknown services
export const DEFAULT_TOKEN_PREFIX = 'tok_'

// Token generation settings
export const GENERATED_TOKEN_LENGTH = 32

// LocalStorage keys
export const STORAGE_KEYS = {
  ITEMS_PER_PAGE: 'tokens-items-per-page',
} as const

// API Routes
export const API_ROUTES = {
  TOKENS: '/api/tokens',
  HEALTH: '/health',
} as const

// Token status types
export type TokenStatus = 'active' | 'expired'
