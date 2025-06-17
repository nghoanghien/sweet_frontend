import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, ArrowDownLeft, CreditCard, Wallet, Banknote, Sparkles, TrendingUp, Shield, Clock, Zap, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../../../utils/accountUtils';
import SwipeConfirmationModal from '../../../modals/ConfirmationModal/SwipeConfirmationModal';
import DepositPanelShimmer from '../../../ui/custom/shimmer-types/DepositPanelShimmer';

const DepositPanel = ({
  account,
  onCancel,
  onConfirm
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [inputError, setInputError] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState([]);

  // Generate dynamic suggestions based on input
  const generateSuggestions = (input) => {
    if (!input || input.trim() === '') {
      return [];
    }

    const inputNum = input.replace(/[^\d]/g, ''); // Remove non-digits
    if (inputNum === '') return [];

    const suggestions = [];
    const baseNum = inputNum;

    // Generate suggestions based on the input pattern
    if (baseNum.length >= 1) {
      // Add suggestions with different magnitudes
      const multipliers = [1000, 10000, 100000, 1000000];
      
      multipliers.forEach(multiplier => {
        const suggestion = parseInt(baseNum) * multiplier;
        if (suggestion >= 100000 && suggestion <= 100000000) { // Within valid range
          suggestions.push(suggestion);
        }
      });

      // Remove duplicates and sort
      const uniqueSuggestions = [...new Set(suggestions)].sort((a, b) => a - b);
      
      // Return max 4 suggestions
      return uniqueSuggestions.slice(0, 4);
    }

    return [];
  };

  // Enhanced validation with animations
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    
    const numValue = parseFloat(depositAmount) || 0;
    
    if (!depositAmount || depositAmount.trim() === '') {
      setInputError('Vui lòng nhập số tiền');
      setIsValidAmount(false);
    } else if (numValue < 100000) {
      setInputError('Số tiền tối thiểu là 100.000đ');
      setIsValidAmount(false);
    } else if (numValue > 100000000) {
      setInputError('Số tiền tối đa cho mỗi lần nạp là 100.000.000đ');
      setIsValidAmount(false);
    } else {
      setInputError(null);
      setIsValidAmount(true);
    }

    // Generate dynamic suggestions
    const suggestions = generateSuggestions(depositAmount);
    setDynamicSuggestions(suggestions);

    return () => clearTimeout(timer);
  }, [depositAmount]);

  // Loading state effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Show shimmer while loading
  if (isLoading) {
    return <DepositPanelShimmer />;
  }

  const openConfirmModal = () => {
    if (isValidAmount) {
      setIsConfirmModalOpen(true);
    }
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmDeposit = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      try {
        onConfirm(parseFloat(depositAmount));
        setIsProcessing(false);
        closeConfirmModal();
      } catch (error) {
        console.error('Error processing deposit:', error);
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setDepositAmount(value);
  };
  
  const handleQuickAmountSelect = (amount) => {
    setDepositAmount(amount.toString());
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0},
    visible: { opacity: 1}
  };

  const suggestionVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: -20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const containerSuggestionVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    visible: { 
      opacity: 1,
      height: "auto",
      marginTop: 12,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-blue-50/30 pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-2xl pointer-events-none"></div>

      <motion.div 
        className="flex-1 overflow-y-auto ml-2 no-scrollbar relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="pb-32 p-6 pt-4 space-y-6">

          {/* Enhanced Amount Input */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CreditCard size={16} className="text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-800">Nhập số tiền nạp</h4>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-3xl blur-xl group-focus-within:blur-2xl transition-all duration-500"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold text-lg">₫</span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  className={`w-full pl-12 pr-16 py-5 border-2 rounded-3xl transition-all duration-300 text-lg font-medium ${
                    inputError 
                      ? 'border-red-300 focus:ring-4 focus:ring-red-200/50 focus:border-red-400' 
                      : 'border-gray-200 focus:ring-4 focus:ring-green-200/50 focus:border-green-400'
                  } appearance-none placeholder:text-gray-400`}
                  placeholder="Nhập số tiền muốn nạp"
                  value={depositAmount}
                  onChange={handleAmountChange}
                  style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                  <span className="text-gray-500 font-medium">VND</span>
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {inputError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-2xl"
                >
                  <AlertTriangle size={16} className="text-red-500" />
                  <p className="text-red-600 text-sm font-medium">{inputError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Quick Amount Suggestions */}
            <AnimatePresence>
              {dynamicSuggestions.length > 0 && (
                <motion.div
                  variants={containerSuggestionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-3 overflow-hidden"
                >
                  <motion.h5 
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Sparkles size={14} className="text-amber-500" />
                    Gợi ý cho bạn
                  </motion.h5>
                  <motion.div 
                    className="grid grid-cols-2 gap-3"
                    variants={containerSuggestionVariants}
                  >
                    <AnimatePresence mode="popLayout">
                      {dynamicSuggestions.map((amount, index) => (
                        <motion.button
                          key={amount}
                          onClick={() => handleQuickAmountSelect(amount)}
                          className={`relative group p-4 rounded-2xl border-2 transition-all duration-300 ${
                            depositAmount === amount.toString()
                              ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-200/50'
                              : 'border-gray-200 bg-white/50 hover:border-green-200 hover:bg-green-50/30'
                          }`}
                          variants={suggestionVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          transition={{ 
                            layout: { duration: 0.3 },
                            delay: index * 0.05
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-bold text-sm ${
                              depositAmount === amount.toString() ? 'text-green-700' : 'text-gray-700'
                            }`}>
                              {formatCurrency(amount)}
                            </span>
                            <AnimatePresence>
                              {depositAmount === amount.toString() && (
                                <motion.div 
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 180 }}
                                  transition={{ 
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 25
                                  }}
                                  className="w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                                >
                                  <Check size={12} className="text-white" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Current Balance Display */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-blue-700 font-medium flex items-center gap-2">
                  <Wallet size={16} />
                  Số dư hiện tại
                </span>
                <span className="font-bold text-blue-800 text-lg">{formatCurrency(account.balance)}</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Summary Section */}
          <AnimatePresence>
            {isValidAmount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-xl border border-green-200/50 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <Shield size={20} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">Thông tin nạp tiền</h4>
                  </div>
                  
                  <div className="">
                    {[
                      { label: '(1) Số tiền nạp', value: formatCurrency(parseFloat(depositAmount)), color: 'text-green-600' },
                      { label: '(2) Phí giao dịch', value: '0đ', color: 'text-gray-800',withHr: true },
                      { label: 'Tổng tiền nạp (1) + (2)', value: formatCurrency(parseFloat(depositAmount)), color: 'text-green-600', highlight: true, behindHr: true },
                      { label: 'Số dư sau giao dịch', value: formatCurrency(account.balance + parseFloat(depositAmount)), color: 'text-blue-600' }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.label}
                        className={`flex justify-between items-center py-2 p-4 transition-all duration-300 
                          ${!item.withHr ? 'rounded-2xl' : ''}
                          ${item.behindHr ? 'py-4 mt-4' : ''}
                          ${item.highlight 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                            : 'bg-gray-50/50 hover:bg-gray-100/50'}
                          ${item.withHr 
                            ? 'mb-4 pb-4 border-b-2 border-gray-200'
                            : ''
                          }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-gray-600 font-medium">{item.label}</span>
                        <span className={`font-bold text-lg ${item.color}`}>{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Payment Method */}
          <AnimatePresence>
            {isValidAmount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-xl border border-green-200/50 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <Banknote size={20} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">Phương thức nạp tiền</h4>
                  </div>
                  
                  <motion.div 
                    className="relative group/item p-5 rounded-3xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-green-400 to-emerald-500">
                          <Banknote size={20} className="text-white" />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-800 text-base mb-1">Tiền mặt tại quầy</h5>
                          <p className="text-sm text-gray-600 mb-1">Nạp tiền trực tiếp tại quầy giao dịch</p>
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-green-600" />
                            <span className="text-xs text-green-600 font-medium">Xử lý ngay lập tức</span>
                          </div>
                        </div>
                      </div>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Check size={16} className="text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Check size={16} className="text-white" />
                      </div>
                      <div>
                        <h6 className="font-bold text-green-800 mb-1">Hướng dẫn nạp tiền</h6>
                        <p className="text-sm text-green-700 leading-relaxed">
                          Khách hàng cần mang theo CCCD/CMND và số tiền muốn nạp đến quầy giao dịch của Sweet trong giờ làm việc.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Warning Messages */}
          <AnimatePresence>
            {isValidAmount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-200/30 to-pink-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-xl border border-red-200/50 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                      <AlertTriangle size={20} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">Lưu ý quan trọng</h4>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl">
                    <p className="text-red-800 leading-relaxed">
                      <strong>Dành cho nhân viên ngân hàng:</strong> Vui lòng kiểm tra kỹ CCCD/CMND của khách hàng và đếm kỹ số tiền trước khi thực hiện giao dịch.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Enhanced Confirmation Button - Fixed at the bottom */}
      <div className="sticky bottom-0 p-4 -mb-4 left-0 right-0  flex gap-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg animate-[fadeIn_0.4s_ease-in-out_0.4s_forwards] opacity-0 z-40 px-6">
        <motion.button
          onClick={onCancel}
          className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium py-4 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Hủy
        </motion.button>
        <motion.button
          onClick={openConfirmModal}
          disabled={!isValidAmount}
          className={`flex-1 font-medium py-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
            !isValidAmount
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-xl'
          }`}
          whileHover={isValidAmount ? { scale: 1.02 } : {}}
          whileTap={isValidAmount ? { scale: 0.98 } : {}}
        >
          <ArrowDownLeft size={18} className="mr-2" />
          Nạp tiền ngay
        </motion.button>
      </div>

      {/* SwipeConfirmationModal */}
      <SwipeConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDeposit}
        title="Xác nhận nạp tiền"
        description={`Bạn đang nạp ${formatCurrency(parseFloat(depositAmount))} vào tài khoản ${account.accountNumber} bằng tiền mặt tại quầy.`}
        confirmText="Vuốt để xác nhận nạp tiền"
        type="success"
        icon={<ArrowDownLeft className="h-6 w-6 text-green-500" />}
        isProcessing={isProcessing}
        confirmDetails={{
          "Số tiền nạp": formatCurrency(parseFloat(depositAmount)),
          "Phí giao dịch": "0đ",
          "Tổng tiền nạp": formatCurrency(parseFloat(depositAmount)),
          "Phương thức nạp": "Tiền mặt tại quầy",
          "Số dư sau giao dịch": formatCurrency(account.balance + parseFloat(depositAmount))
        }}
      />
    </div>
  );
};

export default DepositPanel;