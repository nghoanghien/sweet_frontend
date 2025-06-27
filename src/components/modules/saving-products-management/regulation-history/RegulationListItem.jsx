import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, TrendingUp, User, Ban, Eye, ChevronRight } from 'lucide-react';

const RegulationListItem = ({
  regulation,
  onClick,
  isActive = false,
  onCancelClick,
  canCancel,
  onViewDetail,
  index = 0 // For stagger animation
}) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) {
      return `${regulation.createdAt} (Ngay lập tức)`;
    }
    return dateString;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status info - same logic as card
  const getStatusInfo = () => {
    if (regulation.isCancelled) {
      return {
        label: 'Đã hủy',
        color: 'bg-red-500',
        textColor: 'text-red-900'
      };
    }
    
    if (!regulation.applicationDate) {
      return {
        label: 'Đã áp dụng',
        color: 'bg-green-500',
        textColor: 'text-green-900'
      };
    }
    
    const [day, month, year] = regulation.applicationDate.split('/').map(Number);
    const applicationDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (applicationDate > today) {
      return {
        label: 'Chờ áp dụng',
        color: 'bg-amber-500',
        textColor: 'text-amber-900'
      };
    }
    
    return {
      label: 'Đã áp dụng',
      color: 'bg-green-500',
      textColor: 'text-green-900'
    };
  };

  // Get tag color for savings type
  const getSavingsTypeColor = (typeId) => {
    const colors = {
      1: { bg: 'bg-blue-100', text: 'text-blue-700' },
      2: { bg: 'bg-purple-100', text: 'text-purple-700' },
      default: { bg: 'bg-gray-100', text: 'text-gray-700' }
    };
    
    return colors[typeId] || colors.default;
  };

  const status = getStatusInfo();

  // Animation variants
  const listItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0, 
      x: 50, 
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={listItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-[0_6px_32px_rgba(0,170,255,0.12)] border-2 overflow-hidden cursor-pointer
        transition-all duration-200 relative group
        ${isActive ? 'ring-2 ring-indigo-500 border-indigo-300' : 'hover:shadow-[0_8px_40px_rgba(0,170,255,0.16)] border-blue-100'}
      `}
    >
      
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex-1 flex items-center space-x-4">
            {/* ID Circle - inspired by card design */}
            <motion.div 
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
            >
              <span className="text-white font-bold text-sm sm:text-base">
                #{regulation.id.replace('reg', '')}
              </span>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Top row: Application date and creator */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <motion.div 
                  className="flex items-center text-sm sm:text-base font-semibold text-blue-800"
                >
                  <Calendar size={16} className="mr-2 text-indigo-600" />
                  {regulation.applicationDate 
                    ? `Áp dụng: ${regulation.applicationDate}` 
                    : `Áp dụng: ${formatDate(null)}`}
                </motion.div>
                
                {/* Creator info */}
                <motion.div 
                  className="flex items-center mt-1 sm:mt-0 text-sm text-blue-700"
                >
                  <div className="w-5 h-5 bg-indigo-100 rounded-full mr-2 flex items-center justify-center">
                    <User size={12} className="text-indigo-700" />
                  </div>
                  <span className="font-medium truncate max-w-[120px]" title={regulation.creator.name}>
                    {regulation.creator.name}
                  </span>
                </motion.div>
              </div>

              {/* Middle row: Key metrics */}
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <motion.div 
                  className="flex items-center text-sm"
                >
                  <DollarSign size={14} className="mr-1 text-indigo-600" />
                  <span className="text-gray-600 mr-1">Tối thiểu:</span>
                  <span className="font-bold text-blue-900">{formatCurrency(regulation.minimumDeposit)}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center text-sm"
                >
                  <TrendingUp size={14} className="mr-1 text-indigo-600" />
                  <span className="text-gray-600 mr-1">Không kỳ hạn:</span>
                  <span className="font-bold text-blue-900">{regulation.noTermRate}%</span>
                </motion.div>
              </div>

              {/* Bottom row: Savings types */}
              <motion.div 
                className="flex flex-wrap gap-1.5"
              >
                {regulation.savingsTypes.map(type => {
                  const colorClasses = getSavingsTypeColor(type.id);
                  return (
                    <span 
                      key={type.id} 
                      className={`${colorClasses.bg} ${colorClasses.text} text-xs px-2 py-1 rounded-full font-semibold shadow-sm border border-blue-100`}
                    >
                      {type.name}
                    </span>
                  );
                })}
              </motion.div>

              {/* Description if exists */}
              {regulation.description && (
                <motion.div 
                  className="mt-2 text-sm text-blue-600 italic line-clamp-1" 
                  title={regulation.description}
                >
                  {regulation.description}
                </motion.div>
              )}
            </div>
          </div>

          {/* Right section: Status and actions */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Status badge */}
            <motion.div 
              className={`px-3 py-1 rounded-full text-xs font-bold shadow-md border-2 border-white ${status.color} ${status.textColor} drop-shadow`}
            >
              {status.label}
            </motion.div>

            {/* Action buttons */}
            <div className="flex items-center space-x-1">
              {canCancel && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onCancelClick) onCancelClick(regulation);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-xl shadow-lg text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors shadow-sm border border-gray-200"
                  aria-label="Cancel regulation"
                >
                  <Ban size={22} />
                </motion.button>
              )}

              {/* View detail button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onViewDetail) onViewDetail(regulation);
                }}
                className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-100 transition-colors shadow-sm border border-indigo-200"
                aria-label="View details"
              >
                <Eye size={16} />
              </motion.button>

              {/* Chevron for main click action */}
              <motion.div
                className="p-1 text-gray-400 group-hover:text-indigo-600 transition-colors"
                animate={{ x: isActive ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={18} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
      />
    </motion.div>
  );
};

export default RegulationListItem;