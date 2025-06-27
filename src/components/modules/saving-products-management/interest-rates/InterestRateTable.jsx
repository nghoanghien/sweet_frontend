import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Plus, X, Check, AlertCircle, RefreshCcw, Clock } from 'lucide-react';
import NumberInput from '@/components/ui/custom/NumberInput';

const InterestRateTable = ({
  savingsType,
  savingsTypeId,
  interestRates,
  paymentFrequencies,
  disabledFrequencies = [],
  terms,
  isEditing,
  onRateChange,
  onAddTerm,
  onRemoveTerm,
  onToggleFrequency,
  highlightChanges = {},
  readOnly = false,
  error = null,
  frequencyError = null,
  deletedTerms = [],
  onRestoreTerm = () => {},
  highlightColor = "green",
  isFlexibleType = false
}) => {
  // State for adding new term
  const [showAddTermInput, setShowAddTermInput] = useState(false);
  const [newTermMonths, setNewTermMonths] = useState('');
  const [termError, setTermError] = useState('');
  const [newTermIds, setNewTermIds] = useState([]);
  
  // Track invalid cells
  const [invalidCells, setInvalidCells] = useState({});
  
  // Kiểm tra các ô trống khi component được render hoặc khi có thay đổi về dữ liệu
  useEffect(() => {
    if (isEditing && !readOnly) {
      const newInvalidCells = {};
      let emptyCount = 0;
      
      // Kiểm tra tất cả các ô
      terms.forEach(term => {
        const isNewTerm = newTermIds.includes(term.months);
        const isDeleted = deletedTerms.includes(term.id);
        
        if (!isDeleted) {
          paymentFrequencies.forEach(frequency => {
            const isFrequencyDisabled = disabledFrequencies.includes(frequency.id);
            const isQuarterlyDisabled = frequency.id === 'quarterly' && !isDivisibleByThree(term.months);
            const isDisabled = isFrequencyDisabled || isQuarterlyDisabled;
            
            if (!isDisabled) {
              const rate = interestRates.find(
                r => r.termId === term.id && r.frequencyId === frequency.id
              )?.rate;
              
              const isEmpty = (rate === null || rate === undefined || rate === '');
              
              if (isEmpty) {
                newInvalidCells[`${term.id}-${frequency.id}`] = true;
                emptyCount++;
              }
            }
          });
        }
      });
      
      // Cập nhật trạng thái
      setInvalidCells(newInvalidCells);
      
      // Báo lỗi ngay nếu có ô trống và onRateChange được cung cấp
      if (emptyCount > 0 && typeof onRateChange === 'function') {
        // Gọi onRateChange với tham số thứ 4 là error message
        onRateChange(null, null, null, 
          `Vui lòng nhập đầy đủ các mức lãi suất (còn ${emptyCount} ô trống)`);
      } else if (emptyCount === 0 && typeof onRateChange === 'function') {
        // Xóa lỗi nếu không còn ô trống
        onRateChange(null, null, null, null);
      }
    }
  }, [terms, interestRates, paymentFrequencies, disabledFrequencies, isEditing, readOnly, newTermIds, deletedTerms, onRateChange]);

  // Format interest rate for display (e.g., 0.045 -> "4.5%", 0.44 -> "44%")
  const formatInterestRate = (rate) => {
    if (rate === null || rate === undefined || rate === '') {
      return '-';
    }
    // Convert to percentage with 2 decimal places, then remove trailing zeros
    return `${parseFloat((rate * 100).toFixed(2))}%`;
  };
  
  // Check if a term is divisible by 3 (for quarterly frequency)
  const isDivisibleByThree = (months) => {
    return months % 3 === 0;
  };

  // Helper to check if a cell value has changed (for highlighting)
  const hasChanged = (term, frequency) => {
    // Check if the direct key exists (for backward compatibility)
    if (highlightChanges[`${term}-${frequency}`]) {
      return true;
    }
    
    // Check for the specific savings type key
    if (savingsTypeId && highlightChanges[`${savingsTypeId}-${term}-${frequency}`]) {
      return true;
    }
    
    return false;
  };
  
  // Helper to check if a cell is invalid (empty)
  const isCellInvalid = (termId, frequencyId) => {
    return invalidCells[`${termId}-${frequencyId}`];
  };

  // Check if a term is marked for deletion
  const isTermDeleted = (termId) => {
    return deletedTerms.includes(termId);
  };
  
  // Get the appropriate highlight background color
  const getHighlightBgColor = (isChanged) => {
    if (!isChanged) return '';
    return highlightColor === 'red' ? 'bg-red-50' : 'bg-green-50';
  };
  
  // Get the appropriate highlight text color
  const getHighlightTextColor = (isChanged) => {
    if (!isChanged) return 'text-gray-700';
    return highlightColor === 'red' ? 'text-red-600' : 'text-green-600';
  };

  // Handle new term submission
  const handleAddTermSubmit = () => {
    // Parse the string value to a number
    const months = parseInt(newTermMonths, 10);
    
    // Validate input
    if (isNaN(months) || months <= 0) {
      setTermError('Vui lòng nhập số tháng hợp lệ');
      return;
    }
    
    // Check if term already exists
    if (terms.some(term => term.months === months)) {
      setTermError('Kỳ hạn này đã tồn tại');
      return;
    }
    
    // Add new term
    onAddTerm(months);
    
    // Reset form
    setNewTermMonths('');
    setShowAddTermInput(false);
    setTermError('');
    
    // Thêm ID của kỳ hạn mới vào trạng thái
    setNewTermIds(prevIds => [...prevIds, months]);
    
    // Đánh dấu các ô lãi suất của kỳ hạn mới là không hợp lệ và báo lỗi ngay lập tức
    // Tính số ô trống mới sẽ được thêm vào
    const newEmptyCells = paymentFrequencies.filter(freq => {
      const isFrequencyDisabled = disabledFrequencies.includes(freq.id);
      const isQuarterlyDisabled = freq.id === 'quarterly' && !isDivisibleByThree(months);
      return !isFrequencyDisabled && !isQuarterlyDisabled;
    }).length;
    
    // Cập nhật số ô trống và báo lỗi
    if (newEmptyCells > 0 && typeof onRateChange === 'function') {
      // Tính tổng số ô trống (hiện tại + mới)
      const totalEmptyCells = Object.keys(invalidCells).length + newEmptyCells;
      onRateChange(null, null, null, 
        `Vui lòng nhập đầy đủ các mức lãi suất (còn ${totalEmptyCells} ô trống)`);
    }
  };

  // Handle keypress in the new term input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTermSubmit();
    }
  };

  // Cancel adding new term
  const handleCancelAddTerm = () => {
    setNewTermMonths('');
    setShowAddTermInput(false);
    setTermError('');
  };
  
  // Handle interest rate change
  const handleRateChange = (termId, frequencyId, value) => {
    // Check for empty/invalid values
    const isInvalid = value === null || value === undefined || value === '';
    
    // Update invalid cells tracking
    if (isInvalid) {
      setInvalidCells(prev => ({
        ...prev,
        [`${termId}-${frequencyId}`]: true
      }));
      
      // Report error to parent component immediately
      if (error === null && Object.keys(invalidCells).length > 0) {
        // Tính số ô trống hiện tại
        const emptyCount = Object.keys(invalidCells).length + 1; // +1 cho ô hiện tại
        if (typeof onRateChange === 'function') {
          // Gọi onRateChange với tham số thứ 4 là error message
          onRateChange(termId, frequencyId, value, 
            `Vui lòng nhập đầy đủ các mức lãi suất (còn ${emptyCount} ô trống)`);
        }
      }
    } else {
      // Xóa ô này khỏi danh sách ô không hợp lệ
      setInvalidCells(prev => {
        const updated = { ...prev };
        delete updated[`${termId}-${frequencyId}`];
        
        // Nếu không còn ô nào không hợp lệ, xóa thông báo lỗi
        if (Object.keys(updated).length === 0 && typeof onRateChange === 'function') {
          onRateChange(termId, frequencyId, value, null); // Xóa lỗi
        } else if (typeof onRateChange === 'function') {
          // Vẫn còn ô trống, cập nhật thông báo lỗi
          const emptyCount = Object.keys(updated).length;
          onRateChange(termId, frequencyId, value, 
            `Vui lòng nhập đầy đủ các mức lãi suất (còn ${emptyCount} ô trống)`);
        }
        
        return updated;
      });
    }
    
    // Pass to parent handler (nếu không có tham số error)
    if (typeof onRateChange === 'function' && arguments.length <= 3) {
      onRateChange(termId, frequencyId, value);
    }
  };

  // Mobile view for the table
  const renderMobileView = () => {
    // For flexible type, only show the "end" frequency
    const displayFrequencies = isFlexibleType 
      ? paymentFrequencies.filter(freq => freq.id === 'end')
      : paymentFrequencies;
      
    return (
      <div className="md:hidden">
        {terms.map((term) => {
          const isDeleted = isTermDeleted(term.id);
          const isNewTerm = newTermIds.includes(term.months);
          
          return (
            
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`mb-5 border-2 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,170,255,0.08)] ${isDeleted ? 'bg-red-50 border-red-200' : isNewTerm ? 'bg-green-50 border-green-200' : 'bg-gradient-to-br from-blue-50/80 to-white border-blue-100'}`}
            >
              
              <div className={`px-5 py-4 flex justify-between items-center ${isDeleted ? 'bg-red-100' : isNewTerm ? 'bg-green-100' : 'bg-blue-50/60'}`}>
                <h4 className={`font-semibold text-base ${isDeleted ? 'text-red-700' : isNewTerm ? 'text-green-700' : 'text-blue-800'}`}>
                  {term.months} tháng
                  {isDeleted && <span className="ml-2 text-xs text-red-600">(Đã xóa)</span>}
                  {isNewTerm && <span className="ml-2 text-xs text-green-600">(Kỳ hạn mới)</span>}
                </h4>
                
                {isEditing && (
                  <div>
                    {isDeleted ? (
                      <motion.button
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onRestoreTerm(term.id)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none p-1 rounded-full bg-blue-50 shadow-sm"
                        disabled={readOnly}
                        title="Khôi phục"
                      >
                        <RefreshCcw size={20} />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.15, rotate: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onRemoveTerm(term.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-full bg-red-50 shadow-sm"
                        disabled={readOnly}
                        title="Xóa"
                      >
                        <X size={20} />
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="divide-y divide-gray-200">
                {displayFrequencies.map((frequency) => {
                  const cellChanged = hasChanged(term.id, frequency.id);
                  const cellInvalid = isCellInvalid(term.id, frequency.id);
                  const rate = interestRates.find(
                    rate => rate.termId === term.id && rate.frequencyId === frequency.id
                  )?.rate;
                  // Separate the disabled state for clarity
                  const isFrequencyDisabled = disabledFrequencies.includes(frequency.id);
                  // Đối với tần suất hàng quý, tô xám các kỳ hạn không chia hết cho 3
                  const isQuarterlyDisabled = frequency.id === 'quarterly' && !isDivisibleByThree(term.months);
                  const isDisabled = isFrequencyDisabled || isDeleted || isQuarterlyDisabled;
                  
                  // Kiểm tra ô trống
                  const isEmpty = (rate === null || rate === undefined || rate === '');
                  const shouldShowInvalid = isEditing && !isDisabled && isEmpty;
                  
                  // Cập nhật trạng thái ô không hợp lệ
                  if (shouldShowInvalid && !cellInvalid) {
                    // Chỉ cập nhật nếu chưa được đánh dấu là không hợp lệ
                    setTimeout(() => {
                      handleRateChange(term.id, frequency.id, '');
                    }, 0);
                  }
                  
                  if (isDisabled && !isEditing) return null;
                  
                  return (
                    <div 
                      key={`${term.id}-${frequency.id}`}
                      className={`px-4 py-3 flex justify-between items-center ${
                        isFrequencyDisabled ? 'bg-gray-50' : 
                        isDeleted ? 'bg-red-50' :
                        isNewTerm ? 'bg-green-50' :
                        cellInvalid ? 'bg-red-50' :
                        cellChanged ? getHighlightBgColor(cellChanged) : ''
                      }`}
                    >
                      <div className="text-sm text-gray-600">
                        {frequency.name}
                        {isQuarterlyDisabled && frequency.id === 'quarterly' && (
                          <span className="text-xs text-gray-400 block">(Kỳ hạn không chia hết cho 3)</span>
                        )}
                      </div>
                      
                      {isEditing && !readOnly && !isDisabled ? (
                        <div className="w-28">
                          <NumberInput
                            value={rate}
                            onChange={(value) => handleRateChange(term.id, frequency.id, value)}
                            min={0}
                            max={20}
                            step={0.1}
                            decimalPlaces={1}
                            suffix="%"
                            error={cellInvalid ? "Bắt buộc" : ""}
                            highlightChange={cellChanged}
                            disableDirectInput={false}
                          />
                        </div>
                      ) : (
                        <span className={`font-medium ${
                          isFrequencyDisabled ? 'text-gray-400' :
                          isDeleted ? 'text-red-600' :
                          isNewTerm ? 'text-green-600' :
                          isDisabled ? 'text-gray-400' : 
                          cellInvalid ? 'text-red-600' :
                          cellChanged ? getHighlightTextColor(cellChanged) : 'text-blue-800'
                        }`}>
                          {isDisabled ? '-' : formatInterestRate(rate)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
        
        {/* Add term button for mobile */}
        {isEditing && !readOnly && !showAddTermInput && (
          <div className="mt-4">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setShowAddTermInput(true)}
              className="w-full py-3 flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-800 border border-dashed border-indigo-300 rounded-lg bg-indigo-50/50 hover:bg-indigo-50"
            >
              <Plus size={16} className="mr-1" />
              Thêm kỳ hạn
            </motion.button>
          </div>
        )}
        
        {/* Add term form for mobile */}
        {isEditing && !readOnly && showAddTermInput && (
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <h4 className="text-sm font-medium text-indigo-800 mb-3">Thêm kỳ hạn mới</h4>
            <form onSubmit={(e) => { e.preventDefault(); handleAddTermSubmit(); }}>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={newTermMonths}
                      onChange={(e) => setNewTermMonths(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 pr-16 ${
                        termError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="1"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                      tháng
                    </span>
                  </div>
                  {termError && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {termError}
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Check size={16} />
                </button>
                
                <button
                  type="button"
                  onClick={handleCancelAddTerm}
                  className="p-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  <X size={16} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Toggle tần suất động nếu đang chỉnh sửa */}
      {isEditing && !readOnly && !isFlexibleType && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {paymentFrequencies.filter(freq => freq.id !== 'end').map((frequency) => {
                  const isDisabled = disabledFrequencies.includes(frequency.id);
                  return (
                    <motion.button
                      key={frequency.id}
                      onClick={() => onToggleFrequency(frequency.id)}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 border-2 md:hidden flex items-center gap-1
                        ${isDisabled
                          ? 'bg-gray-100 border-gray-200 text-gray-400'
                          : 'bg-white border-blue-300 text-blue-700 shadow-[0_2px_8px_rgba(0,170,255,0.08)] hover:bg-blue-50'
                        }
                      `}
                    >
                      <Clock size={15} className={isDisabled ? 'opacity-30' : 'opacity-80'} />
                      {frequency.name}
                      {!isDisabled && <span className="ml-1"><Check size={13} className="text-blue-500" /></span>}
                    </motion.button>
                  );
                })}
              </div>
            )}
      <div className="inline-block min-w-full align-middle">
        <motion.div
          className="bg-white border-2 border-blue-100 rounded-3xl shadow-[0_4px_32px_rgba(0,170,255,0.10)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 px-8 py-5 flex items-center justify-between rounded-t-3xl shadow-[0_4px_24px_rgba(0,170,255,0.10)]">
            <motion.h3
              className="text-xl font-bold text-white tracking-wide flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Edit2 size={22} className="opacity-70" />
              {savingsType}
            </motion.h3>
            {/* Toggle tần suất động nếu đang chỉnh sửa */}
            {isEditing && !readOnly && !isFlexibleType && (
              <div className="flex gap-2">
                {paymentFrequencies.filter(freq => freq.id !== 'end').map((frequency) => {
                  const isDisabled = disabledFrequencies.includes(frequency.id);
                  return (
                    <motion.button
                      key={frequency.id}
                      onClick={() => onToggleFrequency(frequency.id)}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 border-2 hidden md:flex items-center gap-1
                        ${isDisabled
                          ? 'bg-gray-100 border-gray-200 text-gray-400'
                          : 'bg-white border-blue-300 text-blue-700 shadow-[0_2px_8px_rgba(0,170,255,0.08)] hover:bg-blue-50'
                        }
                      `}
                    >
                      <Clock size={15} className={isDisabled ? 'opacity-30' : 'opacity-80'} />
                      {frequency.name}
                      {!isDisabled && <span className="ml-1"><Check size={13} className="text-blue-500" /></span>}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
          
          {isEditing && error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex items-center">
                <AlertCircle size={18} className="text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          {/* Mobile view */}
          {renderMobileView()}
          
          {/* Desktop view */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-blue-50/60">
                <tr>
                  <th className="px-7 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider w-32 rounded-tl-2xl">Kỳ hạn</th>
                  {/* For flexible type, only show the "end" frequency */}
                  {(paymentFrequencies
                  ).map((frequency) => {
                    const isDisabled = disabledFrequencies.includes(frequency.id);
                    return (
                      <th
                        key={frequency.id}
                        className={`px-7 py-4 text-left text-xs font-bold tracking-wider ${
                          isDisabled ? 'text-gray-400 bg-gray-100' : 'text-blue-700'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-1">
                          {frequency.name}
                        </span>
                      </th>
                    );
                  })}
                  {isEditing && (
                    <th className="px-7 py-4 text-center text-xs font-bold text-blue-700 uppercase tracking-wider w-24 rounded-tr-2xl">Thao tác</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {terms.map((term, idx) => {
                  const isDeleted = isTermDeleted(term.id);
                  const isNewTerm = newTermIds.includes(term.months);
                  return (
                    <motion.tr
                      key={term.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      className={`${isDeleted ? 'bg-red-50' : isNewTerm ? 'bg-green-50' : 'hover:bg-blue-50/40'} transition-all`}
                    >
                      <td className={`px-7 py-4 whitespace-nowrap text-base font-semibold ${isDeleted ? 'text-red-600' : isNewTerm ? 'text-green-600' : 'text-blue-800'}`}>
                        {term.months} tháng
                        {isDeleted && <span className="ml-2 text-xs text-red-600">(Đã xóa)</span>}
                        {isNewTerm && <span className="ml-2 text-xs text-green-600">(Kỳ hạn mới)</span>}
                      </td>
                      
                      {/* For flexible type, only show the "end" frequency */}
                      {(paymentFrequencies
                      ).map((frequency) => {
                        const cellChanged = hasChanged(term.id, frequency.id);
                        const cellInvalid = isCellInvalid(term.id, frequency.id);
                        const rate = interestRates.find(
                          rate => rate.termId === term.id && rate.frequencyId === frequency.id
                        )?.rate;
                        // Separate the disabled state for clarity
                        const isFrequencyDisabled = disabledFrequencies.includes(frequency.id);
                        // Đối với tần suất hàng quý, tô xám các kỳ hạn không chia hết cho 3
                        const isQuarterlyDisabled = frequency.id === 'quarterly' && !isDivisibleByThree(term.months);
                        const isDisabled = isFrequencyDisabled || isDeleted || isQuarterlyDisabled;
                        
                        // Kiểm tra ô trống
                        const isEmpty = (rate === null || rate === undefined || rate === '');
                        const shouldShowInvalid = isEditing && !isDisabled && isEmpty;
                        
                        // Cập nhật trạng thái ô không hợp lệ
                        if (shouldShowInvalid && !cellInvalid) {
                          // Chỉ cập nhật nếu chưa được đánh dấu là không hợp lệ
                          setTimeout(() => {
                            handleRateChange(term.id, frequency.id, '');
                          }, 0);
                        }
                        
                        return (
                          <td 
                            key={`${term.id}-${frequency.id}`}
                            className={`px-7 py-4 whitespace-nowrap text-center text-sm transition-all duration-300
                              ${isFrequencyDisabled ? 'bg-gray-100 text-gray-400' :
                                isQuarterlyDisabled ? 'bg-gray-100 text-gray-400' :
                                isDeleted ? 'bg-red-50' :
                                isNewTerm ? 'bg-green-50' :
                                cellInvalid ? 'bg-red-50 animate-pulse' :
                                cellChanged ? (highlightColor === 'red'
                                  ? 'bg-gradient-to-r from-red-100/60 to-red-100/50 '
                                  : 'bg-gradient-to-r from-green-100 to-green-100') : 'bg-white'}
                            `}
                            title={isQuarterlyDisabled && frequency.id === 'quarterly' ? 'Kỳ hạn không chia hết cho 3' : ''}
                          >
                            {isEditing && !readOnly && !isDisabled ? (
                              <motion.div
                                className="w-28 mx-auto"
                                initial={cellChanged ? { scale: 1.08, boxShadow: (highlightColor === 'red' ? '0 0 0 2px #ef4444' : '0 0 0 2px #22d3ee') } : {}}
                                animate={cellChanged ? { scale: 1, boxShadow: '0 0 0 0px #fff' } : {}}
                                transition={{ duration: 0.5 }}
                              >
                                <NumberInput
                                  value={rate}
                                  onChange={(value) => handleRateChange(term.id, frequency.id, value)}
                                  min={0}
                                  max={20}
                                  step={0.1}
                                  decimalPlaces={1}
                                  suffix="%"
                                  error={cellInvalid ? "Bắt buộc" : ""}
                                  highlightChange={cellChanged}
                                  disableDirectInput={false}
                                  className={`focus:ring-2 transition-all duration-200 ${highlightColor === 'red' ? 'focus:ring-red-400 focus:border-red-400' : 'focus:ring-blue-400 focus:border-blue-400'}`}
                                />
                              </motion.div>
                            ) : (
                              <motion.span
                                className={`font-semibold select-none transition-all duration-300
                                  ${isFrequencyDisabled ? 'text-gray-400' :
                                    isDeleted ? 'text-red-600' :
                                    isNewTerm ? 'text-green-600' :
                                    isDisabled ? 'text-gray-400' :
                                    cellInvalid ? 'text-red-600' :
                                    cellChanged ? (highlightColor === 'red' ? 'text-red-600' : 'text-green-600') : 'text-blue-800'}
                                `}
                                initial={cellChanged ? { scale: 1.15 } : {}}
                                animate={cellChanged ? { scale: 1, color: (highlightColor === 'red' ? '#dc2626' : '#059669') } : {}}
                                transition={{ duration: 0.5 }}
                              >
                                {isDisabled ? <span className="opacity-40">—</span> : formatInterestRate(rate)}
                              </motion.span>
                            )}
                          </td>
                        );
                      })}
                      
                      {isEditing && (
                        <td className="px-7 py-4 whitespace-nowrap text-center">
                          {isDeleted ? (
                            <motion.button
                              whileHover={{ scale: 1.15, rotate: 10 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onRestoreTerm(term.id)}
                              className="text-blue-500 hover:text-blue-700 focus:outline-none p-1 rounded-full bg-blue-50 shadow-sm"
                              disabled={readOnly}
                              title="Khôi phục"
                            >
                              <RefreshCcw size={20} />
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.15, rotate: -10 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onRemoveTerm(term.id)}
                              className="text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-full bg-red-50 shadow-sm"
                              disabled={readOnly}
                              title="Xóa"
                            >
                              <X size={20} />
                            </motion.button>
                          )}
                        </td>
                      )}
                    </motion.tr>
                  );
                })}
                
                {isEditing && !readOnly && !showAddTermInput && (
                  <tr>
                    <td colSpan={paymentFrequencies.length + (isEditing ? 2 : 1)} className="px-7 py-4">
                      <motion.button
                        whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(0,170,255,0.18)' }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setShowAddTermInput(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] font-semibold tracking-wide text-base mx-auto"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ repeat: Infinity, duration: 1.8, repeatType: 'loop' }}
                        >
                          <Plus size={18} />
                        </motion.span>
                        Thêm kỳ hạn
                      </motion.button>
                    </td>
                  </tr>
                )}
                
                {isEditing && !readOnly && showAddTermInput && (
                  <tr className="bg-gradient-to-r from-indigo-50 via-blue-50 to-white animate-fadeIn">
                    <td className="px-7 py-4 whitespace-nowrap rounded-bl-2xl">
                      <div className="flex items-center space-x-2">
                        <form 
                          onSubmit={(e) => { e.preventDefault(); handleAddTermSubmit(); }} 
                          className="flex items-center space-x-2"
                        >
                          <div className="relative">
                            <div className="w-32 relative">
                              <input
                                type="number"
                                min="1"
                                step="1"
                                value={newTermMonths}
                                onChange={(e) => setNewTermMonths(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTermSubmit();
                                  }
                                }}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-12 text-lg font-semibold bg-white/80 shadow-inner transition-all duration-200 ${
                                  termError ? 'border-red-300 bg-red-50' : 'border-indigo-200'
                                }`}
                                placeholder="1"
                              />
                              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none font-bold text-base">
                                tháng
                              </span>
                            </div>
                            {termError && (
                              <p className="mt-1 text-xs text-red-600 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {termError}
                              </p>
                            )}
                          </div>
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.13, backgroundColor: '#6366f1' }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          >
                            <Check size={18} />
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.13, backgroundColor: '#e0e7ff' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCancelAddTerm}
                            className="p-3 bg-gray-100 text-gray-700 rounded-full shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                          >
                            <X size={18} />
                          </motion.button>
                        </form>
                      </div>
                    </td>
                    <td colSpan={(isFlexibleType ? 1 : paymentFrequencies.length) + (isEditing ? 1 : 0)} className="px-7 py-4 text-sm text-indigo-500 italic bg-white/60 rounded-br-2xl">
                      <span className="font-medium">Nhập số tháng cho kỳ hạn mới</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {frequencyError && (
            <div className="bg-red-50 border-t border-red-200 p-4">
              <div className="flex items-center">
                <AlertCircle size={18} className="text-red-500 mr-2" />
                <p className="text-sm text-red-700">{frequencyError}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InterestRateTable;