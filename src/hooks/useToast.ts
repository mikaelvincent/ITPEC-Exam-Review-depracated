import { useContext } from 'react';
import { ToastContext } from '@/components/ui/Toast/ToastProvider';


/**
 * Custom hook to interact with the toast notification system.
 *
 * @example
 * const { addToast } = useToast();
 * addToast({
 *   title: 'Notification Title',
 *   description: 'This is a toast notification.',
 *   variant: 'success',
 * });
 *
 * @returns An object containing the addToast function.
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return { addToast: context.addToast };
}
