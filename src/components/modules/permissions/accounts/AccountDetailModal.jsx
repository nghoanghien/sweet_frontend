import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, UserCheck, Users, Settings, Shield, CheckCircle, XCircle, IdCard, Phone, Crown, Star, Eye, ChevronDown, ChevronUp } from 'lucide-react';

const AccountDetailModal = ({ isOpen, onClose, account }) => {
  const [expandedPermissions, setExpandedPermissions] = useState({});

  if (!isOpen || !account) return null;

  // Mock data cho chi tiết quyền hạn của vai trò
  const rolePermissions = {
    'role1': [], // Không có quyền
    'role2': [
      { id: 'perm1', name: 'Thanh toán', functions: ['Chuyển tiền nội bộ', 'Thanh toán hóa đơn', 'Nạp tiền điện thoại', 'Thanh toán QR code'] }
    ],
    'role3': [
      { id: 'perm1', name: 'Thanh toán', functions: ['Chuyển tiền nội bộ', 'Thanh toán hóa đơn', 'Nạp tiền điện thoại', 'Thanh toán QR code'] },
      { id: 'perm2', name: 'Tiết kiệm', functions: ['Mở sổ tiết kiệm', 'Rút tiền tiết kiệm', 'Xem lãi suất', 'Tất toán sổ tiết kiệm'] }
    ],
    'role4': [
      { id: 'perm3', name: 'Xem tổng quan ngân hàng', functions: ['Xem báo cáo tổng quan', 'Xem biểu đồ hoạt động', 'Xem thống kê giao dịch'] },
      { id: 'perm4', name: 'Quản lý khách hàng & tiền gửi', functions: ['Xem danh sách khách hàng', 'Thêm khách hàng mới', 'Cập nhật thông tin khách hàng', 'Xem lịch sử giao dịch'] },
      { id: 'perm5', name: 'Quản lý nhân viên', functions: ['Xem danh sách nhân viên', 'Thêm nhân viên mới', 'Cập nhật thông tin nhân viên', 'Phân công công việc'] },
      { id: 'perm6', name: 'Tra cứu phiếu gửi tiền', functions: ['Xem danh sách phiếu gửi', 'Tạo phiếu gửi mới', 'Duyệt phiếu gửi', 'In phiếu gửi'] },
      { id: 'perm7', name: 'Quản lý sản phẩm tiết kiệm', functions: ['Xem danh sách sản phẩm', 'Thêm sản phẩm mới', 'Cập nhật thông tin sản phẩm', 'Quản lý lãi suất'] },
      { id: 'perm8', name: 'Báo cáo doanh số', functions: ['Xem báo cáo doanh số', 'Xuất báo cáo Excel', 'Xuất báo cáo PDF', 'Gửi báo cáo qua email'] },
      { id: 'perm9', name: 'Cài đặt hệ thống', functions: ['Cấu hình thông số hệ thống', 'Quản lý thông báo', 'Cấu hình email', 'Sao lưu dữ liệu'] },
      { id: 'perm10', name: 'Quản lý phân quyền', functions: ['Xem danh sách vai trò', 'Tạo vai trò mới', 'Phân quyền cho vai trò', 'Gán vai trò cho tài khoản'] }
    ],
    'role5': [
      { id: 'perm3', name: 'Xem tổng quan ngân hàng', functions: ['Xem báo cáo tổng quan', 'Xem biểu đồ hoạt động', 'Xem thống kê giao dịch'] },
      { id: 'perm4', name: 'Quản lý khách hàng & tiền gửi', functions: ['Xem danh sách khách hàng', 'Thêm khách hàng mới', 'Cập nhật thông tin khách hàng', 'Xem lịch sử giao dịch'] },
      { id: 'perm6', name: 'Quản lý phiếu gửi tiền', functions: ['Xem danh sách phiếu gửi', 'Tạo phiếu gửi mới', 'Duyệt phiếu gửi', 'In phiếu gửi'] }
    ],
    'role6': [
      { id: 'perm3', name: 'Xem tổng quan ngân hàng', functions: ['Xem báo cáo tổng quan', 'Xem biểu đồ hoạt động', 'Xem thống kê giao dịch'] },
      { id: 'perm7', name: 'Quản lý sản phẩm tiết kiệm', functions: ['Xem danh sách sản phẩm', 'Thêm sản phẩm mới', 'Cập nhật thông tin sản phẩm', 'Quản lý lãi suất'] },
      { id: 'perm8', name: 'Báo cáo doanh số', functions: ['Xem báo cáo doanh số', 'Xuất báo cáo Excel', 'Xuất báo cáo PDF', 'Gửi báo cáo qua email'] }
    ]
  };

  // Lấy danh sách quyền hạn của vai trò
  const permissions = rolePermissions[account.role.id] || [];

  // Hàm tạo avatar từ tên người dùng
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Hàm chọn màu nền cho avatar dựa trên ID và trạng thái
  const getAvatarColor = (id, disabled) => {
    if (disabled) {
      return 'from-gray-400 to-gray-600';
    }
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-indigo-500 to-purple-600',
      'from-purple-500 to-pink-600',
      'from-pink-500 to-rose-600',
      'from-green-500 to-teal-600',
      'from-teal-500 to-cyan-600',
      'from-orange-500 to-red-600',
      'from-yellow-500 to-orange-600',
    ];
    const index = parseInt(id.replace(/[^0-9]/g, '')) % colors.length;
    return colors[index];
  };

  // Toggle expanded state for permissions
  const togglePermission = (permissionId) => {
    setExpandedPermissions(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId]
    }));
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
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 0.4) 70%)'
          }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                }}
                animate={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
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
            layoutId={`detail-account-${account.id}`}
            transition={{ duration: 0.2, type: "spring", stiffness: 150, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {/* Role Badge - Top Right Corner */}
            <motion.div 
              className="absolute top-6 right-6 z-20"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
            >
              <motion.div 
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-white px-5 py-3 rounded-2xl font-bold text-lg shadow-xl border-2 border-yellow-300 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: '0 12px 40px rgba(251, 191, 36, 0.4)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                
                <div className="flex items-center gap-2 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Crown size={22} className="text-white drop-shadow-lg" />
                  </motion.div>
                  <span className="drop-shadow-lg">{account.role.name}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full"></div>
              <div className="absolute top-8 right-8 w-8 h-8 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-full"></div>
            </div>

            {/* Header */}
            <motion.div 
              className="px-8 py-8 flex justify-between items-center rounded-t-3xl bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 relative overflow-hidden"
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
                  <Eye size={28} className="text-white drop-shadow-lg" />
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-xl font-bold tracking-wide drop-shadow text-white"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    Chi tiết tài khoản
                  </motion.h3>
                  <motion.p 
                    className="text-white text-opacity-80 text-sm"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    Thông tin và quyền hạn chi tiết
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
              className="p-6 md:p-8 overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {/* Account info */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="flex items-start gap-6">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getAvatarColor(account.id, account.disabled)} hidden md:flex items-center justify-center text-white text-2xl font-bold shadow-xl relative overflow-hidden`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <span className="relative z-10">{getInitials(account.name)}</span>
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h4 
                      className="text-xl text-center md:text-left md:text-2xl font-bold text-gray-800 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      {account.name}
                    </motion.h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <motion.div 
                        className="flex items-center text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <span className="font-medium">{account.email}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <Phone size={16} className="text-green-600" />
                        </div>
                        <span className="font-medium">{account.phone}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                      >
                        <div className="p-2 bg-purple-100 rounded-lg mr-3">
                          <IdCard size={16} className="text-purple-600" />
                        </div>
                        <span className="font-medium">{account.CCCD}</span>
                      </motion.div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <motion.span 
                        className={`px-4 py-2 rounded-2xl text-sm font-semibold md:font-bold flex items-center gap-2 shadow-md ${
                          account.type === 'customer' 
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white' 
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {account.type === 'customer' ? (
                          <>
                            <Users size={16} /> Khách hàng
                          </>
                        ) : (
                          <>
                            <Settings size={16} /> Nhân viên
                          </>
                        )}
                      </motion.span>
                      
                      <motion.span 
                        className={`px-4 py-2 rounded-2xl text-sm font-semibold md:font-bold flex items-center gap-2 shadow-md ${
                          account.disabled
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {account.disabled ? (
                          <>
                            <XCircle size={16} /> Vô hiệu hóa
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} /> Hoạt động
                          </>
                        )}
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Permissions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <h5 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield size={20} className={account.disabled ? "text-gray-400" : "text-blue-600"} />
                  Quyền hạn ({permissions.length})
                </h5>
                
                {permissions.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {permissions.map((permission, idx) => (
                      <motion.div
                        key={permission.id}
                        className={`rounded-2xl p-6 border shadow-lg relative overflow-hidden group cursor-pointer ${
                          account.disabled 
                            ? 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 border-gray-200'
                            : 'bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 border-blue-100'
                        }`}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -4,
                          boxShadow: account.disabled 
                            ? '0 12px 40px rgba(156, 163, 175, 0.15)'
                            : '0 12px 40px rgba(59, 130, 246, 0.15)'
                        }}
                        onClick={() => togglePermission(permission.id)}
                      >
                        {/* Animated background gradient */}
                        <motion.div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            account.disabled
                              ? 'bg-gradient-to-r from-gray-500/5 via-gray-400/5 to-gray-500/5'
                              : 'bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5'
                          }`}
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 1.5 }}
                        />
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <motion.div 
                                className={`p-3 rounded-xl shadow-md mr-4 ${
                                  account.disabled
                                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                                    : account.type === 'customer' 
                                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white' 
                                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                                }`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <Shield size={18} />
                              </motion.div>
                              <h6 className={`font-bold text-lg ${account.disabled ? 'text-gray-500' : 'text-gray-800'}`}>
                                {permission.name}
                              </h6>
                            </div>
                            
                            <motion.div
                              animate={{ rotate: expandedPermissions[permission.id] ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className={account.disabled ? 'text-gray-400' : 'text-blue-500'}
                            >
                              <ChevronDown size={20} />
                            </motion.div>
                          </div>
                          
                          <AnimatePresence>
                            {expandedPermissions[permission.id] && (
                              <motion.div 
                                className="space-y-3"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <p className={`text-sm font-semibold flex items-center gap-2 ${
                                  account.disabled ? 'text-gray-500' : 'text-gray-600'
                                }`}>
                                  <Star size={14} className={account.disabled ? "text-gray-400" : "text-yellow-500"} />
                                  Chức năng được phép:
                                </p>
                                <div className="grid grid-cols-1 gap-2">
                                  {permission.functions.map((func, index) => (
                                    <motion.div 
                                      key={index} 
                                      className={`text-sm flex items-start p-3 rounded-xl border ${
                                        account.disabled 
                                          ? 'text-gray-500 bg-gray-50 border-gray-200'
                                          : 'text-gray-700 bg-white/60 border-gray-100'
                                      }`}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05, duration: 0.3 }}
                                    >
                                      <motion.div 
                                        className={`p-1 rounded-full mr-3 flex-shrink-0 ${
                                          account.disabled 
                                            ? 'text-gray-400' 
                                            : account.type === 'customer' ? 'text-blue-500' : 'text-indigo-500'
                                        }`}
                                        whileHover={{ scale: 1.2 }}
                                      >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                      </motion.div>
                                      <span className="font-medium">{func}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {!expandedPermissions[permission.id] && (
                            <motion.p 
                              className={`text-sm ${account.disabled ? 'text-gray-400' : 'text-gray-500'}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              Nhấn để xem {permission.functions.length} chức năng...
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-8 border border-gray-200 text-center shadow-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-gray-200 rounded-full">
                        <Shield size={32} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-semibold text-lg">Tài khoản không có quyền hạn nào</p>
                      <p className="text-gray-400 text-sm">Liên hệ quản trị viên để cấp quyền</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
            
            {/* Footer */}
            <motion.div 
              className="px-8 py-6 bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 border-t border-gray-200 flex justify-end rounded-b-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <motion.button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-semibold shadow-lg relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: '0 8px 25px rgba(107, 114, 128, 0.4)'
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
                <span className="relative z-10">Đóng</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountDetailModal;