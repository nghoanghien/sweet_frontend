import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, DollarSign, TrendingUp, BookOpen, Check, User, Clock, Ban, Download, ChevronDown, ChevronUp } from 'lucide-react';
import SavingsTypeToggle from '../interest-rates/SavingsTypeToggle';
import InterestRateTable from '../interest-rates/InterestRateTable';

const RegulationDetailModal = ({
  isOpen,
  onClose,
  regulation,
  onCancel,
  canCancel = true
}) => {
  const [activeSavingsType, setActiveSavingsType] = useState(
    regulation?.savingsTypes?.length > 0 ? regulation.savingsTypes[0].id : null
  );
  const [showAllDetails, setShowAllDetails] = useState(false);
  
  if (!regulation) return null;
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) {
      // For immediate application, show the creation date with "Today" indicator
      const creationDate = regulation.createdAt || 'Không xác định';
      // Check if creation date is today
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const todayFormatted = `${day}/${month}/${year}`;
      
      if (creationDate === todayFormatted) {
        return `${todayFormatted} (Hôm nay)`;
      }
      return creationDate;
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
        color: 'bg-red-100 text-red-800'
      };
    }
    
    if (!regulation.applicationDate) {
      return {
        label: 'Đã áp dụng',
        color: 'bg-green-100 text-green-800'
      };
    }
    
    const [day, month, year] = regulation.applicationDate.split('/').map(Number);
    const applicationDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (applicationDate > today) {
      return {
        label: 'Chờ áp dụng',
        color: 'bg-amber-100 text-amber-800'
      };
    }
    
    return {
      label: 'Đã áp dụng',
      color: 'bg-green-100 text-green-800'
    };
  };
  
  // Find active savings type details
  const activeSavingsTypeDetails = regulation.savingsTypes.find(type => type.id === activeSavingsType);
  
  const status = getStatusInfo();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,170,255,0.13)] border-2 border-blue-100 w-full max-w-4xl max-h-[96vh] flex flex-col overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 flex items-center justify-between rounded-t-3xl shadow-[0_4px_24px_rgba(0,170,255,0.10)] sticky top-0 z-10">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-white text-lg sm:text-2xl font-bold flex items-center gap-2"
              >
                <BookOpen size={24} className="opacity-90 drop-shadow" />
                <span className="truncate">Quy định #{regulation.id.replace('reg', '')}</span>
              </motion.h2>
              <div className="flex items-center gap-2">
                {canCancel && !regulation.isCancelled && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancel();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl shadow-[0_4px_20px_rgba(239,68,68,0.13)] font-semibold tracking-wide flex items-center gap-2"
                  >
                    <Ban size={18} />
                    
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Download size={20} className="text-white/90" />
                </motion.button>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors ml-2"
                  tabIndex={0}
                >
                  <X size={24} className="text-white/90" />
                </button>
              </div>
            </div>
            
            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-6 max-h-[calc(96vh-110px)]">
              {/* Status indicator */}
              <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-base font-bold shadow-sm ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center text-base text-blue-700 font-semibold">
                  <User size={18} className="mr-2" />
                  Người tạo: {regulation.creator.name}
                </div>
              </div>
              
              {/* General information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Application date */}
                <div className="bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)]">
                  <div className="flex items-center mb-2">
                    <Calendar className="text-indigo-600 mr-2" size={20} />
                    <h3 className="text-sm font-bold text-gray-800">Ngày áp dụng</h3>
                  </div>
                  <p className="text-lg font-bold text-blue-900">
                    {formatDate(regulation.applicationDate)}
                  </p>
                </div>
                {/* Minimum deposit */}
                <div className="bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)]">
                  <div className="flex items-center mb-2">
                    <DollarSign className="text-indigo-600 mr-2" size={20} />
                    <h3 className="text-sm font-bold text-gray-800">Số tiền gửi tối thiểu</h3>
                  </div>
                  <p className="text-lg font-bold text-blue-900">
                    {formatCurrency(regulation.minimumDeposit)}
                  </p>
                </div>
                {/* No-term rate */}
                <div className="bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)]">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="text-indigo-600 mr-2" size={20} />
                    <h3 className="text-sm font-bold text-gray-800">Lãi suất không kỳ hạn</h3>
                  </div>
                  <p className="text-lg font-bold text-blue-900">
                    {regulation.noTermRate}%
                  </p>
                </div>
              </div>
              {/* Description */}
              {regulation.description && (
                <div className="mb-6 text-base text-blue-700 italic bg-blue-50/60 rounded-2xl p-4 border border-blue-100 shadow-sm">
                  {regulation.description}
                </div>
              )}
              
              {/* Savings type toggle */}
              {regulation.savingsTypes.length > 1 && (
                <div className="mb-4 flex justify-center">
                  <SavingsTypeToggle
                    savingsTypes={regulation.savingsTypes}
                    activeSavingsType={activeSavingsType}
                    onToggle={setActiveSavingsType}
                  />
                </div>
              )}
              
              {/* Interest rate table */}
              {activeSavingsTypeDetails && (
                <div>
                  <InterestRateTable
                    savingsType={activeSavingsTypeDetails.name}
                    interestRates={activeSavingsTypeDetails.interestRates}
                    paymentFrequencies={regulation.paymentFrequencies}
                    terms={activeSavingsTypeDetails.terms}
                    isEditing={false}
                    onRateChange={() => {}}
                    onAddTerm={() => {}}
                    onRemoveTerm={() => {}}
                    readOnly={true}
                  />
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Đóng
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegulationDetailModal; 