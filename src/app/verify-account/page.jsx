'use client';

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { CloudSun, Sparkles, Heart, Star, ArrowRight, Loader2 } from 'lucide-react';

const SuccessPage = ({ onGoToLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-pink-300/30 rounded-full blur-xl animate-float-moon"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-60 md:h-60 bg-rose-300/20 rounded-full blur-xl animate-float-random-1"></div>
        
        {/* Clouds */}
        <div className="absolute left-[10%] top-[20%] w-64 h-32 bg-white/60 rounded-full blur-md animate-float-random-2"></div>
        <div className="absolute right-[15%] top-[30%] w-72 h-40 bg-white/50 rounded-full blur-md animate-float-random-3"></div>
        <div className="absolute left-[20%] bottom-[25%] w-56 h-28 bg-pink-200/40 rounded-full blur-md animate-float-random-4"></div>
        <div className="absolute right-[25%] bottom-[35%] w-48 h-24 bg-rose-200/30 rounded-full blur-md animate-float-random-5"></div>
        
        {/* Sparkles */}
        <div className="absolute top-[15%] right-[20%] text-pink-400 animate-pulse">
          <Sparkles size={24} />
        </div>
        <div className="absolute bottom-[20%] left-[15%] text-rose-400 animate-pulse" style={{ animationDelay: '1s' }}>
          <Star size={20} />
        </div>
        <div className="absolute top-[60%] left-[10%] text-pink-300 animate-pulse" style={{ animationDelay: '2s' }}>
          <Heart size={18} />
        </div>
        <div className="absolute bottom-[60%] right-[10%] text-rose-300 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Sparkles size={16} />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left side - Decorative content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col items-center justify-center text-center space-y-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-2xl"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <div className="text-4xl">✅</div>
                </div>
              </motion.div>
              
              {/* Floating icons around the main circle */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-xl">✨</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-xl">🎉</span>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                Chào mừng!
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">
                  Tài khoản đã được tạo
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Tài khoản của bạn đã được xác thực và tạo thành công. Bây giờ bạn có thể đăng nhập và sử dụng dịch vụ.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                <span>Xác thực</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                <span>Hoàn tất</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Success content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="flex flex-col items-center relative z-10 space-y-8">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
                  >
                    <FaCheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                </motion.div>

                {/* Success Message */}
                <div className="text-center space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="text-3xl md:text-4xl font-bold text-gray-800"
                  >
                    Tài khoản đã được xác thực!
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="text-gray-600 text-lg leading-relaxed"
                  >
                    Chúc mừng! Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập và bắt đầu sử dụng dịch vụ ngay bây giờ.
                  </motion.p>
                </div>

                {/* Action Buttons */}
                <div className="w-full space-y-4">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onGoToLogin}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span className="text-lg">Đăng nhập ngay</span>
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="text-center"
                  >
                    <p className="text-sm text-gray-500">
                      Bạn sẽ được chuyển hướng đến trang đăng nhập
                    </p>
                  </motion.div>
                </div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="w-full p-4 bg-pink-50 rounded-xl border border-pink-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-sm text-pink-700">
                      <p className="font-medium mb-1">Chào mừng bạn đến với Sweet:</p>
                      <p>Tài khoản của bạn đã sẵn sàng để sử dụng. Hãy khám phá các tính năng tuyệt vời của chúng tôi!</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = ({ message, type = 'default' }) => {
  const getLoadingIcon = () => {
    switch (type) {
      case 'otp':
        return (
          <motion.div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  backgroundColor: ['#3B82F6', '#60A5FA', '#3B82F6']
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
                className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"
              />
            ))}
          </motion.div>
        );
      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col items-center justify-center py-12 space-y-6"
    >
      <div className="relative">
        {getLoadingIcon()}
        {/* Glow effect */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-xl opacity-20"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="text-center space-y-2"
      >
        <p className="text-gray-700 text-lg font-medium">{message}</p>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 h-1 bg-gray-400 rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const VerifyAccount = () => {
  const router = useRouter();
  const [email, setEmail] = useState("user@example.com"); // Email from registration
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [error, setError] = useState("");
  const [isOTPValid, setIsOTPValid] = useState(null);
  const [otpValidationState, setOtpValidationState] = useState(''); // 'success', 'error', or ''
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [currentStep, setCurrentStep] = useState('otp'); // 'otp', 'transitioning'
  const otpRefs = useRef([]);

  useEffect(() => {
    // Page load animation
    const pageLoadTimer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    return () => {
      clearTimeout(pageLoadTimer);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      setTimer(60);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Vui lòng nhập đầy đủ 6 số');
      return;
    }
    
    setError('');
    setIsLoadingOTP(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoadingOTP(false);
      if (otpString === '123456') {
        setOtpValidationState('success');
        setIsOTPValid(true);
        // Show success animation for longer duration
        setTimeout(() => {
          setCurrentStep('transitioning');
          // Then transition to success page
          setTimeout(() => {
            setShowSuccessPage(true);
            setOtpValidationState('');
          }, 600);
        }, 1500);
      } else {
        setOtpValidationState('error');
        setIsOTPValid(false);
        setError('Mã OTP không đúng');
        // Clear error state after showing animation
        setTimeout(() => {
          setOtpValidationState('');
          setIsOTPValid(null);
        }, 2000);
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    if (isTimerRunning) return;
    
    setIsTimerRunning(true);
    setTimer(60);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setOtpValidationState('');
    setIsOTPValid(null);
    
    // Focus first input
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  if (showSuccessPage) {
    return <SuccessPage onGoToLogin={handleGoToLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-blue-300/20 rounded-full blur-xl animate-float-moon"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-60 md:h-60 bg-indigo-300/15 rounded-full blur-xl animate-float-random-1"></div>
        
        {/* Clouds */}
        <div className="absolute left-[10%] top-[20%] w-64 h-32 bg-white/40 rounded-full blur-md animate-float-random-2"></div>
        <div className="absolute right-[15%] top-[30%] w-72 h-40 bg-white/30 rounded-full blur-md animate-float-random-3"></div>
        <div className="absolute left-[20%] bottom-[25%] w-56 h-28 bg-blue-200/30 rounded-full blur-md animate-float-random-4"></div>
        <div className="absolute right-[25%] bottom-[35%] w-48 h-24 bg-indigo-200/25 rounded-full blur-md animate-float-random-5"></div>
        
        {/* Sparkles */}
        <div className="absolute top-[15%] right-[20%] text-blue-400 animate-pulse">
          <Sparkles size={24} />
        </div>
        <div className="absolute bottom-[20%] left-[15%] text-indigo-400 animate-pulse" style={{ animationDelay: '1s' }}>
          <Star size={20} />
        </div>
        <div className="absolute top-[60%] left-[10%] text-blue-300 animate-pulse" style={{ animationDelay: '2s' }}>
          <Heart size={18} />
        </div>
        <div className="absolute bottom-[60%] right-[10%] text-indigo-300 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Sparkles size={16} />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left side - Decorative content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: pageLoaded ? 1 : 0, x: pageLoaded ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col items-center justify-center text-center space-y-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <div className="text-4xl">📧</div>
                </div>
              </motion.div>
              
              {/* Floating icons around the main circle */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-xl">🔐</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-xl">✅</span>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                Xác thực
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  Tài khoản của bạn
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Chúng tôi đã gửi mã xác nhận đến email của bạn. Vui lòng nhập mã để hoàn tất quá trình đăng ký.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Bảo mật</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                <span>Nhanh chóng</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: pageLoaded ? 1 : 0, x: pageLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUpVariants}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handleBackToHome}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                >
                  <FaArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                </button>
                
                <div className="text-center flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Xác thực tài khoản
                  </h1>
                  <p className="text-gray-600">
                    Nhập mã xác nhận để hoàn tất đăng ký
                  </p>
                </div>
                
                <div className="w-11"></div> {/* Spacer for centering */}
              </div>
            </motion.div>

            {/* Email notification */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl p-6 mb-6 relative overflow-hidden"
            >
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-300 to-blue-300 rounded-full opacity-20 transform -translate-x-6 translate-y-6"></div>
              
              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                >
                  <FaEnvelope className="w-6 h-6 text-white" />
                </motion.div>
                
                <div className="flex-1">
                  <motion.h4
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-bold text-gray-800 mb-2"
                  >
                    Sweet đã gửi mã xác nhận!
                  </motion.h4>
                  
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 text-sm mb-3"
                  >
                    Chúng tôi đã gửi mã OTP 6 số đến email <span className="font-semibold text-blue-600">{email}</span>. Vui lòng kiểm tra hộp thư và nhập mã để hoàn tất đăng ký.
                  </motion.p>
                  
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleResendOTP}
                    disabled={isTimerRunning}
                    className={`text-sm font-medium transition-all duration-200 ${
                      isTimerRunning 
                        ? "text-gray-400 cursor-not-allowed" 
                        : "text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                    }`}
                  >
                    {isTimerRunning ? `Gửi lại mã sau ${timer}s` : "Gửi lại mã"}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center font-medium"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* OTP Input Section */}
            {currentStep === 'otp' && (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInUpVariants}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="block text-gray-700 font-medium text-lg">
                    Nhập mã xác nhận (6 số)
                  </label>
                  
                  {isLoadingOTP ? (
                    <LoadingSpinner message="Đang xác thực mã..." type="otp" />
                  ) : (
                    <div className="grid grid-cols-6 gap-3 max-w-sm mx-3">
                      {otp.map((digit, index) => {
                        let inputStyle = "w-12 h-14 aspect-square text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all duration-300 shadow-sm";
                        
                        if (otpValidationState === 'success') {
                          inputStyle += " border-green-500 bg-green-50 text-green-700 shadow-green-200";
                        } else if (otpValidationState === 'error') {
                          inputStyle += " border-red-500 bg-red-50 text-red-700 shadow-red-200";
                        } else {
                          inputStyle += " border-gray-300 bg-white focus:border-blue-500 focus:shadow-blue-200 hover:border-gray-400";
                        }
                        
                        return (
                          <div key={index} className="aspect-square">
                            <motion.input
                              ref={el => otpRefs.current[index] = el}
                              type="text"
                              value={digit}
                              onChange={(e) => handleOTPChange(index, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              maxLength={1}
                              disabled={otpValidationState !== ''}
                              className={inputStyle}
                              animate={{
                                scale: otpValidationState === 'success' ? [1, 1.1, 1] : 
                                       otpValidationState === 'error' ? [1, 1.05, 0.95, 1] : 1,
                                rotate: otpValidationState === 'error' ? [0, -2, 2, 0] : 0
                              }}
                              transition={{ 
                                duration: otpValidationState === 'success' ? 0.6 : 0.4,
                                delay: index * 0.1,
                                repeat: otpValidationState === 'error' ? 2 : 0
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Success/Error Message */}
                  {otpValidationState === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 text-green-600 font-medium"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full"
                      />
                      <span>Mã xác nhận chính xác!</span>
                    </motion.div>
                  )}
                  
                  {otpValidationState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-center gap-2 text-red-600 font-medium"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.3, repeat: 2 }}
                      >
                        ❌
                      </motion.span>
                      <span>Mã OTP không đúng, vui lòng thử lại!</span>
                    </motion.div>
                  )}
                </div>
                
                {!isLoadingOTP && otpValidationState === '' && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleVerifyOTP}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Xác nhận mã
                  </motion.button>
                )}
              </motion.div>
            )}
            
            {/* Transitioning State */}
            {currentStep === 'transitioning' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center py-16 space-y-6"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center"
                >
                  <motion.span
                    animate={{ scale: [0.8, 1.2, 1] }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-white text-2xl font-bold"
                  >
                    ✓
                  </motion.span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-700 font-medium text-lg"
                >
                  Đang tạo tài khoản...
                </motion.p>
              </motion.div>
            )}
          </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes float-moon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-random-1 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes float-random-2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-40px, -20px); }
        }
        
        @keyframes float-random-3 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(20px, -30px); }
        }
        
        @keyframes float-random-4 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-30px, 15px); }
        }
        
        @keyframes float-random-5 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(25px, -25px); }
        }
        
        .animate-float-moon {
          animation: float-moon 6s ease-in-out infinite;
        }
        
        .animate-float-random-1 {
          animation: float-random-1 8s ease-in-out infinite;
        }
        
        .animate-float-random-2 {
          animation: float-random-2 10s ease-in-out infinite;
        }
        
        .animate-float-random-3 {
          animation: float-random-3 12s ease-in-out infinite;
        }
        
        .animate-float-random-4 {
          animation: float-random-4 9s ease-in-out infinite;
        }
        
        .animate-float-random-5 {
          animation: float-random-5 11s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default VerifyAccount;