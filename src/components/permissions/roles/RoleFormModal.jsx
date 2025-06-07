import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserCheck, Shield, Users, Settings, Save, PlusCircle, CreditCard, PiggyBank, UserCog, Package, BarChart3, Crown, Sparkles, Zap } from 'lucide-react';
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
      'perm6': Shield,
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
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bg-white rounded-xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[98vh] sm:max-h-[95vh] flex flex-col overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28 }}
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* Decorative elements - smaller on mobile */}
            <div className="absolute top-0 right-0 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full blur-2xl sm:blur-3xl transform translate-x-10 sm:translate-x-20 -translate-y-10 sm:-translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tr from-indigo-200/30 to-cyan-300/30 rounded-full blur-xl sm:blur-2xl transform -translate-x-8 sm:-translate-x-16 translate-y-8 sm:translate-y-16"></div>

            {/* Header - optimized for mobile */}
            <div className="relative px-4 sm:px-8 py-4 sm:py-8 flex justify-between items-center rounded-t-xl sm:rounded-t-3xl border-indigo-100 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 text-white overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3)_0%,transparent_50%)]"></div>
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 relative z-10">
                <motion.div
                  className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Crown
                    size={20}
                    className="sm:hidden text-yellow-200 drop-shadow-lg"
                  />
                  <Crown
                    size={32}
                    className="hidden sm:block text-yellow-200 drop-shadow-lg"
                  />
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold tracking-wide drop-shadow-md">
                    {isEditing ? "Chỉnh sửa vai trò" : "Tạo vai trò mới"}
                  </h3>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="relative z-10 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
              >
                <X size={20} className="sm:hidden" />
                <X size={24} className="hidden sm:block" />
              </motion.button>
            </div>

            {/* Content - mobile optimized */}
            <div className="p-4 sm:p-8 overflow-y-auto space-y-4 sm:space-y-8 relative z-10">
              {/* Role type selection - mobile optimized */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Sparkles className="text-violet-600" size={20} />
                  <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    Loại vai trò
                  </h4>
                </div>

                <div className="relative">
                  <motion.div
                    className="bg-gradient-to-r from-violet-50 to-blue-50 p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-violet-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Staff Role Card - mobile optimized */}
                      <motion.button
                        type="button"
                        onClick={() => handleTypeChange("staff")}
                        className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${
                          formData.type === "staff"
                            ? "border-violet-400 bg-gradient-to-br from-violet-50 to-blue-50 shadow-lg"
                            : "border-gray-200 bg-white hover:border-violet-200 hover:shadow-md"
                        }`}
                        disabled={isEditing}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Selection Indicator */}
                        {formData.type === "staff" && (
                          <motion.div
                            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 bg-violet-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Zap size={10} className="sm:hidden text-white" />
                            <Zap
                              size={14}
                              className="hidden sm:block text-white"
                            />
                          </motion.div>
                        )}

                        <div className="relative z-10 text-left">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div
                              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                                formData.type === "staff"
                                  ? "bg-violet-100 text-violet-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              <Settings size={18} className="sm:hidden" />
                              <Settings size={24} className="hidden sm:block" />
                            </div>
                            <div>
                              <h5
                                className={`font-bold text-base sm:text-lg ${
                                  formData.type === "staff"
                                    ? "text-violet-700"
                                    : "text-gray-700"
                                }`}
                              >
                                Nhân viên
                              </h5>
                              <p className="text-xs sm:text-sm text-gray-500">
                                Quản lý & vận hành
                              </p>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            Dành cho các nhân viên với quyền hạn quản lý hệ
                            thống, khách hàng và vận hành doanh nghiệp.
                          </p>
                        </div>
                      </motion.button>

                      {/* Customer Role Card (Disabled) - mobile optimized */}
                      <motion.div
                        className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 opacity-60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="text-left">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-200 text-gray-500">
                              <Users size={18} className="sm:hidden" />
                              <Users size={24} className="hidden sm:block" />
                            </div>
                            <div>
                              <h5 className="font-bold text-base sm:text-lg text-gray-500">
                                Khách hàng
                              </h5>
                              <p className="text-xs sm:text-sm text-gray-400">
                                Người dùng cuối
                              </p>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-2 sm:mb-3">
                            Vai trò mặc định cho khách hàng sử dụng dịch vụ.
                          </p>
                          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                            <Shield size={10} className="sm:hidden" />
                            <Shield size={12} className="hidden sm:block" />
                            Không thể tùy chỉnh
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Role name - mobile optimized */}
              <motion.div
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <UserCheck className="text-blue-600" size={20} />
                  <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Tên vai trò
                  </h4>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl sm:rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-100">
                    <label className="block text-blue-700 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">
                      Nhập tên vai trò
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium border-2 rounded-xl sm:rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 ${
                          errors.name
                            ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100 text-red-700"
                            : "border-blue-200 bg-white focus:border-blue-400 focus:ring-blue-100 text-blue-800"
                        }`}
                        placeholder="VD: Quản lý chi nhánh, Nhân viên kế toán..."
                      />
                      <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                        <UserCheck size={16} className="sm:hidden" />
                        <UserCheck size={20} className="hidden sm:block" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          className="text-red-500 text-xs sm:text-sm mt-2 font-medium"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Role description - mobile optimized */}
              <motion.div
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Package className="text-emerald-600" size={20} />
                  <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Mô tả vai trò
                  </h4>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl sm:rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-emerald-100">
                    <label className="block text-emerald-700 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">
                      Chi tiết về vai trò này
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base leading-relaxed border-2 rounded-xl sm:rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 resize-none ${
                          errors.description
                            ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100 text-red-700"
                            : "border-emerald-200 bg-white focus:border-emerald-400 focus:ring-emerald-100 text-emerald-800"
                        }`}
                        rows="3"
                        placeholder="Mô tả chi tiết về trách nhiệm, phạm vi công việc và mục đích của vai trò này trong tổ chức..."
                      />
                      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-emerald-400">
                        <Package size={14} className="sm:hidden" />
                        <Package size={18} className="hidden sm:block" />
                        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-emerald-400">
                          <Package size={14} className="sm:hidden" />
                          <Package size={18} className="hidden sm:block" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2 sm:mt-2">
                        <AnimatePresence>
                          {errors.description && (
                            <motion.p
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="text-red-500 text-xs sm:text-sm font-medium"
                            >
                              {errors.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <div className="text-xs text-gray-500 font-medium">
                          {formData.description.length}/500 ký tự
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Permissions selection - Mobile optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Shield className="text-purple-600" size={20} />
                  <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Phân quyền truy cập
                  </h4>
                </div>

                {errors.permissions && (
                  <motion.div
                    className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <p className="text-red-600 font-medium text-xs sm:text-sm">
                      {errors.permissions}
                    </p>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 p-1">
                  {filteredPermissions.map((permission, index) => {
                    const isSelected = isPermissionSelected(permission.id);
                    const IconComponent = getPermissionIcon(permission.id);
                    const colors = getCardColors(
                      permission.id,
                      permission.type
                    );

                    return (
                      <motion.div
                        key={permission.id}
                        className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 cursor-pointer flex items-start overflow-hidden transition-all duration-300 group ${
                          isSelected
                            ? "border-transparent shadow-lg sm:shadow-xl"
                            : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md sm:hover:shadow-lg"
                        }`}
                        style={{
                          backgroundColor: isSelected ? colors.light : "white",
                          borderColor: isSelected ? colors.primary : undefined,
                        }}
                        onClick={() => handleTogglePermission(permission)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.01,
                          y: -1,
                          boxShadow: isSelected
                            ? `0 15px 30px ${colors.primary}20`
                            : "0 8px 25px rgba(0,0,0,0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Animated Background Gradient */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-2xl sm:rounded-3xl"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          }}
                          whileHover={{ opacity: isSelected ? 0.15 : 0.05 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Floating Background Icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                          <motion.div
                            className="opacity-[0.08] sm:opacity-[0.1] transform scale-[3] sm:scale-[4] translate-y-3 sm:translate-y-4 translate-x-15 sm:translate-x-20"
                            style={{ color: colors.primary }}
                            animate={{
                              rotate: isSelected ? 360 : 0,
                              scale: isSelected ? 5 : 4,
                            }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          >
                            <IconComponent
                              size={16}
                              className="sm:hidden"
                              strokeWidth={1.9}
                            />
                            <IconComponent
                              size={20}
                              className="hidden sm:block"
                              strokeWidth={1.9}
                            />
                          </motion.div>
                        </div>

                        {/* Glowing Border Effect */}
                        {isSelected && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl sm:rounded-3xl"
                            style={{
                              background: `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`,
                              filter: "blur(15px)",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}

                        {/* Icon container with enhanced animation */}
                        <motion.div
                          className={`relative z-10 p-2 sm:p-4 rounded-xl sm:rounded-2xl mr-3 sm:mr-4 shadow-md sm:shadow-lg transition-all duration-300`}
                          style={{
                            backgroundColor: isSelected
                              ? `${colors.primary}20`
                              : "#f8fafc",
                            color: isSelected ? colors.primary : "#64748b",
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            backgroundColor: isSelected
                              ? `${colors.primary}30`
                              : "#f1f5f9",
                          }}
                          animate={{
                            boxShadow: isSelected
                              ? `0 6px 20px ${colors.primary}30`
                              : "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          <IconComponent
                            size={18}
                            className="sm:hidden"
                            strokeWidth={2}
                          />
                          <IconComponent
                            size={24}
                            className="hidden sm:block"
                            strokeWidth={2}
                          />
                        </motion.div>

                        {/* Content with enhanced typography */}
                        <div className="relative z-10 flex-1">
                          <motion.h5
                            className={`font-bold text-base sm:text-lg mb-1 sm:mb-2 transition-colors duration-300`}
                            style={{
                              color: isSelected ? colors.dark : "#374151",
                            }}
                            animate={{
                              scale: isSelected ? 1.01 : 1,
                            }}
                          >
                            {permission.name}
                          </motion.h5>
                          <p
                            className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                              isSelected ? "text-gray-700" : "text-gray-500"
                            }`}
                          >
                            {permission.description}
                          </p>
                        </div>

                        {/* Enhanced Selection Indicator */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md sm:shadow-lg"
                              style={{
                                backgroundColor: colors.primary,
                                color: "white",
                              }}
                              initial={{ scale: 0, rotate: -180, opacity: 0 }}
                              animate={{ scale: 1, rotate: 0, opacity: 1 }}
                              exit={{ scale: 0, rotate: 180, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 600,
                                damping: 25,
                              }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <motion.svg
                                width="10"
                                height="10"
                                className="sm:w-3.5 sm:h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <motion.path
                                  d="M20 6L9 17l-5-5"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.1 }}
                                />
                              </motion.svg>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Ripple effect on click */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at center, ${colors.primary}30 0%, transparent 70%)`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          whileTap={{ scale: 2, opacity: 0.3 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Footer - Mobile optimized */}
            <motion.div
              className="relative px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center rounded-b-xl sm:rounded-b-3xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.1)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
              </div>

              {/* Progress indicator */}
              <div className="relative z-10 flex items-center gap-2 sm:gap-4 order-2 sm:order-1">
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-400"></div>
                  <span className="font-medium">
                    {formData.permissions.length} quyền hạn đã chọn
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="relative z-10 flex gap-3 sm:gap-4 w-full sm:w-auto order-1 sm:order-2">
                <motion.button
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 bg-white border border-gray-200 text-gray-700 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold shadow-md hover:bg-gray-50 hover:border-gray-300 transition-all"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hủy bỏ
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold shadow-lg flex items-center justify-center gap-2 hover:from-violet-700 hover:via-blue-700 hover:to-cyan-700 transition-all relative overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(99,102,241,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isEditing ? (
                      <>
                        <Save size={16} className="sm:hidden" />
                        <Save size={20} className="hidden sm:block" />
                      </>
                    ) : (
                      <>
                        <PlusCircle size={16} className="sm:hidden" />
                        <PlusCircle size={20} className="hidden sm:block" />
                      </>
                    )}
                  </motion.div>
                  <span className="hidden sm:inline">
                    {isEditing ? "Cập nhật" : "Thêm mới"}
                  </span>
                  <span className="sm:hidden">
                    {isEditing ? "Cập nhật" : "Thêm"}
                  </span>
                </motion.button>
              </div>
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

export default RoleFormModal;