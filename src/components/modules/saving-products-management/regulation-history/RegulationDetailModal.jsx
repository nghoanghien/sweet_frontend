import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, DollarSign, TrendingUp, BookOpen, Check, User, Clock, Ban, Download, ChevronDown, ChevronUp } from 'lucide-react';
import SavingsTypeToggle from '../interest-rates/SavingsTypeToggle';
import InterestRateTable from '../interest-rates/InterestRateTable';
import Skeleton from '@/components/ui/custom/Skeleton';
import SavingsTypeToggleShimmer from '@/components/ui/custom/shimmer-types/SavingsTypeToggleShimmer';
import InterestRateTableShimmer from '@/components/ui/custom/shimmer-types/InterestRateTableShimmer';

const RegulationDetailModal = ({
  isOpen,
  onClose,
  regulation,
  onCancel,
  canCancel = true
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSavingsType, setActiveSavingsType] = useState(
    regulation?.savingsTypes?.length > 0 ? regulation.savingsTypes[0].id : null
  );
  const [showAllDetails, setShowAllDetails] = useState(false);
  
  // Loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isOpen]);
  
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
    if (!regulation.isActive) {
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
            layoutId={`regulation-card-${regulation.id}`}
            className="relative bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,170,255,0.13)] border-2 border-blue-100 mx-3 md:mx-0 w-full max-w-4xl max-h-[96vh] flex flex-col overflow-hidden"
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div 
              layoutId={`regulation-header-${regulation.id}`}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 flex items-center justify-between rounded-t-3xl shadow-[0_4px_24px_rgba(0,170,255,0.10)] sticky top-0 z-10"
            >
              <motion.div
                layoutId={`regulation-title-${regulation.id}`}
                className="text-white text-lg sm:text-2xl font-bold flex items-center gap-2"
              >
                <BookOpen size={24} className="opacity-90 drop-shadow" />
                <motion.span 
                  layoutId={`regulation-id-${regulation.id}`}
                  className="truncate"
                >
                  Quy định #{regulation.id.replace('reg', '')}
                </motion.span>
              </motion.div>
              <div className="flex items-center gap-2">
                {canCancel && regulation.isActive && (
                  <motion.button
                    layoutId={`regulation-cancel-button-${regulation.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onCancel) onCancel(regulation);
                    }}
                    className="px-4 py-2 bg-white/50 text-gray-600 rounded-xl shadow-[0_4px_20px_rgba(239,68,68,0.13)] font-semibold tracking-wide flex items-center gap-2"
                  >
                    <Ban size={18} />
                    <span className='hidden sm:flex'>Hủy quy định</span>
                  </motion.button>
                )}
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors ml-2"
                  tabIndex={0}
                >
                  <X size={24} className="text-white/90" />
                </button>
              </div>
            </motion.div>
            
            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-6 max-h-[calc(96vh-110px)]">
              {/* Status indicator */}
              <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Skeleton isLoading={isLoading} width="w-28" height="h-8" round='3xl' className="inline-block rounde-3xl">
                  <motion.span 
                    layoutId={`regulation-status-${regulation.id}`}
                    className={`px-4 py-1.5 rounded-full text-base font-bold shadow-sm ${status.color}`}
                  >
                    {status.label}
                  </motion.span>
                  </Skeleton>
                </div>
                <motion.div 
                  layoutId={`regulation-creator-${regulation.id}`}
                  className="flex items-center text-base text-blue-700 font-semibold"
                >
                  <User size={18} className="mr-2" />
                  Người tạo: <Skeleton isLoading={isLoading} width="w-24" height="h-5" className="inline-block ml-1">
                    {regulation.creator.name}
                  </Skeleton>
                </motion.div>
              </div>
              
              {/* General information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Application date */}
                <div className="bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)]">
                  <div className="flex items-center mb-2">
                    <Calendar className="text-indigo-600 mr-2" size={20} />
                    <h3 className="text-sm font-bold text-gray-800">Ngày áp dụng</h3>
                  </div>
                  <motion.p 
                    layoutId={`regulation-date-${regulation.id}`}
                    className="text-lg font-bold text-blue-900"
                  >
                    <Skeleton isLoading={isLoading} width="w-32" height="h-6">
                      {formatDate(regulation.applicationDate)}
                    </Skeleton>
                  </motion.p>
                </div>
                {/* Minimum deposit */}
                <div className="bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)]">
                  <div className="flex items-center mb-2">
                    <DollarSign className="text-indigo-600 mr-2" size={20} />
                    <h3 className="text-sm font-bold text-gray-800">Số tiền gửi tối thiểu</h3>
                  </div>
                  <motion.p 
                    layoutId={`regulation-min-deposit-${regulation.id}`}
                    className="text-lg font-bold text-blue-900"
                  >
                    <Skeleton isLoading={isLoading} width="w-28" height="h-6">
                      {formatCurrency(regulation.minimumDeposit)}
                    </Skeleton>
                  </motion.p>
                </div>
                {/* No-term rate */}
                <div className="bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)]">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="text-indigo-600 mr-2" size={20} />
                    <h3 className="text-sm font-bold text-gray-800">Lãi suất không kỳ hạn</h3>
                  </div>
                  <motion.p 
                    layoutId={`regulation-no-term-rate-${regulation.id}`}
                    className="text-lg font-bold text-blue-900"
                  >
                    <Skeleton isLoading={isLoading} width="w-16" height="h-6">
                      {regulation.noTermRate}%
                    </Skeleton>
                  </motion.p>
                </div>
              </div>
              {/* Description */}
              {regulation.description && (
                <motion.div 
                  layoutId={`regulation-description-${regulation.id}`}
                  className="mb-6 text-base text-blue-700 italic bg-blue-50/60 rounded-2xl p-4 border border-blue-100 shadow-sm"
                >
                  <Skeleton isLoading={isLoading} width="w-full" height="h-5">
                    {regulation.description}
                  </Skeleton>
                </motion.div>
              )}
              
              {/* Savings type toggle */}
              <motion.div 
                className="mb-4 flex justify-center"
              >
                {isLoading ? (
                  <SavingsTypeToggleShimmer />
                ) : (
                  regulation.savingsTypes.length > 1 ? (
                    <SavingsTypeToggle
                      savingsTypes={regulation.savingsTypes}
                      activeSavingsType={activeSavingsType}
                      onToggle={setActiveSavingsType}
                    />
                  ) : regulation.savingsTypes.map(type => (
                    <span 
                      key={type.id} 
                      className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-semibold shadow-sm border border-blue-100"
                    >
                      <Skeleton isLoading={isLoading} width="w-32" height="h-5" className="inline-block">
                        {type.name}
                      </Skeleton>
                    </span>
                  ))
                )}
              </motion.div>
              
              {/* Interest rate table */}
              {activeSavingsTypeDetails && (
                <div>
                  {isLoading ? (
                    <InterestRateTableShimmer />
                  ) : (
                    <InterestRateTable
                      savingsType={activeSavingsTypeDetails.name}
                      interestRates={activeSavingsTypeDetails.interestRates}
                      paymentFrequencies={regulation.paymentFrequencies}
                      terms={activeSavingsTypeDetails.terms}
                      disabledFrequencies={activeSavingsTypeDetails.disabledFrequencies || []}
                      isEditing={false}
                      onRateChange={() => {}}
                      onAddTerm={() => {}}
                      onRemoveTerm={() => {}}
                      readOnly={true}
                    />
                  )}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <motion.div 
              layoutId={`regulation-footer-${regulation.id}`}
              className="bg-gray-50 px-6 py-4 flex justify-end border-t"
            >
              <motion.button
                layoutId={`regulation-view-button-${regulation.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 font-semibold text-gray-600 border border-gray-300 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                Đóng
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegulationDetailModal;