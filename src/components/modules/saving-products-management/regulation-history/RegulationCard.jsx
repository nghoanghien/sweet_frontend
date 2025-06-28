import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, DollarSign, TrendingUp, Ban, Eye } from 'lucide-react';

const RegulationCard = ({ regulation, onClick, isActive, onCancelClick, canCancel, onViewDetail }) => {
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) {
      // For immediate applications, return the creation date
      return regulation.createdAt || 'Không xác định';
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
  
  // Get status info
  const getStatusInfo = () => {
    if (!regulation.isActive) {
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
  
  // Get tag color for a savings type
  const getSavingsTypeColor = (typeId) => {
    const colors = {
      1: { bg: 'bg-blue-100', text: 'text-blue-700' },     // standard - có kỳ hạn
      2: { bg: 'bg-purple-100', text: 'text-purple-700' },  // flexible - không kỳ hạn
      default: { bg: 'bg-gray-100', text: 'text-gray-700' }
    };
    
    return colors[typeId] || colors.default;
  };
  
  const status = getStatusInfo();
  
  return (
    <motion.div 
      layoutId={`regulation-card-${regulation.id}`}
      className={`bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,170,255,0.13)] border-2 border-blue-100 overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-200 ${isActive ? 'ring-2 ring-indigo-500 border-indigo-300' : 'hover:shadow-lg border-blue-100'}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 15 }}
      onClick={onClick}
    >
      {/* Header Section with gradient background */}
      <motion.div 
        layoutId={`regulation-header-${regulation.id}`}
        className="relative"
        transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 15 }}
      >
        <motion.div 
          layoutId={`regulation-header-bg-${regulation.id}`}
          transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 15 }}
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 h-36 w-full flex items-center justify-center shadow-[0_4px_32px_rgba(0,170,255,0.10)]"
        >
          <motion.div 
            layoutId={`regulation-title-${regulation.id}`}
            className="text-center text-white px-3"
          >
            <motion.h3 
              layoutId={`regulation-id-${regulation.id}`}
              className="text-2xl font-bold mb-1 drop-shadow"
            >
              Quy định #{regulation.id.replace('reg', '')}
            </motion.h3>
            <motion.p 
              layoutId={`regulation-date-${regulation.id}`}
              className="text-white/90 text-base font-medium"
            >
              {regulation.applicationDate 
                ? `Áp dụng: ${regulation.applicationDate}` 
                : `Áp dụng: ${formatDate(null)} (Ngay lập tức)`}
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Cancel button - show only for non-cancelled regulations */}
        {canCancel && (
          <motion.button
            layoutId={`regulation-cancel-button-${regulation.id}`}
            aria-label="Cancel regulation"
            onClick={(e) => {
              e.stopPropagation();
              if (onCancelClick) onCancelClick(regulation);
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl hover:bg-red-100 hover:text-red-600 transition-colors shadow-lg"
          >
            <Ban size={20} className="text-gray-700 hover:text-red-600" />
          </motion.button>
        )}
        
        {/* Status badge - positioned bottom right of header */}
        <motion.div 
          className={`absolute bottom-0 right-0 transform translate-y-1/2 mr-4 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-semibold sm:font-bold shadow-lg border sm:border-2 border-white ${status.color} ${status.textColor} drop-shadow`}
        > 
          {status.label}
        </motion.div>
      </motion.div>

      {/* Creator Info - Overlapping header and content */}
      <motion.div 
        layoutId={`regulation-creator-${regulation.id}`}
        className="relative flex items-center bg-white pl-3 pr-3 sm:pr-4 py-2 rounded-2xl shadow-md mt-[-28px] ml-4 w-fit z-10 max-w-[calc(100%-1rem)] border border-blue-100"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 text-indigo-800 rounded-full mr-1 sm:mr-3 flex-shrink-0 flex items-center justify-center">
          <User size={16} />
        </div>
        <span className="text-sm sm:text-base font-semibold text-blue-800 truncate" title={regulation.creator.name}>
          {regulation.creator.name}
        </span>
      </motion.div>

      {/* Content Section */}
      <div className="flex-1 p-5">
        {/* Savings type tags */}
        <motion.div 
          layoutId={`regulation-savings-types-${regulation.id}`}
          className="flex flex-wrap gap-2 mb-3"
        >
          {regulation.savingsTypes.map(type => {
            const colorClasses = getSavingsTypeColor(type.id);
            return (
              <span 
                key={type.id} 
                className={`${colorClasses.bg} ${colorClasses.text} text-sm px-3 py-1 rounded-full font-semibold shadow-sm border border-blue-100`}
              >
                {type.name}
              </span>
            );
          })}
        </motion.div>
        
        {/* Regulation details */}
        <div className="space-y-3">
          <motion.div 
            layoutId={`regulation-min-deposit-${regulation.id}`}
            className="flex items-center justify-between text-base"
          >
            <span className="text-gray-600 flex items-center">
              <DollarSign size={15} className="mr-2 text-indigo-600" />
              Tiền gửi tối thiểu:
            </span>
            <span className="font-bold text-blue-900">{formatCurrency(regulation.minimumDeposit)}</span>
          </motion.div>
          <motion.div 
            layoutId={`regulation-no-term-rate-${regulation.id}`}
            className="flex items-center justify-between text-base"
          >
            <span className="text-gray-600 flex items-center">
              <TrendingUp size={15} className="mr-2 text-indigo-600" />
              Lãi suất không kỳ hạn:
            </span>
            <span className="font-bold text-blue-900">{regulation.noTermRate}%</span>
          </motion.div>
        </div>
        {/* Description */}
        {regulation.description && (
          <motion.div 
            layoutId={`regulation-description-${regulation.id}`}
            className="mt-4 text-base text-blue-700 italic bg-blue-50/60 rounded-2xl p-3 border border-blue-100 shadow-sm line-clamp-2" 
            title={regulation.description}
          >
            {regulation.description}
          </motion.div>
        )}
      </div>
      
      {/* Footer */}
      <motion.div 
        layoutId={`regulation-footer-${regulation.id}`}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-t border-blue-100"
      >
        <motion.button 
          layoutId={`regulation-view-button-${regulation.id}`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 text-base text-center text-indigo-700 hover:text-indigo-900 font-bold rounded-xl bg-white shadow-md border border-blue-100 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            if (onViewDetail) onViewDetail(regulation);
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <Eye size={18} />
            Xem chi tiết
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RegulationCard;