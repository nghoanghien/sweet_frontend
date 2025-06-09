import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Plus, Search, Filter, Users, Settings } from 'lucide-react';
import RoleCard from '../ui/RoleCard';
import RoleFormModal from './RoleFormModal';
import DeleteRoleModal from './DeleteRoleModal';
import ExportNotification from '../../../common/ExportNotification';

const RoleManagement = () => {
  // State cho modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // State cho filter
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State cho modal xác nhận
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    type: 'warning',
    confirmDetails: null,
    onConfirm: () => {},
  });

  // State cho thông báo
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success',
    format: '',
  });
  
  // Mock data cho danh sách vai trò
  const [rolesList, setRolesList] = useState([
    // Vai trò khách hàng (cố định)
    {
      id: 'role1',
      name: 'Không có quyền',
      type: 'customer',
      description: 'Tài khoản không có quyền thực hiện bất kỳ thao tác nào',
      permissions: [],
      accountCount: 5,
      isSystem: true
    },
    {
      id: 'role2',
      name: 'Quyền thanh toán',
      type: 'customer',
      description: 'Chỉ có quyền thực hiện các giao dịch thanh toán',
      permissions: [
        { id: 'perm1', name: 'Thanh toán' }
      ],
      accountCount: 120,
      isSystem: true
    },
    {
      id: 'role3',
      name: 'Quyền tiết kiệm',
      type: 'customer',
      description: 'Có quyền thanh toán và sử dụng các tính năng tiết kiệm',
      permissions: [
        { id: 'perm1', name: 'Thanh toán' },
        { id: 'perm2', name: 'Tiết kiệm' }
      ],
      accountCount: 85,
      isSystem: true
    },
    
    // Vai trò nhân viên (có thể thêm/sửa/xóa)
    {
      id: 'role4',
      name: 'Quản trị viên',
      type: 'staff',
      description: 'Có toàn quyền trong hệ thống',
      permissions: [
        { id: 'perm4', name: 'Quản lý khách hàng và phiếu gửi tiền' },
        { id: 'perm5', name: 'Quản lý nhân viên' },
        { id: 'perm7', name: 'Quản lý sản phẩm tiết kiệm' },
        { id: 'perm8', name: 'Báo cáo doanh số' },
        { id: 'perm9', name: 'Cài đặt hệ thống' },
        { id: 'perm10', name: 'Quản lý phân quyền' }
      ],
      accountCount: 3,
      isSystem: true
    },
    {
      id: 'role4.0',
      name: 'Không có quyền',
      type: 'staff',
      description: 'Không có quyền truy cập vào hệ thống',
      permissions: [],
      accountCount: 0,
      isSystem: true  
    },
    {
      id: 'role5',
      name: 'Nhân viên giao dịch',
      type: 'staff',
      description: 'Xử lý các giao dịch của khách hàng',
      permissions: [
        { id: 'perm3', name: 'Xem tổng quan ngân hàng' },
        { id: 'perm4', name: 'Quản lý khách hàng' },
        { id: 'perm6', name: 'Quản lý phiếu gửi tiền' }
      ],
      accountCount: 12,
      isSystem: false
    },
    {
      id: 'role6',
      name: 'Nhân viên tiếp thị',
      type: 'staff',
      description: 'Quản lý các sản phẩm và báo cáo',
      permissions: [
        { id: 'perm3', name: 'Xem tổng quan ngân hàng' },
        { id: 'perm7', name: 'Quản lý sản phẩm tiết kiệm' },
        { id: 'perm8', name: 'Báo cáo doanh số' }
      ],
      accountCount: 8,
      isSystem: false
    }
  ]);

  // Hàm hiển thị thông báo
  const showNotification = (message, type = 'success', format = '') => {
    setNotification({
      isVisible: true,
      message,
      type,
      format,
    });
  };

  // Hàm đóng thông báo
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  // Lọc danh sách vai trò theo filter và search
  const filteredRoles = rolesList.filter(role => {
    // Lọc theo loại
    if (filter !== 'all' && role.type !== filter) {
      return false;
    }
    
    // Lọc theo search term
    if (searchTerm && !role.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !role.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Xử lý khi click vào nút thêm vai trò
  const handleAddRole = () => {
    setSelectedRole(null);
    setIsEditing(false);
    setShowFormModal(true);
  };

  // Xử lý khi click vào nút sửa vai trò
  const handleEditRole = (roleId) => {
    const role = rolesList.find(r => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setIsEditing(true);
      setShowFormModal(true);
    }
  };

  // Xử lý khi click vào nút xóa vai trò
  const handleDeleteRole = (roleId) => {
    const role = rolesList.find(r => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setShowDeleteModal(true);
    }
  };

  // Xử lý khi lưu vai trò (thêm hoặc sửa)
  const handleSaveRole = (role, notificationInfo) => {
    if (isEditing) {
      // Cập nhật vai trò hiện có
      setRolesList(rolesList.map(r => r.id === role.id ? role : r));
    } else {
      // Thêm vai trò mới
      setRolesList([...rolesList, { ...role, id: `role${rolesList.length + 1}`, accountCount: 0 }]);
    }
    setShowFormModal(false);
    
    // Hiển thị thông báo nếu có
    if (notificationInfo) {
      showNotification(
        notificationInfo.message,
        notificationInfo.type,
        notificationInfo.format || ''
      );
    }
  };

  // Xử lý khi xác nhận xóa vai trò
  const handleConfirmDelete = (notificationInfo) => {
    if (selectedRole) {
      setRolesList(rolesList.filter(r => r.id !== selectedRole.id));
      setShowDeleteModal(false);
      
      // Hiển thị thông báo nếu có
      if (notificationInfo) {
        showNotification(
          notificationInfo.message,
          notificationInfo.type,
          notificationInfo.format || ''
        );
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <motion.h3 
            className="text-2xl font-bold text-indigo-700 flex items-center gap-2 drop-shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UserCheck size={28} className="text-indigo-500 mr-2 drop-shadow-lg" />
            Quản lý vai trò
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Tạo và quản lý các vai trò trong hệ thống
          </motion.p>
        </div>
        
        {/* Add role button */}
        <motion.button
          onClick={handleAddRole}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center font-semibold tracking-wide gap-2"
          whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(0,170,255,0.18)' }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Plus size={20} className="mr-2" />
          Thêm vai trò
        </motion.button>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <motion.div 
          className="relative flex-grow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            placeholder="Tìm kiếm vai trò..."
            className="pl-12 pr-4 py-3 border-2 border-indigo-100 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-base bg-white/80 shadow-inner transition-all duration-200 font-medium text-indigo-800 placeholder-indigo-300"
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
      
      {/* Role cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,170,255,0.10)' }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <RoleCard
              role={role}
              onEdit={handleEditRole}
              onDelete={handleDeleteRole}
              isSystemRole={role.isSystem}
            />
          </motion.div>
        ))}
        
        {filteredRoles.length === 0 && (
          <motion.div
            className="text-center py-10 text-blue-400 col-span-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>Không tìm thấy vai trò nào phù hợp</p>
          </motion.div>
        )}
      </div>

      {/* ExportNotification */}
      <ExportNotification
        isVisible={notification.isVisible}
        onClose={closeNotification}
        message={notification.message}
        type={notification.type}
        format={notification.format}
        autoHideDuration={5000}
      />

      <AnimatePresence mode="wait">
        {showFormModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black backdrop-blur-sm bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <RoleFormModal
              isOpen={showFormModal}
              onClose={() => setShowFormModal(false)}
              onSave={handleSaveRole}
              role={selectedRole}
              isEditing={isEditing}
            />
          </motion.div>
        )}

        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black backdrop-blur-sm bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DeleteRoleModal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleConfirmDelete}
              role={selectedRole}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleManagement; 