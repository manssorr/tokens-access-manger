/**
 * Server configuration
 * Environment-based settings with type safety
 */

interface ServerConfig {
  port: number
  cors: {
    origins: string[]
    credentials: boolean
  }
  env: {
    isDevelopment: boolean
    isProduction: boolean
    nodeEnv: string
  }
}

/**
 * Get environment variable with fallback
 */
function getEnvVar(key: string, fallback: string): string {
  return process.env[key] || fallback
}

/**
 * Parse CORS origins from comma-separated string
 */
function parseCorsOrigins(originsString: string): string[] {
  return originsString
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0)
}

/**
 * Generate CORS origins for localhost ports 5173-5200
 */
function generateLocalhostOrigins(): string[] {
  const origins: string[] = []
  for (let port = 5173; port <= 5200; port++) {
    origins.push(`http://localhost:${port}`)
  }
  // Also add common production build preview port
  origins.push('http://localhost:4173')
  return origins
}

// Default values
const DEFAULT_PORT = 3000
const DEFAULT_CORS_ORIGINS = generateLocalhostOrigins().join(',')

// Create configuration object
export const config: ServerConfig = {
  port: parseInt(getEnvVar('PORT', DEFAULT_PORT.toString()), 10),
  cors: {
    origins: parseCorsOrigins(getEnvVar('CORS_ORIGINS', DEFAULT_CORS_ORIGINS)),
    credentials: true,
  },
  env: {
    isDevelopment: getEnvVar('NODE_ENV', 'development') === 'development',
    isProduction: getEnvVar('NODE_ENV', 'development') === 'production',
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
  },
}

// Export individual config values for convenience
export const PORT = config.port
export const CORS_ORIGINS = config.cors.origins
export const CORS_CREDENTIALS = config.cors.credentials
export const IS_DEVELOPMENT = config.env.isDevelopment
export const IS_PRODUCTION = config.env.isProduction
