import React, { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast: React.FC = () => {
  const { toast, hideToast } = useToast();
  
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [toast.visible, hideToast]);
  
  if (!toast.visible) return null;
  
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getBgColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md transform transition-all duration-300 ease-in-out animate-slide-up">
      <div className={`flex items-center p-4 rounded-lg shadow-lg border ${getBgColor()}`}>
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{toast.message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={hideToast}
            className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;