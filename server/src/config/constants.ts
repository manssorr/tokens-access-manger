/**
 * Server constants
 * Re-exports shared constants and adds server-specific values
 */

// Re-export shared constants
export {
  ALL_SERVICES_FILTER,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  SERVICE_PREFIXES,
  DEFAULT_TOKEN_PREFIX,
  GENERATED_TOKEN_LENGTH,
  API_ROUTES,
  type TokenStatus,
} from '@palm/shared'

// Server-specific constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

export const ERROR_MESSAGES = {
  TOKEN_NOT_FOUND: 'Token not found',
  INVALID_TOKEN_DATA: 'Invalid token data',
  MISSING_REQUIRED_FIELDS: 'Missing required fields',
  ROUTE_NOT_FOUND: 'Route not found',
} as const

export const SUCCESS_MESSAGES = {
  TOKEN_RENEWED: 'Token renewed successfully',
  TOKEN_CREATED: 'Token created successfully',
} as const
