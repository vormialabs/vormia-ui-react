import { toast } from 'sonner'

type ToastOptions = {
  duration?: number
  description?: string
}

/**
 * Flash-style feedback (like PHP session()->flash).
 * Call from event handlers / mutation onSuccess — not from useEffect.
 */
export const ShowToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, {
      duration: options?.duration,
      description: options?.description,
    }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, {
      duration: options?.duration,
      description: options?.description,
    }),

  info: (message: string, options?: ToastOptions) =>
    toast.info(message, {
      duration: options?.duration,
      description: options?.description,
    }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, {
      duration: options?.duration,
      description: options?.description,
    }),

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: unknown) => string)
    },
  ) => toast.promise(promise, messages),
}
