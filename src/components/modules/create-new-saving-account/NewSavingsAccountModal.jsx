'use client';

import React, { useState, useEffect } from 'react';
import { X, PiggyBank, Info, Calendar, DollarSign, TrendingUp, ChevronRight, ArrowRight, Check, CreditCard, Calculator, Shield, Sparkles, Wallet, Banknote, Percent, Clock, ClipboardCheck, AlertCircle, RefreshCcw, RotateCcw, RefreshCw, Star, PiggyBankIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/utils/accountUtils';
import MobileBottomCard from './MobileBottomCard';

// Định nghĩa các loại tiết kiệm có sẵn
const depositTypes = [
  'standard', // Tiêu chuẩn
  'flexible'  // Linh hoạt
];

// Định nghĩa tên hiển thị cho các loại tiết kiệm
const depositTypeDisplayNames = {
  'standard': 'Tiêu chuẩn',
  'flexible': 'Linh hoạt'
};

// Định nghĩa tên hiển thị cho các hình thức đáo hạn
const maturityOptionDisplayNames = {
  'receive_all': 'Tất toán phiếu gửi tiền',
  'rollover_principal': 'Tái tục gốc',
  'rollover_all': 'Tự động tái tục gốc và lãi'
};

// Định nghĩa các hình thức đáo hạn theo loại tiết kiệm
const maturityOptionsByDepositType = {
  standard: ['receive_all', 'rollover_principal', 'rollover_all'],
  flexible: ['receive_all', 'rollover_principal', 'rollover_all']
};

// Định nghĩa các hình thức đáo hạn khả dụng theo thời điểm nhận lãi
const availableMaturityOptionsByInterestPaymentType = {
  'end_of_term': ['receive_all', 'rollover_principal', 'rollover_all'],
  'monthly': ['receive_all', 'rollover_principal'],
  'quarterly': ['receive_all', 'rollover_principal'],
  'yearly': ['receive_all', 'rollover_principal']
};

const NewSavingsAccountModal = ({ isOpen, onClose, onCreateAccount, isAdmin=false }) => {
  const [step, setStep] = useState(1); // 1: Loại tiền gửi, 2: Tài khoản & số tiền, 3: Kỳ hạn & lãi suất, 4: Xác nhận
  const [formData, setFormData] = useState({
    nickname: '',
    amount: '',
    sourceAccount: '',
    targetAccount: '',
    term: '12_months', // Sử dụng định dạng giống như trong sweet-main
    interestRate: '6.8',
    depositType: 'standard', // standard hoặc flexible
    interestPaymentType: 'end_of_term', // end_of_term, monthly, quarterly, yearly
    maturityOption: 'rollover_principal' // receive_all, rollover_principal, rollover_all
  });

  const [formErrors, setFormErrors] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [calculatedInterest, setCalculatedInterest] = useState({
    rate: 0,
    interestAmount: 0,
    totalAmount: 0
  });

  const paymentAccounts = [
      {
      id: 1,
      accountNumber: "1234567890123456",
      status: "active",
      balance: 15000000,
      creationDate: "20/04/2022",
      color: "bg-gradient-to-r from-blue-400 to-indigo-500",
      icon: <CreditCard size={24} className="text-white" />
    }
  ];

  // Định nghĩa các kỳ hạn có sẵn theo loại trả lãi
const availableTermsByInterestType = {
  end_of_term: ["1_month", "3_months", "6_months", "9_months", "12_months", "18_months", "24_months", "36_months", "38_months"],
  monthly: ["3_months", "6_months", "9_months", "12_months", "18_months", "24_months", "36_months"],
  quarterly: ["6_months", "9_months", "12_months", "18_months", "24_months", "36_months"],
  yearly: ["12_months", "18_months", "24_months", "36_months"]
};

// Lãi suất mặc định theo kỳ hạn và loại tiền gửi
const interestRateData = {
  standard: {
    end_of_term: {
      "1_month": 3.1,
      "3_months": 3.4,
      "6_months": 4.8,
      "9_months": 5.0,
      "12_months": 6.8,
      "18_months": 6.9,
      "24_months": 7.1,
      "36_months": 18.2,
      "38_months": 20.2,
    },
    monthly: {
      "3_months": 3.3,
      "6_months": 4.6,
      "9_months": 4.8,
      "12_months": 6.5,
      "18_months": 6.6,
      "24_months": 6.8,
      "36_months": 6.9,
    },
    quarterly: {
      "6_months": 4.7,
      "9_months": 4.9,
      "12_months": 6.6,
      "18_months": 6.7,
      "24_months": 6.9,
      "36_months": 7.0,
    },
    yearly: {
      "12_months": 6.7,
      "18_months": 6.8,
      "24_months": 7.0,
      "36_months": 7.1,
    },
  },
  flexible: {
    end_of_term: {
      "1_month": 2.9,
      "3_months": 3.2,
      "6_months": 4.5,
      "9_months": 4.7,
      "12_months": 6.3,
      "18_months": 6.4,
      "24_months": 6.6,
      "36_months": 6.7,
    },
    monthly: {
      "3_months": 3.1,
      "6_months": 4.3,
      "9_months": 4.5,
      "12_months": 6.1,
      "18_months": 6.2,
      "24_months": 6.4,
      "36_months": 6.5,
    },
    quarterly: {
      "6_months": 4.4,
      "9_months": 4.6,
      "12_months": 6.2,
      "18_months": 6.3,
      "24_months": 6.5,
      "36_months": 6.6,
    },
    yearly: {
      "12_months": 6.2,
      "18_months": 6.3,
      "24_months": 6.5,
      "36_months": 6.6,
    },
  },
};

  // Term display names
  const termDisplayNames = {
    "1_month": "1 tháng",
    "3_months": "3 tháng",
    "6_months": "6 tháng",
    "9_months": "9 tháng",
    "12_months": "12 tháng",
    "18_months": "18 tháng",
    "24_months": "24 tháng",
    "36_months": "36 tháng",
    "38_months": "38 tháng"
  };
  
  // Interest payment type display names
  const interestPaymentTypeDisplayNames = {
    "end_of_term": "Cuối kỳ",
    "monthly": "Hàng tháng",
    "quarterly": "Hàng quý",
    "yearly": "Đầu kỳ hạn"
  };

  // Reset form khi đóng modal
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({
        nickname: '',
        amount: '',
        sourceAccount: '',
        targetAccount: '',
        term: '12_months',
        interestRate: '6.8',
        depositType: 'standard',
        interestPaymentType: 'end_of_term',
        maturityOption: 'rollover_principal'
      });
      setFormErrors({});
      setPreviewData(null);
    }
  }, [isOpen]);

  // Cập nhật lãi suất dựa trên kỳ hạn và loại tiền gửi
  useEffect(() => {
    // Lãi suất mặc định theo kỳ hạn
    let rate = '5.0';
    
    if (formData.term === '3 tháng') {
      rate = '5.0';
    } else if (formData.term === '6 tháng') {
      rate = '5.5';
    } else if (formData.term === '12 tháng') {
      rate = '6.8';
    } else if (formData.term === '24 tháng') {
      rate = '7.1';
    }
    
    // Điều chỉnh theo loại tiền gửi
    if (formData.depositType === 'Rút gốc linh hoạt') {
      // Giảm 0.2% cho loại rút gốc linh hoạt
      rate = (parseFloat(rate) - 0.2).toFixed(1);
    } else if (formData.depositType === 'Tiết kiệm trực tuyến') {
      // Tăng 0.1% cho tiết kiệm trực tuyến
      rate = (parseFloat(rate) + 0.1).toFixed(1);
    }
    
    setFormData(prev => ({ ...prev, interestRate: rate }));
  }, [formData.term, formData.depositType]);

  // Cập nhật useEffect để tính toán lãi suất khi thay đổi các thông số liên quan
  useEffect(() => {
    if (step >= 3 && formData.amount && parseInt(formData.amount) >= 100000) {
      calculateInterest();
    }
  }, [formData.term, formData.depositType, formData.interestPaymentType, formData.amount, step]);

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Xử lý đặc biệt cho trường số tiền
    if (name === 'amount') {
      // Chỉ cho phép nhập số
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Hàm xử lý thay đổi form data
  const handleFormDataChange = (name, value) => {
    // Cập nhật giá trị được thay đổi
    setFormData(prev => {
      const newFormData = { ...prev, [name]: value };
      
      // Nếu thay đổi interestPaymentType, kiểm tra và cập nhật maturityOption nếu cần
      if (name === "interestPaymentType") {
        // Lấy danh sách hình thức đáo hạn khả dụng cho loại thanh toán lãi mới
        const availableOptions = availableMaturityOptionsByInterestPaymentType[value];
        
        // Kiểm tra xem hình thức đáo hạn hiện tại có hợp lệ với loại thanh toán lãi mới không
        if (!availableOptions.includes(newFormData.maturityOption)) {
          // Nếu không hợp lệ, chọn hình thức đáo hạn đầu tiên trong danh sách khả dụng
          newFormData.maturityOption = availableOptions[0];
        }
      }
      
      return newFormData;
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.nickname && step === 4) {
      // Chỉ validate nickname ở bước 4
      errors.nickname = 'Vui lòng nhập tên tài khoản tiết kiệm';
    }
    
    if (step >= 2) {
      // Validate tài khoản và số tiền ở bước 2 trở đi
      if (!formData.sourceAccount) {
        errors.sourceAccount = 'Vui lòng chọn tài khoản nguồn';
      }
      
      if (!formData.targetAccount) {
        errors.targetAccount = 'Vui lòng chọn tài khoản nhận';
      }
      
      if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
        errors.amount = 'Vui lòng nhập số tiền hợp lệ';
      } else if (parseFloat(formData.amount) < 100000) {
        errors.amount = 'Số tiền tối thiểu là 100.000đ';
      }
      
      // Kiểm tra số dư tài khoản nếu không phải là tiền mặt tại quầy
      if (formData.sourceAccount && formData.sourceAccount !== 'cash_at_counter' && formData.amount) {
        const selectedAccount = paymentAccounts.find(acc => acc.id === parseInt(formData.sourceAccount));
        if (selectedAccount && parseFloat(formData.amount) > selectedAccount.balance) {
          errors.amount = 'Số dư tài khoản không đủ để thực hiện giao dịch';
        }
      }
    }
    
    return errors;
  };

  // Xử lý chuyển bước
  const handleNextStep = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
      
      // Nếu chuyển sang bước 3, tính toán lãi suất
      if (step === 2) {
        calculateInterest();
      }
      
      // Nếu chuyển sang bước 4, tạo dữ liệu xem trước
      if (step === 3) {
        generatePreviewData();
      }
    }
  };

  // Xử lý quay lại bước trước
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Xử lý xác nhận mở tài khoản
  const handleConfirm = () => {
    // Tạo dữ liệu xem trước
    generatePreviewData();
    
    // Nếu không có nickname, sử dụng tên mặc định
    const finalData = { ...formData };
    if (!finalData.nickname || finalData.nickname.trim() === '') {
      // Sử dụng tên mặc định là "Tiết kiệm [kỳ hạn]" hoặc "Tiết kiệm ngày [ngày hiện tại]"
      const today = new Date();
      const dateStr = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
      finalData.nickname = `Tiết kiệm ${termDisplayNames[finalData.term]} - ${dateStr}`;
    }
    
    // Gọi callback với dữ liệu đã được chuẩn hóa
    onCreateAccount(finalData, calculatedInterest);
  };

  // Tính toán lãi suất và tiền lãi
  const calculateInterest = () => {
    const { depositType, interestPaymentType, term, amount } = formData;
    
    // Lấy lãi suất từ dữ liệu
    const interestRate = interestRateData[depositType][interestPaymentType][term] || 0;
    
    // Tính số tiền lãi
    const amountValue = parseFloat(amount) || 0;
    let interestAmount = 0;
    const termMonths = parseInt(term.split('_')[0]) || (term === "1_month" ? 1 : 0);
    
    // Tính lãi theo phương thức trả lãi
    if (interestPaymentType === "end_of_term") {
      interestAmount = (amountValue * interestRate * termMonths / 12) / 100;
    } else {
      const periodsPerYear = interestPaymentType === "monthly" ? 12 : 
                            interestPaymentType === "quarterly" ? 4 : 1;
      
      const periodsTotal = periodsPerYear * termMonths / 12;
      const ratePerPeriod = interestRate / periodsPerYear / 100;
      
      interestAmount = 0;
      let remainingPrincipal = amountValue;
      
      for (let i = 1; i <= periodsTotal; i++) {
        const periodInterest = remainingPrincipal * ratePerPeriod;
        interestAmount += periodInterest;
      }
    }
    
    // Cập nhật state
    setCalculatedInterest({
      rate: interestRate,
      interestAmount: interestAmount,
      totalAmount: amountValue + interestAmount
    });
    
    // Cập nhật lãi suất trong formData
    setFormData(prev => ({ ...prev, interestRate: interestRate.toString() }));
  };

  // Tạo dữ liệu xem trước
  const generatePreviewData = () => {
    // Tính ngày đáo hạn
    const startDate = new Date();
    let endDate = new Date(startDate);
    
    // Xử lý term để lấy số tháng
    let termMonths = 0;
    if (formData.term === '1_month') {
      termMonths = 1;
    } else {
      // Lấy số từ chuỗi như "12_months" -> 12
      const match = formData.term.match(/^(\d+)_/);
      if (match && match[1]) {
        termMonths = parseInt(match[1]);
      }
    }
    
    // Tính ngày đáo hạn
    endDate.setMonth(endDate.getMonth() + termMonths);
    const termDays = Math.round(termMonths * 30.4167); // Ước tính số ngày
    
    // Format dates
    const formatDate = (date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };
    
    // Tính lãi dự kiến
    const amount = parseFloat(formData.amount);
    const interestRate = parseFloat(formData.interestRate);
    const expectedInterest = calculatedInterest.interestAmount;
    
    setPreviewData({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      termDays: termDays,
      amount: amount,
      expectedInterest: expectedInterest,
      totalReceivable: amount + expectedInterest
    });
  };

  // Hàm để ẩn số tài khoản
  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return '';
    const lastFourDigits = accountNumber.slice(-4);
    return '•••• •••• •••• ' + lastFourDigits;
  };

  if (!isOpen) return null;

  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl border border-pink-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-pink-500 to-rose-400 text-white">
              {/* Background effects - more subtle */}
              <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full bg-pink-300/20 blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-[-20px] left-[-20px] w-[100px] h-[100px] rounded-full bg-purple-300/20 blur-2xl pointer-events-none"></div>

              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <PiggyBank size={18} className="text-white" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-wide">
                    Mở tài khoản tiền gửi
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full h-8 w-8 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-200 border border-white/30 backdrop-blur-sm"
                  aria-label="Đóng"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              {/* Progress Steps - Modern Style */}
              {step !== 4 && (
                <div className="flex justify-between mt-4 relative z-10">
                  <div className="flex items-start w-full gap-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-xl ${
                          step >= 1
                            ? "bg-white text-pink-500 shadow-md"
                            : "bg-white/20 text-white/80 border border-white/30"
                        } flex items-center justify-center font-medium text-sm mb-1.5 backdrop-blur-sm transition-all duration-300`}
                      >
                        {step > 1 ? <Check size={18} /> : "1"}
                      </div>
                      <span className="text-xs text-white/90 font-medium text-center w-16">
                        Loại tiền gửi
                      </span>
                    </div>
                    <div
                      className={`h-0.5 flex-grow mx-1 self-center ${
                        step >= 2 ? "bg-white" : "bg-white/20"
                      } transition-all duration-300`}
                    ></div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-xl ${
                          step >= 2
                            ? "bg-white text-pink-500 shadow-md"
                            : "bg-white/20 text-white/80 border border-white/30"
                        } flex items-center justify-center font-medium text-sm mb-1.5 backdrop-blur-sm transition-all duration-300`}
                      >
                        {step > 2 ? <Check size={16} /> : "2"}
                      </div>
                      <span className="text-xs text-white/90 font-medium text-center w-16">
                        Tài khoản & số tiền
                      </span>
                    </div>
                    <div
                      className={`h-0.5 flex-grow mx-1 self-center ${
                        step >= 3 ? "bg-white" : "bg-white/20"
                      } transition-all duration-300`}
                    ></div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-xl ${
                          step >= 3
                            ? "bg-white text-pink-500 shadow-md"
                            : "bg-white/20 text-white/80 border border-white/30"
                        } flex items-center justify-center font-medium text-sm mb-1.5 backdrop-blur-sm transition-all duration-300`}
                      >
                        {step > 3 ? <Check size={16} /> : "3"}
                      </div>
                      <span className="text-xs text-white/90 font-medium text-center w-16">
                        Kỳ hạn & lãi suất
                      </span>
                    </div>
                    <div
                      className={`h-0.5 flex-grow mx-1 self-center ${
                        step >= 4 ? "bg-white" : "bg-white/20"
                      } transition-all duration-300`}
                    ></div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-xl ${
                          step >= 4
                            ? "bg-white text-pink-500 shadow-md"
                            : "bg-white/20 text-white/80 border border-white/30"
                        } flex items-center justify-center font-medium text-sm mb-1.5 backdrop-blur-sm transition-all duration-300`}
                      >
                        {step >= 4 ? <Check size={16} /> : "4"}
                      </div>
                      <span className="text-xs text-white/90 font-medium text-center w-16">
                        Xác nhận
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form content container - Modern Style */}
            <div className="md:px-8 p-5 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent relative">
              {/* Subtle background decorations */}
              <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-gradient-to-r from-pink-100/20 to-rose-100/20 rounded-full blur-3xl pointer-events-none opacity-70"></div>
              <div className="absolute bottom-20 left-10 w-[150px] h-[150px] bg-gradient-to-r from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl pointer-events-none opacity-70"></div>
              {/* Step 1: Select Deposit Type - Modern Style */}
              {step === 1 && (
                <motion.div
                  className="relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-400 rounded-xl flex items-center justify-center shadow-md">
                      <PiggyBank size={16} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Chọn loại tiền gửi tiết kiệm
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    {/* Standard Deposit - Modern Style */}
                    <motion.div
                      variants={itemVariants}
                      className={`relative group p-5 rounded-3xl border-2 transition-all duration-500 ${
                        formData.depositType === "standard"
                          ? "border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg shadow-pink-200/30"
                          : "border-gray-200 bg-white/80 hover:border-pink-200 hover:bg-pink-50/30"
                      }`}
                      onClick={() =>
                        handleFormDataChange("depositType", "standard")
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              formData.depositType === "standard"
                                ? "bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg"
                                : "bg-gray-100 group-hover:bg-pink-100"
                            }`}
                          >
                            <Shield
                              size={20}
                              className={
                                formData.depositType === "standard"
                                  ? "text-white"
                                  : "text-gray-600"
                              }
                            />
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-gray-800 text-base">
                              Tiền gửi tiêu chuẩn
                            </h4>
                            <p className="text-sm text-gray-600">
                              Lãi suất cao nhất, cam kết dài hạn
                            </p>
                          </div>
                        </div>
                        {formData.depositType === "standard" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center"
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-100 text-xs text-gray-600 space-y-2">
                        <div className="flex items-center gap-2">
                          <Percent size={14} className="text-pink-500" />
                          <p>Lãi suất cao nhất tới 7.2%/năm</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-pink-500" />
                          <p>Rút tiền trước hạn: lãi suất không kỳ hạn</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield size={14} className="text-pink-500" />
                          <p>Phù hợp với kế hoạch dài hạn, ổn định</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Flexible Deposit - Modern Style */}
                    <motion.div
                      variants={itemVariants}
                      className={`relative group p-5 rounded-3xl border-2 transition-all duration-500 ${
                        formData.depositType === "flexible"
                          ? "border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg shadow-pink-200/30"
                          : "border-gray-200 bg-white/80 hover:border-pink-200 hover:bg-pink-50/30"
                      }`}
                      onClick={() =>
                        handleFormDataChange("depositType", "flexible")
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              formData.depositType === "flexible"
                                ? "bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg"
                                : "bg-gray-100 group-hover:bg-pink-100"
                            }`}
                          >
                            <Sparkles
                              size={20}
                              className={
                                formData.depositType === "flexible"
                                  ? "text-white"
                                  : "text-gray-600"
                              }
                            />
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-800 text-base">
                                Tiền gửi linh hoạt
                              </h4>
                              <span className="px-2 py-0.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs rounded-full font-medium shadow-sm">
                                Phổ biến
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Rút tiền linh hoạt khi cần
                            </p>
                          </div>
                        </div>
                        {formData.depositType === "flexible" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center"
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-100 text-xs text-gray-600 space-y-2">
                        <div className="flex items-center gap-2">
                          <Wallet size={14} className="text-pink-500" />
                          <p>Rút tiền linh hoạt không mất lãi</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Percent size={14} className="text-pink-500" />
                          <p>Lãi suất hấp dẫn tới 6.8%/năm</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles size={14} className="text-pink-500" />
                          <p>Phù hợp khi cần tiền đột xuất</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Select Accounts and Amount - Modern Style */}
              {step === 2 && (
                <motion.div
                className="relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Glass Header with Liquid Effect */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-400/20 to-rose-500/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/10 to-rose-400/20 rounded-2xl sm:rounded-3xl animate-pulse"></div>
                      <Wallet size={18} className="text-pink-100 relative z-10 sm:w-5 sm:h-5" />
                    </div>
                    {/* Liquid drops effect */}
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-60 animate-bounce [animation-delay:0.5s]"></div>
                    <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full opacity-40 animate-bounce [animation-delay:1s]"></div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Thông tin tài khoản và số tiền
                  </h3>
                </div>
              
                <div className="space-y-6 sm:space-y-8 mb-6">
                  {/* Source Account - Liquid Glass Style */}
                  <motion.div variants={itemVariants}>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-sm font-semibold text-slate-700 mb-3 sm:mb-4">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-md sm:rounded-lg flex items-center justify-center">
                        <CreditCard size={8} className="text-white sm:w-2.5 sm:h-2.5" />
                      </div>
                      Tài khoản nguồn
                      <span className="text-pink-500">*</span>
                    </label>
                    
                    <div className="overflow-x-auto pb-3 sm:pb-4 -mx-1 sm:-mx-2 px-1 sm:px-2">
                      <div className="flex gap-3 sm:gap-4">
                        {/* Cash at counter - Mobile Optimized */}
                        {isAdmin && (
                          <motion.div
                            whileHover={{ 
                              scale: 1.02,
                              rotateY: 2,
                              transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex-shrink-0 w-52 sm:w-64 relative group cursor-pointer transition-all duration-500 ${
                              formData.sourceAccount === "cash_at_counter" ? "z-10" : ""
                            }`}
                            onClick={() =>
                              handleFormDataChange("sourceAccount", "cash_at_counter")
                            }
                          >
                            {/* Glass container */}
                            <div className={`
                              relative backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500
                              ${formData.sourceAccount === "cash_at_counter" 
                                ? "bg-gradient-to-br from-amber-100/40 to-orange-200/30 border-2 border-amber-300/50 shadow-2xl shadow-amber-200/30" 
                                : "bg-white/20 border border-white/30 hover:bg-amber-50/20 hover:border-amber-200/40"
                              }
                            `}>
                              {/* Liquid effect background */}
                              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                                <div className={`
                                  absolute inset-0 opacity-30 transition-all duration-700
                                  ${formData.sourceAccount === "cash_at_counter"
                                    ? "bg-gradient-to-br from-amber-200/60 via-orange-200/40 to-amber-300/50 animate-pulse"
                                    : "bg-gradient-to-br from-white/10 to-pink-100/10"
                                  }
                                `}></div>
                                {/* Floating liquid bubbles */}
                                {formData.sourceAccount === "cash_at_counter" && (
                                  <>
                                    <div className="absolute top-3 right-4 sm:top-4 sm:right-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-300/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-300/60 rounded-full animate-bounce [animation-delay:0.8s]"></div>
                                  </>
                                )}
                              </div>
              
                              <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                  <div className={`
                                    w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex-shrink-0 transition-all duration-500 flex items-center justify-center
                                    ${formData.sourceAccount === "cash_at_counter"
                                      ? "bg-gradient-to-br from-amber-400/80 to-orange-500/80 shadow-lg backdrop-blur-sm"
                                      : "bg-amber-100/60 backdrop-blur-sm"
                                    }
                                  `}>
                                    <DollarSign
                                      size={18}
                                      className={
                                        formData.sourceAccount === "cash_at_counter"
                                          ? "text-white"
                                          : "text-amber-600"
                                      }
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm sm:text-base font-semibold text-slate-800 mb-0.5 sm:mb-1 truncate">
                                      Tiền mặt tại quầy
                                    </div>
                                    <div className="text-xs sm:text-sm text-slate-600/80 truncate">
                                      Gửi tiền mặt trực tiếp
                                    </div>
                                  </div>
                                </div>
                                {formData.sourceAccount === "cash_at_counter" && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                    className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm flex-shrink-0"
                                  >
                                    <Check size={12} className="text-white sm:w-4 sm:h-4" />
                                  </motion.div>
                                )}
                              </div>
                            </div>
              
                            {/* Glass reflection effect */}
                            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-white/20 to-transparent opacity-60 pointer-events-none"></div>
                          </motion.div>
                        )}
              
                        {/* Payment accounts - Mobile Optimized with Pink Theme */}
                        {paymentAccounts
                          .filter((account) => account.status === "active")
                          .map((account) => (
                            <motion.div
                              key={account.id}
                              whileHover={{ 
                                scale: 1.02,
                                rotateY: 2,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                              }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex-shrink-0 w-52 sm:w-64 relative group cursor-pointer transition-all duration-500 ${
                                formData.sourceAccount === account.id.toString() ? "z-10" : ""
                              }`}
                              onClick={() =>
                                handleFormDataChange("sourceAccount", account.id.toString())
                              }
                            >
                              {/* Glass container */}
                              <div className={`
                                relative backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500
                                ${formData.sourceAccount === account.id.toString()
                                  ? "bg-gradient-to-br from-pink-100/40 to-rose-200/30 border-2 border-pink-300/50 shadow-2xl shadow-pink-200/30" 
                                  : "bg-white/20 border border-white/30 hover:bg-pink-50/20 hover:border-pink-200/40"
                                }
                              `}>
                                {/* Liquid effect background */}
                                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                                  <div className={`
                                    absolute inset-0 opacity-30 transition-all duration-700
                                    ${formData.sourceAccount === account.id.toString()
                                      ? "bg-gradient-to-br from-pink-200/60 via-rose-200/40 to-pink-300/50 animate-pulse"
                                      : "bg-gradient-to-br from-white/10 to-slate-100/10"
                                    }
                                  `}></div>
                                  {/* Floating liquid bubbles */}
                                  {formData.sourceAccount === account.id.toString() && (
                                    <>
                                      <div className="absolute top-3 right-4 sm:top-4 sm:right-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300/60 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                                      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-rose-300/60 rounded-full animate-bounce [animation-delay:0.9s]"></div>
                                    </>
                                  )}
                                </div>
              
                                <div className="relative z-10">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm sm:text-base font-semibold text-slate-800 truncate pr-2">
                                      {account.nickname}
                                    </div>
                                    {formData.sourceAccount === account.id.toString() && (
                                      <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                        className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm flex-shrink-0"
                                      >
                                        <Check size={12} className="text-white sm:w-4 sm:h-4" />
                                      </motion.div>
                                    )}
                                  </div>
                                  <div className="text-xs sm:text-sm text-slate-600/80 mb-2 truncate">
                                    {maskAccountNumber(account.accountNumber)}
                                  </div>
                                  <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                                    {formatCurrency(account.balance)}
                                  </div>
                                </div>
                              </div>
              
                              {/* Glass reflection effect */}
                              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-white/20 to-transparent opacity-60 pointer-events-none"></div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                    
                    {formErrors.sourceAccount && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-xs sm:text-sm text-red-500 flex items-center gap-1.5 sm:gap-2 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3"
                      >
                        <AlertCircle size={14} className="flex-shrink-0" />
                        <span className="break-words">{formErrors.sourceAccount}</span>
                      </motion.p>
                    )}
                  </motion.div>
              
                  {/* Target Account - Pink Theme Mobile Optimized */}
                  <motion.div variants={itemVariants}>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-sm font-semibold text-slate-700 mb-3 sm:mb-4">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-gradient-to-br from-rose-400 to-pink-500 rounded-md sm:rounded-lg flex items-center justify-center">
                        <CreditCard size={8} className="text-white sm:w-2.5 sm:h-2.5" />
                      </div>
                      Tài khoản nhận tiền
                      <span className="text-rose-500">*</span>
                    </label>
                    
                    <div className="overflow-x-auto pb-3 sm:pb-4 -mx-1 sm:-mx-2 px-1 sm:px-2">
                      <div className="flex gap-3 sm:gap-4">
                        {paymentAccounts
                          .filter((account) => account.status === "active")
                          .map((account) => (
                            <motion.div
                              key={account.id}
                              whileHover={{ 
                                scale: 1.02,
                                rotateY: 2,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                              }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex-shrink-0 w-52 sm:w-64 relative group cursor-pointer transition-all duration-500 ${
                                formData.targetAccount === account.id.toString() ? "z-10" : ""
                              }`}
                              onClick={() =>
                                handleFormDataChange("targetAccount", account.id.toString())
                              }
                            >
                              {/* Glass container */}
                              <div className={`
                                relative backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500
                                ${formData.targetAccount === account.id.toString()
                                  ? "bg-gradient-to-br from-rose-100/40 to-pink-200/30 border-2 border-rose-300/50 shadow-2xl shadow-rose-200/30" 
                                  : "bg-white/20 border border-white/30 hover:bg-rose-50/20 hover:border-rose-200/40"
                                }
                              `}>
                                {/* Liquid effect background */}
                                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                                  <div className={`
                                    absolute inset-0 opacity-30 transition-all duration-700
                                    ${formData.targetAccount === account.id.toString()
                                      ? "bg-gradient-to-br from-rose-200/60 via-pink-200/40 to-rose-300/50 animate-pulse"
                                      : "bg-gradient-to-br from-white/10 to-slate-100/10"
                                    }
                                  `}></div>
                                  {/* Floating liquid bubbles */}
                                  {formData.targetAccount === account.id.toString() && (
                                    <>
                                      <div className="absolute top-3 right-4 sm:top-4 sm:right-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-300/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-pink-300/60 rounded-full animate-bounce [animation-delay:1.2s]"></div>
                                    </>
                                  )}
                                </div>
              
                                <div className="relative z-10">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm sm:text-base font-semibold text-slate-800 truncate pr-2">
                                      {account.nickname}
                                    </div>
                                    {formData.targetAccount === account.id.toString() && (
                                      <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                        className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm flex-shrink-0"
                                      >
                                        <Check size={12} className="text-white sm:w-4 sm:h-4" />
                                      </motion.div>
                                    )}
                                  </div>
                                  <div className="text-xs sm:text-sm text-slate-600/80 truncate">
                                    {maskAccountNumber(account.accountNumber)}
                                  </div>
                                </div>
                              </div>
              
                              {/* Glass reflection effect */}
                              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-white/20 to-transparent opacity-60 pointer-events-none"></div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                    
                    {formErrors.targetAccount && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-xs sm:text-sm text-red-500 flex items-center gap-1.5 sm:gap-2 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3"
                      >
                        <AlertCircle size={14} className="flex-shrink-0" />
                        <span className="break-words">{formErrors.targetAccount}</span>
                      </motion.p>
                    )}
                  </motion.div>
              
                  {/* Amount Input - Pink Theme Mobile Optimized */}
                  <motion.div variants={itemVariants}>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-sm font-semibold text-slate-700 mb-3 sm:mb-4">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-md sm:rounded-lg flex items-center justify-center">
                        <Banknote size={8} className="text-white sm:w-2.5 sm:h-2.5" />
                      </div>
                      Số tiền gửi
                      <span className="text-pink-500">*</span>
                      <span className="text-slate-500 text-xs block sm:hidden">
                        (Tối thiểu 100.000đ)
                      </span>
                      <span className="text-slate-500 text-xs hidden sm:inline">
                        (Tối thiểu 100.000đ)
                      </span>
                    </label>
                    
                    <div className="relative group">
                      {/* Glass container for input */}
                      <div className="relative backdrop-blur-2xl bg-white/30 border-2 border-white/40 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/40 hover:border-pink-200/60 focus-within:bg-white/50 focus-within:border-pink-300/80 focus-within:shadow-2xl focus-within:shadow-pink-200/30">
                        {/* Liquid background effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-rose-100/10 to-pink-100/20 opacity-50"></div>
                        
                        {/* Icon container */}
                        <div className="absolute inset-y-0 left-4 sm:left-6 flex items-center pointer-events-none">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-400/80 to-rose-500/80 backdrop-blur-sm border-2 border-pink-300/60 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                            <PiggyBankIcon size={16} className="text-white sm:w-5 sm:h-5" />
                          </div>
                        </div>
                        
                        <input
                          type="text"
                          value={formData.amount}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^\d]/g, "");
                            handleFormDataChange("amount", value);
                          }}
                          placeholder="Nhập số tiền"
                          className={`
                            relative z-10 block w-full pl-16 sm:pl-24 pr-16 sm:pr-20 py-4 sm:py-6 text-lg sm:text-xl font-semibold
                            bg-transparent border-0 outline-none transition-all duration-300
                            placeholder:text-slate-500/60 text-slate-800
                            ${formErrors.amount ? "text-red-600" : ""}
                          `}
                        />
                        
                        {/* Currency label */}
                        <div className="absolute inset-y-0 right-3 sm:right-6 flex items-center pointer-events-none">
                          <span className="text-sm sm:text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent px-2 sm:px-4 py-1 sm:py-2 bg-white/40 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                            VND
                          </span>
                        </div>
              
                        {/* Floating liquid particles */}
                        <div className="absolute top-3 right-16 sm:top-4 sm:right-20 w-1 h-1 sm:w-1 sm:h-1 bg-pink-400/60 rounded-full animate-bounce [animation-delay:0.5s]"></div>
                        <div className="absolute bottom-3 left-16 sm:bottom-4 sm:left-20 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-rose-400/60 rounded-full animate-bounce [animation-delay:1.5s]"></div>
                      </div>
                    </div>
              
                    <AnimatePresence>
                      {formErrors.amount ? (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-3 text-xs sm:text-sm text-red-500 flex items-center gap-1.5 sm:gap-2 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3"
                        >
                          <AlertCircle size={14} className="flex-shrink-0" />
                          <span className="break-words">{formErrors.amount}</span>
                        </motion.p>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-3 text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 sm:gap-2 bg-slate-50/60 backdrop-blur-sm border border-slate-200/40 rounded-xl sm:rounded-2xl p-2.5 sm:p-3"
                        >
                          {formData.sourceAccount &&
                            formData.sourceAccount !== "cash_at_counter" && (
                              <>
                                <Wallet size={14} className="text-slate-500 flex-shrink-0" />
                                <span className="truncate">
                                  Số dư khả dụng:{" "}
                                  <span className="font-semibold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                                    {formatCurrency(
                                      paymentAccounts.find(
                                        (acc) => acc.id === parseInt(formData.sourceAccount)
                                      )?.balance || 0
                                    )}
                                  </span>
                                </span>
                              </>
                            )}
                        </motion.p>
                      )}
                    </AnimatePresence>
              
                    {/* Amount Display - Pink Theme Mobile Optimized */}
                    <AnimatePresence>
                      {formData.amount && parseInt(formData.amount) > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: -20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -20 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="mt-4 relative group"
                        >
                          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-pink-100/40 to-rose-200/30 border-2 border-pink-300/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl shadow-pink-200/30 overflow-hidden">
                            {/* Liquid background animation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-rose-200/20 to-pink-300/30 animate-pulse opacity-60"></div>
                            
                            {/* Floating particles */}
                            <div className="absolute top-2 right-4 sm:top-3 sm:right-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                            <div className="absolute bottom-2 left-4 sm:bottom-3 sm:left-6 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-rose-400/60 rounded-full animate-bounce [animation-delay:0.8s]"></div>
                            
                            <div className="relative z-10 flex flex-row   justify-between gap-0">
                              <span className="text-sm sm:text-lg font-semibold text-slate-700">Số tiền gửi:</span>
                              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 bg-clip-text text-transparent break-all">
                                {formatCurrency(parseInt(formData.amount))}
                              </span>
                            </div>
                            
                            {/* Glass reflection */}
                            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-white/30 to-transparent opacity-70 pointer-events-none"></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
              )}

              {/* Step 3: Interest and Term Options */}
              {step === 3 && (
                <div className="animate-fadeInSlideUp pb-24 md:pb-0">
                {/* Header với liquid glass effect */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-8 h-8 rounded-xl overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/30 via-white/20 to-white/10 border border-white/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/60 to-rose-400/60" />
                    <div className="relative flex items-center justify-center h-full">
                      <Clock size={16} className="text-white drop-shadow-sm" />
                    </div>
                    {/* Liquid highlight */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Kỳ hạn và lãi suất
                  </h3>
                </div>
              
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Interest Payment Type */}
                    <motion.div variants={itemVariants}>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                        <div className="relative w-5 h-5 rounded-lg overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/30 via-white/20 to-white/10 border border-white/20">
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/60 to-rose-500/60" />
                          <div className="relative flex items-center justify-center h-full">
                            <Sparkles size={12} className="text-white drop-shadow-sm" />
                          </div>
                          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg" />
                        </div>
                        Thời điểm nhận lãi
                      </label>
                      <div className="space-y-3">
                        {Object.entries(interestPaymentTypeDisplayNames).map(
                          ([key, displayName], index) => (
                            <motion.div
                              key={key}
                              className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-500 cursor-pointer ${
                                formData.interestPaymentType === key
                                  ? "bg-gradient-to-br from-pink-200/40 via-pink-600/30 to-pink-200/20 border-white/30 shadow-[0_0px_25px_5px_rgba(255,192,203,0.7)] shadow-pink-500/50"
                                  : "bg-gradient-to-br from-white/20 via-white/15 to-white/10 border-white/20 hover:border-white/30 hover:bg-gradient-to-br hover:from-white/30 hover:via-white/25 hover:to-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]"
                              }`}
                              onClick={() => {
                                handleFormDataChange("interestPaymentType", key);
                                if (
                                  !availableTermsByInterestType[key].includes(formData.term)
                                ) {
                                  handleFormDataChange(
                                    "term",
                                    availableTermsByInterestType[key][0]
                                  );
                                }
                              }}
                              variants={itemVariants}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Liquid glass reflections */}
                              <div className="absolute inset-0 rounded-2xl">
                                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl" />
                                <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-white/20 to-transparent rounded-br-2xl" />
                              </div>
              
                             
              
                              <div className="flex items-start gap-4 relative z-10 p-4">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 backdrop-blur-md border border-white/20 shadow-[0_8px_25px_0px_rgba(255,192,203,0.7)] ${
                                    formData.interestPaymentType === key
                                      ? "bg-gradient-to-br from-pink-400/80 to-rose-500/80"
                                      : "bg-gradient-to-br from-white/30 to-white/10 group-hover:from-pink-100/50 group-hover:to-pink-200/30"
                                  }`}
                                >
                                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                                  {formData.interestPaymentType === key && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="relative z-10"
                                    >
                                      <Check size={14} className="text-white drop-shadow-sm" />
                                    </motion.div>
                                  )}
                                </div>
              
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-gray-800 drop-shadow-sm">
                                      {displayName}
                                    </span>
                                    {key === "yearly" && (
                                      <span className="px-2 py-0.5 backdrop-blur-md bg-gradient-to-r from-orange-400/80 to-orange-500/80 border border-white/20 text-white text-xs rounded-full font-medium shadow-[0_8px_25px_0px_rgba(255,192,203,0.7)]">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
                                        <span className="relative">Mới</span>
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 leading-relaxed drop-shadow-sm">
                                    {key === "end_of_term" &&
                                      "Nhận lãi vào cuối kỳ hạn - Tối ưu cho tích lũy dài hạn"}
                                    {key === "monthly" &&
                                      "Nhận lãi hàng tháng - Phù hợp với chi tiêu thường xuyên"}
                                    {key === "quarterly" &&
                                      "Nhận lãi hàng quý - Cân bằng giữa thanh khoản và lợi nhuận"}
                                    {key === "yearly" &&
                                      "Nhận lãi ngay sau khi gửi - Linh hoạt tối đa"}
                                  </p>
                                  {(key === "monthly" ||
                                    key === "quarterly" ||
                                    key === "yearly") && (
                                    <div className="mt-2 p-2 backdrop-blur-md bg-gradient-to-br from-pink-50/80 to-rose-50/80 border border-pink-200/30 rounded-lg">
                                      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent" />
                                      <p className="text-xs text-pink-700 flex items-center gap-1 relative">
                                        <AlertCircle size={12} />
                                        Rút tiền trước hạn cần trả lại số lãi đã nhận
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    </motion.div>
              
                    {/* Maturity Options */}
                    <motion.div variants={itemVariants} className="lg:block">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                        <div className="relative w-5 h-5 rounded-lg overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/30 via-white/20 to-white/10 border border-white/20 shadow-[0_8px_25px_0px_rgba(255,192,203,0.7)]">
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/60 to-rose-500/60" />
                          <div className="relative flex items-center justify-center h-full">
                            <RotateCcw size={12} className="text-white drop-shadow-sm" />
                          </div>
                          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg" />
                        </div>
                        Phương thức đáo hạn
                      </label>
                      <div className="space-y-3">
                        {availableMaturityOptionsByInterestPaymentType[
                          formData.interestPaymentType
                        ].map((option) => (
                          <motion.div
                            key={option}
                            className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-500 cursor-pointer ${
                              formData.maturityOption === option
                                ? "bg-gradient-to-br from-pink-200/40 via-pink-600/30 to-pink-200/20 border-white/30 shadow-[0_0px_25px_5px_rgba(255,192,203,0.7)] shadow-pink-500/50"
                                : "bg-gradient-to-br from-white/20 via-white/15 to-white/10 border-white/20 hover:border-white/30 hover:bg-gradient-to-br hover:from-white/30 hover:via-white/25 hover:to-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]"
                            }`}
                            onClick={() => handleFormDataChange("maturityOption", option)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Liquid glass reflections */}
                            <div className="absolute inset-0 rounded-2xl">
                              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl" />
                              <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-white/20 to-transparent rounded-br-2xl" />
                            </div>
              
                            <div className="flex items-center gap-4 relative z-10 p-4">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 shadow-[0_0px_25px_5px_rgba(255,192,203,0.7)] ${
                                  formData.maturityOption === option
                                    ? "bg-gradient-to-br from-pink-400/80 to-rose-500/80"
                                    : "bg-gradient-to-br from-white/30 to-white/10 group-hover:from-pink-100/50 group-hover:to-pink-200/30"
                                }`}
                              >
                                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                                {formData.maturityOption === option && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="relative z-10"
                                  >
                                    <Check size={14} className="text-white drop-shadow-sm" />
                                  </motion.div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-gray-800 drop-shadow-sm">
                                    {maturityOptionDisplayNames[option]}
                                  </span>
                                  {option === "receive_all" && (
                                    <Wallet size={14} className="text-pink-500 drop-shadow-sm" />
                                  )}
                                  {option === "rollover_principal" && (
                                    <RefreshCw size={14} className="text-pink-500 drop-shadow-sm" />
                                  )}
                                  {option === "rollover_all" && (
                                    <RefreshCcw size={14} className="text-pink-500 drop-shadow-sm" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 drop-shadow-sm">
                                  {option === "receive_all" &&
                                    "Nhận toàn bộ tiền gốc và lãi khi đáo hạn"}
                                  {option === "rollover_principal" &&
                                    "Nhận lãi và tự động gửi lại tiền gốc"}
                                  {option === "rollover_all" &&
                                    "Tự động gửi lại cả gốc và lãi khi đáo hạn"}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
              
                  {/* Right Column */}
                  <div className="space-y-5">
                    {/* Term & Interest Rate */}
                    <motion.div variants={itemVariants}>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                        <div className="relative w-5 h-5 rounded-lg overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/30 via-white/20 to-white/10 border border-white/20 shadow-[0_0px_25px_5px_rgba(255,192,203,0.7)]">
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/60 to-rose-500/60" />
                          <div className="relative flex items-center justify-center h-full">
                            <Percent size={12} className="text-white drop-shadow-sm" />
                          </div>
                          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg" />
                        </div>
                        Kỳ hạn & lãi suất theo năm
                      </label>
              
                      <div className="grid grid-cols-2 gap-3">
                        {(() => {
                          const availableTerms =
                            availableTermsByInterestType[formData.interestPaymentType];
                          const termRates = availableTerms.map((term) => {
                            const interestRate =
                              interestRateData[formData.depositType][
                                formData.interestPaymentType
                              ][term] || 0;
                            return { term, interestRate };
                          });
              
                          const sortedByRate = [...termRates].sort(
                            (a, b) => b.interestRate - a.interestRate
                          );
                          const highestRates = sortedByRate
                            .slice(0, 2)
                            .map((item) => item.interestRate);
              
                          const sortedTerms = [...termRates];
                          sortedTerms.sort((a, b) => {
                            if (
                              highestRates.includes(a.interestRate) &&
                              !highestRates.includes(b.interestRate)
                            ) {
                              return -1;
                            }
                            if (
                              highestRates.includes(b.interestRate) &&
                              !highestRates.includes(a.interestRate)
                            ) {
                              return 1;
                            }
                            return (
                              availableTerms.indexOf(a.term) -
                              availableTerms.indexOf(b.term)
                            );
                          });
              
                          return sortedTerms.map((item, index) => {
                            const { term, interestRate } = item;
                            const isHighestRate = highestRates.includes(interestRate);
              
                            return (
                              <motion.div
                                key={term}
                                className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-500 cursor-pointer ${
                                  formData.term === term
                                    ? "bg-gradient-to-br from-pink-200/40 via-pink-600/30 to-pink-200/20 border-white/30 shadow-[0_0px_25px_5px_rgba(255,192,203,0.7)] shadow-pink-500/50"
                                    : "bg-gradient-to-br from-white/20 via-white/15 to-white/10 border-white/20 hover:border-white/30 hover:bg-gradient-to-br hover:from-white/30 hover:via-white/25 hover:to-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]"
                                }`}
                                onClick={() => handleFormDataChange("term", term)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.08,
                                }}
                                whileHover={{ scale: 1.03, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                {/* Liquid glass reflections */}
                                <div className="absolute inset-0 rounded-2xl">
                                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl" />
                                  <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-white/20 to-transparent rounded-br-2xl" />
                                </div>
              
                                
              
                                {/* Liquid glass star badge */}
                                {isHighestRate && (
                                  <motion.div
                                    className="absolute -top-2 -right-2 w-10 h-10 rounded-full backdrop-blur-md bg-gradient-to-br from-amber-400/80 to-orange-500/80 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center"
                                    animate={{
                                      scale: 1,
                                      rotate: [0, 360],
                                      boxShadow: [
                                        "0 0 0px 0px rgba(255, 193, 7, 0.0)",
                                        "0 0 30px 15px rgba(255, 193, 7, 0.6)", 
                                        "0 0 0px 0px rgba(255, 193, 7, 0.0)",
                                      ],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      rotate: { duration: 4, repeat: Infinity }
                                    }}
                                  >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                                    <Star
                                      size={24}
                                      className="text-white drop-shadow-sm relative z-10"
                                      fill="currentColor"
                                    />
                                  </motion.div>
                                )}
              
                                <div className="relative z-10 text-center p-4">
                                  <div
                                    className={`w-6 h-6 rounded-full mx-auto mb-3 transition-all duration-300 backdrop-blur-md border border-white/20 shadow-[0_4px_16px_0_rgba(31,38,135,0.37)] ${
                                      formData.term === term
                                        ? "bg-gradient-to-br from-pink-400/80 to-rose-500/80"
                                        : "bg-gradient-to-br from-white/30 to-white/10 group-hover:from-pink-100/50 group-hover:to-pink-200/30"
                                    } flex items-center justify-center`}
                                  >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                                    {formData.term === term && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="relative z-10"
                                      >
                                        <Check size={12} className="text-white drop-shadow-sm" />
                                      </motion.div>
                                    )}
                                  </div>
              
                                  <div className="font-semibold text-gray-800 text-sm mb-1 drop-shadow-sm">
                                    {termDisplayNames[term]}
                                  </div>
              
                                  <div className="flex items-center justify-center gap-1">
                                    <span className="text-lg font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent drop-shadow-sm">
                                      {interestRate}%
                                    </span>
                                    <span className="text-xs text-gray-500 drop-shadow-sm">
                                      /năm
                                    </span>
                                  </div>
              
                                  {isHighestRate && (
                                    <motion.div
                                      className="mt-1 text-sm text-amber-600 font-bold drop-shadow-sm"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.5 }}
                                    >
                                      Lãi suất cao nhất
                                    </motion.div>
                                  )}
                                </div>
                              </motion.div>
                            );
                          });
                        })()}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              )}

              {formData.amount && parseInt(formData.amount) >= 100000 && (
                <MobileBottomCard
                  step={step}
                  calculatedInterest={{
                    interestAmount: formatCurrency(
                      calculatedInterest.interestAmount
                    ), // Sẽ hiển thị: +1.000.000đ
                    totalAmount: formatCurrency(calculatedInterest.totalAmount), // Sẽ hiển thị: 5.000.000đ
                  }}
                />
              )}

              {/* Step 4: Summary and Naming */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  <div className="flex items-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="mr-2 bg-gradient-to-br from-pink-500 to-rose-500 p-1.5 rounded-lg text-white"
                    >
                      <ClipboardCheck size={18} />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-lg font-semibold text-gray-800"
                    >
                      Xác nhận thông tin
                    </motion.h3>
                  </div>

                  <div className="space-y-5 mb-6">
                    {/* Savings Book Design - Natural Paper Style */}
                    <motion.div
                      className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl overflow-hidden shadow-2xl relative"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      whileHover={{
                        y: -4,
                      }}
                      style={{
                        backgroundImage: `
                          url('/images/HoaTiet_4.png'),
                          url('/images/HoaTiet_4.png'),
                          repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139,69,19,0.065) 2deg, transparent 4deg, rgba(139,69,19,0.052) 6deg, transparent 8deg, rgba(139,69,19,0.039) 10deg, transparent 12deg, rgba(139,69,19,0.0455) 14deg, transparent 16deg, rgba(139,69,19,0.0585) 18deg, transparent 20deg, rgba(139,69,19,0.052) 22deg, transparent 24deg, rgba(139,69,19,0.039) 26deg, transparent 28deg, rgba(139,69,19,0.065) 30deg, transparent 32deg, rgba(139,69,19,0.0455) 34deg, transparent 36deg),
                          repeating-conic-gradient(from 10deg at 50% 50%, transparent 0deg, rgba(139,69,19,0.0455) 1.5deg, transparent 3deg, rgba(139,69,19,0.039) 4.5deg, transparent 6deg, rgba(139,69,19,0.0585) 7.5deg, transparent 9deg, rgba(139,69,19,0.052) 10.5deg, transparent 12deg, rgba(139,69,19,0.039) 13.5deg, transparent 15deg, rgba(139,69,19,0.065) 16.5deg, transparent 18deg),
                          url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60,20 Q80,40 60,60 Q40,80 60,100 Q80,80 100,60 Q80,40 60,20 Z' stroke='rgba(139,69,19,0.052)' stroke-width='1' fill='none'/%3E%3Cpath d='M60,30 Q75,45 60,60 Q45,75 60,90 Q75,75 90,60 Q75,45 60,30 Z' stroke='rgba(139,69,19,0.0455)' stroke-width='0.8' fill='none'/%3E%3C/svg%3E"),
                          url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40,10 Q60,20 65,40 Q60,60 40,70 Q20,60 15,40 Q20,20 40,10 Z' stroke='rgba(139,69,19,0.052)' stroke-width='0.8' fill='none'/%3E%3Cpath d='M40,20 Q55,30 55,40 Q55,50 40,60 Q25,50 25,40 Q25,30 40,20 Z' stroke='rgba(139,69,19,0.0364)' stroke-width='0.6' fill='none'/%3E%3C/svg%3E"),
                          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,69,19,0.0255) 2px, rgba(139,69,19,0.0225) 2.5px, transparent 2.5px, transparent 8px),
                          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,69,19,0.0255) 2px, rgba(139,69,19,0.0225) 2.5px, transparent 2.5px, transparent 8px),
                          url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30,8 Q45,15 48,30 Q45,45 30,52 Q15,45 12,30 Q15,15 30,8 Z' stroke='rgba(139,69,19,0.052)' stroke-width='0.5' fill='none'/%3E%3Cpath d='M30,15 Q40,20 42,30 Q40,40 30,45 Q20,40 18,30 Q20,20 30,15 Z' stroke='rgba(139,69,19,0.039)' stroke-width='0.4' fill='none'/%3E%3C/svg%3E"),
                          url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15,30 C25,10 45,10 55,30 C45,50 25,50 15,30 Z M20,30 C28,15 42,15 50,30 C42,45 28,45 20,30 Z' stroke='rgba(139,69,19,0.058)' stroke-width='0.7' fill='none'/%3E%3C/svg%3E"),
                          url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60,20 L80,60 L60,100 L40,60 Z M60,35 L70,60 L60,85 L50,60 Z' stroke='rgba(139,69,19,0.058)' stroke-width='0.9' fill='none'/%3E%3C/svg%3E"),
                          repeating-linear-gradient(22.5deg, transparent, transparent 1.5px, rgba(139,69,19,0.029) 1.5px, rgba(139,69,19,0.029) 2px, transparent 2px, transparent 6px),
                          repeating-linear-gradient(67.5deg, transparent, transparent 1.5px, rgba(139,69,19,0.029) 1.5px, rgba(139,69,19,0.029) 2px, transparent 2px, transparent 6px)
                        `,
                        backgroundSize:
                          "700px 700px, 600px 600px, 120px 120px, 120px 120px, 120px 120px, 80px 80px, 24px 24px, 24px 24px, 60px 60px, 60px 60px, 120px 120px, 18px 18px, 18px 18px",
                        backgroundPosition:
                          "calc(50% - 450px) calc(50% - 610px), center center, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0",
                        backgroundRepeat:
                          "no-repeat, no-repeat, repeat, repeat, repeat, repeat, repeat, repeat, repeat, repeat, repeat, repeat, repeat",
                      }}
                    >
                      {/* Paper texture and watermark */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(circle at 25% 50%, rgba(139,69,19,0.08) 2px, transparent 2px),
                                         radial-gradient(circle at 75% 25%, rgba(139,69,19,0.06) 1px, transparent 1px)`,
                          backgroundSize: "120px 120px, 180px 180px",
                        }}
                      />

                      {/* Decorative stamp in corner - positioned at top-right corner overlapping content */}
                      <motion.div
                        className="absolute -top-12 md:-top-10 -right-14 md:-right-10 opacity-60 z-20"
                        animate={{
                          rotate: [8, 12, 8],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <div className="w-36 h-36 relative">
                          {/* Vòng đậm ngoài cùng */}
                          <div className="absolute inset-0 border-4 border-red-500 rounded-full"></div>

                          {/* Vòng nhạt */}
                          <div className="absolute inset-2 border-2 border-red-500 rounded-full"></div>

                          {/* Text cong nửa trên */}
                          <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 128 128"
                          >
                            <path
                              id="top-arc"
                              d="M 64,64 m -45,0 a 45,45 0 0,1 90,0"
                              fill="none"
                            />
                            <text
                              className="font-bold fill-red-500"
                              style={{ fontSize: "8px" }}
                            >
                              <textPath
                                href="#top-arc"
                                startOffset="50%"
                                textAnchor="middle"
                              >
                                · CÔNG TY CỔ PHẦN SWEET BANK ·
                              </textPath>
                            </text>
                          </svg>

                          {/* Text cong nửa dưới */}
                          <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 128 128"
                          >
                            <path
                              id="bottom-arc"
                              d="M 64,64 m -52,0 a 52,52 0 1,0 104,0"
                              fill="none"
                            />
                            <text
                              className="font-bold fill-red-500"
                              style={{ fontSize: "8px" }}
                            >
                              <textPath
                                href="#bottom-arc"
                                startOffset="50%"
                                textAnchor="middle"
                              >
                                · · · SWEET DIGITAL BANK VIET NAM · · ·
                              </textPath>
                            </text>
                          </svg>

                          {/* Vòng tròn sau text */}
                          <div className="absolute inset-6 border-2 border-red-500 rounded-full"></div>

                          {/* Nội dung bên trong */}
                          <div className="absolute mr-2 inset-0 flex flex-col items-center justify-center text-red-500 font-bold">
                            <link
                              href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
                              rel="stylesheet"
                            ></link>{" "}
                            <div
                              className="text-lg mt-3"
                              style={{
                                fontFamily: "Great Vibes, cursive",
                                fontSize: "32px",
                              }}
                            >
                              Sweet
                            </div>
                            <PiggyBank
                              size={38}
                              className="-mt-1 -mr-2 font-md"
                            />
                          </div>
                        </div>
                      </motion.div>

                      {/* Header Section */}
                      <div className="p-6 sm:p-8 pb-3 relative z-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 space-y-4 sm:space-y-0">
                          <div>
                            <h2
                              className="text-lg sm:text-xl font-bold text-gray-800 mb-1"
                              style={{ fontFamily: "serif" }}
                            >
                              NGÂN HÀNG SỐ{" "}
                              <span className="text-pink-600">SWEET</span>
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600 italic">
                              Phiếu Tiết Kiệm Điện Tử
                            </p>
                          </div>
                          <div className="text-right sm:text-right w-full sm:w-auto">
                            <p className="text-xs text-gray-500 font-mono">
                              Số phiếu: STK-2025-
                              {Math.floor(Math.random() * 1000000)}
                            </p>
                            <div className="mt-0 sm:mt-0 inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5">
                              <span className="text-xs text-gray-500 font-md font-mono mr-1">
                                Tiền gửi:{" "}
                              </span>
                              <span
                                className="text-sm md:text-lg font-semibold text-pink-700 tracking-wide"
                                style={{ fontFamily: "serif" }}
                              >
                                {formData.depositType === "standard"
                                  ? "TIÊU CHUẨN"
                                  : "LINH HOẠT"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Natural nickname input */}
                        <motion.div
                          className="mb-6 text-center"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                        >
                          <label className="text-sm text-gray-600 mb-3 block font-medium italic">
                            Tên gợi nhớ phiếu tiết kiệm:
                          </label>
                          <div className="relative inline-block w-full max-w-md">
                            <input
                              type="text"
                              value={formData.nickname}
                              onChange={(e) =>
                                handleFormDataChange("nickname", e.target.value)
                              }
                              placeholder="..................................."
                              className="w-full text-center text-base sm:text-lg font-semibold text-gray-800 bg-transparent border-none border-b-2 border-dashed border-gray-400 focus:border-gray-600 focus:border-solid outline-none transition-all duration-300 pb-2 cursor-text placeholder:text-gray-300 placeholder:tracking-widest"
                              style={{
                                fontFamily: "Courier New, monospace",
                                letterSpacing: "1px",
                              }}
                            />
                            <motion.div
                              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: formData.nickname ? "100%" : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-2 italic">
                            Nhấp vào đây để đặt tên cho phiếu tiết kiệm
                          </p>
                        </motion.div>

                        {/* Branch and Date Section */}
                        <motion.div
                          className="mb-0 text-center"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.7 }}
                        >
                          <div className="flex flex-col sm:flex-row justify-end items-end md:items-center space-y-1 sm:space-y-0 sm:space-x-0 mt-12 md:mr-8 md:-mb-2">
                            <div className="text-sm text-gray-700 font-medium">
                              <span className="mr-2 italic">
                                {formData.sourceAccount === "cash_at_counter"
                                  ? "Chi nhánh Sweet Bank,"
                                  : "Chi nhánh Digital Sweet Bank,"}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700 font-medium flex items-center space-x-1">
                              <span className='italic'>Ngày</span>
                              <span className="border-b border-dashed border-gray-400 px-2 py-1 min-w-[30px] text-center font-mono">
                                {new Date()
                                  .getDate()
                                  .toString()
                                  .padStart(2, "0")}
                              </span>
                              <span className='italic'>tháng</span>
                              <span className="border-b border-dashed border-gray-400 px-2 py-1 min-w-[30px] text-center font-mono">
                                {(new Date().getMonth() + 1)
                                  .toString()
                                  .padStart(2, "0")}
                              </span>
                              <span className='italic'>năm</span>
                              <span className="border-b border-dashed border-gray-400 px-2 py-1 min-w-[40px] text-center font-mono">
                                {new Date().getFullYear()}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Main Content - Natural Layout without boxes */}
                      <div className="px-4 sm:px-6 pb-6 relative">
                        {/* Horizontal divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent mb-6"></div>

                        {/* Information Layout - Like handwritten entries */}
                        <motion.div
                          className="space-y-4 sm:space-y-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          {/* Row 1: Basic deposit info */}
                          <div className="flex justify-between items-center px-4 md:px-12">
                            <div className="flex-1">
                              <span className="text-sm text-gray-600 font-medium">
                                Số tiền gốc:
                              </span>
                              <span
                                className="ml-3 text-base sm:text-lg font-bold text-gray-800"
                                style={{ fontFamily: "monospace" }}
                              >
                                {formatCurrency(parseInt(formData.amount) || 0)}
                              </span>
                            </div>
                            <div className="flex-1 text-right">
                              <span className="text-sm text-gray-600 font-medium">
                                Kỳ hạn:
                              </span>
                              <span className="ml-3 text-base sm:text-lg font-semibold text-gray-800">
                                {termDisplayNames[formData.term]}
                              </span>
                            </div>
                          </div>

                          {/* Row 2: Dates */}
                          <div className="flex justify-between items-center px-4 md:px-12">
                            <div className="flex-1">
                              <span className="text-sm text-gray-600 font-medium">
                                Ngày gửi:
                              </span>
                              <span
                                className="ml-3 text-sm sm:text-base font-semibold text-gray-800"
                                style={{ fontFamily: "monospace" }}
                              >
                                {previewData?.startDate || "Đang tính..."}
                              </span>
                            </div>
                            <div className="flex-1 text-right">
                              <span className="text-sm text-gray-600 font-medium">
                                Ngày đáo hạn:
                              </span>
                              <span
                                className="ml-3 text-sm sm:text-base font-semibold text-gray-800"
                                style={{ fontFamily: "monospace" }}
                              >
                                {previewData?.endDate || "Đang tính..."}
                              </span>
                            </div>
                          </div>

                          {/* Row 3: Interest info */}
                          <div className="flex justify-between items-center px-4 md:px-12">
                            <div className="flex-1">
                              <span className="text-sm text-gray-600 font-medium">
                                Lãi suất:
                              </span>
                              <span
                                className="ml-3 text-base sm:text-lg font-bold text-pink-600"
                                style={{ fontFamily: "monospace" }}
                              >
                                {calculatedInterest.rate}%/năm
                              </span>
                            </div>
                            <div className="flex-1 text-right">
                              <span className="text-sm text-gray-600 font-medium">
                                Nhận lãi:
                              </span>
                              <span className="ml-3 text-sm sm:text-base font-semibold text-gray-800">
                                {
                                  interestPaymentTypeDisplayNames[
                                    formData.interestPaymentType
                                  ]
                                }
                              </span>
                            </div>
                          </div>

                          {/* Row 4: Account info */}
                          <div className="flex justify-between items-center px-4 md:px-12">
                            <div className="flex-1">
                              <span className="text-sm text-gray-600 font-medium">
                                Tài khoản nguồn:
                              </span>
                              <span className="ml-3 text-sm sm:text-base font-semibold text-gray-800">
                                {formData.sourceAccount === "cash_at_counter"
                                  ? "Tiền mặt tại quầy"
                                  : paymentAccounts.find(
                                      (acc) =>
                                        acc.id ===
                                        parseInt(formData.sourceAccount)
                                    )?.nickname || "Chưa chọn"}
                              </span>
                            </div>
                            <div className="flex-1 text-right">
                              <span className="text-sm text-gray-600 font-medium">
                                Hình thức đáo hạn:
                              </span>
                              <span className="ml-3 text-sm sm:text-base font-semibold text-gray-800">
                                {formData.maturityOption === "receive_all"
                                  ? "Nhận cả gốc và lãi"
                                  : formData.maturityOption ===
                                    "rollover_principal"
                                  ? "Tái tục gốc"
                                  : "Tự động tái tục"}
                              </span>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent my-4"></div>

                          {/* Summary section */}
                          <div className="space-y-3">
                            <div className="flex flex-row sm:flex-row justify-center items-center sm:items-center space-y-0 sm:space-y-0">
                              <span className="text-sm sm:text-base text-gray-700 font-medium mr-1">
                                Tiền lãi dự tính:
                              </span>
                              <span
                                className="text-base sm:text-lg font-bold text-pink-600"
                                style={{ fontFamily: "monospace" }}
                              >
                                {formatCurrency(
                                  calculatedInterest.interestAmount
                                )}
                              </span>
                            </div>

                            {/* Total amount - highlighted */}
                            <motion.div
                              className="flex flex-col sm:flex-row justify-center items-center sm:items-center p-3 sm:p-4 rounded-2xl space-y-0 sm:space-y-0"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <span
                                className="text-base sm:text-lg font-bold text-pink-600 flex items-center mr-4"
                                style={{ fontFamily: "Courier New" }}
                              >
                                <PiggyBank className="mr-2" size={18} />
                                TỔNG SỐ TIỀN SẼ NHẬN:
                              </span>
                              <span
                                className="text-xl pb-2 sm:text-2xl font-bold text-pink-600"
                                style={{ fontFamily: "monospace" }}
                              >
                                {formatCurrency(calculatedInterest.totalAmount)}
                              </span>
                            </motion.div>
                          </div>

                          {/* Footer signature area */}
                          <motion.div
                            className="flex flex-col sm:flex-row justify-between items-center mt-8 px-16 pt-6 pb-12 mb-16 border-t border-amber-200/50 space-y-6 sm:space-y-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 1.0 }}
                          >
                            <div className="text-center sm:text-center">
                              <p className="text-xs text-gray-500 mb-2">
                                Khách hàng
                              </p>
                              <link
                                href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
                                rel="stylesheet"
                              ></link>
                              <div
                                className="text-lg font-bold text-gray-700 mt-4"
                                style={{
                                  fontFamily: "Dancing Script, cursive",
                                  fontSize: "26px",
                                  transform: "rotate(-2deg)",
                                }}
                              >
                                Nguyễn Văn A
                              </div>
                              <div
                                className="text-gray-400 mt-0"
                                style={{ letterSpacing: "2px" }}
                              >
                                .............................
                              </div>
                            </div>

                            <div className="text-center opacity-50">
                              <div className="w-16 h-16 border-2 border-red-300 border-dashed rounded-full hidden md:flex items-center justify-center transform rotate-12">
                                <span className="text-xs text-red-400 font-bold">
                                  DUYỆT
                                </span>
                              </div>
                            </div>

                            <div className="text-center sm:text-center relative">
                              <p className="text-xs text-gray-500 mb-2">
                                Ngân hàng số Sweet
                              </p>
                              {/* Bank signature */}
                              <link
                                href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
                                rel="stylesheet"
                              ></link>
                              <div className="relative">
                                <div
                                  className="text-xl font-bold text-gray-700 mt-4"
                                  style={{
                                    fontFamily: "Great Vibes, cursive",
                                    fontSize: "32px",
                                    transform: "rotate(-2deg)",
                                  }}
                                >
                                  Sweet
                                </div>
                                <div
                                  className="text-gray-400 mt-0"
                                  style={{ letterSpacing: "2px" }}
                                >
                                  .............................
                                </div>

                                {/* Stamp overlapping the signature */}
                                <motion.div
                                  className="absolute -top-8 md:-top-10 -right-8 md:-right-6 opacity-60 z-20"
                                  animate={{
                                    rotate: [8, 12, 8],
                                    scale: [1, 1.05, 1],
                                  }}
                                  transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                >
                                  <div className="w-36 h-36 relative">
                                    {/* Vòng đậm ngoài cùng */}
                                    <div className="absolute inset-0 border-4 border-red-500 rounded-full"></div>

                                    {/* Vòng nhạt */}
                                    <div className="absolute inset-2 border-2 border-red-500 rounded-full"></div>

                                    {/* Text cong nửa trên */}
                                    <svg
                                      className="absolute inset-0 w-full h-full"
                                      viewBox="0 0 128 128"
                                    >
                                      <path
                                        id="top-arc"
                                        d="M 64,64 m -45,0 a 45,45 0 0,1 90,0"
                                        fill="none"
                                      />
                                      <text
                                        className="font-bold fill-red-500"
                                        style={{ fontSize: "8px" }}
                                      >
                                        <textPath
                                          href="#top-arc"
                                          startOffset="50%"
                                          textAnchor="middle"
                                        >
                                          · CÔNG TY CỔ PHẦN SWEET BANK ·
                                        </textPath>
                                      </text>
                                    </svg>

                                    {/* Text cong nửa dưới */}
                                    <svg
                                      className="absolute inset-0 w-full h-full"
                                      viewBox="0 0 128 128"
                                    >
                                      <path
                                        id="bottom-arc"
                                        d="M 64,64 m -52,0 a 52,52 0 1,0 104,0"
                                        fill="none"
                                      />
                                      <text
                                        className="font-bold fill-red-500"
                                        style={{ fontSize: "8px" }}
                                      >
                                        <textPath
                                          href="#bottom-arc"
                                          startOffset="50%"
                                          textAnchor="middle"
                                        >
                                          · · · SWEET DIGITAL BANK VIET NAM · ·
                                          ·
                                        </textPath>
                                      </text>
                                    </svg>

                                    {/* Vòng tròn sau text */}
                                    <div className="absolute inset-6 border-2 border-red-500 rounded-full"></div>

                                    {/* Nội dung bên trong */}
                                    <div className="absolute mr-2 inset-0 flex flex-col items-center justify-center text-red-500 font-bold">
                                      <link
                                        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
                                        rel="stylesheet"
                                      ></link>{" "}
                                      <div
                                        className="text-lg mt-3"
                                        style={{
                                          fontFamily: "Great Vibes, cursive",
                                          fontSize: "32px",
                                        }}
                                      >
                                        Sweet
                                      </div>
                                      <PiggyBank
                                        size={38}
                                        className="-mt-1 -mr-2 font-md"
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation buttons - Fixed at bottom */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex justify-between">
                {step > 1 ? (
                  <motion.button
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium text-sm flex items-center relative overflow-hidden group"
                    onClick={handlePreviousStep}
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-200/50 to-gray-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <motion.span
                      className="relative z-10 mr-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: -2 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.6,
                      }}
                    >
                      <ChevronRight size={16} className="rotate-180" />
                    </motion.span>
                    <span className="relative z-10">Quay lại</span>
                  </motion.button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <motion.button
                    className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl hover:shadow-md transition-all duration-200 font-medium text-sm flex items-center relative overflow-hidden group"
                    onClick={handleNextStep}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Tiếp tục</span>
                    <motion.span
                      className="relative z-10 ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.6,
                      }}
                    >
                      <ChevronRight size={16} />
                    </motion.span>
                  </motion.button>
                ) : (
                  <motion.button
                    className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-md transition-all duration-200 font-medium text-sm flex items-center relative overflow-hidden group"
                    onClick={handleConfirm}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600/20 to-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <motion.span
                      className="relative z-10 mr-2"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        repeat: 1,
                        repeatType: "reverse",
                        duration: 0.3,
                      }}
                    >
                      <Check size={16} />
                    </motion.span>
                    <span className="relative z-10">Xác nhận mở tài khoản</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewSavingsAccountModal;