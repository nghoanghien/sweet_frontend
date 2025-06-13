import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, UserCheck, Users, Settings, Save, PlusCircle, Check, Phone, IdCard, Info, Shield, Crown } from 'lucide-react';
import InputField from '@/components/ui/custom/Inputfield';
import SwipeConfirmationModal from '@/components/modals/ConfirmationModal/SwipeConfirmationModal';

const AccountFormModal = ({ isOpen, onClose, onSave, account, accountList, isEditing, rolesList }) => {
  // State cho form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'staff',
    role: null,
    disabled: false
  });
  
  // State cho account tìm thấy được
  const [foundAccount, setFoundAccount] = useState(null);
  // State cho lỗi validation
  const [errors, setErrors] = useState({});

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
  
  // Cập nhật formData khi account thay đổi
  useEffect(() => {
    if (account && isEditing) {
      setFormData({
        id: account.id,
        name: account.name,
        email: account.email,
        password: '',
        confirmPassword: '',
        type: account.type,
        role: account.role,
        disabled: account.disabled
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: 'staff',
        role: null,
        disabled: false
      });
    }
    setErrors({});
  }, [account, isEditing]);

  // Lọc danh sách vai trò theo loại tài khoản
  const filteredRoles = rolesList.filter(role => role.type === formData.type);

  // Xử lý khi thay đổi input
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });

    const foundAccount = accountList.find(account => account.type === formData.type && account.email === value);
    setFoundAccount(foundAccount);
    
    // Xóa lỗi khi người dùng nhập lại
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Xử lý khi thay đổi loại tài khoản
  const handleTypeChange = (type) => {
    const foundAccount = accountList.find(account => account.type === type && account.email === formData.email);
    setFoundAccount(foundAccount);
    // Khi thay đổi loại tài khoản, xóa vai trò đã chọn
    setFormData({
      ...formData,
      type,
      role: null
    });
  };

  // Xử lý khi chọn vai trò
  const handleRoleSelect = (selectedRole) => {
    setFormData({
      ...formData,
      role: selectedRole
    });
    
    // Xóa lỗi khi người dùng chọn vai trò
    if (errors.role) {
      setErrors({
        ...errors,
        role: null
      });
    }
  };

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
    
    if (!formData.email.trim()) {
      newErrors.username = 'Vui lòng nhập email';
    }
    
    if (!isEditing) {
      if (!formData.password) {
        newErrors.password = 'Vui lòng nhập mật khẩu';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }
    
    if (!formData.role) {
      newErrors.role = 'Vui lòng chọn vai trò';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Hiển thị modal xác nhận
    const confirmDetails = {
      'Tên người dùng': formData.name,
      'Email đăng nhập': formData.email,
      'Loại tài khoản': formData.type === 'staff' ? 'Nhân viên' : 'Khách hàng',
      'Vai trò': formData.role ? formData.role.name : '',
      'Trạng thái': formData.disabled ? 'Vô hiệu hóa' : 'Hoạt động'
    };
    
    showConfirmModal(
      isEditing ? 'Cập nhật tài khoản' : 'Thêm tài khoản mới',
      isEditing 
        ? `Xác nhận cập nhật tài khoản "${formData.email}"?` 
        : `Xác nhận thêm tài khoản "${formData.email}" vào hệ thống?`,
      isEditing ? 'update' : 'add',
      confirmDetails,
      () => {
        // Cập nhật trạng thái đang xử lý
        setConfirmationProcessing(true);
        
        // Giả lập thời gian xử lý API
        setTimeout(() => {
          try {
            // Tạo thông tin thông báo
            const notificationInfo = {
              message: isEditing 
                ? `Cập nhật tài khoản thành công!` 
                : `Thêm tài khoản thành công!`,
              type: 'success',
              format: isEditing 
              ? `Đã cập nhật tài khoản "${formData.email}" thành công!` 
              : `Đã thêm tài khoản "${formData.email}" thành công!`
            };
            
            // Gọi hàm onSave từ props với thông tin thông báo
            onSave(formData, notificationInfo);
            
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

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 0.4) 70%)'
          }}
          onClick={onClose}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{ 
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>

          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            layoutId={isEditing ? `edit-account-${account.id}` : ''}
            transition={{ duration: 0.2, type: "spring", stiffness: 150, damping: 18 }}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full"></div>
              <div className="absolute top-8 right-8 w-8 h-8 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-full"></div>
            </div>

            {/* Header */}
            <motion.div 
              className="px-8 py-6 flex justify-between items-center rounded-t-3xl bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 relative overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white via-transparent to-white transform -skew-x-12"></div>
              </div>
              
              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <User size={28} className="text-white drop-shadow-lg" />
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-xl font-bold tracking-wide drop-shadow text-white"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {isEditing ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
                  </motion.h3>
                  <motion.p 
                    className="text-white text-opacity-80 text-sm"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {isEditing ? 'Cập nhật thông tin tài khoản' : 'Tạo mới tài khoản hệ thống'}
                  </motion.p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-xl bg-white bg-opacity-20 hover:bg-opacity-30 transition-all backdrop-blur-sm relative z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <X size={24} className="text-white" />
              </motion.button>
            </motion.div>
            
            {/* Content */}
            <motion.div 
              className="p-8 overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {/* Account type selection */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <label className="block text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <Crown size={18} className="text-indigo-600" />
                  Loại tài khoản:
                </label>
                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    onClick={() => handleTypeChange('staff')}
                    className={`flex items-center px-6 py-3 rounded-2xl font-semibold text-base shadow-lg transition-all relative overflow-hidden
                      ${formData.type === 'staff'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-indigo-300'
                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md'}
                        ${isEditing && formData.type === 'customer'
                        ? 'hidden' : ''}`}
                    disabled={isEditing}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formData.type === 'staff' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-20"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                      />
                    )}
                    <Settings size={20} className="mr-2" />
                    Nhân viên
                    
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => handleTypeChange('customer')}
                    className={`flex items-center px-6 py-3 rounded-2xl font-semibold text-base shadow-lg transition-all relative overflow-hidden
                      ${formData.type === 'customer'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-blue-300'
                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'}
                      ${isEditing && formData.type === 'staff'
                        ? 'hidden' : ''}`}
                    disabled={isEditing}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formData.type === 'customer' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-20"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                      />
                    )}
                    <Users size={20} className="mr-2" />
                    Khách hàng
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Name and username */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="space-y-4">
                  <InputField
                    label="Email đăng nhập"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    placeholder="Nhập email đăng nhập..."
                    error={errors.email}
                    disabled={isEditing}
                    required
                  />
                  
                  <AnimatePresence mode="wait">
                    {formData.email === '' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl"
                      >
                        <p className="text-amber-700 font-medium flex items-center">
                          <Info size={20} className="mr-2 text-amber-600" />
                          Vui lòng nhập email để kiểm tra hồ sơ
                        </p>
                      </motion.div>
                    )}

                    {!isEditing && formData.email !== '' && !foundAccount && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl"
                      >
                        <p className="text-red-700 font-medium flex items-center">
                          <Info size={20} className="mr-2 text-red-600" />
                          Email không tồn tại trong hệ thống
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {((isEditing && account) || (!isEditing && foundAccount)) && (
                    <motion.div
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200 relative overflow-hidden"
                    >
                      {/* Decorative background */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 -translate-y-8 translate-x-8"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                            <User size={16} className="text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-gray-800">
                            {isEditing ? account.name : foundAccount.name}
                          </h4>
                        </div>
                        
                        <div className="space-y-2">
                          <motion.p 
                            className="text-gray-600 flex items-center text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                          >
                            <div className="p-1 bg-green-100 rounded-lg mr-2">
                              <Phone size={12} className="text-green-600" />
                            </div>
                            {isEditing ? account.phone : foundAccount.phone}
                          </motion.p>
                          <motion.p 
                            className="text-gray-600 flex items-center text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                          >
                            <div className="p-1 bg-blue-100 rounded-lg mr-2">
                              <IdCard size={12} className="text-blue-600" />
                            </div>
                            {isEditing ? account.CCCD : foundAccount.CCCD}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Password fields - only show when adding new account */}
              {!isEditing && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <InputField
                    label="Mật khẩu"
                    type="password"
                    value={formData.password}
                    onChange={(value) => handleInputChange('password', value)}
                    placeholder="Nhập mật khẩu..."
                    error={errors.password}
                    required
                  />
                  
                  <InputField
                    label="Xác nhận mật khẩu"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(value) => handleInputChange('confirmPassword', value)}
                    placeholder="Xác nhận mật khẩu..."
                    error={errors.confirmPassword}
                    required
                  />
                </motion.div>
              )}
              
              {/* Role selection */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <label className="block text-gray-700 font-bold mb-4 pl-2 flex items-center gap-2">
                  <Shield size={18} className="text-blue-600" />
                  Vai trò:
                  <span className="text-red-500 ml-1">*</span>
                </label>
                
                {errors.role && (
                  <motion.p 
                    className="text-sm text-red-600 mb-3 p-2 bg-red-50 rounded-lg border border-red-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {errors.role}
                  </motion.p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRoles.map((role, index) => (
                    <motion.div
                      key={role.id}
                      className={`p-5 rounded-2xl border-2 cursor-pointer flex items-start transition-all relative overflow-hidden group
                        ${formData.role && formData.role.id === role.id
                          ? formData.type === 'staff'
                            ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300 shadow-lg shadow-indigo-200/50'
                            : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300 shadow-lg shadow-blue-200/50'
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}`}
                      onClick={() => handleRoleSelect(role)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      {/* Animated background for selected role */}
                      {formData.role && formData.role.id === role.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                        />
                      )}
                      
                      <motion.div 
                        className={`p-2 rounded-xl mr-4 flex-shrink-0
                          ${formData.role && formData.role.id === role.id
                            ? formData.type === 'staff'
                              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {formData.role && formData.role.id === role.id ? (
                          <Check size={18} />
                        ) : (
                          <UserCheck size={18} />
                        )}
                      </motion.div>
                      
                      <div className="flex-1 relative z-10">
                        <p className={`font-bold text-base mb-1
                          ${formData.role && formData.role.id === role.id
                            ? formData.type === 'staff'
                              ? 'text-indigo-700'
                              : 'text-blue-700'
                            : 'text-gray-700 group-hover:text-gray-800'}`}
                        >
                          {role.name}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {role.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Footer */}
            <motion.div 
              className="px-8 py-6 bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 border-t border-gray-200 flex justify-end gap-4 rounded-b-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <motion.button
                onClick={onClose}
                className="px-6 py-3 bg-white text-gray-700 rounded-2xl font-semibold shadow-md hover:shadow-lg border border-gray-200 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Hủy
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 text-white rounded-2xl font-semibold shadow-md flex items-center relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                
                <div className="relative z-10 flex items-center">
                  {isEditing ? (
                    <>
                      <Save size={20} className="mr-2" />
                      Cập nhật
                    </>
                  ) : (
                    <>
                      <PlusCircle size={20} className="mr-2" />
                      Thêm tài khoản
                    </>
                  )}
                </div>
              </motion.button>
            </motion.div>
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

export default AccountFormModal;