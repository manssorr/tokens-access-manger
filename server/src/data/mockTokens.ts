import { Token } from '../types/token.js'
import { isExpired, getTokenStatus } from '@palm/shared'

// Generate mock tokens for different services
export let tokens: Token[] = [
  {
    id: '1',
    serviceName: 'GitHub API',
    token: 'ghp_xK4mN8pR2sT9vWyZ3bD6fG7hJ1kL5nM',
    expiryDate: '2026-03-15T00:00:00.000Z',
    status: 'active'
  },
  {
    id: '2',
    serviceName: 'AWS S3',
    token: 'AKIA4ABCDEFGHIJ12345KLMNOPQRSTUV',
    expiryDate: '2025-12-31T23:59:59.000Z',
    status: 'active'
  },
  {
    id: '3',
    serviceName: 'Stripe API',
    token: 'sk_live_51ABCxyzDEF123GHI456JKL789MNO',
    expiryDate: '2024-08-20T00:00:00.000Z',
    status: 'expired'
  },
  {
    id: '4',
    serviceName: 'SendGrid',
    token: 'SG.abcDEF123.ghi456JKL789mnoPQR012stu',
    expiryDate: '2026-01-10T00:00:00.000Z',
    status: 'active'
  },
  {
    id: '5',
    serviceName: 'Google Cloud Platform',
    token: 'ya29.AbCdEf123456789GhIjKlMnOpQrStUvWx',
    expiryDate: '2024-11-05T00:00:00.000Z',
    status: 'expired'
  },
  {
    id: '6',
    serviceName: 'MongoDB Atlas',
    token: 'mongodb+srv://user:abc123xyz789@cluster0.mongodb.net',
    expiryDate: '2026-06-30T23:59:59.000Z',
    status: 'active'
  },
  {
    id: '7',
    serviceName: 'Vercel',
    token: 'vercel_abcdefghijklmnopqrstuvwxyz123456',
    expiryDate: '2025-11-15T00:00:00.000Z',
    status: 'active'
  },
  {
    id: '8',
    serviceName: 'Supabase',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.supabase',
    expiryDate: '2024-09-01T00:00:00.000Z',
    status: 'expired'
  },
  {
    id: '9',
    serviceName: 'Auth0',
    token: 'auth0_pk_live_abc123def456ghi789jkl012mno',
    expiryDate: '2026-04-20T00:00:00.000Z',
    status: 'active'
  },
  {
    id: '10',
    serviceName: 'Twilio',
    token: 'AC1234567890abcdef1234567890abcdef',
    expiryDate: '2025-10-25T00:00:00.000Z',
    status: 'active'
  }
]

// Update token statuses based on expiry dates
export const updateTokenStatuses = () => {
  tokens = tokens.map(token => ({
    ...token,
    status: getTokenStatus(token.expiryDate)
  }))
}

// Get all tokens
export const getAllTokens = (): Token[] => {
  updateTokenStatuses()
  return tokens
}

// Get token by ID
export const getTokenById = (id: string): Token | undefined => {
  updateTokenStatuses()
  return tokens.find(token => token.id === id)
}

// Renew token (stub - generates new mock token)
export const renewToken = (id: string): Token | null => {
  const tokenIndex = tokens.findIndex(token => token.id === id)

  if (tokenIndex === -1) {
    return null
  }

  // Generate new mock token
  const oldToken = tokens[tokenIndex]
  const newExpiryDate = new Date()
  newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1) // Add 1 year

  const newToken: Token = {
    ...oldToken,
    token: generateMockToken(oldToken.serviceName),
    expiryDate: newExpiryDate.toISOString(),
    status: 'active'
  }

  tokens[tokenIndex] = newToken
  return newToken
}

// Create new token
export const createToken = (serviceName: string, token: string, expiryDate: string): Token => {
  const newId = (Math.max(...tokens.map(t => parseInt(t.id)), 0) + 1).toString()

  const newToken: Token = {
    id: newId,
    serviceName,
    token,
    expiryDate,
    status: getTokenStatus(expiryDate)
  }

  tokens.push(newToken)
  return newToken
}

// Delete token by ID
export const deleteToken = (id: string): boolean => {
  const tokenIndex = tokens.findIndex(token => token.id === id)

  if (tokenIndex === -1) {
    return false
  }

  tokens.splice(tokenIndex, 1)
  return true
}

// Seed random tokens
export const seedTokens = (count: number = 10): Token[] => {
  const services = [
    'GitHub API',
    'AWS S3',
    'Stripe API',
    'SendGrid',
    'Google Cloud Platform',
    'MongoDB Atlas',
    'Vercel',
    'Supabase',
    'Auth0',
    'Twilio',
    'Heroku',
    'DigitalOcean',
    'Cloudflare',
    'Firebase',
    'Netlify',
    'Railway',
    'Render',
    'PlanetScale',
    'Upstash',
    'Algolia'
  ]

  const newTokens: Token[] = []

  for (let i = 0; i < count; i++) {
    const serviceName = services[Math.floor(Math.random() * services.length)]
    const token = generateMockToken(serviceName)

    // Randomize expiry date between expired and active
    const expiryDate = generateRandomExpiryDate()

    const newToken = createToken(serviceName, token, expiryDate)
    newTokens.push(newToken)
  }

  return newTokens
}

// Helper to generate random expiry date (mix of expired and active)
const generateRandomExpiryDate = (): string => {
  const now = new Date()
  const randomMonths = Math.floor(Math.random() * 24) - 12 // Random between -12 and +12 months

  const expiryDate = new Date(now)
  expiryDate.setMonth(expiryDate.getMonth() + randomMonths)

  return expiryDate.toISOString()
}

// Helper to generate mock tokens
const generateMockToken = (serviceName: string): string => {
  const randomString = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
  }

  const prefixes: Record<string, string> = {
    'GitHub API': 'ghp_',
    'AWS S3': 'AKIA',
    'Stripe API': 'sk_live_',
    'SendGrid': 'SG.',
    'Google Cloud Platform': 'ya29.',
    'Vercel': 'vercel_',
    'Auth0': 'auth0_pk_live_',
    'Twilio': 'AC',
    'Heroku': 'heroku_',
    'DigitalOcean': 'do_',
    'Cloudflare': 'cf_',
    'Firebase': 'firebase_',
    'Netlify': 'netlify_',
    'Railway': 'railway_',
    'Render': 'render_',
    'PlanetScale': 'pscale_',
    'Upstash': 'upstash_',
    'Algolia': 'algolia_'
  }

  const prefix = prefixes[serviceName] || ''
  return prefix + randomString(32)
}
