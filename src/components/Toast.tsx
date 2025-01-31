import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed top-70 right-4 bg-white text-gray-900 px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 max-w-md ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};