import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Check, Heart, PiggyBank, Unlock, UnlockIcon, FilePen, FilePlus } from 'lucide-react';
import SwipeToConfirm from '../SwipeToConfirm';
import LoadingSpinner from '@/components/ui/custom/LoadingSpinner'

const SwipeConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Xác nhận hành động',
  description = 'Vui lòng vuốt để xác nhận hành động này',
  confirmText = 'Vuốt để xác nhận',
  type = 'warning', // 'warning', 'success', 'danger'
  icon = null,
  confirmDetails = null, // Add confirmDetails prop for displaying key-value pairs
  isProcessing = false // New prop for processing state
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  
  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsCompleted(false);
      setShowProcessing(false);
    }
  }, [isOpen]);

  // Handle processing state with delay to ensure smooth transition
  useEffect(() => {
    if (isProcessing && isCompleted) {
      // Small delay to ensure the UI has updated
      const timer = setTimeout(() => {
        setShowProcessing(true);
      }, 50);
      return () => clearTimeout(timer);
    } else if (!isProcessing) {
      setShowProcessing(false);
    }
  }, [isProcessing, isCompleted]);
  
  const handleConfirmComplete = () => {
    setIsCompleted(true);
    // Add small delay before calling onConfirm to allow UI to update
    setTimeout(() => {
      onConfirm && onConfirm();
    }, 100);
  };
  
  // Get icon based on type
  const getIcon = () => {
    if (icon) return icon;
    
    switch(type) {
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-amber-500" />;
      case 'danger':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'success':
        return <Check className="h-6 w-6 text-green-500" />;
      case 'pink':
        return <PiggyBank className="h-8 w-8 text-pink-500" />;
      case 'unlock': 
        return <UnlockIcon className="h-6 w-6 text-blue-500" />;
      case 'update':
        return <FilePen className="h-6 w-6 text-blue-500" />;
      case 'add':
        return <FilePlus className="h-6 w-6 text-blue-500" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-amber-500" />;
    }
  };

  // Get spinner color based on type
  const getSpinnerColor = () => {
    switch(type) {
      case 'warning':
        return '#F59E0B';
      case 'danger':
        return '#EF4444';
      case 'success':
        return '#10B981';
      case 'pink':
        return '#EC4899';
      default:
        return '#3B82F6';
    }
  };

  // Determine what content to show
  const shouldShowProcessing = showProcessing || (isProcessing && isCompleted);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden z-[71]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              layout: { 
                duration: 0.4,
                ease: "easeInOut"
              }
            }}
            onClick={(e) => e.stopPropagation()}
            layout // This will now work properly
           
          >
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 bg-gray-50 p-2 rounded-full">
                  {getIcon()}
                </div>
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                disabled={isCompleted || isProcessing}
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            
            {/* Single container with layout animation - no AnimatePresence here */}
            <motion.div
            >
              {shouldShowProcessing ? (
                // Processing state with loading spinner
                <motion.div
                  className="p-8 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <LoadingSpinner
                    size={56} 
                    color={getSpinnerColor()} 
                  />
                  <motion.p 
                    className="text-gray-600 mt-4 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    Sweet đang xử lý, sẽ xong ngay thôi...
                  </motion.p>
                </motion.div>
              ) : (
                // Normal state with description and swipe component  
                <motion.div
                  className="p-5"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-600 mb-6">{description}</p>
                  
                  {/* Display confirmation details if provided */}
                  {confirmDetails && (
                    <motion.div 
                      className="bg-gray-50 rounded-lg p-4 mb-6"
                      layout
                    >
                      {Object.entries(confirmDetails).map(([label, value]) => (
                        <div key={label} className="flex justify-between mb-2 last:mb-0">
                          <span className="text-gray-600">{label}:</span>
                          <span className="font-medium text-gray-800">{value}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  
                  <div className="flex justify-center mb-4">
                    <SwipeToConfirm 
                      onComplete={handleConfirmComplete}
                      text={isCompleted ? 'Đã xác nhận!' : confirmText}
                      disabled={isCompleted || isProcessing}
                      type={type}
                    />
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    {isCompleted ? 'Đang chuẩn bị xử lý...' : 'Vuốt nút sang phải để xác nhận'}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SwipeConfirmationModal;