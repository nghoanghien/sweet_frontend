import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, UserCheck, Users, Settings, Save, PlusCircle, Lock, Check, Phone, IdCard, Info } from 'lucide-react';
import InputField from '../../ui/custom/Inputfield';
import SwipeConfirmationModal from '../../ui/SwipeConfirmationModal';

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center rounded-t-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] border-b-2 border-blue-100 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <User size={32} className="mr-3 text-white drop-shadow-lg" />
                <h3 className="text-2xl font-bold tracking-wide drop-shadow">
                  {isEditing ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
                </h3>
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
              {/* Account type selection */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-blue-700 mb-2">Loại tài khoản:</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('staff')}
                    className={`flex items-center px-5 py-2.5 rounded-2xl font-semibold text-base shadow transition-all
                      ${formData.type === 'staff'
                        ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'}
                        ${isEditing && formData.type === 'customer'
                        ? 'hidden' : ''}`}
                    disabled={isEditing}
                  >
                    <Settings size={20} className="mr-2" />
                    Nhân viên
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('customer')}
                    className={`flex items-center px-5 py-2.5 rounded-2xl font-semibold text-base shadow transition-all
                      ${formData.type === 'customer'
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'}
                      ${isEditing && formData.type === 'staff'
                        ? 'hidden' : ''}`}
                    disabled={isEditing}
                  >
                    <Users size={20} className="mr-2" />
                    Khách hàng
                  </button>
                </div>
              </div>
              
              {/* Name and username */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Email đăng nhập"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  placeholder="Nhập email đăng nhập..."
                  error={errors.email}
                  disabled={isEditing}
                  required
                />

                  {isEditing && (
                    <div>
                    <h4 className="text-xl font-bold text-gray-800">{account.name}</h4>
                    <p className="text-gray-500 flex items-center mt-1">
                      <Phone size={16} className="mr-1" />
                      {account.phone}
                    </p>
                    <p className="text-gray-500 flex items-center mt-1">
                      <IdCard size={16} className="mr-1" />
                      {account.CCCD}
                    </p>
                  </div>
                  )}

                  <AnimatePresence>
                    {!isEditing && formData.email != '' && foundAccount && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-xl font-bold text-gray-800">{foundAccount.name}</h4>
                        <p className="text-gray-500 flex items-center mt-1">
                          <Phone size={16} className="mr-1" />
                          {foundAccount.phone}
                        </p>
                        <p className="text-gray-500 flex items-center mt-1">
                          <IdCard size={16} className="mr-1" />
                          {foundAccount.CCCD}
                        </p>
                      </motion.div>
                    )}

                    {formData.email === '' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-red-500 font-light flex items-center md:mt-8">
                          <Info size={28} className="mr-2" />
                          Vui lòng nhập email để kiểm tra hồ sơ trước khi tạo tài khoản
                        </p>

                      </motion.div>
                    )}

                    {!isEditing &&formData.email !== '' && !foundAccount &&(
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-red-500 font-light flex items-center md:mt-8">
                          <Info className="mr-2 w-6 h-6" />
                          Email không tồn tại trong hệ thống
                        </p>

                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>
              
              {/* Password fields - only show when adding new account */}
              {!isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <InputField
                      label="Mật khẩu"
                      type="password"
                      value={formData.password}
                      onChange={(value) => handleInputChange('password', value)}
                      placeholder="Nhập mật khẩu..."
                      error={errors.password}
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <InputField
                      label="Xác nhận mật khẩu"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(value) => handleInputChange('confirmPassword', value)}
                      placeholder="Xác nhận mật khẩu..."
                      error={errors.confirmPassword}
                      required
                    />
                  </div>
                </div>
              )}
              
              {/* Role selection */}
              <div className="mb-6">
                <label className="block text-blue-700 font-semibold mb-2 pl-2">
                  Vai trò:
                  <span className="text-red-500 ml-1">*</span>
                </label>
                
                {errors.role && (
                  <p className="text-sm text-red-600 mb-2">{errors.role}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredRoles.map((role) => (
                    <motion.div
                      key={role.id}
                      className={`p-3 rounded-xl border-2 cursor-pointer flex items-center
                        ${formData.role && formData.role.id === role.id
                          ? formData.type === 'staff'
                            ? 'bg-indigo-50 border-indigo-300'
                            : 'bg-blue-50 border-blue-300'
                          : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'}`}
                      onClick={() => handleRoleSelect(role)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`p-1.5 rounded-full mr-3
                        ${formData.role && formData.role.id === role.id
                          ? formData.type === 'staff'
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-500'}`}
                      >
                        {formData.role && formData.role.id === role.id ? (
                          <Check size={16} />
                        ) : (
                          <UserCheck size={16} />
                        )}
                      </div>
                      <div>
                        <p className={`font-semibold text-sm
                          ${formData.role && formData.role.id === role.id
                            ? formData.type === 'staff'
                              ? 'text-indigo-700'
                              : 'text-blue-700'
                            : 'text-gray-700'}`}
                        >
                          {role.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">
                          {role.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-t-2 border-blue-100 flex justify-end gap-3 rounded-b-3xl">
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
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-md flex items-center hover:from-blue-600 hover:to-indigo-700 transition-all"
                whileHover={{ scale: 1.08, boxShadow: '0 4px 20px rgba(0,170,255,0.18)' }}
                whileTap={{ scale: 0.96 }}
              >
                {isEditing ? <Save size={20} className="mr-0" /> : <PlusCircle size={20} className="mr-2" />}
                {isEditing ? 'Cập nhật' : 'Thêm tài khoản'}
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

export default AccountFormModal;