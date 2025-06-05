import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, DollarSign, TrendingUp, BookOpen, Check, User, ArrowLeftRight, Plus } from 'lucide-react';
import SwipeConfirmationModal from '../../ui/SwipeConfirmationModal';
import SavingsTypeToggle from './SavingsTypeToggle';
import InterestRateTable from './InterestRateTable';

const RegulationComparisonModal = ({
  isOpen,
  onClose,
  onConfirm,
  newRegulation,
  currentRegulation,
  changedFields = {},
  creator = { name: 'Người dùng hiện tại' }
}) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSavingsType, setActiveSavingsType] = useState(
    newRegulation && newRegulation.savingsTypes && newRegulation.savingsTypes.length > 0 
      ? newRegulation.savingsTypes[0].id 
      : null
  );
  
  // Track changes specifically for highlighting in tables
  const [oldTableHighlights, setOldTableHighlights] = useState({});
  const [newTableHighlights, setNewTableHighlights] = useState({});
  
  // Track added and removed savings types
  const [addedSavingsTypes, setAddedSavingsTypes] = useState([]);
  const [removedSavingsTypes, setRemovedSavingsTypes] = useState([]);
  
  // Handle regulation confirmation with processing state
  const handleConfirmRegulation = () => {
    // Set processing state to true
    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Call the original onConfirm function
        onConfirm();
        
        // Close confirmation modal after successful confirmation
        setConfirmModalOpen(false);
      } catch (error) {
        console.error('Error confirming regulation:', error);
        // In a real app, show error notification here
      } finally {
        // Reset processing state
        setIsProcessing(false);
      }
    }, 1500); // 1.5 second delay to simulate API call
  };
  
  // Set active savings type when newRegulation changes
  useEffect(() => {
    if (newRegulation && newRegulation.savingsTypes && newRegulation.savingsTypes.length > 0) {
      setActiveSavingsType(newRegulation.savingsTypes[0].id);
    }
  }, [newRegulation]);
  
  // Detect added and removed savings types
  useEffect(() => {
    if (!isOpen || !newRegulation || !currentRegulation) {
      setAddedSavingsTypes([]);
      setRemovedSavingsTypes([]);
      return;
    }
    
    // Get IDs of current and new savings types
    const currentTypeIds = currentRegulation.savingsTypes.map(type => type.id);
    const newTypeIds = newRegulation.savingsTypes.map(type => type.id);
    
    // Find added types (in new but not in current)
    const added = newRegulation.savingsTypes.filter(
      type => !currentTypeIds.includes(type.id)
    );
    
    // Find removed types (in current but not in new)
    const removed = currentRegulation.savingsTypes.filter(
      type => !newTypeIds.includes(type.id)
    );
    
    setAddedSavingsTypes(added);
    setRemovedSavingsTypes(removed);
  }, [isOpen, newRegulation, currentRegulation]);
  
  // Helper to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Ngày áp dụng: hôm nay';
    
    const [day, month, year] = dateString.split('/');
    return `Ngày áp dụng: ${day}/${month}/${year}`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Find active savings type details
  const activeNewSavingsTypeDetails = newRegulation?.savingsTypes?.find(type => type.id === activeSavingsType);
  
  // Find corresponding savings type in current regulation
  const activeCurrentSavingsTypeDetails = currentRegulation?.savingsTypes?.find(type => type.id === activeSavingsType);
  
  // Confirmation details for swipe confirmation modal
  const confirmDetails = {
    'Ngày áp dụng': newRegulation?.applicationDate 
      ? formatDate(newRegulation.applicationDate) 
      : 'Ngày áp dụng: hôm nay',
    'Số sản phẩm tiết kiệm': newRegulation?.savingsTypes?.length || 0,
    'Số tiền gửi tối thiểu': newRegulation ? formatCurrency(newRegulation.minimumDeposit) : '',
    'Lãi suất không kỳ hạn': newRegulation ? `${newRegulation.noTermRate}%` : ''
  };
  
  // Compare interest rates between current and new regulation to highlight changes
  useEffect(() => {
    if (!isOpen || !newRegulation || !currentRegulation || !activeCurrentSavingsTypeDetails || !activeNewSavingsTypeDetails) {
      setOldTableHighlights({});
      setNewTableHighlights({});
      return;
    }
    
    const oldHighlights = {};
    const newHighlights = {};
    
    // Check for changed, added, or removed interest rates
    activeCurrentSavingsTypeDetails.terms.forEach(term => {
      // Get corresponding new term (if exists)
      const newTermExists = activeNewSavingsTypeDetails.terms.some(
        newTerm => newTerm.id === term.id
      );
      
      if (!newTermExists) {
        // Term has been removed - highlight every cell in the old table
        currentRegulation.paymentFrequencies.forEach(freq => {
          oldHighlights[`${term.id}-${freq.id}`] = true;
        });
        return;
      }
      
      // Term exists in both - check each frequency
      currentRegulation.paymentFrequencies.forEach(freq => {
        // Check if frequency has been removed or disabled in the new regulation
        const newFreqExists = newRegulation.paymentFrequencies.some(
          newFreq => newFreq.id === freq.id
        );
        
        const isFreqDisabled = newRegulation.disabledFrequencies && 
                              newRegulation.disabledFrequencies.includes(freq.id);
        
        if (!newFreqExists || isFreqDisabled) {
          // Frequency has been removed or disabled - highlight cell in old table
          oldHighlights[`${term.id}-${freq.id}`] = true;
          return;
        }
        
        // Both term and frequency exist in both tables - compare rates
        const oldRate = activeCurrentSavingsTypeDetails.interestRates.find(
          r => r.termId === term.id && r.frequencyId === freq.id
        )?.rate;
        
        const newRate = activeNewSavingsTypeDetails.interestRates.find(
          r => r.termId === term.id && r.frequencyId === freq.id
        )?.rate;
        
        // Different rates - highlight in both tables
        if (oldRate !== newRate) {
          oldHighlights[`${term.id}-${freq.id}`] = true;
          newHighlights[`${term.id}-${freq.id}`] = true;
        }
      });
    });
    
    // Check for new terms added
    activeNewSavingsTypeDetails.terms.forEach(term => {
      // Check if term is new
      const oldTermExists = activeCurrentSavingsTypeDetails.terms.some(
        oldTerm => oldTerm.id === term.id
      );
      
      if (!oldTermExists) {
        // New term added - highlight every cell in the new table
        newRegulation.paymentFrequencies.forEach(freq => {
          // Skip disabled frequencies
          if (newRegulation.disabledFrequencies && 
              newRegulation.disabledFrequencies.includes(freq.id)) {
            return;
          }
          newHighlights[`${term.id}-${freq.id}`] = true;
        });
        return;
      }
      
      // Check for new frequencies
      newRegulation.paymentFrequencies.forEach(freq => {
        // Skip disabled frequencies
        if (newRegulation.disabledFrequencies && 
            newRegulation.disabledFrequencies.includes(freq.id)) {
          return;
        }
        
        // Check if frequency is new
        const oldFreqExists = currentRegulation.paymentFrequencies.some(
          oldFreq => oldFreq.id === freq.id
        );
        
        if (!oldFreqExists) {
          // New frequency added - highlight cell in new table
          newHighlights[`${term.id}-${freq.id}`] = true;
        }
      });
    });
    
    setOldTableHighlights(oldHighlights);
    setNewTableHighlights(newHighlights);
  }, [isOpen, newRegulation, currentRegulation, activeCurrentSavingsTypeDetails, activeNewSavingsTypeDetails]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,170,255,0.13)] border-2 border-blue-100 w-full max-w-7xl max-h-[96vh] flex flex-col overflow-hidden"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', damping: 24 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 flex items-center justify-between rounded-t-3xl shadow-[0_4px_24px_rgba(0,170,255,0.10)]">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-white text-lg sm:text-2xl font-bold flex items-center gap-2"
                >
                  <BookOpen size={26} className="opacity-90 drop-shadow" />
                  <span className="truncate">Xác nhận thay đổi quy định lãi suất</span>
                </motion.h2>
                <button
                  onClick={e => { e.preventDefault(); e.stopPropagation(); onClose(); }}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors ml-2"
                  tabIndex={0}
                >
                  <X size={24} className="text-white/90" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-2 sm:p-6 max-h-[calc(96vh-110px)]">
                {/* Application info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {/* Application date */}
                  <div className={`bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border shadow-[0_4px_24px_rgba(0,170,255,0.08)] ${changedFields.applicationDate || changedFields.applicationType ? 'border-green-300 bg-green-50' : 'border-blue-100'}`}> <div className="flex items-center mb-2"> <Calendar className="text-indigo-600 mr-2 flex-shrink-0" size={20} /> <h3 className="text-sm font-semibold text-gray-800">Ngày áp dụng</h3> {(changedFields.applicationDate || changedFields.applicationType) && ( <span className="ml-2 text-green-600 text-xs font-bold">Mới</span> )} </div> <p className="text-lg font-bold text-gray-700"> {newRegulation?.applicationDate ? formatDate(newRegulation.applicationDate) : 'Ngày áp dụng: hôm nay'} </p> </div>
                  {/* Minimum deposit */}
                  <div className={`bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border shadow-[0_4px_24px_rgba(0,170,255,0.08)] ${changedFields.minimumDeposit ? 'border-green-300 bg-green-50' : 'border-blue-100'}`}> <div className="flex items-center mb-2"> <DollarSign className="text-indigo-600 mr-2 flex-shrink-0" size={20} /> <h3 className="text-sm font-semibold text-gray-800">Số tiền gửi tối thiểu</h3> {changedFields.minimumDeposit && ( <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">Thay đổi</span> )} </div> {changedFields.minimumDeposit ? ( <div className="flex items-center space-x-2"> <p className="text-base font-semibold line-through text-red-600">{formatCurrency(currentRegulation.minimumDeposit)}</p> <span className="text-gray-400">→</span> <p className="text-lg font-bold text-green-600">{formatCurrency(newRegulation.minimumDeposit)}</p> </div> ) : ( <p className="text-lg font-bold text-gray-700">{formatCurrency(newRegulation.minimumDeposit)}</p> )} </div>
                  {/* No-term rate */}
                  <div className={`bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border shadow-[0_4px_24px_rgba(0,170,255,0.08)] ${changedFields.noTermRate ? 'border-green-300 bg-green-50' : 'border-blue-100'}`}> <div className="flex items-center mb-2"> <TrendingUp className="text-indigo-600 mr-2 flex-shrink-0" size={20} /> <h3 className="text-sm font-semibold text-gray-800">Lãi suất không kỳ hạn</h3> {changedFields.noTermRate && ( <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">Thay đổi</span> )} </div> {changedFields.noTermRate ? ( <div className="flex items-center space-x-2"> <p className="text-base font-semibold line-through text-red-600">{currentRegulation.noTermRate}%</p> <span className="text-gray-400">→</span> <p className="text-lg font-bold text-green-600">{newRegulation.noTermRate}%</p> </div> ) : ( <p className="text-lg font-bold text-gray-700">{newRegulation.noTermRate}%</p> )} </div>
                </div>
                {/* Description compare */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"> <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 shadow-sm"> <div className="text-xs text-gray-500 mb-1 font-semibold">Mô tả quy định hiện tại</div> <div className="text-gray-700 italic min-h-[32px]">{currentRegulation?.description || <span className='text-gray-400'>Không có</span>}</div> </div> <div className="bg-green-50 p-4 rounded-2xl border border-green-200 shadow-sm"> <div className="text-xs text-gray-500 mb-1 font-semibold">Mô tả quy định mới</div> <div className="text-gray-700 italic min-h-[32px]">{newRegulation?.description || <span className='text-gray-400'>Không có</span>}</div> </div> </div>
                {/* Creator info */}
                <div className="bg-indigo-50 p-4 rounded-2xl mb-6 flex items-center border border-indigo-100 shadow-sm"> <User className="text-indigo-600 mr-2 flex-shrink-0" size={20} /> <p className="text-indigo-800 font-semibold">Người tạo quy định: {creator.name}</p> </div>
                {/* Savings Types Changes Summary */}
                {(addedSavingsTypes.length > 0 || removedSavingsTypes.length > 0) && ( <div className="mb-6"> <h3 className="text-lg font-bold text-gray-800 mb-3">Thay đổi loại tiết kiệm</h3> <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {addedSavingsTypes.length > 0 && ( <div className="bg-green-50 border border-green-200 rounded-2xl p-4 shadow-sm"> <h4 className="text-sm font-bold text-green-700 mb-2 flex items-center"> <Plus size={16} className="mr-2" /> Thêm loại tiết kiệm mới </h4> <ul className="space-y-2"> {addedSavingsTypes.map(type => ( <li key={type.id} className="text-sm text-green-600 flex items-center font-semibold"> <Check size={14} className="mr-1.5" /> {type.name} </li> ))} </ul> </div> )} {removedSavingsTypes.length > 0 && ( <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-sm"> <h4 className="text-sm font-bold text-red-700 mb-2 flex items-center"> <X size={16} className="mr-2" /> Xóa loại tiết kiệm </h4> <ul className="space-y-2"> {removedSavingsTypes.map(type => ( <li key={type.id} className="text-sm text-red-600 flex items-center font-semibold"> <X size={14} className="mr-1.5" /> {type.name} </li> ))} </ul> </div> )} </div> </div> )}
                {/* Savings type toggle */}
                {newRegulation.savingsTypes.length > 0 && ( <SavingsTypeToggle savingsTypes={newRegulation.savingsTypes} activeSavingsType={activeSavingsType} onToggle={setActiveSavingsType} /> )}
                {/* Interest rate tables comparison */}
                {activeNewSavingsTypeDetails && activeNewSavingsTypeDetails.terms.length > 0 && ( <div className="mt-4"> <div className="flex items-center justify-between mb-4"> <h3 className="text-lg font-bold text-gray-800">So sánh quy định lãi suất</h3> <div className="hidden sm:flex items-center text-sm text-gray-600"> <ArrowLeftRight size={16} className="mr-1" /> <span>Chuyển đổi loại tiết kiệm</span> </div> </div> <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"> {/* Current regulation table */} <div className="bg-white p-2 sm:p-4 rounded-2xl border border-red-100 shadow-[0_4px_24px_rgba(239,68,68,0.08)] overflow-x-auto"> <div className="mb-3 px-4 py-2 bg-red-50 rounded-lg border border-red-100"> <h3 className="text-sm font-bold text-red-700">Quy định hiện tại (thay đổi sẽ hiển thị màu đỏ)</h3> <p className="text-xs text-red-600 mt-1">Những dữ liệu được tô màu đỏ sẽ bị thay đổi hoặc xóa trong quy định mới</p> </div> {activeCurrentSavingsTypeDetails ? ( <InterestRateTable savingsType={activeCurrentSavingsTypeDetails.name} savingsTypeId={activeCurrentSavingsTypeDetails.id} terms={activeCurrentSavingsTypeDetails.terms} interestRates={activeCurrentSavingsTypeDetails.interestRates} paymentFrequencies={currentRegulation.paymentFrequencies} disabledFrequencies={[]} isEditing={false} readOnly={true} onRateChange={() => {}} onAddTerm={() => {}} onRemoveTerm={() => {}} highlightChanges={oldTableHighlights} highlightColor="red" /> ) : ( <div className="text-center py-8 text-gray-500"> {removedSavingsTypes.some(type => type.id === activeSavingsType) ? ( <div className="flex flex-col items-center"> <X size={40} className="text-red-400 mb-2" /> <p className="text-red-600 font-bold">Loại tiết kiệm này đã bị xóa</p> </div> ) : ( <div>Không có dữ liệu</div> )} </div> )} </div> {/* New regulation table */} <div className="bg-white p-2 sm:p-4 rounded-2xl border border-green-200 shadow-[0_4px_24px_rgba(34,197,94,0.08)] overflow-x-auto"> <div className="mb-3 px-4 py-2 bg-green-50 rounded-lg border border-green-100"> <h3 className="text-sm font-bold text-green-700">Quy định mới (thay đổi sẽ hiển thị màu xanh)</h3> <p className="text-xs text-green-600 mt-1">Những dữ liệu được tô màu xanh là dữ liệu mới được thêm vào hoặc thay đổi so với quy định cũ</p> </div> {activeNewSavingsTypeDetails ? ( <InterestRateTable savingsType={activeNewSavingsTypeDetails.name} savingsTypeId={activeNewSavingsTypeDetails.id} terms={activeNewSavingsTypeDetails.terms} interestRates={activeNewSavingsTypeDetails.interestRates} paymentFrequencies={newRegulation.paymentFrequencies} disabledFrequencies={newRegulation.disabledFrequencies || []} isEditing={false} readOnly={true} onRateChange={() => {}} onAddTerm={() => {}} onRemoveTerm={() => {}} highlightChanges={newTableHighlights} highlightColor="green" /> ) : ( <div className="text-center py-8 text-gray-500"> {addedSavingsTypes.some(type => type.id === activeSavingsType) ? ( <div className="flex flex-col items-center"> <Plus size={40} className="text-green-400 mb-2" /> <p className="text-green-600 font-bold">Loại tiết kiệm mới được thêm vào</p> </div> ) : ( <div>Không có dữ liệu</div> )} </div> )} </div> </div> </div> )}
              </div>

              {/* Footer - luôn hiển thị, không bị che trên mobile */}
              <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100 p-3 sm:p-5 flex flex-col sm:flex-row justify-end gap-3 z-10">
                <button
                  onClick={e => { e.preventDefault(); e.stopPropagation(); onClose(); }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl shadow-sm hover:bg-gray-200 font-semibold tracking-wide w-full sm:w-auto"
                >
                  Hủy
                </button>
                <button
                  onClick={() => setConfirmModalOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center font-semibold tracking-wide w-full sm:w-auto justify-center"
                >
                  <Check size={20} className="mr-2" />
                  Xác nhận áp dụng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Swipe confirmation modal */}
      <SwipeConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmRegulation}
        title="Xác nhận thay đổi quy định"
        description="Bạn đang thay đổi quy định lãi suất tiết kiệm. Hành động này không thể hoàn tác sau khi đã xác nhận."
        confirmText="Vuốt để xác nhận thay đổi"
        type="warning"
        confirmDetails={confirmDetails}
        isProcessing={isProcessing}
      />
    </>
  );
};

export default RegulationComparisonModal;