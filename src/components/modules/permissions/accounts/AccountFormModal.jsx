import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, UserCheck, Users, Settings, Save, Check, Phone, IdCard, Info, Shield, Crown } from 'lucide-react';
import SwipeConfirmationModal from '@/components/modals/ConfirmationModal/SwipeConfirmationModal';
import RoleSelectionShimmer from '@/components/ui/custom/shimmer-types/RoleSelectionShimmer';
import { useAllRoles } from '@/hooks/useAllRoles';

const AccountFormModal = ({ isOpen, onClose, onSave, account, accountList, isEditing }) => {
  // State cho loading
  const [isLoading, setIsLoading] = useState(true);
  
  // Hook để lấy danh sách vai trò
  const { allRoles, isLoading: rolesLoading, error: rolesError } = useAllRoles();
  
  // State cho form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'staff',
    role: null,
    disabled: false
  });
  

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
  
  // Effect cho loading state
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  // Cập nhật formData khi account thay đổi
  useEffect(() => {
    if (account && isEditing) {
      setFormData({
        id: account.customerID || account.employeeID,
        name: account.fullName,
        email: account.email,
        type: account.customerID ? 'customer' : 'staff',
        role: account.role,
        disabled: account.accountStatus === 'disabled'
      });
    }
    setErrors({});
  }, [account, isEditing]);

  // Lọc danh sách vai trò theo loại tài khoản
  const filteredRoles = allRoles.filter((role) => {
    if (formData.type === 'staff') {
      return !role.customerRole; // Vai trò nhân viên
    } else if (formData.type === 'customer') {
      return role.customerRole; // Vai trò khách hàng
    }
    return false;
  });

  // Xử lý khi thay đổi input
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
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
      'Vai trò': formData.role ? formData.role.roleName : '',
      'Trạng thái': formData.disabled ? 'Vô hiệu hóa' : 'Hoạt động'
    };
    
    showConfirmModal(
      'Cập nhật tài khoản',
      `Xác nhận cập nhật tài khoản "${formData.email}"?`,
      'update',
      confirmDetails,
      () => {
        // Cập nhật trạng thái đang xử lý
        setConfirmationProcessing(true);
        
        // Giả lập thời gian xử lý API
        setTimeout(() => {
          try {
            // Tạo thông tin thông báo
            const notificationInfo = {
              message: `Cập nhật tài khoản thành công!`,
              type: 'success',
              format: `Đã cập nhật tài khoản "${formData.email}" thành công!`
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
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            layoutId={isEditing ? `edit-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}` : ''}
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
                    Chỉnh sửa tài khoản
                  </motion.h3>
                  <motion.p 
                    className="text-white text-opacity-80 text-sm"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    Cập nhật thông tin tài khoản
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

              
              {/* Thông tin tài khoản */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {account && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className={`relative p-6 rounded-2xl border backdrop-blur-sm overflow-hidden ${
                      account.customerID 
                        ? 'bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white border-emerald-200/60 shadow-[0_4px_25px_rgba(16,185,129,0.12)]'
                        : 'bg-gradient-to-br from-violet-50/90 via-purple-50/50 to-white border-violet-200/60 shadow-[0_4px_25px_rgba(139,92,246,0.12)]'
                    }`}
                  >
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                      <div className={`absolute top-2 right-2 w-16 h-16 rounded-full ${
                        account.customerID 
                          ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
                          : 'bg-gradient-to-br from-violet-400 to-purple-500'
                      }`}></div>
                      <div className={`absolute top-6 right-6 w-8 h-8 rounded-full ${
                        account.customerID 
                          ? 'bg-gradient-to-br from-teal-400 to-cyan-500'
                          : 'bg-gradient-to-br from-purple-400 to-indigo-500'
                      }`}></div>
                    </div>
                    
                    <div className="relative z-10">
                      {/* Header với avatar và thông tin cơ bản */}
                      <div className="flex items-start gap-4 mb-6">
                        {/* Avatar */}
                        <motion.div
                          className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                            account.customerID 
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                              : 'bg-gradient-to-br from-violet-500 to-purple-600'
                          }`}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {account.fullName
                            ? account.fullName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()
                                .substring(0, 2)
                            : 'N/A'}
                          
                          {/* Floating icon */}
                          <motion.div
                            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center shadow-md ${
                              account.customerID 
                                ? 'bg-emerald-100 text-emerald-600'
                                : 'bg-violet-100 text-violet-600'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                          >
                            {account.customerID ? <Users size={14} /> : <UserCheck size={14} />}
                          </motion.div>
                        </motion.div>
                        
                        {/* Thông tin cơ bản */}
                        <div className="flex-1">
                          <motion.h4 
                            className="text-xl font-bold text-gray-800 mb-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            {account.fullName}
                          </motion.h4>
                          
                          <motion.div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              account.customerID 
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-violet-100 text-violet-700'
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              account.customerID ? 'bg-emerald-500' : 'bg-violet-500'
                            }`}></div>
                            {account.customerID ? 'Khách hàng' : 'Nhân viên'}
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Chi tiết thông tin */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div 
                          className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/90 transition-all duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                          whileHover={{ y: -2, scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-colors ${
                              account.customerID 
                                ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200'
                                : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                            }`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 font-medium mb-1">Email đăng nhập</p>
                              <p className="text-gray-800 font-semibold text-sm">{account.email}</p>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/90 transition-all duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                          whileHover={{ y: -2, scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-colors ${
                              account.customerID 
                                ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200'
                                : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                            }`}>
                              <Phone size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 font-medium mb-1">Số điện thoại</p>
                              <p className="text-gray-800 font-semibold text-sm">{account.phoneNumber}</p>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/90 transition-all duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                          whileHover={{ y: -2, scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-colors ${
                              account.customerID 
                                ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200'
                                : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                            }`}>
                              <IdCard size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 font-medium mb-1">CCCD/CMND</p>
                              <p className="text-gray-800 font-semibold text-sm">{account.idCardNumber}</p>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Vai trò hiện tại */}
                        {account.role && (
                          <motion.div 
                            className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/90 transition-all duration-300"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.3 }}
                            whileHover={{ y: -2, scale: 1.02 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg transition-colors ${
                                account.customerID 
                                  ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200'
                                  : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                              }`}>
                                <Shield size={16} />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-gray-500 font-medium mb-1">Vai trò hiện tại</p>
                                <p className="text-gray-800 font-semibold text-sm">{account.role.roleName}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Role selection */}
              {isLoading || rolesLoading ? (
                <RoleSelectionShimmer />
              ) : rolesError ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                  <p className="text-red-600 text-sm">Không thể tải danh sách vai trò. Vui lòng thử lại.</p>
                </div>
              ) : (
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
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
                        key={role.roleID}
                        className={`p-5 rounded-2xl border-2 cursor-pointer flex items-start transition-all relative overflow-hidden group
                          ${formData.role && formData.role.roleID === role.roleID
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
                        {formData.role && formData.role.roleID === role.roleID && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                          />
                        )}
                        
                        <motion.div 
                          className={`p-2 rounded-xl mr-4 flex-shrink-0
                            ${formData.role && formData.role.roleID === role.roleID
                              ? formData.type === 'staff'
                                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {formData.role && formData.role.roleID === role.roleID ? (
                            <Check size={18} />
                          ) : (
                            <UserCheck size={18} />
                          )}
                        </motion.div>
                        
                        <div className="flex-1 relative z-10">
                          <p className={`font-bold text-base mb-1
                            ${formData.role && formData.role.roleID === role.roleID
                              ? formData.type === 'staff'
                                ? 'text-indigo-700'
                                : 'text-blue-700'
                              : 'text-gray-700 group-hover:text-gray-800'}`}
                          >
                            {role.roleName}
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {role.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
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
                  <Save size={20} className="mr-2" />
                  Cập nhật
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