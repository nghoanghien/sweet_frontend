import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, DollarSign, TrendingUp, Star, AlertCircle, Ban } from 'lucide-react';

const RegulationCard = ({ regulation, onClick, isActive, onCancelClick, canCancel }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
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
  
  // Get tag color for a savings type
  const getSavingsTypeColor = (typeId) => {
    const colors = {
      standard: { bg: 'bg-blue-100', text: 'text-blue-700' },
      flexible: { bg: 'bg-purple-100', text: 'text-purple-700' },
      default: { bg: 'bg-gray-100', text: 'text-gray-700' }
    };
    
    return colors[typeId] || colors.default;
  };
  
  const status = getStatusInfo();
  
  return (
    <motion.div 
      className={`bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,170,255,0.13)] border-2 border-blue-100 overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-200 ${isActive ? 'ring-2 ring-indigo-500 border-indigo-300' : 'hover:shadow-lg border-blue-100'}`}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {/* Header Section with gradient background */}
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 h-36 w-full flex items-center justify-center shadow-[0_4px_32px_rgba(0,170,255,0.10)]">
          <div className="text-center text-white px-3">
            <h3 className="text-2xl font-bold mb-1 drop-shadow">Quy định #{regulation.id.replace('reg', '')}</h3>
            <p className="text-white/90 text-base font-medium">
              {regulation.applicationDate 
                ? `Áp dụng: ${regulation.applicationDate}` 
                : `Áp dụng: ${formatDate(null)} (Ngay lập tức)`}
            </p>
          </div>
        </div>
        
        {/* Cancel button - show only for non-cancelled regulations */}
        {canCancel && (
          <motion.button
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
        <div className={`absolute bottom-0 right-0 transform translate-y-1/2 mr-4 px-4 py-2 rounded-full text-base font-bold shadow-lg border-2 border-white ${status.color} ${status.textColor} drop-shadow`}> 
          {status.label}
        </div>
      </div>

      {/* Creator Info - Overlapping header and content */}
      <div className="relative flex items-center bg-white pl-3 pr-4 py-2 rounded-2xl shadow-md mt-[-28px] ml-4 w-fit z-10 max-w-[calc(100%-1rem)] border border-blue-100">
        <div className="w-8 h-8 bg-indigo-100 text-indigo-800 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
          <User size={16} />
        </div>
        <span className="text-base font-semibold text-blue-800 truncate" title={regulation.creator.name}>
          {regulation.creator.name}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5">
        {/* Savings type tags */}
        <div className="flex flex-wrap gap-2 mb-3">
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
        </div>
        
        {/* Regulation details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-600 flex items-center">
              <DollarSign size={15} className="mr-2 text-indigo-600" />
              Tiền gửi tối thiểu:
            </span>
            <span className="font-bold text-blue-900">{formatCurrency(regulation.minimumDeposit)}</span>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-600 flex items-center">
              <TrendingUp size={15} className="mr-2 text-indigo-600" />
              Lãi suất không kỳ hạn:
            </span>
            <span className="font-bold text-blue-900">{regulation.noTermRate}%</span>
          </div>
        </div>
        {/* Description */}
        {regulation.description && (
          <div className="mt-4 text-base text-blue-700 italic bg-blue-50/60 rounded-2xl p-3 border border-blue-100 shadow-sm line-clamp-2" title={regulation.description}>
            {regulation.description}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-t border-blue-100">
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 text-base text-center text-indigo-700 hover:text-indigo-900 font-bold rounded-xl bg-white shadow-md border border-blue-100 transition-all"
        >
          Xem chi tiết
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RegulationCard; 