/**
 * Type-safe localStorage wrapper
 * Provides centralized storage operations with error handling
 */

import { STORAGE_KEYS } from '@/config/constants'

type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]

/**
 * Get item from localStorage
 */
export function getStorageItem(key: StorageKey): string | null {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`Failed to get item from localStorage: ${key}`, error)
    return null
  }
}

/**
 * Set item in localStorage
 */
export function setStorageItem(key: StorageKey, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error(`Failed to set item in localStorage: ${key}`, error)
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: StorageKey): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Failed to remove item from localStorage: ${key}`, error)
  }
}

/**
 * Get number from localStorage with fallback
 */
export function getStorageNumber(key: StorageKey, fallback: number, radix = 10): number {
  const value = getStorageItem(key)
  if (!value) return fallback

  const parsed = parseInt(value, radix)
  return isNaN(parsed) ? fallback : parsed
}

/**
 * Set number in localStorage
 */
export function setStorageNumber(key: StorageKey, value: number): void {
  setStorageItem(key, value.toString())
}
