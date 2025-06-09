import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, Filter, Users, Settings } from 'lucide-react';
import PermissionCard from '../ui/PermissionCard';
import PermissionDetailModal from './PermissionDetailModal';

const PermissionList = () => {
  // State cho modal chi tiết quyền hạn
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // State cho filter
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data cho danh sách quyền hạn
  const permissionsList = [
    // Quyền hạn khách hàng
    {
      id: 'perm1',
      name: 'Thanh toán',
      type: 'customer',
      description: 'Quyền thực hiện các giao dịch thanh toán',
      functions: [
        'Quản lý tài khoản thanh toán'
      ]
    },
    {
      id: 'perm2',
      name: 'Tiết kiệm',
      type: 'customer',
      description: 'Quyền sử dụng các tính năng tiết kiệm',
      functions: [
        'Quản lý tài khoản thanh toán',
        'Quản lý tài khoản tiết kiệm (mở tài khoản, rút tiền, tất toán)'
      ]
    },
    
    // Quyền hạn nhân viên
    {
      id: 'perm4',
      name: 'Quản lý khách hàng và phiếu gửi tiền',
      type: 'staff',
      description: 'Quyền quản lý thông tin khách hàng',
      functions: [
        'Xem danh sách khách hàng',
        'Thêm khách hàng mới',
        'Cập nhật thông tin khách hàng',
        'Xem lịch sử giao dịch',
        'Quản lý phiếu gửi tiền',
        'Tạo phiếu gửi tiền mới',
        'Rút tiền tiết kiệm',
        'Tất toán sổ tiết kiệm'
      ]
    },
    {
      id: 'perm5',
      name: 'Quản lý nhân viên',
      type: 'staff',
      description: 'Quyền quản lý thông tin nhân viên',
      functions: [
        'Xem danh sách nhân viên',
        'Thêm nhân viên mới',
        'Cập nhật thông tin nhân viên',
        'Xem hiệu suất công việc'
      ]
    },
    {
      id: 'perm7',
      name: 'Quản lý sản phẩm tiết kiệm',
      type: 'staff',
      description: 'Quyền quản lý các sản phẩm tiết kiệm',
      functions: [
        'Xem danh sách sản phẩm',
        'Thêm sản phẩm mới',
        'Cập nhật thông tin sản phẩm',
        'Quản lý lãi suất'
      ]
    },
    {
      id: 'perm8',
      name: 'Báo cáo doanh số',
      type: 'staff',
      description: 'Quyền xem và xuất báo cáo doanh số',
      functions: [
        'Xem báo cáo doanh số',
        'Xuất báo cáo Excel',
        'Xuất báo cáo PDF',
        'Gửi báo cáo qua email'
      ]
    },
    {
      id: 'perm9',
      name: 'Cài đặt hệ thống',
      type: 'staff',
      description: 'Quyền cấu hình các thiết lập hệ thống',
      functions: [
        'Cấu hình thông số hệ thống',
        'Quản lý thông báo',
        'Cấu hình email',
        'Sao lưu dữ liệu'
      ]
    },
    {
      id: 'perm10',
      name: 'Quản lý phân quyền',
      type: 'staff',
      description: 'Quyền quản lý vai trò và phân quyền',
      functions: [
        'Xem danh sách vai trò',
        'Tạo vai trò mới',
        'Phân quyền cho vai trò',
        'Gán vai trò cho tài khoản'
      ]
    }
  ];

  // Lọc danh sách quyền hạn theo filter và search
  const filteredPermissions = permissionsList.filter(permission => {
    // Lọc theo loại
    if (filter !== 'all' && permission.type !== filter) {
      return false;
    }
    
    // Lọc theo search term
    if (searchTerm && !permission.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !permission.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Xử lý khi click vào một quyền hạn
  const handlePermissionClick = (permission) => {
    setSelectedPermission(permission);
    setShowDetailModal(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <motion.h3 
            className="text-2xl font-bold text-blue-700 flex items-center gap-2 drop-shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Shield size={28} className="text-blue-500 mr-2 drop-shadow-lg" />
            Danh sách quyền hạn
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Xem các quyền hạn và chức năng tương ứng trong hệ thống
          </motion.p>
        </div>
        
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <motion.div 
            className="relative flex-grow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Tìm kiếm quyền hạn..."
              className="pl-12 pr-4 py-3 border-2 border-indigo-100 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-base bg-white/80 shadow-inner transition-all duration-200 font-medium text-blue-800 placeholder-indigo-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
          
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-base font-semibold shadow transition-all
                ${filter === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(0,170,255,0.13)]'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 border border-blue-100'}`}
            >
              <Filter size={18} />
              Tất cả
            </button>
            <button
              onClick={() => setFilter('customer')}
              className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-base font-semibold shadow transition-all
                ${filter === 'customer'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(0,170,255,0.13)]'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 border border-blue-100'}`}
            >
              <Users size={18} />
              Khách hàng
            </button>
            <button
              onClick={() => setFilter('staff')}
              className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-base font-semibold shadow transition-all
                ${filter === 'staff'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(0,170,255,0.13)]'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 border border-blue-100'}`}
            >
              <Settings size={18} />
              Nhân viên
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Permission list */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {filteredPermissions.map((permission, index) => (
          <motion.div
            key={permission.id}
            initial={{ opacity: 0, y: 24, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.005, boxShadow: '0 0 30px rgba(0,170,255,0.10)' }}
            transition={{ delay: index * 0.08, duration: 0.2 }}
          >
            <PermissionCard
              permission={permission}
              onClick={() => handlePermissionClick(permission)}
            />
          </motion.div>
        ))}
        
        {filteredPermissions.length === 0 && (
          <motion.div
            className="text-center py-10 text-blue-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>Không tìm thấy quyền hạn nào phù hợp</p>
          </motion.div>
        )}
      </div>
      
      {/* Permission detail modal */}
      <AnimatePresence mode="wait">
        {showDetailModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black backdrop-blur-sm bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PermissionDetailModal
              isOpen={showDetailModal}
              onClose={() => setShowDetailModal(false)}
              permission={selectedPermission}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PermissionList; 