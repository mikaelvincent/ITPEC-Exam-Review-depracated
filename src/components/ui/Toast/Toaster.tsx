"use client";

import React from 'react';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from './Toast';
import { useToast } from '@/hooks/useToast';

const Toaster: React.FC = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast}>
          <div className="flex-1">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};

export default Toaster;
