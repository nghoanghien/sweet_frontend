import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle, X, Info } from 'lucide-react';

const RegulationNotification = ({
  isVisible,
  onClose,
  type = 'success', // 'success', 'error', 'info'
  message,
  details = null,
  autoHideDuration = 5000,
}) => {
  // Base types and colors
  const typeConfig = {
    success: {
      icon: <Check size={20} />,
      gradient: 'from-green-600 to-emerald-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100',
      progressBar: 'bg-gradient-to-r from-green-600 to-emerald-500',
    },
    error: {
      icon: <AlertTriangle size={20} />,
      gradient: 'from-red-600 to-orange-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-100',
      progressBar: 'bg-gradient-to-r from-red-600 to-orange-500',
    },
    info: {
      icon: <Info size={20} />,
      gradient: 'from-indigo-600 to-blue-500',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      progressBar: 'bg-gradient-to-r from-indigo-600 to-blue-500',
    }
  };
  
  const config = typeConfig[type] || typeConfig.info;

  // Set auto-hide timeout
  React.useEffect(() => {
    let timer;
    
    if (isVisible && autoHideDuration) {
      timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoHideDuration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed z-50 left-0 right-0 bottom-4 sm:bottom-6 flex justify-center items-end px-2 pointer-events-none"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r ${config.gradient} p-[2px] shadow-[0_8px_32px_rgba(34,197,94,0.13)] w-full max-w-md pointer-events-auto`}
          >
            <div className="relative rounded-[calc(1.5rem-2px)] bg-white p-5 shadow-inner flex flex-col">
              <div className="flex items-start gap-4">
                {/* Icon with background */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className={`flex-shrink-0 h-12 w-12 ${config.bgColor} rounded-full flex items-center justify-center ${config.textColor} shadow-[0_4px_16px_rgba(34,197,94,0.10)]`}
                >
                  {config.icon}
                </motion.div>
                
                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5 truncate">{message}</h4>
                  
                  {details && (
                    <div className="mt-1 text-sm text-gray-600 space-y-1">
                      {typeof details === 'string' ? (
                        <p>{details}</p>
                      ) : Array.isArray(details) ? (
                        details.map((detail, index) => (
                          <p key={index}>{detail}</p>
                        ))
                      ) : (
                        Object.entries(details).map(([key, value]) => (
                          <p key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </p>
                        ))
                      )}
                    </div>
                  )}
                </div>
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full ml-2"
                  aria-label="Đóng thông báo"
                  tabIndex={0}
                >
                  <X size={22} />
                </button>
              </div>
              
              {/* Progress bar for auto-hide */}
              {autoHideDuration > 0 && (
                <motion.div 
                  className={`absolute left-0 bottom-0 h-1 ${config.progressBar} rounded-b-2xl`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: autoHideDuration / 1000,
                    ease: "linear"
                  }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegulationNotification; 