import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Check, Heart, PiggyBank, Unlock, UnlockIcon, FilePen, FilePlus } from 'lucide-react';
import SwipeToConfirm from './SwipeToConfirm';
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
  
  // Get icon component based on type
  const getIconComponent = () => {
    // If custom icon is provided, extract the component from it
    if (icon && React.isValidElement(icon)) {
      return icon.type;
    }
    
    switch(type) {
      case 'warning':
        return AlertTriangle;
      case 'danger':
        return AlertTriangle;
      case 'success':
        return Check;
      case 'pink':
        return PiggyBank;
      case 'unlock': 
        return UnlockIcon;
      case 'update':
        return FilePen;
      case 'add':
        return FilePlus;
      case 'withdrawal':
        return AlertTriangle; // Add withdrawal type
      default:
        return AlertTriangle;
    }
  };

  // Get liquid glass colors based on type
  const getLiquidGlassTheme = () => {
    switch(type) {
      case 'warning':
        return {
          accent: 'from-amber-400/20 to-orange-500/20',
          accentSolid: 'text-amber-500',
          glow: 'shadow-amber-500/20',
          border: 'border-amber-200/30',
          bg: 'bg-amber-50/10'
        };
      case 'danger':
        return {
          accent: 'from-red-400/20 to-pink-500/20',
          accentSolid: 'text-red-500',
          glow: 'shadow-red-500/20',
          border: 'border-red-200/30',
          bg: 'bg-red-50/10'
        };
      case 'success':
        return {
          accent: 'from-emerald-400/20 to-green-500/20',
          accentSolid: 'text-emerald-500',
          glow: 'shadow-emerald-500/20',
          border: 'border-emerald-200/30',
          bg: 'bg-emerald-50/10'
        };
      case 'pink':
        return {
          accent: 'from-pink-400/20 to-rose-500/20',
          accentSolid: 'text-pink-500',
          glow: 'shadow-pink-500/20',
          border: 'border-pink-200/30',
          bg: 'bg-pink-50/10'
        };
      case 'unlock':
      case 'update':
      case 'add':
      case 'withdrawal':
        return {
          accent: 'from-blue-400/20 to-cyan-500/20',
          accentSolid: 'text-blue-500',
          glow: 'shadow-blue-500/20',
          border: 'border-blue-200/30',
          bg: 'bg-blue-50/10'
        };
      default:
        return {
          accent: 'from-slate-400/20 to-gray-500/20',
          accentSolid: 'text-slate-500',
          glow: 'shadow-slate-500/20',
          border: 'border-slate-200/30',
          bg: 'bg-slate-50/10'
        };
    }
  };

  // Get icon based on type with liquid glass styling
  const getIcon = () => {
    // If custom icon is provided, use it directly
    if (icon) return icon;
    
    const IconComponent = getIconComponent();
    const theme = getLiquidGlassTheme();
    
    return <IconComponent className={`h-6 w-6 ${theme.accentSolid} drop-shadow-sm`} />;
  };

  // Get background icon color based on type
  const getBackgroundIconColor = () => {
    const theme = getLiquidGlassTheme();
    switch(type) {
      case 'warning':
        return '#F59E0B';
      case 'danger':
        return '#EF4444';
      case 'success':
        return '#10B981';
      case 'pink':
        return '#EC4899';
      case 'unlock':
      case 'update':
      case 'add':
      case 'withdrawal':
        return '#3B82F6';
      default:
        return '#64748B';
    }
  };

  // Get spinner color based on type
  const getSpinnerColor = () => {
    return getBackgroundIconColor();
  };

  // Calculate background icon size and position based on details count
  const getBackgroundIconProps = () => {
    if (!confirmDetails) return null;
    
    const detailsCount = Object.keys(confirmDetails).length;
    
    // Only show background icon if details count >= 3
    if (detailsCount < 3) return null;
    
    // Calculate size and position based on details count
    let scale, translateY, translateX, opacity;
    
    if (detailsCount >= 6) {
      scale = 4;
      translateY = 40;
      translateX = 80;
      opacity = 0.07;
    } else if (detailsCount >= 5) {
      scale = 3;
      translateY = 30;
      translateX = 60;
      opacity = 0.07;
    } else if (detailsCount >= 4) {
      scale = 3.2;
      translateY = 25;
      translateX = 50;
      opacity = 0.07;
    } else { // detailsCount >= 3
      scale = 3;
      translateY = 20;
      translateX = 40;
      opacity = 0.07;
    }
    
    return {
      scale,
      translateY,
      translateX,
      opacity
    };
  };

  // Determine what content to show
  const shouldShowProcessing = showProcessing || (isProcessing && isCompleted);
  const backgroundIconProps = getBackgroundIconProps();
  const IconComponent = getIconComponent();
  const theme = getLiquidGlassTheme();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className={`
              relative w-full max-w-md mx-2 sm:mx-0
              bg-white/20 backdrop-blur-xl
              shadow-[inset_0_0_16px_8px_rgba(255,255,255,0.3)] 
              border-0 border-white/30 ${theme.border}
              rounded-t-3xl sm:rounded-3xl
              shadow-2xl 
              overflow-hidden z-[71]
              before:absolute before:inset-0 
              before:bg-gradient-to-br before:${theme.accent}
              before:opacity-60 before:pointer-events-none
            `}
            initial={{ 
              y: '100%', 
              scale: 0.9,
              opacity: 0,
              rotateX: 10
            }}
            animate={{ 
              y: 0, 
              scale: 1,
              opacity: 1,
              rotateX: 0
            }}
            exit={{ 
              y: '100%', 
              scale: 0.95,
              opacity: 0,
              rotateX: -5
            }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 25,
              layout: { 
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            onClick={(e) => e.stopPropagation()}
            layout
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Liquid Glass Overlay */}
            
            {/* Background Icon - Only show if confirmDetails has >= 3 items */}
            {backgroundIconProps && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <motion.div
                  className="transform"
                  style={{ 
                    color: getBackgroundIconColor(),
                    opacity: backgroundIconProps.opacity,
                    scale: backgroundIconProps.scale,
                    translateY: backgroundIconProps.translateY,
                    translateX: backgroundIconProps.translateX,
                    filter: 'blur(0.5px)'
                  }}
                  initial={{ 
                    opacity: 0,
                    scale: backgroundIconProps.scale * 0.7,
                    rotate: -10
                  }}
                  animate={{ 
                    opacity: backgroundIconProps.opacity,
                    scale: backgroundIconProps.scale,
                    rotate: 0
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.3
                  }}
                >
                  <IconComponent size={120} strokeWidth={1.8} />
                </motion.div>
              </div>
            )}

            {/* Header */}
            <motion.div 
              className="p-6 border-b border-white/30 flex items-center justify-between relative z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center">
                <motion.div 
                  className={`
                    mr-4 p-3 rounded-2xl
                    shadow-[inset_0_0_10px_6px_rgba(255,255,255,0.2)] 
                    bg-white/10
                    border border-white/20
                    ${theme.bg}
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {getIcon()}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800 tracking-wide drop-shadow-sm">
                  {title}
                </h3>
              </div>
              <motion.button 
                onClick={onClose}
                className={`
                  p-2 rounded-xl
                  bg-white/5 hover:bg-white/10
                                shadow-[inset_0_0_12px_8px_rgba(255,255,255,0.4)] 

                  transition-all duration-300
                  group
                `}
                disabled={isCompleted || isProcessing}
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <X size={18} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
              </motion.button>
            </motion.div>
            
            {/* Content Container */}
            <motion.div className="relative z-10">
              {shouldShowProcessing ? (
                // Processing state with loading spinner
                <motion.div
                  className="p-10 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <motion.div
                    className={`
                      p-4 rounded-2xl mb-6
                      bg-white/5 backdrop-blur-sm
                      border border-white/10
                    `}
                    animate={{ 
                      boxShadow: [
                        `0 0 20px ${getSpinnerColor()}20`,
                        `0 0 30px ${getSpinnerColor()}30`,
                        `0 0 20px ${getSpinnerColor()}20`
                      ]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <LoadingSpinner
                      size={56} 
                      color={getSpinnerColor()} 
                    />
                  </motion.div>
                  <motion.p 
                    className="text-gray-700 text-center font-medium tracking-wide drop-shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    Sweet đang xử lý, sẽ xong ngay thôi...
                  </motion.p>
                </motion.div>
              ) : (
                // Normal state with description and swipe component  
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.p 
                    className="text-gray-700 mb-8 text-center leading-relaxed drop-shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {description}
                  </motion.p>
                  
                  {/* Display confirmation details if provided */}
                  {confirmDetails && (
                    <motion.div 
                      className={`
                        rounded-3xl pt-3 p-5 mb-8 relative
                        bg-white/5 
                        shadow-[inset_0_0_8px_4px_rgba(255,255,255,0.2)] 

                        ${theme.bg}
                      `}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
                      {Object.entries(confirmDetails).map(([label, value], index) => (
                        <motion.div 
                          key={label} 
                          className="flex justify-between items-center py-2 first:pt-0 last:pb-0 relative z-10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                        >
                          <span className="text-gray-500 font-medium">{label}:</span>
                          <span className="font-semibold text-gray-700 tracking-wide drop-shadow-sm">{value}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className="flex justify-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <SwipeToConfirm 
                      onComplete={handleConfirmComplete}
                      text={isCompleted ? 'Đã xác nhận!' : confirmText}
                      disabled={isCompleted || isProcessing}
                      type={type}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="text-sm text-gray-600 text-center font-normal drop-shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    {isCompleted ? (
                      <motion.span
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-gray-700"
                      >
                        Đang chuẩn bị xử lý...
                      </motion.span>
                    ) : (
                      'Vuốt nút sang phải để xác nhận'
                    )}
                  </motion.div>
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