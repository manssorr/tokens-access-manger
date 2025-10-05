export interface Token {
  id: string
  serviceName: string
  token: string
  expiryDate: string // ISO 8601 format
  status: 'active' | 'expired'
}

export interface TokensResponse {
  success: boolean
  data: Token[]
}

export interface RenewResponse {
  success: boolean
  message: string
  data?: Token
  error?: string
}

export interface CreateTokenRequest {
  serviceName: string
  token: string
  expiryDate: string
}

export interface CreateTokenResponse {
  success: boolean
  message: string
  data?: Token
  error?: string
}

export interface DeleteResponse {
  success: boolean
  message: string
  error?: string
}

export interface SeedResponse {
  success: boolean
  message: string
  data?: Token[]
  error?: string
}
