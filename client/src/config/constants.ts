/**
 * Client-specific constants
 * Re-exports shared constants and adds client-only values
 */

// Re-export shared constants
export {
  ALL_SERVICES_FILTER,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  SERVICE_PREFIXES,
  DEFAULT_TOKEN_PREFIX,
  GENERATED_TOKEN_LENGTH,
  STORAGE_KEYS,
  API_ROUTES,
  type TokenStatus,
} from '@palm/shared'

// Client-only constants
export const UI_TEXT = {
  PAGINATION: {
    ITEMS_PER_PAGE: 'Items per page:',
    PREVIOUS: 'Previous',
    NEXT: 'Next',
    PAGE_OF: (current: number, total: number) => `Page ${current} of ${total}`,
  },
  FILTER: {
    ALL_SERVICES: 'All Services',
    FILTER_BY_SERVICE: 'Filter by service',
    SHOW_EXPIRED_ONLY: 'Show Expired Only',
  },
  TOAST: {
    TOKEN_RENEWED: 'Token renewed successfully',
    TOKEN_RENEWED_DESC: 'The token has been renewed with a new expiry date.',
    TOKEN_CREATED: 'Token created successfully',
    TOKEN_CREATED_DESC: (serviceName: string) => `Added token for ${serviceName}`,
    TOKEN_GENERATED: 'Token generated!',
    TOKEN_GENERATED_DESC: 'A random token has been generated based on the service name.',
    FAILED_TO_RENEW: 'Failed to renew token',
    FAILED_TO_CREATE: 'Failed to create token',
    FAILED_TO_LOAD: 'Failed to load tokens',
    ALL_FIELDS_REQUIRED: 'All fields are required',
    ENTER_SERVICE_NAME: 'Please enter a service name first',
  },
  FORM: {
    SERVICE_NAME_LABEL: 'Service Name',
    SERVICE_NAME_PLACEHOLDER: 'e.g. GitHub API',
    ACCESS_TOKEN_LABEL: 'Access Token',
    ACCESS_TOKEN_PLACEHOLDER: 'e.g. ghp_xxxxxxxxxxxx',
    EXPIRY_DATE_LABEL: 'Expiry Date',
    AUTO_GENERATE_TOOLTIP: 'Auto-generate token',
    CANCEL: 'Cancel',
    CREATE_TOKEN: 'Create Token',
    CREATING: 'Creating...',
    RENEW: 'Renew',
    RENEWING: 'Renewing...',
  },
  TABLE: {
    SERVICE_NAME: 'Service Name',
    TOKEN: 'Token',
    EXPIRY_DATE: 'Expiry Date',
    STATUS: 'Status',
    ACTIONS: 'Actions',
    LOADING: 'Loading tokens...',
    NO_TOKENS_FOUND: 'No tokens found',
    TRY_ADJUSTING_FILTERS: 'Try adjusting your filters',
  },
  TOOLTIP: {
    RENEW_TOKEN: 'Renew token with new expiry date',
    COPY_TOKEN: 'Copy token to clipboard',
    DELETE_TOKEN: 'Delete token',
  },
  APP: {
    TITLE: 'Access Manager',
    SUBTITLE: 'Manage API access tokens across multiple services',
    ADD_TOKEN: 'Add Token',
    SHOWING_TOKENS: (start: number, end: number, total: number, filtered: boolean, totalUnfiltered: number) =>
      `Showing ${start}-${end} of ${total} tokens${filtered ? ` (filtered from ${totalUnfiltered} total)` : ''}`,
  },
  DIALOG: {
    ADD_NEW_TOKEN: 'Add New Token',
    ADD_TOKEN_DESCRIPTION: 'Add a new API access token to the manager. All fields are required.',
  },
} as const

// Component styling constants
export const UI_STYLES = {
  SELECT_TRIGGER_WIDTH: 'w-[70px]',
  SERVICE_SELECT_WIDTH: 'w-full sm:w-[250px]',
} as const

// Parsing configuration
export const PARSE_CONFIG = {
  INT_RADIX: 10,
} as const
