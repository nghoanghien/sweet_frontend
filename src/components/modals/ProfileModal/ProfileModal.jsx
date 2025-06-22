'use client';

import { useState, useEffect } from 'react';
import { User, X, Lock, Home, CreditCard, Edit3, Save, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AddressFields from '../../../components/ui/custom/AddressFields';
import SwipeConfirmationModal from '../ConfirmationModal/SwipeConfirmationModal';
import ExportNotification from '../../common/ExportNotification';

const ProfileModal = ({ isOpen = false, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Sample data
  const [profileData, setProfileData] = useState({
    fullName: 'Nguyễn Hoàng Hiến',
    dateOfBirth: '15/03/1990',
    idNumber: '123456789012',
    email: 'hoanghien@email.com',
    phone: '0987654321',
    accountCreated: '01/01/2023',
    accountType: 'Premium',
    permanentAddress: {
      province: 'Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Phường Bến Nghé',
      street: 'Nguyễn Huệ',
      houseNumber: '123'
    },
    contactAddress: {
      province: 'Hà Nội',
      district: 'Quận Ba Đình',
      ward: 'Phường Điện Biên',
      street: 'Hoàng Diệu',
      houseNumber: '456'
    }
  });

  const [editData, setEditData] = useState({
    phone: profileData.phone,
    contactAddress: { ...profileData.contactAddress }
  });
  
  // Reset edit data when modal opens
  useEffect(() => {
    if (isOpen) {
      setEditData({
        phone: profileData.phone,
        contactAddress: { ...profileData.contactAddress }
      });
      setEditMode(false);
      setValidationErrors({});
    }
  }, [isOpen, profileData.phone, profileData.contactAddress]);

  const provinces = [
    { code: 'HCM', name: 'Hồ Chí Minh' },
    { code: 'HN', name: 'Hà Nội' },
    { code: 'DN', name: 'Đà Nẵng' }
  ];

  // Real-time validation function
  const validateField = (field, value) => {
    switch(field) {
      case 'phone':
        if (!value) return 'Số điện thoại không được để trống';
        if (!/^0\d{9}$/.test(value)) return 'Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0';
        return null;
      case 'contactAddress.street':
        if (!value) return 'Tên đường không được để trống';
        if (value.length < 3) return 'Tên đường phải có ít nhất 3 ký tự';
        return null;
      case 'contactAddress.houseNumber':
        if (!value) return 'Số nhà không được để trống';
        return null;
      default:
        return null;
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode) {
      // Reset validation errors when entering edit mode
      setValidationErrors({});
    }
  };
  
  const handleInputChange = (field, value) => {
    // Real-time validation
    const error = validateField(field, value);
    
    // Update validation errors
    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
    
    // Update the data
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    const phoneError = validateField('phone', editData.phone);
    const streetError = validateField('contactAddress.street', editData.contactAddress.street);
    const houseNumberError = validateField('contactAddress.houseNumber', editData.contactAddress.houseNumber);
    
    return !phoneError && !streetError && !houseNumberError;
  };
  
  const handleSaveChanges = () => {
    // Final validation before saving
    const errors = {};
    errors.phone = validateField('phone', editData.phone);
    errors['contactAddress.street'] = validateField('contactAddress.street', editData.contactAddress.street);
    errors['contactAddress.houseNumber'] = validateField('contactAddress.houseNumber', editData.contactAddress.houseNumber);
    
    // Filter out null errors
    const filteredErrors = Object.fromEntries(
      Object.entries(errors).filter(([_, value]) => value !== null)
    );
    
    setValidationErrors(filteredErrors);
    
    if (Object.keys(filteredErrors).length === 0) {
      setConfirmModalOpen(true);
    }
  };
  
  const handleConfirmSave = () => {
    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Saving changes:', editData);
      
      // Update profile data with edit data
      setProfileData(prev => ({
        ...prev,
        phone: editData.phone,
        contactAddress: { ...editData.contactAddress }
      }));
      
      setIsProcessing(false);
      setConfirmModalOpen(false);
      setEditMode(false);
      setShowNotification(true);
      setValidationErrors({});
    }, 1500);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}

          >
            {/* Liquid Glass Background */}
            <div
              className="absolute inset-0 backdrop-blur-md bg-black/30"
              onClick={onClose}
            >
              {/* Floating glass orbs */}
              <div
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-300/20 blur-3xl animate-pulse"
                style={{ animationDelay: "0s", animationDuration: "4s" }}
              />
              <div
                className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-purple-200/30 to-pink-300/20 blur-3xl animate-pulse"
                style={{ animationDelay: "2s", animationDuration: "6s" }}
              />
              <div
                className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-gradient-to-br from-cyan-200/30 to-blue-300/20 blur-3xl animate-pulse"
                style={{ animationDelay: "1s", animationDuration: "5s" }}
              />
            </div>

            {/* Main Modal Container */}
            <motion.div
              className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              layoutId="profile-section" // Add layoutId for shared element transition
            >
              {/* Liquid Glass Card */}
              <div className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
                {/* Floating decorative elements */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/10 blur-xl animate-float" />
                <div
                  className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/10 blur-xl animate-float"
                  style={{ animationDelay: "1s" }}
                />

                {/* Header Section */}
                <div className="relative p-6 md:p-8 bg-gradient-to-r from-white/40 via-blue-50/50 to-indigo-50/40 backdrop-blur-xl border-b border-white/20">
                  {/* Header glass decorations */}
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-white/20 to-blue-200/10 blur-2xl" />

                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                      {/* Glass Avatar */}
                      <motion.div className="relative" layoutId="profile-avatar">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-white/40 to-blue-100/30 backdrop-blur-lg border border-white/40 flex items-center justify-center shadow-lg">
                          <User size={28} className="text-blue-600" />
                        </div>
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-400/20 to-indigo-500/10 blur opacity-60" />
                      </motion.div>

                      <div>
                        <motion.h2 
                          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent"
                          layoutId="profile-title"
                        >
                          Thông tin cá nhân
                        </motion.h2>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 mr-2 shadow-lg" />
                          <motion.p 
                            className="text-gray-600 font-medium"
                            layoutId="profile-name"
                          >
                            {profileData.fullName}
                          </motion.p>
                        </div>
                        <motion.p 
                          className="text-gray-500 text-sm mt-1"
                          layoutId="profile-email"
                        >
                          {profileData.email}
                        </motion.p>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/30 backdrop-blur-lg border border-white/40 hover:bg-white/40 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
                    >
                      <X
                        size={20}
                        className="text-gray-600 group-hover:text-gray-800 transition-colors"
                      />
                    </button>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-white/20 bg-white/10 backdrop-blur-xl px-8">
                  <button
                    onClick={() => setActiveTab("personal")}
                    className={`pb-4 pt-6 px-6 text-sm font-semibold transition-all duration-300 flex items-center gap-2 relative ${
                      activeTab === "personal"
                        ? "text-blue-600 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <User size={16} />
                    Thông tin cá nhân
                    {activeTab === "personal" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`pb-4 pt-6 px-6 text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                      activeTab === "security"
                        ? "text-blue-600 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Lock size={16} />
                    Bảo mật
                  </button>
                </div>

                {/* Content Area */}
                <div className="p-8 bg-gradient-to-br from-white/10 via-blue-50/20 to-indigo-50/10 backdrop-blur-xl max-h-[60vh] overflow-y-auto">
                  {/* Edit Mode Toggle */}
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <motion.h3
                      className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent flex items-center gap-3"
                      key={editMode ? "edit" : "view"}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/10 backdrop-blur-lg border border-white/30 flex items-center justify-center">
                        <User size={16} className="text-blue-600" />
                      </div>
                      {editMode ? "Chỉnh sửa thông tin" : "Chi tiết thông tin"}
                    </motion.h3>

                    <AnimatePresence mode="wait">
                      {!editMode ? (
                        <motion.button
                          key="edit-btn"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          onClick={handleEditToggle}
                          className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 backdrop-blur-lg border border-white/30 text-blue-600 rounded-2xl hover:from-blue-500/30 hover:to-indigo-600/30 transition-all duration-300 font-semibold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl group"
                        >
                          <Edit3
                            size={18}
                            className="group-hover:rotate-12 transition-transform"
                          />
                          Chỉnh sửa
                        </motion.button>
                      ) : (
                        <motion.div
                          key="save-cancel-btns"
                          className="mt-4 md:mt-0 flex gap-3"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            onClick={() => setEditMode(false)}
                            className="px-6 py-3 bg-white/40 backdrop-blur-lg border border-white/40 text-gray-600 rounded-2xl hover:bg-white/50 transition-all duration-300 font-semibold text-sm flex items-center gap-2 shadow-lg"
                          >
                            <X size={16} />
                            Hủy
                          </button>
                          <button
                            onClick={handleSaveChanges}
                            disabled={!isFormValid()}
                            className={`px-6 py-3 backdrop-blur-lg border border-white/30 rounded-2xl transition-all duration-300 font-semibold text-sm flex items-center gap-2 shadow-lg ${
                              isFormValid()
                                ? "bg-gradient-to-r from-emerald-500/20 to-green-600/20 text-green-600 hover:from-emerald-500/30 hover:to-green-600/30 hover:shadow-xl"
                                : "bg-gray-400/20 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <Save size={16} />
                            Lưu thay đổi
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <motion.div
                        className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-xl"
                        layout
                        transition={{ duration: 0.3 }}
                      >
                        {/* Card Header */}
                        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 backdrop-blur-xl border-b border-white/20">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/10 backdrop-blur-lg border border-white/30 flex items-center justify-center">
                              <User size={20} className="text-blue-600" />
                            </div>
                            <h4 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                              Thông tin cá nhân
                            </h4>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 space-y-6">
                          <AnimatePresence mode="wait">
                            {!editMode && (
                              <motion.div
                                key="read-only-fields"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                              >
                                {[
                                  {
                                    label: "Họ tên",
                                    value: profileData.fullName,
                                  },
                                  {
                                    label: "Ngày sinh",
                                    value: profileData.dateOfBirth,
                                  },
                                  {
                                    label: "Số CCCD",
                                    value: profileData.idNumber,
                                  },
                                  { label: "Email", value: profileData.email },
                                ].map((field, index) => (
                                  <motion.div
                                    key={field.label}
                                    className="space-y-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <label className="text-sm font-semibold text-gray-700">
                                      {field.label}
                                    </label>
                                    <div className="p-4 bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl text-gray-800 font-medium shadow-sm">
                                      {field.value}
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Phone - Editable */}
                          <div className="space-y-2 relative">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                              Số điện thoại
                              {editMode && (
                                <span className="text-blue-600 text-xs">*</span>
                              )}
                            </label>
                            <AnimatePresence mode="wait">
                              {editMode ? (
                                <motion.div
                                  key="phone-input"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <input
                                    type="text"
                                    value={editData.phone}
                                    onChange={(e) =>
                                      handleInputChange("phone", e.target.value)
                                    }
                                    className={`w-full p-4 bg-white/50 backdrop-blur-lg border rounded-2xl focus:ring-4 transition-all duration-300 text-gray-800 font-medium placeholder-gray-400 shadow-sm ${
                                      validationErrors.phone
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-200/30"
                                        : "border-white/40 focus:border-blue-400 focus:ring-blue-200/30"
                                    }`}
                                    placeholder="Nhập số điện thoại..."
                                  />
                                  <AnimatePresence>
                                    {validationErrors.phone && (
                                      <motion.div
                                        initial={{
                                          opacity: 0,
                                          y: -10,
                                          scale: 0.8,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                          opacity: 0,
                                          y: -10,
                                          scale: 0.8,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-2 flex items-center gap-2 text-xs text-red-500 font-medium bg-red-50/80 backdrop-blur-lg border border-red-200/50 rounded-xl px-3 py-2"
                                      >
                                        <AlertCircle
                                          size={14}
                                          className="shrink-0"
                                        />
                                        {validationErrors.phone}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="phone-display"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="p-4 bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl text-gray-800 font-medium shadow-sm"
                                >
                                  {profileData.phone}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>

                      {/* Account Information */}
                      <AnimatePresence>
                        {!editMode && (
                          <motion.div
                            className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-600/10 backdrop-blur-xl border-b border-white/20">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/10 backdrop-blur-lg border border-white/30 flex items-center justify-center">
                                  <CreditCard
                                    size={20}
                                    className="text-purple-600"
                                  />
                                </div>
                                <h4 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
                                  Thông tin tài khoản
                                </h4>
                              </div>
                            </div>

                            <div className="p-6 space-y-6">
                              {[
                                {
                                  label: "Ngày tạo tài khoản",
                                  value: profileData.accountCreated,
                                },
                                {
                                  label: "Loại tài khoản",
                                  value: profileData.accountType,
                                },
                              ].map((field, index) => (
                                <motion.div
                                  key={field.label}
                                  className="space-y-2"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                  <label className="text-sm font-semibold text-gray-700">
                                    {field.label}
                                  </label>
                                  <div className="p-4 bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl text-gray-800 font-medium shadow-sm">
                                    {field.value}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-6">
                      {/* Permanent Address */}
                      <AnimatePresence>
                        {!editMode && (
                          <motion.div
                            className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-600/10 backdrop-blur-xl border-b border-white/20">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/10 backdrop-blur-lg border border-white/30 flex items-center justify-center">
                                  <Home size={20} className="text-amber-600" />
                                </div>
                                <h4 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-amber-600 bg-clip-text text-transparent">
                                  Địa chỉ thường trú
                                </h4>
                              </div>
                            </div>

                            <div className="p-6 space-y-6">
                              {Object.entries({
                                "Tỉnh/Thành phố":
                                  profileData.permanentAddress.province,
                                "Quận/Huyện":
                                  profileData.permanentAddress.district,
                                "Phường/Xã": profileData.permanentAddress.ward,
                                "Tên đường":
                                  profileData.permanentAddress.street,
                                "Số nhà":
                                  profileData.permanentAddress.houseNumber,
                              }).map(([label, value], index) => (
                                <motion.div
                                  key={label}
                                  className="space-y-2"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <label className="text-sm font-semibold text-gray-700">
                                    {label}
                                  </label>
                                  <div className="p-4 bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl text-gray-800 font-medium shadow-sm">
                                    {value}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Contact Address */}
                      <motion.div
                        className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl"
                        layout
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className={`p-6 backdrop-blur-xl border-b border-white/20 ${
                            editMode
                              ? "bg-gradient-to-r from-blue-500/10 to-indigo-600/10"
                              : "bg-gradient-to-r from-emerald-500/10 to-teal-600/10"
                          }`}
                          layout
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl backdrop-blur-lg border border-white/30 flex items-center justify-center ${
                                editMode
                                  ? "bg-gradient-to-br from-blue-500/20 to-indigo-600/10"
                                  : "bg-gradient-to-br from-emerald-500/20 to-teal-600/10"
                              }`}
                            >
                              <Home
                                size={20}
                                className={
                                  editMode
                                    ? "text-blue-600"
                                    : "text-emerald-600"
                                }
                              />
                            </div>
                            <motion.h4
                              className={`text-lg font-bold bg-clip-text text-transparent ${
                                editMode
                                  ? "bg-gradient-to-r from-gray-800 to-blue-600"
                                  : "bg-gradient-to-r from-gray-800 to-emerald-600"
                              }`}
                            >
                              {editMode
                                ? "Chỉnh sửa địa chỉ liên lạc"
                                : "Địa chỉ liên lạc"}
                            </motion.h4>
                          </div>
                        </motion.div>

                        <div className="p-6">
                          {editMode ? (
                            <div className="space-y-4">
                              <AddressFields
                                prefix="contactAddress"
                                values={editData.contactAddress}
                                onChange={handleInputChange}
                                required={true}
                              />

                              {/* Validation errors for address fields */}
                              <AnimatePresence>
                                {validationErrors["contactAddress.street"] && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2 text-xs text-red-500 font-medium bg-red-50/80 backdrop-blur-lg border border-red-200/50 rounded-xl px-3 py-2"
                                  >
                                    <AlertCircle
                                      size={14}
                                      className="shrink-0"
                                    />
                                    {validationErrors["contactAddress.street"]}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              <AnimatePresence>
                                {validationErrors[
                                  "contactAddress.houseNumber"
                                ] && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2 text-xs text-red-500 font-medium bg-red-50/80 backdrop-blur-lg border border-red-200/50 rounded-xl px-3 py-2"
                                  >
                                    <AlertCircle
                                      size={14}
                                      className="shrink-0"
                                    />
                                    {
                                      validationErrors[
                                        "contactAddress.houseNumber"
                                      ]
                                    }
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              {Object.entries({
                                "Tỉnh/Thành phố":
                                  profileData.contactAddress.province,
                                "Quận/Huyện":
                                  profileData.contactAddress.district,
                                "Phường/Xã": profileData.contactAddress.ward,
                                "Tên đường": profileData.contactAddress.street,
                                "Số nhà":
                                  profileData.contactAddress.houseNumber,
                              }).map(([label, value]) => (
                                <div key={label} className="space-y-2">
                                  <label className="text-sm font-semibold text-gray-700">
                                    {label}
                                  </label>
                                  <div className="p-4 bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl text-gray-800 font-medium shadow-sm">
                                    {value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <SwipeConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmSave}
        title="Xác nhận thay đổi"
        description="Bạn có chắc chắn muốn cập nhật thông tin cá nhân?"
        confirmText="Quẹt để xác nhận"
        type="update"
        isProcessing={isProcessing}
        confirmDetails={{
          "Số điện thoại": editData.phone,
          "Tỉnh/Thành phố": editData.contactAddress.province,
          "Quận/Huyện": editData.contactAddress.district,
          "Phường/Xã": editData.contactAddress.ward,
          "Tên đường": editData.contactAddress.street,
          "Số nhà": editData.contactAddress.houseNumber,
        }}
      />

      {/* Success Notification */}
      <ExportNotification
        isVisible={showNotification}
        onClose={handleCloseNotification}
        format="profile"
        message="Cập nhật thông tin thành công!"
        autoHideDuration={3000}
        type="success"
      />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </>
  );
};

export default ProfileModal;