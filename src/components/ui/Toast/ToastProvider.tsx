"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
}

interface ToastContextProps {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

/**
 * Custom hook to use the Toast context.
 * @returns ToastContextProps
 */
export const useToastContext = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

/**
 * ToastProvider component that wraps the application and provides toast functionality.
 * @param children - ReactNode
 * @returns JSX.Element
 */
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Adds a new toast to the list.
   * @param toast - Omit<Toast, 'id'>
   */
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = uuidv4();
    setToasts((prevToasts) => [...prevToasts, { id, ...toast }]);
  };

  /**
   * Removes a toast by its ID.
   * @param id - string
   */
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
