/**
 * Token API operations
 * All token-related API calls
 */

import { apiClient } from './config'
import { API_ROUTES } from '@/config/constants'
import type { Token } from '@/types/token'

interface TokensResponse {
  success: boolean
  data: Token[]
}

interface TokenResponse {
  success: boolean
  message: string
  data: Token
}

interface CreateTokenPayload {
  serviceName: string
  token: string
  expiryDate: string
}

/**
 * Fetch all tokens
 */
export async function fetchTokens(): Promise<Token[]> {
  const response = await apiClient<TokensResponse>(API_ROUTES.TOKENS)
  return response.data
}

/**
 * Create a new token
 */
export async function createToken(payload: CreateTokenPayload): Promise<Token> {
  const response = await apiClient<TokenResponse>(API_ROUTES.TOKENS, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return response.data
}

/**
 * Renew an existing token
 */
export async function renewToken(id: string): Promise<Token> {
  const response = await apiClient<TokenResponse>(`${API_ROUTES.TOKENS}/${id}/renew`, {
    method: 'POST',
  })
  return response.data
}

/**
 * Delete a token
 */
export async function deleteToken(id: string): Promise<void> {
  await apiClient(`${API_ROUTES.TOKENS}/${id}`, {
    method: 'DELETE',
  })
}

/**
 * Seed random tokens
 */
export async function seedTokens(count: number = 10): Promise<Token[]> {
  const response = await apiClient<TokensResponse>(`${API_ROUTES.TOKENS}/seed`, {
    method: 'POST',
    body: JSON.stringify({ count }),
  })
  return response.data
}
