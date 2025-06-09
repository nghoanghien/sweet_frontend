import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, TrendingUp, User, Clock, Check, Clock3, ChevronRight, Ban } from 'lucide-react';

const RegulationListItem = ({
  regulation,
  onClick,
  isActive = false,
  onCancelClick,
  canCancel
}) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) {
      // For immediate applications, return the creation date with "Ngay lập tức" indicator
      return `${regulation.createdAt} (Ngay lập tức)`;
    }
    
    const [day, month, year] = dateString.split('/');
    return `${day}/${month}/${year}`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Determine status
  const getStatusInfo = () => {
    if (regulation.isCancelled) {
      return {
        label: 'Đã hủy',
        color: 'bg-red-100 text-red-800',
        icon: <Ban size={14} className="mr-1" />
      };
    }
    
    if (!regulation.applicationDate) {
      // Immediate application
      return {
        label: 'Đã áp dụng',
        color: 'bg-green-100 text-green-800',
        icon: <Check size={14} className="mr-1" />
      };
    }
    
    const [day, month, year] = regulation.applicationDate.split('/').map(Number);
    const applicationDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (applicationDate <= today) {
      return {
        label: 'Đã áp dụng',
        color: 'bg-green-100 text-green-800',
        icon: <Check size={14} className="mr-1" />
      };
    } else {
      return {
        label: 'Chờ áp dụng',
        color: 'bg-amber-100 text-amber-800',
        icon: <Clock3 size={14} className="mr-1" />
      };
    }
  };
  
  const statusInfo = getStatusInfo();

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`
        bg-gradient-to-br from-blue-50/80 to-white rounded-2xl border-2 shadow-[0_4px_24px_rgba(0,170,255,0.08)] overflow-hidden cursor-pointer
        transition-all duration-200 relative
        ${isActive ? 'ring-2 ring-indigo-500 border-indigo-300' : 'hover:shadow-lg border-blue-100'}
      `}
    >
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start">
        {/* Left section with status and info */}
        <div className="flex-1 w-full">
          {/* Status and header row */}
          <div className="flex justify-between items-center mb-3">
            <span className={`text-xs px-3 py-1 rounded-full flex items-center font-bold shadow-sm ${statusInfo.color}`}>
              {statusInfo.icon}
              {statusInfo.label}
            </span>
            
            {/* ID and creation info for mobile */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>#{regulation.id.replace('reg', '')}</span>
              <span>·</span>
              <span>{regulation.createdAt}</span>
            </div>
          </div>
          
          {/* Core info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            {/* Application date */}
            <div className="flex items-center">
              <Calendar size={16} className="text-indigo-600 mr-2 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 hidden sm:block">Ngày áp dụng</div>
                <div className="font-medium flex sm:block items-center">
                  <span className="text-gray-500 sm:hidden mr-1">Áp dụng:</span>
                  {formatDate(regulation.applicationDate)}
                </div>
              </div>
            </div>
            
            {/* Minimum deposit */}
            <div className="flex items-center">
              <DollarSign size={16} className="text-indigo-600 mr-2 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 hidden sm:block">Số tiền gửi tối thiểu</div>
                <div className="font-medium flex sm:block items-center">
                  <span className="text-gray-500 sm:hidden mr-1">Tối thiểu:</span>
                  {formatCurrency(regulation.minimumDeposit)}
                </div>
              </div>
            </div>
            
            {/* No-term rate */}
            <div className="flex items-center">
              <TrendingUp size={16} className="text-indigo-600 mr-2 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 hidden sm:block">Lãi suất không kỳ hạn</div>
                <div className="font-medium flex sm:block items-center">
                  <span className="text-gray-500 sm:hidden mr-1">Không kỳ hạn:</span>
                  {regulation.noTermRate}%
                </div>
              </div>
            </div>
          </div>
          
          {/* Creator info - only for larger screens */}
          <div className="hidden sm:flex items-center mt-3 text-sm text-blue-700 font-semibold">
            <User size={14} className="mr-1.5" />
            <span className="truncate max-w-[200px]">{regulation.creator.name}</span>
          </div>
          {/* Description */}
          {regulation.description && (
            <div className="mt-2 text-sm text-blue-600 italic line-clamp-2" title={regulation.description}>
              {regulation.description}
            </div>
          )}
        </div>
        
        {/* Right section with action button */}
        <div className="flex items-center gap-2 mt-3 sm:mt-0 sm:ml-4">
          {canCancel && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onCancelClick) onCancelClick(regulation);
              }}
              className="p-2 rounded-xl text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors flex items-center shadow-sm border border-gray-100"
              aria-label="Cancel regulation"
            >
              <Ban size={16} className="mr-1" />
              <span className="text-sm">Hủy</span>
            </button>
          )}
          
          <ChevronRight size={18} className="text-gray-400" />
        </div>
      </div>
    </motion.div>
  );
};

export default RegulationListItem; 