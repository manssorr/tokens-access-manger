/**
 * Toast notification utilities with custom styling
 * Wraps Sonner toast with consistent styling for different notification types
 */

import { toast as sonnerToast } from 'sonner'

interface ToastOptions {
  description?: string
  duration?: number
}

/**
 * Toast notification styles for different types
 */
const TOAST_STYLES = {
  success: {
    style: {
      background: 'hsl(142.1 76.2% 36.3%)',
      color: 'hsl(0 0% 100%)',
      border: '1px solid hsl(142.1 70.6% 45.3%)',
    },
  },
  error: {
    style: {
      background: 'hsl(0 84.2% 60.2%)',
      color: 'hsl(0 0% 100%)',
      border: '1px solid hsl(0 72.2% 50.6%)',
    },
  },
  info: {
    style: {
      background: 'hsl(221.2 83.2% 53.3%)',
      color: 'hsl(0 0% 100%)',
      border: '1px solid hsl(221.2 83.2% 53.3%)',
    },
  },
  warning: {
    style: {
      background: 'hsl(47.9 95.8% 53.1%)',
      color: 'hsl(0 0% 0%)',
      border: '1px solid hsl(47.9 95.8% 53.1%)',
    },
  },
} as const

/**
 * Show a success toast notification
 */
export const showSuccess = (message: string, options?: ToastOptions) => {
  sonnerToast.success(message, {
    ...options,
    ...TOAST_STYLES.success,
  })
}

/**
 * Show an error toast notification
 */
export const showError = (message: string, options?: ToastOptions) => {
  sonnerToast.error(message, {
    ...options,
    ...TOAST_STYLES.error,
  })
}

/**
 * Show an info toast notification
 */
export const showInfo = (message: string, options?: ToastOptions) => {
  sonnerToast.info(message, {
    ...options,
    ...TOAST_STYLES.info,
  })
}

/**
 * Show a warning toast notification
 */
export const showWarning = (message: string, options?: ToastOptions) => {
  sonnerToast.warning(message, {
    ...options,
    ...TOAST_STYLES.warning,
  })
}

/**
 * Re-export base toast for cases where custom styling isn't needed
 */
export const toast = {
  success: showSuccess,
  error: showError,
  info: showInfo,
  warning: showWarning,
}
