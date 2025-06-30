import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, ArrowUpRight, CreditCard, Wallet, Banknote, Sparkles, TrendingDown, Shield, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../../../utils/accountUtils';
import SwipeConfirmationModal from '../../../modals/ConfirmationModal/SwipeConfirmationModal';
import  Skeleton  from '../../../ui/custom/Skeleton';
import TextShimmer from '../../../ui/custom/shimmer-types/TextShimmer';

const EarlyWithdrawalPanel = ({
  account = {
    remainingAmount: 10000000,
    amount: 10000000,
    depositType: "Tiền gửi linh hoạt",
    interestFrequency: "Cuối kỳ",
    totalReceivable: 12000000,
    nickname: "Tài khoản tiết kiệm chính"
  },
  withdrawalType = 'partial',
  withdrawalAmount = '',
  withdrawalData = {
    originalAmount: 10000000,
    withdrawAmount: 5000000,
    withdrawalInterest: 200000,
    totalWithdrawal: 5200000,
    remainingBalance: 5000000,
    expectedInterest: 300000
  },
  onWithdrawalTypeChange = () => {},
  onWithdrawalAmountChange = () => {},
  onCancel = () => {},
  onConfirm = () => {},
  isAdmin = true,
  isLoading: externalIsLoading = false
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [inputError, setInputError] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(withdrawalType === 'full');
  const [selectedAccount, setSelectedAccount] = useState('main');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [minWithdrawalAmount] = useState(100000);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced payment accounts data
  const paymentAccounts = [
    { 
      id: 'cash', 
      name: 'Tiền mặt tại quầy', 
      number: '', 
      balance: null, 
      icon: <Banknote size={18} />,
      gradient: 'from-emerald-400 to-green-500',
      description: 'Nhận tiền mặt ngay lập tức'
    },
    { 
      id: 'main', 
      name: 'Tài khoản chính', 
      number: '•••• 1234', 
      balance: 2500000, 
      icon: <CreditCard size={18} />,
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Chuyển khoản tự động'
    },
  ];

  // Loading state management
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Loading state when withdrawalAmount or withdrawalType changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [withdrawalAmount, withdrawalType]);

  // Enhanced validation with animations
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    
    if (withdrawalType === 'full') {
      setIsValidAmount(true);
      setInputError(null);
      return;
    }

    const numValue = parseFloat(withdrawalAmount) || 0;
    const currentAmount = typeof account.remainingAmount !== 'undefined' ? account.remainingAmount : account.amount;
    
    if (!withdrawalAmount || withdrawalAmount.trim() === '') {
      setInputError('Vui lòng nhập số tiền');
      setIsValidAmount(false);
    } else if (numValue < minWithdrawalAmount) {
      setInputError(`Số tiền tối thiểu là ${formatCurrency(minWithdrawalAmount)}`);
      setIsValidAmount(false);
    } else if (numValue >= currentAmount) {
      setInputError(`Số tiền không được vượt quá ${formatCurrency(currentAmount)}`);
      setIsValidAmount(false);
    } else {
      setInputError(null);
      setIsValidAmount(true);
    }
    
    return () => clearTimeout(timer);
  }, [withdrawalAmount, withdrawalType, account.amount, minWithdrawalAmount]);

  const openConfirmModal = () => {
    if (!isAdmin) {
      onConfirm();
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmWithdrawal = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      try {
        onConfirm();
        setIsProcessing(false);
        closeConfirmModal();
      } catch (error) {
        console.error('Error processing withdrawal:', error);
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    onWithdrawalAmountChange(value);
    
    const numValue = parseFloat(value) || 0;
    const currentAmount = typeof account.remainingAmount !== 'undefined' ? account.remainingAmount : account.amount;
    
    if (numValue >= minWithdrawalAmount && numValue < currentAmount) {
      // Trigger withdrawal calculation
    }
  };

  const handleAccountSelect = (accountId) => {
    setSelectedAccount(accountId);
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
    hidden: { opacity: 0,},
    visible: { opacity: 1}
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background decorations */}

      <motion.div
        className="flex-1 overflow-y-auto ml-2 no-scrollbar relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="pb-24 p-2 pt-4 space-y-6">
          {/* Enhanced Warning Section */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-amber-200/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <AlertTriangle size={20} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-600 text-md flex items-center gap-2">
                    Rút tiền trước hạn sẽ ảnh hưởng đến lãi suất nhận được.
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Withdrawal Type Selection */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <TrendingDown size={16} className="text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-800">
                Chọn hình thức rút tiền
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <motion.button
                className={`relative group p-5 rounded-3xl border-2 transition-all duration-500 ${
                  withdrawalType === "full"
                    ? "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-200/50"
                    : "border-gray-200 bg-white/50 hover:border-amber-200 hover:bg-amber-50/30"
                }`}
                onClick={() => onWithdrawalTypeChange("full")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        withdrawalType === "full"
                          ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg"
                          : "bg-gray-100 group-hover:bg-amber-100"
                      }`}
                    >
                      <Wallet
                        size={20}
                        className={
                          withdrawalType === "full"
                            ? "text-white"
                            : "text-gray-600"
                        }
                      />
                    </div>
                    <div className="text-left">
                      <h5 className="font-bold text-gray-800 text-base">
                        Rút toàn bộ
                      </h5>
                      <p className="text-sm text-gray-600">
                        Rút tất cả số tiền trong tài khoản
                      </p>
                    </div>
                  </div>
                  {withdrawalType === "full" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
                    >
                      <Check size={14} className="text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>

              {account.depositType !== "standard" && (
                <motion.button
                  className={`relative group p-5 rounded-3xl border-2 transition-all duration-500 ${
                    withdrawalType === "partial"
                      ? "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-200/50"
                      : "border-gray-200 bg-white/50 hover:border-amber-200 hover:bg-amber-50/30"
                  }`}
                  onClick={() => onWithdrawalTypeChange("partial")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          withdrawalType === "partial"
                            ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg"
                            : "bg-gray-100 group-hover:bg-amber-100"
                        }`}
                      >
                        <Zap
                          size={20}
                          className={
                            withdrawalType === "partial"
                              ? "text-white"
                              : "text-gray-600"
                          }
                        />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-gray-800 text-base">
                            Rút một phần
                          </h5>
                          <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs rounded-full font-medium shadow-sm">
                            Đề xuất
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Linh hoạt chọn số tiền muốn rút
                        </p>
                      </div>
                    </div>
                    {withdrawalType === "partial" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
                      >
                        <Check size={14} className="text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Enhanced Amount Input */}
          <AnimatePresence>
            {withdrawalType === "partial" && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <CreditCard size={16} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">
                    Nhập số tiền
                  </h4>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-3xl blur-xl group-focus-within:blur-2xl transition-all duration-500"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-bold text-lg">₫</span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      className={`w-full pl-12 pr-16 py-5 border-2 rounded-3xl transition-all duration-300 text-lg font-medium ${
                        inputError
                          ? "border-red-300 focus:ring-4 focus:ring-red-200/50 focus:border-red-400"
                          : "border-gray-200 focus:ring-4 focus:ring-blue-200/50 focus:border-blue-400"
                      } appearance-none placeholder:text-gray-400`}
                      placeholder="Nhập số tiền muốn rút"
                      value={withdrawalAmount}
                      onChange={handleAmountChange}
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                      }}
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
                      <p className="text-red-600 text-sm font-medium">
                        {inputError}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-sm text-gray-600 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                  <strong>Lưu ý:</strong> Số tiền rút tối thiểu là <Skeleton isLoading={isLoading} width="w-20" height="h-4" className="inline-block">{formatCurrency(minWithdrawalAmount)}</Skeleton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Summary Section */}
          <AnimatePresence>
            {(withdrawalType === "full" || isValidAmount) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <Shield size={20} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">
                      Thông tin rút tiền
                    </h4>
                  </div>

                  <div className="">
                    {(() => {
                      if (withdrawalType === "full") {
                        return [
                          {
                            label: "(1) Số tiền rút trước hạn",
                            value: formatCurrency(
                              account.remainingAmount
                            ),
                            color: "text-gray-800",
                          },
                          {
                            label: "(2) Lãi rút trước hạn",
                            value:
                              "+" +
                              formatCurrency(withdrawalData.withdrawalInterest),
                            color: "text-blue-600",
                            withHr: true,
                          },
                          {
                            label: "Tổng tiền rút trước hạn\n(1) + (2)",
                            value: formatCurrency(
                              withdrawalData.totalWithdrawal
                            ),
                            color: "text-amber-600",
                            highlight: true,
                            behindHr: true,
                          },
                        ];
                      } else {
                        return [
                          {
                            label: "(1) Tổng tiền gửi",
                            value: formatCurrency(
                              account.remainingAmount
                            ),
                            color: "text-gray-800",
                          },
                          {
                            label: "(2) Số tiền rút trước hạn",
                            value: formatCurrency(
                              withdrawalData.withdrawAmount
                            ),
                            color: "text-amber-600",
                          },
                          {
                            label: "(3) Lãi rút trước hạn",
                            value:
                              "+" +
                              formatCurrency(withdrawalData.withdrawalInterest),
                            color: "text-blue-600",
                            withHr: true,
                          },
                          {
                            label: "Tổng tiền rút trước hạn\n(2) + (3)",
                            value: formatCurrency(
                              withdrawalData.totalWithdrawal
                            ),
                            color: "text-amber-600",
                            highlight: true,
                            behindHr: true,
                          },
                          {
                            label: "Số tiền gửi còn lại\n(1) - (2)",
                            value: formatCurrency(
                              withdrawalData.remainingBalance
                            ),
                            color: "text-gray-800",
                            withSecondHr: true
                          },
                          {
                            label: "Tiền lãi dự kiến",
                            value:
                              "+" +
                              formatCurrency(withdrawalData.expectedInterest),
                            color: "text-green-600",
                          },
                        ];
                      }
                    })().map((item, index) => (
                      <motion.div
                        key={item.label}
                        className={`flex justify-between items-center py-2 p-4 transition-all duration-300 
                        ${(!item.withHr) ? "rounded-2xl" : "mb-4 pb-4 border-b-2 border-gray-200"}
                        ${item.behindHr ? "mb-4 py-4" : ""}
                        ${
                          item.highlight
                            ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
                            : "bg-gray-50/50 hover:bg-gray-100/50"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-gray-600 font-medium whitespace-pre-line">
                          {item.label}
                        </span>
                        <Skeleton isLoading={isLoading} width="w-24" height="h-6" className="inline-block">
                          <span className={`font-bold text-lg ${item.color}`}>
                            {item.value}
                          </span>
                        </Skeleton>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Account Selection */}
          <AnimatePresence>
            {isAdmin && (withdrawalType === "full" || isValidAmount) && (
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
                      <CreditCard size={20} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">
                      Chọn tài khoản nhận
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {paymentAccounts.map((acc, index) => (
                      <motion.div
                        key={acc.id}
                        onClick={() => handleAccountSelect(acc.id)}
                        className={`relative group/item cursor-pointer p-5 rounded-3xl border-2 transition-all duration-500 ${
                          selectedAccount === acc.id
                            ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-200/50"
                            : "border-gray-200 bg-white/50 hover:border-green-200 hover:bg-green-50/30"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${acc.gradient}`}
                            >
                              {acc.icon}
                            </div>
                            <div>
                              <h5 className="font-bold text-gray-800 text-base mb-1">
                                {acc.name}
                              </h5>
                              {acc.number && (
                                <p className="text-sm text-gray-500 mb-1">
                                  <Skeleton isLoading={isLoading} width="w-16" height="h-4" className="inline-block">
                                    {acc.number}
                                  </Skeleton>
                                </p>
                              )}
                              <p className="text-xs text-gray-600">
                                {acc.description}
                              </p>
                              {acc.id === "cash" && (
                                <div className="flex items-center gap-1 mt-2">
                                  <Clock size={12} className="text-green-600" />
                                  <span className="text-xs text-green-600 font-medium">
                                    Nhận ngay lập tức
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {acc.balance !== null && (
                              <Skeleton isLoading={isLoading} width="w-20" height="h-4" className="inline-block">
                                <span className="text-sm text-gray-600 font-medium">
                                  {formatCurrency(acc.balance)}
                                </span>
                              </Skeleton>
                            )}
                            {selectedAccount === acc.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                              >
                                <Check size={16} className="text-white" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <AnimatePresence>
                    {selectedAccount === "cash" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Check size={16} className="text-white" />
                          </div>
                          <div>
                            <h6 className="font-bold text-green-800 mb-1">
                              Hướng dẫn nhận tiền mặt
                            </h6>
                            <p className="text-sm text-green-700 leading-relaxed">
                              Bạn có thể nhận tiền mặt tại bất kỳ quầy giao dịch
                              nào của Sweet trong giờ làm việc. Vui lòng mang
                              theo CCCD/CMND và mã giao dịch.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Warning Messages */}
          <AnimatePresence>
            {(withdrawalType === "full" || isValidAmount) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-xl border border-yellow-200/50 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
                      <AlertTriangle size={20} className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-600">
                      Lưu ý quan trọng
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {["Đầu kỳ hạn", "Hàng tháng", "Hàng quý"].includes(
                      account.interestFrequency
                    ) ? (
                      <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl">
                        <p className="text-yellow-800 leading-relaxed">
                          <strong>
                            Đối với tiền gửi nhận lãi{" "}
                            {account.interestFrequency.toLowerCase()}:
                          </strong>{" "}
                          Tiền lãi đã nhận sẽ bị thu hồi khi rút trước hạn.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl">
                          <p className="text-red-800 leading-relaxed">
                            <strong>Áp dụng lãi suất không kỳ hạn:</strong>{" "}
                            Sweet sẽ tính lãi theo mức thấp hơn khi rút trước
                            hạn.
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                          <p className="text-green-800 leading-relaxed">
                            <strong>Nếu chờ đến cuối kỳ:</strong> Bạn có thể
                            nhận tổng số tiền đáo hạn là{" "}
                            <Skeleton isLoading={isLoading} width="w-24" height="h-4" className="inline-block">
                              {formatCurrency(account.totalReceivable)}
                            </Skeleton>.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Enhanced Confirmation Button - Fixed at the bottom */}
      <div className="absolute p-4 bottom-0 left-0 right-0 flex gap-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg animate-[fadeIn_0.4s_ease-in-out_0.4s_forwards] opacity-0 z-40 px-6">
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
          disabled={(withdrawalType === "partial" && !isValidAmount) || externalIsLoading}
          className={`flex-1 font-medium py-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
            (withdrawalType === "partial" && !isValidAmount) || externalIsLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 hover:shadow-xl"
          }`}
          whileHover={
            (withdrawalType !== "partial" || isValidAmount) && !externalIsLoading ? { scale: 1.02 } : {}
          }
          whileTap={
            (withdrawalType !== "partial" || isValidAmount) && !externalIsLoading ? { scale: 0.98 } : {}
          }
        >
          {externalIsLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Đang xử lý...
            </div>
          ) : (
            <>
              <ArrowUpRight size={18} className="mr-2" />
              Rút tiền ngay
            </>
          )}
        </motion.button>
      </div>

      {/* SwipeConfirmationModal */}
      {isAdmin && (
        <SwipeConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
          onConfirm={handleConfirmWithdrawal}
          title={`Xác nhận rút ${
            withdrawalType === "full" ? "toàn bộ" : "một phần"
          } tiền gửi`}
          description={`Bạn đang rút ${
            withdrawalType === "full"
              ? "toàn bộ"
              : formatCurrency(withdrawalData.withdrawAmount)
          } từ sổ tiết kiệm "${account.nickname}" vào ${
            selectedAccount === "cash"
              ? "tiền mặt tại quầy"
              : `tài khoản ${
                  paymentAccounts
                    .find((acc) => acc.id === selectedAccount)
                    ?.name.toLowerCase() || ""
                }`
          }.`}
          confirmText={`Vuốt để rút ${
            withdrawalType === "full" ? "toàn bộ" : "một phần"
          } tiền`}
          type="warning"
          icon={<ArrowUpRight className="h-6 w-6 text-amber-500" />}
          isProcessing={externalIsLoading}
          confirmDetails={{
            "Số tiền gốc": formatCurrency(withdrawalData.withdrawAmount),
            "Lãi rút trước hạn": formatCurrency(
              withdrawalData.withdrawalInterest
            ),
            "Tổng tiền nhận": formatCurrency(withdrawalData.totalWithdrawal),
            "Tài khoản nhận":
              selectedAccount === "cash"
                ? "Tiền mặt tại quầy"
                : `${
                    paymentAccounts.find((acc) => acc.id === selectedAccount)
                      ?.name
                  } (${
                    paymentAccounts.find((acc) => acc.id === selectedAccount)
                      ?.number
                  })`,
          }}
        />
      )}
    </div>
  );
};

export default EarlyWithdrawalPanel;