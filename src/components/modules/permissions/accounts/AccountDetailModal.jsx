import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, UserCheck, Users, Settings, Shield, CheckCircle, XCircle, CreditCard, Phone, Crown, Star, Eye } from 'lucide-react';

const AccountDetailModal = ({ isOpen, onClose, account }) => {
  if (!isOpen || !account) return null;

  // Memoize rolePermissions để tránh tính toán lại
  const rolePermissions = useMemo(() => ({
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
      { id: 'perm4', name: 'Quản lý khách hàng', functions: ['Xem danh sách khách hàng', 'Thêm khách hàng mới', 'Cập nhật thông tin khách hàng', 'Xem lịch sử giao dịch'] },
      { id: 'perm5', name: 'Quản lý nhân viên', functions: ['Xem danh sách nhân viên', 'Thêm nhân viên mới', 'Cập nhật thông tin nhân viên', 'Phân công công việc'] },
      { id: 'perm6', name: 'Quản lý phiếu gửi tiền', functions: ['Xem danh sách phiếu gửi', 'Tạo phiếu gửi mới', 'Duyệt phiếu gửi', 'In phiếu gửi'] },
      { id: 'perm7', name: 'Quản lý sản phẩm tiết kiệm', functions: ['Xem danh sách sản phẩm', 'Thêm sản phẩm mới', 'Cập nhật thông tin sản phẩm', 'Quản lý lãi suất'] },
      { id: 'perm8', name: 'Báo cáo doanh số', functions: ['Xem báo cáo doanh số', 'Xuất báo cáo Excel', 'Xuất báo cáo PDF', 'Gửi báo cáo qua email'] },
      { id: 'perm9', name: 'Cài đặt hệ thống', functions: ['Cấu hình thông số hệ thống', 'Quản lý thông báo', 'Cấu hình email', 'Sao lưu dữ liệu'] },
      { id: 'perm10', name: 'Quản lý phân quyền', functions: ['Xem danh sách vai trò', 'Tạo vai trò mới', 'Phân quyền cho vai trò', 'Gán vai trò cho tài khoản'] }
    ],
    'role5': [
      { id: 'perm3', name: 'Xem tổng quan ngân hàng', functions: ['Xem báo cáo tổng quan', 'Xem biểu đồ hoạt động', 'Xem thống kê giao dịch'] },
      { id: 'perm4', name: 'Quản lý khách hàng', functions: ['Xem danh sách khách hàng', 'Thêm khách hàng mới', 'Cập nhật thông tin khách hàng', 'Xem lịch sử giao dịch'] },
      { id: 'perm6', name: 'Quản lý phiếu gửi tiền', functions: ['Xem danh sách phiếu gửi', 'Tạo phiếu gửi mới', 'Duyệt phiếu gửi', 'In phiếu gửi'] }
    ],
    'role6': [
      { id: 'perm3', name: 'Xem tổng quan ngân hàng', functions: ['Xem báo cáo tổng quan', 'Xem biểu đồ hoạt động', 'Xem thống kê giao dịch'] },
      { id: 'perm7', name: 'Quản lý sản phẩm tiết kiệm', functions: ['Xem danh sách sản phẩm', 'Thêm sản phẩm mới', 'Cập nhật thông tin sản phẩm', 'Quản lý lãi suất'] },
      { id: 'perm8', name: 'Báo cáo doanh số', functions: ['Xem báo cáo doanh số', 'Xuất báo cáo Excel', 'Xuất báo cáo PDF', 'Gửi báo cáo qua email'] }
    ]
  }), []);

  // Memoize permissions để tránh tính toán lại
  const permissions = useMemo(() => rolePermissions[account.role.id] || [], [rolePermissions, account.role.id]);

  // Memoize các hàm helper
  const getInitials = useMemo(() => (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }, []);

  const getAvatarColor = useMemo(() => (id) => {
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
  }, []);

  // Đơn giản hóa animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header - đơn giản hóa */}
            <div className="px-8 py-6 flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                  <Eye size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Chi tiết tài khoản</h3>
                  <p className="text-white text-opacity-80 text-sm">Thông tin và quyền hạn chi tiết</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            
            {/* Content - tối ưu scroll */}
            <div className="flex-1 overflow-y-auto p-8" style={{ scrollBehavior: 'smooth' }}>
              {/* Account info */}
              <motion.div 
                className="mb-8"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getAvatarColor(account.id)} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                  >
                    {getInitials(account.name)}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4">{account.name}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <span className="font-medium">{account.email}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <Phone size={16} className="text-green-600" />
                        </div>
                        <span className="font-medium">{account.phone}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <div className="p-2 bg-purple-100 rounded-lg mr-3">
                          <CreditCard size={16} className="text-purple-600" />
                        </div>
                        <span className="font-medium">{account.CCCD}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 ${
                        account.type === 'customer' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-indigo-500 text-white'
                      }`}>
                        {account.type === 'customer' ? (
                          <>
                            <Users size={16} /> Khách hàng
                          </>
                        ) : (
                          <>
                            <Settings size={16} /> Nhân viên
                          </>
                        )}
                      </span>
                      
                      <span className={`px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 ${
                        account.disabled
                          ? 'bg-red-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}>
                        {account.disabled ? (
                          <>
                            <XCircle size={16} /> Vô hiệu hóa
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} /> Hoạt động
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Role info */}
              <motion.div 
                className="mb-8"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <h5 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Crown size={20} className="text-blue-600" />
                  Vai trò
                </h5>
                <div className={`p-6 rounded-2xl font-bold text-lg border-2 ${
                  account.type === 'customer' 
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${
                      account.type === 'customer'
                        ? 'bg-blue-500 text-white'
                        : 'bg-indigo-500 text-white'
                    }`}>
                      <UserCheck size={20} />
                    </div>
                    <span>{account.role.name}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Permissions - tối ưu hóa */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <h5 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-blue-600" />
                  Quyền hạn ({permissions.length})
                </h5>
                
                {permissions.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="bg-white rounded-2xl p-6 border border-blue-100 shadow-lg"
                      >
                        <div className="flex items-center mb-4">
                          <div className={`p-3 rounded-xl mr-4 ${
                            account.type === 'customer' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-indigo-500 text-white'
                          }`}>
                            <Shield size={18} />
                          </div>
                          <h6 className="font-bold text-lg text-gray-800">{permission.name}</h6>
                        </div>
                        
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                            <Star size={14} className="text-yellow-500" />
                            Chức năng được phép:
                          </p>
                          <div className="space-y-2">
                            {permission.functions.map((func, index) => (
                              <div 
                                key={index} 
                                className="text-sm text-gray-700 flex items-start bg-gray-50 p-3 rounded-xl"
                              >
                                <div className={`p-1 rounded-full mr-3 flex-shrink-0 ${
                                  account.type === 'customer' ? 'text-blue-500' : 'text-indigo-500'
                                }`}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </div>
                                <span className="font-medium">{func}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-gray-200 rounded-full">
                        <Shield size={32} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-semibold text-lg">Tài khoản không có quyền hạn nào</p>
                      <p className="text-gray-400 text-sm">Liên hệ quản trị viên để cấp quyền</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gray-500 text-white rounded-2xl font-semibold hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountDetailModal;