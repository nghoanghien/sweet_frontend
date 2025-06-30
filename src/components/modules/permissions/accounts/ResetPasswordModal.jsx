import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Eye, EyeOff, RefreshCw } from 'lucide-react';
import InputField from '@/components/ui/custom/Inputfield';
import SwipeConfirmationModal from '@/components/modals/ConfirmationModal/SwipeConfirmationModal';

const ResetPasswordModal = ({ isOpen, onClose, onConfirm, account }) => {
  // State cho form
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  // State cho modal xác nhận
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    type: 'warning',
    confirmDetails: null,
    onConfirm: () => {},
    isProcessing: false,
  });

  // Reset form khi modal mở
  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setErrors({});
      setIsGenerating(false);
    }
  }, [isOpen]);

  if (!isOpen || !account) return null;

  // Hàm hiển thị modal xác nhận
  const showConfirmModal = (title, description, type, details, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      description,
      type,
      confirmDetails: details,
      onConfirm,
      isProcessing: false,
    });
  };
  
  // Hàm cập nhật trạng thái xử lý
  const setConfirmationProcessing = (isProcessing) => {
    setConfirmModal(prev => ({ ...prev, isProcessing }));
  };

  // Hàm đóng modal xác nhận
  const closeConfirmModal = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  // Xử lý khi submit form
  const handleSubmit = () => {
    // Validate form
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu mới';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Hiển thị modal xác nhận
    const confirmDetails = {
      'Tài khoản': account.email,
      'Tên người dùng': account.fullName,
      'Vai trò': account.role.roleName
    };
    
    showConfirmModal(
      'Đặt lại mật khẩu',
      `Xác nhận đặt lại mật khẩu cho tài khoản "${account.email}"?`,
      'warning',
      confirmDetails,
      () => {
        // Cập nhật trạng thái đang xử lý
        setConfirmationProcessing(true);
        
        // Giả lập thời gian xử lý API
        setTimeout(() => {
          try {
            // Gọi hàm onConfirm từ props với thông tin thông báo
            onConfirm(password, {
              message: 'Đặt lại mật khẩu thành công!',
              type: 'success',
              format: `Đã đặt lại mật khẩu cho tài khoản "${account.email}" thành công!`
            });
            
            // Đóng modal chính ngay lập tức
            onClose();
          } finally {
            // Đặt lại trạng thái xử lý
            setConfirmationProcessing(false);
            // Đóng modal xác nhận
            closeConfirmModal();
          }
        }, 1500);
      }
    );
  };

  // Tạo mật khẩu ngẫu nhiên
  const generateRandomPassword = () => {
    setIsGenerating(true);
    
    // Giả lập thời gian tạo mật khẩu
    setTimeout(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      let newPassword = '';
      for (let i = 0; i < 10; i++) {
        newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      setPassword(newPassword);
      setConfirmPassword(newPassword);
      setShowPassword(true);
      setErrors({});
      setIsGenerating(false);
    }, 800);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl w-full max-w-md max-h-[95vh] flex flex-col overflow-hidden"
            layoutId={`resetPassword-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}`}
            transition={{ duration: 0.2, type: "spring", stiffness: 150, damping: 18 }} 
            onClick={(e) => e.stopPropagation()}         
          >
            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center rounded-t-3xl shadow-[0_4px_30px_rgba(245,158,11,0.12)] border-b-2 border-amber-100 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white">
              <div className="flex items-center gap-3">
                <Lock size={32} className="mr-3 text-white drop-shadow-lg" />
                <h3 className="text-2xl font-bold tracking-wide drop-shadow">Đặt lại mật khẩu</h3>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
              >
                <X size={28} />
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <div className="mb-6">
                <p className="text-gray-600">
                  Đặt lại mật khẩu cho tài khoản <span className="font-semibold">{account.fullName}</span> ({account.email})
                </p>
              </div>
              
              {/* Password field */}
              <div className="relative mb-4">
                <InputField
                  label="Mật khẩu mới"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(value) => {
                    setPassword(value);
                    if (errors.password) {
                      setErrors({ ...errors, password: null });
                    }
                  }}
                  placeholder="Nhập mật khẩu mới..."
                  error={errors.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[42px] transform text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* Confirm password field */}
              <div className="relative mb-6">
                <InputField
                  label="Xác nhận mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(value) => {
                    setConfirmPassword(value);
                    if (errors.confirmPassword) {
                      setErrors({ ...errors, confirmPassword: null });
                    }
                  }}
                  placeholder="Xác nhận mật khẩu..."
                  error={errors.confirmPassword}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[42px] transform text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* Generate random password button */}
              <motion.button
                onClick={generateRandomPassword}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 flex items-center justify-center mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="mr-2"
                  >
                    <RefreshCw size={16} />
                  </motion.span>
                ) : (
                  <RefreshCw size={16} className="mr-2" />
                )}
                {isGenerating ? 'Đang tạo...' : 'Tạo mật khẩu ngẫu nhiên'}
              </motion.button>
              
              <div className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg">
                <p>Lưu ý: Sau khi đặt lại mật khẩu, người dùng sẽ cần đăng nhập lại bằng mật khẩu mới.</p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-5 bg-gradient-to-r from-amber-50 via-amber-100 to-white border-t-2 border-amber-100 flex justify-end gap-3 rounded-b-3xl">
              <motion.button
                onClick={onClose}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold shadow hover:bg-gray-200 transition-all"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                Hủy
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold shadow-md flex items-center hover:from-amber-600 hover:to-amber-700 transition-all"
                whileHover={{ scale: 1.08, boxShadow: '0 4px 20px rgba(245,158,11,0.18)' }}
                whileTap={{ scale: 0.96 }}
              >
                <Lock size={20} className="mr-2" />
                Đặt lại mật khẩu
              </motion.button>
            </div>
          </motion.div>

          {/* SwipeConfirmationModal */}
          <SwipeConfirmationModal
            isOpen={confirmModal.isOpen}
            onClose={closeConfirmModal}
            onConfirm={confirmModal.onConfirm}
            title={confirmModal.title}
            description={confirmModal.description}
            type={confirmModal.type}
            confirmDetails={confirmModal.confirmDetails}
            isProcessing={confirmModal.isProcessing}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResetPasswordModal;