import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, FileText } from 'lucide-react';

/**
 * ExportSuccessNotification - A reusable component for displaying export success notifications
 * 
 * @param {Object} props
 * @param {boolean} props.isVisible - Controls the visibility of the notification
 * @param {Function} props.onClose - Function to call when closing the notification
 * @param {string} props.format - The format of the exported data (e.g., 'pdf', 'excel')
 * @param {string} props.message - Custom message to display (default: "Dữ liệu đã được xuất thành công")
 * @param {number} props.autoHideDuration - Duration in milliseconds before auto-hiding (default: 5000, 0 to disable)
 * @param {string} props.position - Position of the notification (default: "bottom-right")
 */
const ExportSuccessNotification = ({
  isVisible,
  onClose,
  format = 'pdf',
  message = "Dữ liệu đã được xuất thành công",
  autoHideDuration = 5000,
  position = "bottom-right"
}) => {
  // Auto-hide notification after specified duration
  useEffect(() => {
    if (isVisible && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, autoHideDuration]);
  
  // Get position classes based on position prop
  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-center":
        return "top-4 left-1/2 -translate-x-1/2";
      case "bottom-center":
        return "bottom-4 left-1/2 -translate-x-1/2";
      case "bottom-right":
      default:
        return "bottom-4 right-4";
    }
  };
  
  // Get icon based on format
  const getFormatIcon = () => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText size={16} className="text-red-500" />;
      case 'excel':
        return <FileText size={16} className="text-green-600" />;
      default:
        return <FileText size={16} className="text-blue-500" />;
    }
  };
  
  // Get format text
  const getFormatText = () => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return "PDF";
      case 'excel':
        return "Excel";
      default:
        return format.toUpperCase();
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`fixed z-50 ${getPositionClasses()}`}
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 w-80 flex items-start">
            {/* Success icon */}
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={18} className="text-green-600" />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 font-medium mb-1">{message}</p>
              <div className="flex items-center text-sm text-gray-500">
                {getFormatIcon()}
                <span className="ml-1">Định dạng: {getFormatText()}</span>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportSuccessNotification; 