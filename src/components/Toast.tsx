import React from 'react';
import { motion } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  show: boolean;
  type: ToastType;
  message: string;
  onClose: () => void;
  autoDismiss?: number; // in ms
}

const typeStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
};

export const Toast: React.FC<ToastProps> = ({
  show,
  type,
  message,
  onClose,
  autoDismiss = 4000,
}) => {
  React.useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, autoDismiss);
    return () => clearTimeout(timer);
  }, [show, autoDismiss, onClose]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed top-4 right-4 z-50 max-w-md px-4 py-3 rounded-md shadow-lg ${typeStyles[type]} flex items-center justify-between`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-current hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
    </motion.div>
  );
};