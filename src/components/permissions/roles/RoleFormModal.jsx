import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserCheck, Shield, Users, Settings, Save, PlusCircle, CreditCard, PiggyBank, UserCog, Package, BarChart3 } from 'lucide-react';
import InputField from '../../ui/custom/Inputfield';
import SwipeConfirmationModal from '../../ui/SwipeConfirmationModal';

const RoleFormModal = ({ isOpen, onClose, onSave, role, isEditing }) => {
  // State cho form
  const [formData, setFormData] = useState({
    name: '',
    type: 'staff', // Mặc định là vai trò nhân viên
    description: '',
    permissions: []
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
  
  // Mock data cho danh sách quyền hạn
  const allPermissions = [
    // Quyền hạn khách hàng
    {
      id: 'perm1',
      name: 'Thanh toán',
      type: 'customer',
      description: 'Quyền thực hiện các giao dịch thanh toán'
    },
    {
      id: 'perm2',
      name: 'Tiết kiệm',
      type: 'customer',
      description: 'Quyền sử dụng các tính năng tiết kiệm'
    },
    
    // Quyền hạn nhân viên
    {
      id: 'perm4',
      name: 'Quản lý khách hàng',
      type: 'staff',
      description: 'Quyền quản lý thông tin khách hàng'
    },
    {
      id: 'perm5',
      name: 'Quản lý nhân viên',
      type: 'staff',
      description: 'Quyền quản lý thông tin nhân viên'
    },
    {
      id: 'perm7',
      name: 'Quản lý sản phẩm tiết kiệm',
      type: 'staff',
      description: 'Quyền quản lý các sản phẩm tiết kiệm'
    },
    {
      id: 'perm8',
      name: 'Báo cáo doanh số',
      type: 'staff',
      description: 'Quyền xem và xuất báo cáo doanh số'
    },
    {
      id: 'perm9',
      name: 'Cài đặt hệ thống',
      type: 'staff',
      description: 'Quyền cấu hình các thiết lập hệ thống'
    },
    {
      id: 'perm10',
      name: 'Quản lý phân quyền',
      type: 'staff',
      description: 'Quyền quản lý vai trò và phân quyền'
    }
  ];

  // Mapping icons cho từng quyền hạn cụ thể
  const getPermissionIcon = (permissionId) => {
    const iconMap = {
      'perm1': CreditCard,
      'perm2': PiggyBank,
      'perm4': Users,
      'perm5': UserCog,
      'perm6': Shield, // Không có icon riêng nên dùng Shield
      'perm7': Package,
      'perm8': BarChart3,
      'perm9': Settings,
      'perm10': Shield
    };
   
    return iconMap[permissionId] || Shield;
  };

  // Định nghĩa màu sắc cho từng quyền hạn
  const getCardColors = (permissionId, type) => {
    if (type === 'customer') {
      const customerColors = {
        'perm1': {
          primary: '#10b981', // emerald
          secondary: '#06d6a0',
          dark: '#047857',
          accent: '#6ee7b7',
          light: '#d1fae5'
        },
        'perm2': {
          primary: '#3b82f6', // blue
          secondary: '#8b5cf6',
          dark: '#1e40af',
          accent: '#93c5fd',
          light: '#dbeafe'
        }
      };
      return customerColors[permissionId] || customerColors['perm1'];
    } else {
      const staffColors = {
        'perm4': {
          primary: '#f59e0b', // amber
          secondary: '#ef4444',
          dark: '#d97706',
          accent: '#fbbf24',
          light: '#fef3c7'
        },
        'perm5': {
          primary: '#8b5cf6', // purple
          secondary: '#3b82f6',
          dark: '#7c3aed',
          accent: '#c4b5fd',
          light: '#ede9fe'
        },
        'perm6': {
          primary: '#06b6d4', // cyan
          secondary: '#14b8a6',
          dark: '#0891b2',
          accent: '#67e8f9',
          light: '#cffafe'
        },
        'perm7': {
          primary: '#ec4899',    // pink-500
          secondary: '#db2777',  // pink-600
          dark: '#be185d',       // pink-700
          accent: '#f472b6',     // pink-400
          light: '#fce7f3'       // pink-100
        },
        'perm8': {
          primary: '#14b8a6', // teal
          secondary: '#06b6d4',
          dark: '#0f766e',
          accent: '#7dd3fc',
          light: '#ccfbf1'
        },
        'perm9': {
          primary: '#6b7280', // gray
          secondary: '#64748b',
          dark: '#4b5563',
          accent: '#d1d5db',
          light: '#f3f4f6'
        },
        'perm10': {
          primary: '#ef4444', // red
          secondary: '#ec4899',
          dark: '#dc2626',
          accent: '#fca5a5',
          light: '#fee2e2'
        }
      };
      return staffColors[permissionId] || staffColors['perm4'];
    }
  };

  // Cập nhật formData khi role thay đổi
  useEffect(() => {
    if (role && isEditing) {
      setFormData({
        id: role.id,
        name: role.name,
        type: role.type,
        description: role.description,
        permissions: [...role.permissions]
      });
    } else {
      setFormData({
        name: '',
        type: 'staff',
        description: '',
        permissions: []
      });
    }
    setErrors({});
  }, [role, isEditing]);

  // Lọc danh sách quyền hạn theo loại vai trò
  const filteredPermissions = allPermissions.filter(
    permission => permission.type === formData.type
  );

  // Kiểm tra xem quyền hạn đã được chọn chưa
  const isPermissionSelected = (permissionId) => {
    return formData.permissions.some(p => p.id === permissionId);
  };

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

  // Xử lý khi chọn/bỏ chọn quyền hạn
  const handleTogglePermission = (permission) => {
    const isSelected = isPermissionSelected(permission.id);
    
    if (isSelected) {
      // Bỏ chọn quyền hạn
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p.id !== permission.id)
      });
    } else {
      // Chọn quyền hạn
      setFormData({
        ...formData,
        permissions: [...formData.permissions, { id: permission.id, name: permission.name }]
      });
    }
    
    // Xóa lỗi khi người dùng chọn quyền hạn
    if (errors.permissions) {
      setErrors({
        ...errors,
        permissions: null
      });
    }
  };

  // Xử lý khi thay đổi loại vai trò
  const handleTypeChange = (type) => {
    // Khi thay đổi loại vai trò, xóa hết các quyền hạn đã chọn
    setFormData({
      ...formData,
      type,
      permissions: []
    });
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên vai trò';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng nhập mô tả vai trò';
    }
    
    if (formData.permissions.length === 0) {
      newErrors.permissions = 'Vui lòng chọn ít nhất một quyền hạn';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Hiển thị modal xác nhận
    const confirmDetails = {
      'Tên vai trò': formData.name,
      'Loại vai trò': formData.type === 'staff' ? 'Nhân viên' : 'Khách hàng',
      'Số quyền hạn': formData.permissions.length
    };
    
    showConfirmModal(
      isEditing ? 'Cập nhật vai trò' : 'Thêm vai trò mới',
      isEditing 
        ? `Xác nhận cập nhật vai trò "${formData.name}"?` 
        : `Xác nhận thêm vai trò "${formData.name}" vào hệ thống?`,
      isEditing ? "update" : 'add',
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
              ? 'Cập nhật vai trò thành công!'
              : 'Thêm vai trò thành công!',
              type: 'success',
              format: isEditing 
              ? `Đã cập nhật vai trò "${formData.name}" thành công!` 
              : `Đã thêm vai trò "${formData.name}" thành công!`,
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[95vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28 }}
          >
            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center rounded-t-3xl shadow-[0_4px_30px_rgba(99,102,241,0.12)] border-b-2 border-indigo-100 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <UserCheck size={32} className="mr-3 text-white drop-shadow-lg" />
                <h3 className="text-2xl font-bold tracking-wide drop-shadow">
                  {isEditing ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
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
              {/* Role type selection */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-blue-700 mb-2">Loại vai trò:</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('staff')}
                    className={`flex items-center px-5 py-2.5 rounded-2xl font-semibold text-base shadow transition-all
                      ${formData.type === 'staff'
                        ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'}`}
                    disabled={isEditing}
                  >
                    <Settings size={20} className="mr-2" />
                    Nhân viên
                  </button>
                </div>
                {formData.type === 'customer' && (
                  <p className="mt-2 text-sm text-amber-600 font-medium">
                    Vai trò khách hàng đã được cố định và không thể thêm mới.
                  </p>
                )}
              </div>
              
              {/* Role name */}
              <InputField
                label="Tên vai trò"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="Nhập tên vai trò..."
                error={errors.name}
                required
              />
              
              {/* Role description */}
              <div className="mb-6">
                <label className="block text-blue-700 font-semibold mb-2 pl-2">
                  Mô tả:
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full border-2 p-4 rounded-2xl shadow-inner hover:shadow-lg transition-all duration-300 ease-in-out
                    focus:ring-2 focus:outline-none focus:border-indigo-400 focus:ring-indigo-200 focus:bg-indigo-50
                    text-base font-medium text-blue-800 placeholder-indigo-300
                    ${errors.description ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:bg-red-100' : 'border-indigo-100 bg-white/80'}`}
                  rows="3"
                  placeholder="Nhập mô tả vai trò..."
                />
                <AnimatePresence>
                  {errors.description && (
                    <motion.p 
                      key="error"
                      initial={{ opacity: 0, y: -5, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -5, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs text-red-500 px-4 p-1 mt-1"
                    >
                      {errors.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Permissions selection - Updated */}
              <div>
                <label className="block text-base font-semibold text-blue-700 mb-2">Chọn quyền hạn:</label>
                {errors.permissions && (
                  <p className="mb-2 text-sm text-red-600 font-medium">{errors.permissions}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-1">
                  {filteredPermissions.map((permission) => {
                    const isSelected = isPermissionSelected(permission.id);
                    const IconComponent = getPermissionIcon(permission.id);
                    const colors = getCardColors(permission.id, permission.type);
                    
                    return (
                      <motion.div
                        key={permission.id}
                        className={`relative p-4 rounded-2xl border-2 cursor-pointer flex items-start overflow-hidden transition-all duration-300
                          ${
                            isSelected
                              ? "border-transparent shadow-lg"
                              : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                          }`}
                        style={{
                          backgroundColor: isSelected ? colors.light : "white",
                          borderColor: isSelected ? colors.primary : undefined,
                        }}
                        onClick={() => handleTogglePermission(permission)}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: isSelected
                            ? `0 8px 25px ${colors.primary}20`
                            : "0 4px 20px rgba(0,0,0,0.08)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Background Icon - Large and Faded */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                          <div
                            className="opacity-[0.1] transform scale-[4] translate-y-4 translate-x-20"
                            style={{ color: colors.primary }}
                          >
                            <IconComponent size={20} strokeWidth={1.8} />
                          </div>
                        </div>

                        {/* Background gradient effect khi được chọn */}
                        {isSelected && (
                          <motion.div
                            className="absolute inset-0 opacity-10 rounded-2xl"
                            style={{
                              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}

                        {/* Icon container */}
                        <motion.div
                          className={`relative z-10 p-3 rounded-xl mr-3 shadow-sm transition-all duration-300`}
                          style={{
                            backgroundColor: isSelected
                              ? `${colors.primary}15`
                              : "#f8fafc",
                            color: isSelected ? colors.primary : "#64748b",
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: isSelected
                              ? `${colors.primary}25`
                              : "#f1f5f9",
                          }}
                        >
                          <IconComponent size={20} />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10 flex-1">
                          <motion.p
                            className={`font-semibold text-base transition-colors duration-300`}
                            style={{
                              color: isSelected ? colors.dark : "#374151",
                            }}
                          >
                            {permission.name}
                          </motion.p>
                          <p
                            className={`text-xs mt-1 transition-colors duration-300 ${
                              isSelected ? "text-gray-600" : "text-gray-500"
                            }`}
                          >
                            {permission.description}
                          </p>
                        </div>

                        {/* Selection indicator */}
                        {isSelected && (
                          <motion.div
                            className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
                            style={{
                              backgroundColor: colors.primary,
                              color: "white",
                            }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 25,
                            }}
                          >
                            <motion.div
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              ✓
                            </motion.div>
                          </motion.div>
                        )}

                        {/* Hover effect border */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-transparent"
                          style={{
                            borderColor: isSelected
                              ? colors.primary
                              : "transparent",
                          }}
                          whileHover={{
                            borderColor: isSelected
                              ? colors.primary
                              : colors.accent || "#e5e7eb",
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-t-2 border-indigo-100 flex justify-end gap-3 rounded-b-3xl">
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
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-md flex items-center hover:from-blue-600 hover:to-indigo-700 transition-all"
                whileHover={{ scale: 1.08, boxShadow: '0 4px 20px rgba(0,170,255,0.18)' }}
                whileTap={{ scale: 0.96 }}
              >
                {isEditing ? <Save size={20} className="mr-2" /> : <PlusCircle size={20} className="mr-2" />}
                {isEditing ? 'Cập nhật' : 'Thêm vai trò'}
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

export default RoleFormModal;