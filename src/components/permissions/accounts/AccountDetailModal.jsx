import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, UserCheck, Users, Settings, Shield, CheckCircle, XCircle, IdCard, Phone } from 'lucide-react';

const AccountDetailModal = ({ isOpen, onClose, account }) => {
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

  // Hàm chọn màu nền cho avatar dựa trên ID
  const getAvatarColor = (id) => {
    const colors = [
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-green-500',
      'bg-teal-500',
    ];
    const index = parseInt(id.replace(/[^0-9]/g, '')) % colors.length;
    return colors[index];
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[95vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center rounded-t-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] border-b-2 border-blue-100 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <User size={32} className="mr-3 text-white drop-shadow-lg" />
                <h3 className="text-2xl font-bold tracking-wide drop-shadow">Chi tiết tài khoản</h3>
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
              {/* Account info */}
              <div className="flex items-start mb-6">
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg ${getAvatarColor(account.id)} mr-5`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {getInitials(account.name)}
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{account.name}</h4>
                  <p className="text-gray-500 flex items-center mt-1">
                    <User size={16} className="mr-1" />
                    {account.email}
                  </p>
                  <p className="text-gray-500 flex items-center mt-1">
                    <Phone size={16} className="mr-1" />
                    {account.phone}
                  </p>
                  <p className="text-gray-500 flex items-center mt-1">
                    <IdCard size={16} className="mr-1" />
                    {account.CCCD}
                  </p>
                  <div className="flex items-center mt-2 gap-2">
                    {account.type === 'customer' ? (
                      <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-2xl text-xs font-semibold flex items-center gap-1 shadow-sm">
                        <Users size={14} /> Khách hàng
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-2xl text-xs font-semibold flex items-center gap-1 shadow-sm">
                        <Settings size={14} /> Nhân viên
                      </span>
                    )}
                    <span className="text-gray-300">•</span>
                    {account.disabled ? (
                      <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-2xl text-xs font-semibold flex items-center gap-1 shadow-sm">
                        <XCircle size={14} /> Vô hiệu hóa
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-2xl text-xs font-semibold flex items-center gap-1 shadow-sm">
                        <CheckCircle size={14} /> Hoạt động
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Role info */}
              <div className="mb-6">
                <h5 className="text-sm font-semibold text-blue-700 mb-2 flex items-center">
                  <UserCheck size={18} className="mr-2" />Vai trò
                </h5>
                <div className={`p-4 rounded-2xl font-semibold text-base shadow-sm border border-blue-100
                  ${account.type === 'customer' ? 'bg-blue-50 text-blue-700' : 'bg-indigo-50 text-indigo-700'}`}
                >
                  {account.role.name}
                </div>
              </div>
              
              {/* Permissions */}
              <div>
                <h5 className="text-sm font-semibold text-blue-700 mb-2 flex items-center">
                  <Shield size={18} className="mr-2" />Quyền hạn
                </h5>
                
                {permissions.length > 0 ? (
                  <div className="space-y-4">
                    {permissions.map((permission, idx) => (
                      <motion.div
                        key={permission.id}
                        className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl p-5 border border-blue-100 shadow-[0_2px_12px_rgba(0,170,255,0.06)]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.35 }}
                      >
                        <div className="flex items-center mb-2">
                          <Shield size={18} className={`mr-3 ${account.type === 'customer' ? 'text-blue-600' : 'text-indigo-600'}`} />
                          <p className="font-semibold text-base text-blue-800">{permission.name}</p>
                        </div>
                        <div className="pl-7">
                          <p className="text-sm text-blue-600 mb-2 font-medium">Chức năng:</p>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {permission.functions.map((func, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className={`p-1 rounded-full mr-2 flex-shrink-0 ${account.type === 'customer' ? 'text-blue-500' : 'text-indigo-500'}`}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </span>
                                {func}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl p-5 border border-blue-100 text-center shadow-sm">
                    <p className="text-blue-400 font-medium">Tài khoản không có quyền hạn nào</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-t-2 border-blue-100 flex justify-end rounded-b-3xl">
              <motion.button
                onClick={onClose}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold shadow hover:bg-gray-200 transition-all"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                Đóng
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountDetailModal; 