'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaEye, FaEyeSlash, FaTimes, FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { CloudSun, Sparkles, Heart, Star, ArrowRight, Loader2 } from 'lucide-react';

const SuccessPage = ({ onGoToLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-green-300/30 rounded-full blur-xl animate-float-moon"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-60 md:h-60 bg-emerald-300/20 rounded-full blur-xl animate-float-random-1"></div>
        
        {/* Clouds */}
        <div className="absolute left-[10%] top-[20%] w-64 h-32 bg-white/60 rounded-full blur-md animate-float-random-2"></div>
        <div className="absolute right-[15%] top-[30%] w-72 h-40 bg-white/50 rounded-full blur-md animate-float-random-3"></div>
        <div className="absolute left-[20%] bottom-[25%] w-56 h-28 bg-green-200/40 rounded-full blur-md animate-float-random-4"></div>
        <div className="absolute right-[25%] bottom-[35%] w-48 h-24 bg-emerald-200/30 rounded-full blur-md animate-float-random-5"></div>
        
        {/* Sparkles */}
        <div className="absolute top-[15%] right-[20%] text-green-400 animate-pulse">
          <Sparkles size={24} />
        </div>
        <div className="absolute bottom-[20%] left-[15%] text-emerald-400 animate-pulse" style={{ animationDelay: '1s' }}>
          <Star size={20} />
        </div>
        <div className="absolute top-[60%] left-[10%] text-green-300 animate-pulse" style={{ animationDelay: '2s' }}>
          <Heart size={18} />
        </div>
        <div className="absolute bottom-[60%] right-[10%] text-emerald-300 animate-pulse" style={{ animationDelay: '0.5s' }}>
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
                className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl"
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
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-xl">🎉</span>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                Thành công!
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                  Tài khoản đã được khôi phục
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Mật khẩu của bạn đã được đặt lại thành công. Bây giờ bạn có thể đăng nhập với mật khẩu mới.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Bảo mật</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
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
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-emerald-300 to-green-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="flex flex-col items-center relative z-10 space-y-8">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
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
                    Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập bằng mật khẩu mới ngay bây giờ.
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
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
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
                  className="w-full p-4 bg-green-50 rounded-xl border border-green-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-sm text-green-700">
                      <p className="font-medium mb-1">Lưu ý bảo mật:</p>
                      <p>Hãy đảm bảo giữ mật khẩu mới an toàn và không chia sẻ với bất kỳ ai.</p>
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
      case 'email':
        return (
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full"
            />
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 w-12 h-12 border-3 border-purple-200 border-b-purple-500 rounded-full"
            />
            {/* Center icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <FaEnvelope className="w-6 h-6 text-pink-500" />
            </motion.div>
            {/* Floating particles */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className={`absolute w-2 h-2 bg-pink-400 rounded-full`}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 2) * 40}%`
                }}
              />
            ))}
          </div>
        );
      case 'otp':
        return (
          <motion.div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  backgroundColor: ['#3B82F6', '#8B5CF6', '#3B82F6']
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
      case 'password':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <Loader2 className="w-8 h-8 text-green-500" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-8 h-8 border-2 border-green-300 rounded-full opacity-30"
            />
          </motion.div>
        );
      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full"
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
          className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-xl opacity-20"
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

const EmailSentNotification = ({ email, onResend, timer, isTimerRunning }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl p-6 mb-6 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-pink-300 to-blue-300 rounded-full opacity-20 transform -translate-x-6 translate-y-6"></div>
      
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
            Chúng tôi đã gửi mã OTP 6 số đến email <span className="font-semibold text-blue-600">{email}</span>. Vui lòng kiểm tra hộp thư và nhập mã để tiếp tục.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onResend}
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
  );
};

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOTPValid, setIsOTPValid] = useState(null);
  const [otpValidationState, setOtpValidationState] = useState(''); // 'success', 'error', or ''
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState('email'); // 'email', 'otp', 'password'

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  useEffect(() => {
    // Page load animation
    const pageLoadTimer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    const initialAnimationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);

    return () => {
      clearTimeout(pageLoadTimer);
      clearTimeout(initialAnimationTimer);
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

  const handleSendOTP = () => {
    if (!email) {
      setError("Vui lòng nhập email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Định dạng email không hợp lệ");
      return;
    }
    setIsLoadingEmail(true);
    setError("");
    
    // Hide email input immediately when loading starts
    setTimeout(() => {
      setCurrentStep('loading-email');
    }, 100);
    
    // Simulate email sending with 2s loading
    setTimeout(() => {
      setIsLoadingEmail(false);
      setShowOTPInput(true);
      setCurrentStep('otp');
      setIsTimerRunning(true);
    }, 2000);
  };

  const handleOTPChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 6) {
      setError("Vui lòng nhập đủ 6 số");
      setIsOTPValid(false);
      return;
    }
    
    setIsLoadingOTP(true);
    setError("");
    
    // Simulate OTP verification with 1.5s loading
    setTimeout(() => {
      if (enteredOTP === "123456") {
        setOtpValidationState('success');
        setIsOTPValid(true);
        // Show success animation for longer duration
        setTimeout(() => {
          setCurrentStep('transitioning');
          // Then transition to password step
          setTimeout(() => {
            setIsLoadingOTP(false);
            setShowOTPInput(false);
            setShowPasswordFields(true);
            setCurrentStep('password');
            setOtpValidationState('');
          }, 600);
        }, 1500);
      } else {
        setOtpValidationState('error');
        setIsLoadingOTP(false);
        setError("Mã OTP không đúng");
        setIsOTPValid(false);
        // Clear error state after showing animation
        setTimeout(() => {
          setOtpValidationState('');
          setIsOTPValid(null);
        }, 2000);
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    setTimer(60);
    setIsTimerRunning(true);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setIsOTPValid(null);
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    
    setIsLoadingPassword(true);
    setError("");
    
    // Simulate password reset with 2s loading
    setTimeout(() => {
      setIsLoadingPassword(false);
      setShowSuccessPage(true);
    }, 2000);
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const handleGoBack = () => {
    if (currentStep === 'password') {
      setShowPasswordFields(false);
      setShowOTPInput(true);
      setCurrentStep('otp');
      setNewPassword("");
      setConfirmPassword("");
      setOtpValidationState('');
      setError("");
    } else if (currentStep === 'otp' || currentStep === 'transitioning') {
      setShowOTPInput(false);
      setCurrentStep('email');
      setOtp(["", "", "", "", "", ""]);
      setIsOTPValid(null);
      setOtpValidationState('');
      setIsTimerRunning(false);
      setTimer(60);
      setError("");
    } else if (currentStep === 'loading-email') {
      // If loading email, go back to email input
      setCurrentStep('email');
      setIsLoadingEmail(false);
    } else {
      router.push('/');
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  const getOTPInputStyle = (index) => {
    let style = "w-full h-full text-center border-2 rounded-xl focus:outline-none transition-all duration-300 font-bold text-lg bg-white/80 backdrop-blur-sm ";
    if (isOTPValid === true) {
      style += "border-green-400 focus:ring-2 focus:ring-green-400 text-green-600 shadow-lg";
    } else if (isOTPValid === false) {
      style += "border-red-400 focus:ring-2 focus:ring-red-400 text-red-600 shadow-lg";
    } else {
      style += "border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 hover:border-pink-300 shadow-md";
    }
    return style;
  };

  // If success page should be shown, render it instead
  if (showSuccessPage) {
    return <SuccessPage onGoToLogin={handleGoToLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-sky-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Page Load Animation Overlay */}
      <div
        className={`fixed inset-0 bg-gradient-to-b from-pink-300 via-purple-200 to-transparent origin-top transform transition-transform duration-[1500ms] ease-in-out ${
          pageLoaded ? 'scale-y-0' : 'scale-y-100'
        } z-[100] flex items-center justify-center pointer-events-none`}
      >
        {!pageLoaded && (
          <div className="text-pink-500 opacity-80 animate-pulse">
            <CloudSun size={72} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Background decorations */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-pink-300/30 rounded-full blur-xl animate-float-moon"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-60 md:h-60 bg-purple-300/20 rounded-full blur-xl animate-float-random-1"></div>
        
        {/* Clouds */}
        <div className="absolute left-[10%] top-[20%] w-64 h-32 bg-white/60 rounded-full blur-md animate-float-random-2"></div>
        <div className="absolute right-[15%] top-[30%] w-72 h-40 bg-white/50 rounded-full blur-md animate-float-random-3"></div>
        <div className="absolute left-[20%] bottom-[25%] w-56 h-28 bg-pink-200/40 rounded-full blur-md animate-float-random-4"></div>
        <div className="absolute right-[25%] bottom-[35%] w-48 h-24 bg-purple-200/30 rounded-full blur-md animate-float-random-5"></div>
        
        {/* Sparkles */}
        <div className="absolute top-[15%] right-[20%] text-pink-400 animate-pulse">
          <Sparkles size={24} />
        </div>
        <div className="absolute bottom-[20%] left-[15%] text-purple-400 animate-pulse" style={{ animationDelay: '1s' }}>
          <Star size={20} />
        </div>
        <div className="absolute top-[60%] left-[10%] text-pink-300 animate-pulse" style={{ animationDelay: '2s' }}>
          <Heart size={18} />
        </div>
        <div className="absolute bottom-[60%] right-[10%] text-purple-300 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Sparkles size={16} />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left side - Decorative content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: animationComplete ? 1 : 0, x: animationComplete ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col items-center justify-center text-center space-y-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <div className="text-4xl">🔐</div>
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
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-xl">🛡️</span>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                Khôi phục
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Tài khoản Sweet
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Đừng lo lắng! Chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào tài khoản một cách an toàn và nhanh chóng.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Bảo mật cao</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Xác thực nhanh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span>Dễ sử dụng</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: animationComplete ? 1 : 0, scale: animationComplete ? 1 : 0.95 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              {/* Header */}
              <div className="flex items-center mb-8">
                <button
                  onClick={handleGoBack}
                  className="text-gray-600 hover:text-gray-800 mr-4 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                >
                  <FaArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Quên mật khẩu</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {currentStep === 'email' && 'Khôi phục tài khoản của bạn'}
                    {currentStep === 'otp' && 'Xác thực mã OTP'}
                    {currentStep === 'password' && 'Đặt lại mật khẩu mới'}
                  </p>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 text-red-600 text-sm bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-2"
                  >
                    <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Sent Notification */}
              {showOTPInput && (
                <EmailSentNotification 
                  email={email} 
                  onResend={handleResendOTP} 
                  timer={timer} 
                  isTimerRunning={isTimerRunning} 
                />
              )}

              <div className="space-y-6">
                {/* Email Input - Only show when in email step */}
                <AnimatePresence mode="wait">
                  {currentStep === 'email' && (
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={fadeInUpVariants}
                      transition={{ duration: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ email
                      </label>
                      <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 font-medium bg-white/80 backdrop-blur-sm hover:border-pink-300"
                        disabled={isLoadingEmail}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {/* Email Step Button or Loading */}
                  {currentStep === 'email' && (
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={fadeInUpVariants}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSendOTP}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        Gửi mã xác nhận
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Loading Email Step */}
                  {currentStep === 'loading-email' && (
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={fadeInUpVariants}
                      transition={{ duration: 0.5 }}
                    >
                      <LoadingSpinner message="Đang gửi mã xác nhận..." type="email" />
                    </motion.div>
                  )}

                  {/* OTP Step */}
                  {currentStep === 'otp' && (
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={fadeInUpVariants}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {isLoadingOTP ? (
                        <div className="space-y-6">
                          {/* Show OTP inputs with success animation if valid */}
                          {isOTPValid === true ? (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Nhập mã xác nhận (6 số)
                              </label>
                              <div className="grid grid-cols-6 gap-3">
                                {otp.map((digit, index) => (
                                  <div key={index} className="aspect-square">
                                    <motion.input
                                      animate={{
                                        scale: [1, 1.1, 1],
                                        borderColor: ['#10b981', '#34d399', '#10b981']
                                      }}
                                      transition={{ duration: 0.6, delay: index * 0.1 }}
                                      id={`otp-${index}`}
                                      type="text"
                                      maxLength="1"
                                      value={digit}
                                      disabled
                                      className="w-full h-full text-center border-2 border-green-400 rounded-xl font-bold text-lg bg-green-50 text-green-600 shadow-lg"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Nhập mã xác nhận (6 số)
                              </label>
                              <div className="grid grid-cols-6 gap-3">
                                {otp.map((digit, index) => (
                                  <div key={index} className="aspect-square">
                                    <input
                                      id={`otp-${index}`}
                                      type="text"
                                      maxLength="1"
                                      value={digit}
                                      disabled
                                      className={getOTPInputStyle(index)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          <LoadingSpinner message="Đang xác thực mã OTP..." type="otp" />
                        </div>
                      ) : (
                        <>
                          {/* OTP Input */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Nhập mã xác nhận (6 số)
                            </label>
                            <div className="grid grid-cols-6 gap-3">
                              {otp.map((digit, index) => {
                                let inputStyle = "w-full h-full text-center border-2 rounded-xl focus:outline-none transition-all duration-300 font-bold text-lg bg-white/80 backdrop-blur-sm ";
                                
                                if (otpValidationState === 'success') {
                                  inputStyle += "border-green-400 text-green-600 bg-green-50 shadow-lg";
                                } else if (otpValidationState === 'error') {
                                  inputStyle += "border-red-400 text-red-600 bg-red-50 shadow-lg";
                                } else {
                                  inputStyle += "border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 hover:border-pink-300 shadow-md";
                                }
                                
                                return (
                                  <div key={index} className="aspect-square">
                                    <motion.input
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ 
                                        opacity: 1, 
                                        scale: otpValidationState === 'success' ? [1, 1.1, 1] : 
                                               otpValidationState === 'error' ? [1, 1.05, 0.95, 1] : 1,
                                        rotate: otpValidationState === 'error' ? [0, -2, 2, 0] : 0
                                      }}
                                      transition={{ 
                                        duration: otpValidationState === 'success' ? 0.6 : 0.4,
                                        delay: index * 0.1,
                                        repeat: otpValidationState === 'error' ? 2 : 0
                                      }}
                                      id={`otp-${index}`}
                                      type="text"
                                      maxLength="1"
                                      value={digit}
                                      onChange={(e) => handleOTPChange(index, e.target.value)}
                                      onKeyDown={(e) => handleKeyDown(index, e)}
                                      disabled={otpValidationState !== ''}
                                      className={inputStyle}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Success/Error Message */}
                            {otpValidationState === 'success' && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center gap-2 text-green-600 font-medium mt-4"
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
                                className="flex items-center justify-center gap-2 text-red-600 font-medium mt-4"
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

                          {otpValidationState === '' && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleVerifyOTP}
                              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                              Xác nhận mã
                            </motion.button>
                          )}
                        </>
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
                        className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
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
                        Đang chuyển đến bước tiếp theo...
                      </motion.p>
                    </motion.div>
                  )}

                  {/* Password Step */}
                  {currentStep === 'password' && (
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={fadeInUpVariants}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {isLoadingPassword ? (
                        <LoadingSpinner message="Đang đặt lại mật khẩu..." type="password" />
                      ) : (
                        <>
                          {/* New Password */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mật khẩu mới
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 font-medium bg-white/80 backdrop-blur-sm hover:border-pink-300 pr-12"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                          </div>

                          {/* Confirm Password */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu mới"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 font-medium bg-white/80 backdrop-blur-sm hover:border-pink-300 pr-12"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                              >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleResetPassword}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                          >
                            Đặt lại mật khẩu
                          </motion.button>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Đã nhớ mật khẩu?{" "}
                  <button
                    onClick={handleGoToLogin}
                    className="text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>



      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes float-moon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-random-1 {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }
        
        @keyframes float-random-2 {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(-25px, 15px); }
          50% { transform: translate(20px, -25px); }
          75% { transform: translate(15px, 30px); }
        }
        
        @keyframes float-random-3 {
          0%, 100% { transform: translate(0px, 0px); }
          20% { transform: translate(15px, -20px); }
          40% { transform: translate(-30px, 10px); }
          60% { transform: translate(25px, 25px); }
          80% { transform: translate(-15px, -15px); }
        }
        
        @keyframes float-random-4 {
          0%, 100% { transform: translate(0px, 0px); }
          30% { transform: translate(-20px, -25px); }
          60% { transform: translate(35px, 15px); }
        }
        
        @keyframes float-random-5 {
          0%, 100% { transform: translate(0px, 0px); }
          40% { transform: translate(20px, 30px); }
          80% { transform: translate(-25px, -20px); }
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

export default ForgotPassword;