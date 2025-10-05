/**
 * Application configuration
 * Environment-based settings with type safety
 */

interface AppConfig {
  api: {
    baseURL: string
    timeout: number
  }
  env: {
    isDevelopment: boolean
    isProduction: boolean
  }
}

// Get environment variables with fallbacks
const getEnvVar = (key: string, fallback: string): string => {
  return import.meta.env[key] || fallback
}

// Create type-safe configuration object
export const appConfig: AppConfig = {
  api: {
    baseURL: getEnvVar('VITE_API_URL', 'http://localhost:3000'),
    timeout: 30000, // 30 seconds
  },
  env: {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  },
}

// Export individual config values for convenience
export const API_BASE_URL = appConfig.api.baseURL
export const API_TIMEOUT = appConfig.api.timeout
