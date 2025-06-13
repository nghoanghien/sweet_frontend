import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserCheck, Shield, Users, Settings, Save, PlusCircle, CreditCard, PiggyBank, UserCog, Package, BarChart3, Crown, Sparkles, Zap, Plus, Minus, Check } from 'lucide-react';
import SwipeConfirmationModal from '../../../modals/ConfirmationModal/SwipeConfirmationModal';
// Mock SwipeConfirmationModal component

const RoleFormModal = ({ isOpen, onClose, onSave, role, isEditing }) => {
  // State cho form
  const [formData, setFormData] = useState({
    name: '',
    type: 'staff',
    description: '',
    permissions: []
  });
  
  // State lưu trữ permissions ban đầu khi edit
  const [originalPermissions, setOriginalPermissions] = useState([]);
  
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
  
  // Memoize static data để tránh re-render không cần thiết
  const allPermissions = useMemo(() => [
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
  ], []);

  // Memoize icon mapping
  const getPermissionIcon = useCallback((permissionId) => {
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
  }, []);

  // Memoize color mapping để tránh tính toán lại
  const getCardColors = useCallback((permissionId, type) => {
    if (type === 'customer') {
      const customerColors = {
        'perm1': {
          primary: '#10b981',
          secondary: '#06d6a0',
          dark: '#047857',
          accent: '#6ee7b7',
          light: '#d1fae5'
        },
        'perm2': {
          primary: '#3b82f6',
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
          primary: '#f59e0b',
          secondary: '#ef4444',
          dark: '#d97706',
          accent: '#fbbf24',
          light: '#fef3c7'
        },
        'perm5': {
          primary: '#8b5cf6',
          secondary: '#3b82f6',
          dark: '#7c3aed',
          accent: '#c4b5fd',
          light: '#ede9fe'
        },
        'perm6': {
          primary: '#06b6d4',
          secondary: '#14b8a6',
          dark: '#0891b2',
          accent: '#67e8f9',
          light: '#cffafe'
        },
        'perm7': {
          primary: '#ec4899',
          secondary: '#db2777',
          dark: '#be185d',
          accent: '#f472b6',
          light: '#fce7f3'
        },
        'perm8': {
          primary: '#14b8a6',
          secondary: '#06b6d4',
          dark: '#0f766e',
          accent: '#7dd3fc',
          light: '#ccfbf1'
        },
        'perm9': {
          primary: '#6b7280',
          secondary: '#64748b',
          dark: '#4b5563',
          accent: '#d1d5db',
          light: '#f3f4f6'
        },
        'perm10': {
          primary: '#ef4444',
          secondary: '#ec4899',
          dark: '#dc2626',
          accent: '#fca5a5',
          light: '#fee2e2'
        }
      };
      return staffColors[permissionId] || staffColors['perm4'];
    }
  }, []);

  // Function để xác định trạng thái thay đổi của permission
  const getPermissionChangeStatus = useCallback((permissionId) => {
    if (!isEditing) return 'none';
    
    const wasOriginallySelected = originalPermissions.some(p => p.id === permissionId);
    const isCurrentlySelected = formData.permissions.some(p => p.id === permissionId);
    
    if (wasOriginallySelected && isCurrentlySelected) return 'unchanged';
    if (!wasOriginallySelected && isCurrentlySelected) return 'added';
    if (wasOriginallySelected && !isCurrentlySelected) return 'removed';
    return 'none';
  }, [isEditing, originalPermissions, formData.permissions]);

  // Reset form data when modal opens/closes
  useEffect(() => {
    if (role && isEditing) {
      setFormData({
        id: role.id,
        name: role.name,
        type: role.type,
        description: role.description,
        permissions: [...role.permissions]
      });
      // Lưu trữ permissions ban đầu
      setOriginalPermissions([...role.permissions]);
    } else {
      setFormData({
        name: '',
        type: 'staff',
        description: '',
        permissions: []
      });
      setOriginalPermissions([]);
    }
    setErrors({});
  }, [role, isEditing]);

  // Memoize filtered permissions
  const filteredPermissions = useMemo(() => 
    allPermissions.filter(permission => permission.type === formData.type),
    [allPermissions, formData.type]
  );

  // Optimize permission selection check
  const isPermissionSelected = useCallback((permissionId) => {
    return formData.permissions.some(p => p.id === permissionId);
  }, [formData.permissions]);

  // Optimize input change handler
  const handleInputChange = useCallback((name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  }, [errors]);

  // Optimize permission toggle
  const handleTogglePermission = useCallback((permission) => {
    const isSelected = formData.permissions.some(p => p.id === permission.id);
    
    if (isSelected) {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p.id !== permission.id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, { id: permission.id, name: permission.name }]
      }));
    }
    
    if (errors.permissions) {
      setErrors(prev => ({
        ...prev,
        permissions: null
      }));
    }
  }, [formData.permissions, errors.permissions]);

  // Optimize type change handler
  const handleTypeChange = useCallback((type) => {
    setFormData(prev => ({
      ...prev,
      type,
      permissions: []
    }));
  }, []);

  const showConfirmModal = useCallback((title, description, type, details, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      description,
      type,
      confirmDetails: details,
      onConfirm,
      isProcessing: false,
    });
  }, []);
  
  const setConfirmationProcessing = useCallback((isProcessing) => {
    setConfirmModal(prev => ({ ...prev, isProcessing }));
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleSubmit = useCallback(() => {
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
        setConfirmationProcessing(true);
        
        setTimeout(() => {
          try {
            const notificationInfo = {
              message: isEditing 
              ? 'Cập nhật vai trò thành công!'
              : 'Thêm vai trò thành công!',
              type: 'success',
              format: isEditing 
              ? `Đã cập nhật vai trò "${formData.name}" thành công!` 
              : `Đã thêm vai trò "${formData.name}" thành công!`,
            };
            
            onSave && onSave(formData, notificationInfo);
            onClose();
          } finally {
            setConfirmationProcessing(false);
            closeConfirmModal();
          }
        }, 1500);
      }
    );
  }, [formData, errors, isEditing, showConfirmModal, setConfirmationProcessing, closeConfirmModal, onSave, onClose]);

  // Tính toán số lượng thay đổi khi edit
  const changesSummary = useMemo(() => {
    if (!isEditing) return null;
    
    let added = 0, removed = 0, unchanged = 0;
    
    filteredPermissions.forEach(permission => {
      const status = getPermissionChangeStatus(permission.id);
      if (status === 'added') added++;
      else if (status === 'removed') removed++;
      else if (status === 'unchanged') unchanged++;
    });
    
    return { added, removed, unchanged };
  }, [isEditing, filteredPermissions, getPermissionChangeStatus]);

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Simplified decorative elements */}
            <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-blue-200/20 to-purple-300/20 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>

            {/* Header */}
            <div className="relative px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Crown size={20} className="sm:hidden text-yellow-200" />
                  <Crown
                    size={28}
                    className="hidden sm:block text-yellow-200"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold">
                    {isEditing ? "Chỉnh sửa vai trò" : "Tạo vai trò mới"}
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="relative z-10 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <X size={20} className="sm:hidden" />
                <X size={24} className="hidden sm:block" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto"
              style={{
                scrollBehavior: "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                {/* Role type selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="text-violet-600" size={20} />
                    <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                      Loại vai trò
                    </h4>
                  </div>

                  <div className="bg-gradient-to-r from-violet-50 to-blue-50 p-4 sm:p-6 rounded-2xl border border-violet-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Staff Role Card */}
                      <button
                        type="button"
                        onClick={() => handleTypeChange("staff")}
                        className={`relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 ${
                          formData.type === "staff"
                            ? "border-violet-400 bg-gradient-to-br from-violet-50 to-blue-50 shadow-lg"
                            : "border-gray-200 bg-white hover:border-violet-200"
                        }`}
                        disabled={isEditing}
                      >
                        {formData.type === "staff" && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                            <Zap size={14} className="text-white" />
                          </div>
                        )}

                        <div className="text-left">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`p-3 rounded-xl ${
                                formData.type === "staff"
                                  ? "bg-violet-100 text-violet-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              <Settings size={24} />
                            </div>
                            <div>
                              <h5
                                className={`font-bold text-lg ${
                                  formData.type === "staff"
                                    ? "text-violet-700"
                                    : "text-gray-700"
                                }`}
                              >
                                Nhân viên
                              </h5>
                              <p className="text-sm text-gray-500">
                                Quản lý & vận hành
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            Dành cho các nhân viên với quyền hạn quản lý hệ
                            thống, khách hàng và vận hành doanh nghiệp.
                          </p>
                        </div>
                      </button>

                      {/* Customer Role Card (Disabled) */}
                      <div className="relative p-4 sm:p-6 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 opacity-60">
                        <div className="text-left">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 rounded-xl bg-gray-200 text-gray-500">
                              <Users size={24} />
                            </div>
                            <div>
                              <h5 className="font-bold text-lg text-gray-500">
                                Khách hàng
                              </h5>
                              <p className="text-sm text-gray-400">
                                Người dùng cuối
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            Vai trò mặc định cho khách hàng sử dụng dịch vụ.
                          </p>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                            <Shield size={12} />
                            Không thể tùy chỉnh
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role name */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="text-blue-600" size={20} />
                    <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Tên vai trò
                    </h4>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-blue-100">
                    <label className="block text-blue-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                      Nhập tên vai trò <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`w-full px-6 py-4 text-lg font-medium border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                          errors.name
                            ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100 text-red-700"
                            : "border-blue-200 bg-white focus:border-blue-400 focus:ring-blue-100 text-blue-800"
                        }`}
                        placeholder="VD: Quản lý chi nhánh, Nhân viên kế toán..."
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                        <UserCheck size={20} />
                      </div>
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2 font-medium">
                        {errors.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Role description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Package className="text-emerald-600" size={20} />
                    <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Mô tả vai trò
                    </h4>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-emerald-100">
                    <label className="block text-emerald-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                      Chi tiết về vai trò này{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        className={`w-full px-6 py-4 text-base leading-relaxed border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 resize-none ${
                          errors.description
                            ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100 text-red-700"
                            : "border-emerald-200 bg-white focus:border-emerald-400 focus:ring-emerald-100 text-emerald-800"
                        }`}
                        rows="3"
                        maxLength="500"
                        placeholder="Mô tả chi tiết về trách nhiệm, phạm vi công việc và mục đích của vai trò này trong tổ chức..."
                      />
                      <div className="absolute bottom-4 right-4 text-emerald-400">
                        <Package size={18} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      {errors.description && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.description}
                        </p>
                      )}
                      <div className="text-xs text-gray-500 font-medium ml-auto">
                        {formData.description.length}/500 ký tự
                      </div>
                    </div>
                  </div>
                </div>

                {/* Permissions selection với change tracking */}
                <div>
                  <div className="flex flex-col md:flex-col items-center justify-between mb-6">
                    <div className="flex mb-4 md:mb-0 items-center gap-4 group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <div className="relative p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200 shadow-sm">
                          <Shield className="text-purple-600" size={20} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                          Phân quyền truy cập
                        </h4>
                        <div className="h-0.5 w-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 mt-1"></div>
                      </div>
                    </div>

                    {/* Hiển thị change summary khi đang edit */}
                    {isEditing && changesSummary && (
                      <div className="flex items-center gap-4 text-sm">
                        {changesSummary.added > 0 && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-emerald-700 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="p-1 bg-emerald-100 rounded-full">
                              <Plus size={10} className="text-emerald-600" />
                            </div>
                            <span className="font-semibold">
                              {changesSummary.added} thêm
                            </span>
                          </div>
                        )}
                        {changesSummary.removed > 0 && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="p-1 bg-red-100 rounded-full">
                              <Minus size={10} className="text-red-600" />
                            </div>
                            <span className="font-semibold">
                              {changesSummary.removed} bỏ
                            </span>
                          </div>
                        )}
                        {changesSummary.unchanged > 0 && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="p-1 bg-blue-100 rounded-full">
                              <Check size={10} className="text-blue-600" />
                            </div>
                            <span className="font-semibold">
                              {changesSummary.unchanged} giữ nguyên
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {errors.permissions && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 font-medium text-sm">
                        {errors.permissions}
                      </p>
                    </div>
                  )}

                  {/* Permission cards với change indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredPermissions.map((permission) => {
                      const isSelected = isPermissionSelected(permission.id);
                      const changeStatus = getPermissionChangeStatus(
                        permission.id
                      );
                      const IconComponent = getPermissionIcon(permission.id);
                      const colors = getCardColors(
                        permission.id,
                        permission.type
                      );

                      return (
                        <motion.div
                          key={permission.id}
                          className={`relative p-4 sm:p-6 rounded-2xl border-2 cursor-pointer flex items-start transition-all duration-200 ${
                            isSelected
                              ? "border-transparent shadow-lg"
                              : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                          }`}
                          style={{
                            backgroundColor: isSelected
                              ? colors.light
                              : "white",
                            borderColor: isSelected
                              ? colors.primary
                              : undefined,
                          }}
                          onClick={() => handleTogglePermission(permission)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Background effect */}
                          {isSelected && (
                            <div
                              className="absolute inset-0 rounded-2xl opacity-5"
                              style={{
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                              }}
                            />
                          )}

                          {/* Change Status Indicator */}
                          {isEditing && changeStatus !== "none" && (
                            <div className="absolute -top-2 -left-2 z-20">
                              {changeStatus === "added" && (
                                <motion.div
                                  className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <Plus
                                    size={12}
                                    className="text-white"
                                    strokeWidth={3}
                                  />
                                </motion.div>
                              )}
                              {changeStatus === "removed" && (
                                <motion.div
                                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <Minus
                                    size={12}
                                    className="text-white"
                                    strokeWidth={3}
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}

                          {/* Background effect */}
                          {isSelected && (
                            <div
                              className="absolute inset-0 rounded-2xl opacity-5"
                              style={{
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                              }}
                            />
                          )}

                          {/* Icon container */}
                          <div
                            className="relative z-10 p-3 rounded-xl mr-4 shadow-md transition-all duration-200"
                            style={{
                              backgroundColor: isSelected
                                ? `${colors.primary}20`
                                : "#f8fafc",
                              color: isSelected ? colors.primary : "#64748b",
                            }}
                          >
                            <IconComponent size={20} strokeWidth={2} />
                          </div>

                          {/* Content */}
                          <div className="relative z-10 flex-1">
                            <h5
                              className="font-bold text-lg mb-2 transition-colors duration-200"
                              style={{
                                color: isSelected ? colors.dark : "#374151",
                              }}
                            >
                              {permission.name}
                            </h5>
                            <p
                              className={`text-sm leading-relaxed transition-colors duration-200 ${
                                isSelected ? "text-gray-700" : "text-gray-500"
                              }`}
                            >
                              {permission.description}
                            </p>
                          </div>

                          {/* Selection Indicator */}
                          {isSelected && (
                            <div
                              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                              style={{
                                backgroundColor: colors.primary,
                                color: "white",
                              }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Fixed position */}
            <div className="px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
              <div className="flex items-center gap-4 order-2 sm:order-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                  <span className="font-medium">
                    {formData.permissions.length} quyền hạn đã chọn
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 sm:gap-4 w-full sm:w-auto order-1 sm:order-2">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold shadow-md hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  {isEditing ? <Save size={18} /> : <PlusCircle size={18} />}
                  <span>{isEditing ? "Cập nhật" : "Thêm mới"}</span>
                </button>
              </div>
            </div>

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
        </motion.div>
      )}
    </AnimatePresence>
  );
    };
    
    export default RoleFormModal;