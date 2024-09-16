"use client";

import React from 'react';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from './Toast';

interface ToasterProps {
  title: string;
  description: string;
}

const Toaster: React.FC<ToasterProps> = ({ title, description }) => {
  return (
    <Toast>
      <div className="flex-1">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  );
};

export default Toaster;
