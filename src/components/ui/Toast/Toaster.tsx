"use client";

import React from 'react';
import { Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport } from './Toast';
import { useToastContext } from './ToastProvider';

const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToastContext();

  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} onOpenChange={(open) => !open && removeToast(toast.id)}>
          <div className="flex-1">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </>
  );
};

export default Toaster;
