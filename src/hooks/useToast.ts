import { useContext } from 'react';
import { ToastContext } from '@/components/ui/Toast/ToastProvider';

/**
 * Custom hook to interact with the toast notification system.
 *
 * @example
 * const { toast } = useToast();
 * toast({
 *   title: 'Notification Title',
 *   description: 'This is a toast notification.',
 * });
 *
 * @returns An object containing the toast function.
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
