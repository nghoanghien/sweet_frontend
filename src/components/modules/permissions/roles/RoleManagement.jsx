import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Plus, Search, Filter, Users, Settings } from 'lucide-react';
import RoleCard from '../ui/RoleCard';
import RoleFormModal from './RoleFormModal';
import DeleteRoleModal from './DeleteRoleModal';
import ExportNotification from '../../../common/ExportNotification';
import RoleCardShimmer from '../../../ui/custom/shimmer-types/RoleCardShimmer';
import { useAllRoles } from '@/hooks/useAllRoles';
import { getPermissionLabel } from '@/utils/permissions';

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

  const { allRoles, isLoading, error, refreshRoles } = useAllRoles();
  
  // Transform API data to component format
  const transformRoleData = (apiRoles) => {
    return apiRoles.map(role => {
      console.log('Role permissions:', role.permissions);
      return {
        id: role.roleID,
        name: role.roleName,
        type: role.customerRole ? 'customer' : 'staff',
        description: role.description,
        permissions: role.permissions.map(permission => {
          console.log('Permission:', permission);
          console.log('Permission label:', getPermissionLabel(permission));
          return {
            id: permission,
            name: getPermissionLabel(permission)
          };
        }),
        accountCount: 0, // This would need to come from API
        isSystem: true, // This would need to come from API
        active: role.active
      };
    });
  };
  
  // Use transformed data instead of mock data
  const rolesList = allRoles ? transformRoleData(allRoles) : [];

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
    // TODO: Implement API calls for creating/updating roles
    // For now, just refresh the data
    refreshRoles();
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
      // TODO: Implement API call for deleting role
      // For now, just refresh the data
      refreshRoles();
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

  // Hiển thị shimmer khi đang loading
  if (isLoading) {
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
              <UserCheck
                size={28}
                className="text-indigo-500 mr-2 drop-shadow-lg"
              />
              Quản lý vai trò
            </motion.h3>
            <motion.p
              className="text-sm text-gray-500 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Đang tải danh sách vai trò...
            </motion.p>
          </div>
        </div>
        <RoleCardShimmer cardCount={9} />
      </div>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Có lỗi xảy ra khi tải danh sách vai trò</p>
        <button 
          onClick={refreshRoles}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

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
            <UserCheck
              size={28}
              className="text-indigo-500 mr-2 drop-shadow-lg"
            />
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
        <AnimatePresence>
          <motion.button
            onClick={handleAddRole}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center font-semibold tracking-wide gap-2"
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 16px rgba(0,170,255,0.18)",
            }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            layoutId="add-role-modal"
            transition={{
              layout: {
                type: "spring",
                damping: 17,
                stiffness: 100,
              },
              opacity: {
                duration: 0.3,
              },
            }}
          >
            <Plus size={20} className="mr-2" />
            Thêm vai trò
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <motion.div
          className="relative flex-grow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
          />
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
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-base font-semibold shadow transition-all
              ${
                filter === "all"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(0,170,255,0.13)]"
                  : "bg-gray-100 text-gray-600 hover:bg-blue-50 border border-blue-100"
              }`}
          >
            <Filter size={18} />
            Tất cả
          </button>
          <button
            onClick={() => setFilter("customer")}
            className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-base font-semibold shadow transition-all
              ${
                filter === "customer"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(0,170,255,0.13)]"
                  : "bg-gray-100 text-gray-600 hover:bg-blue-50 border border-blue-100"
              }`}
          >
            <Users size={18} />
            Khách hàng
          </button>
          <button
            onClick={() => setFilter("staff")}
            className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-base font-semibold shadow transition-all
              ${
                filter === "staff"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(0,170,255,0.13)]"
                  : "bg-gray-100 text-gray-600 hover:bg-blue-50 border border-blue-100"
              }`}
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
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 30px rgba(0,170,255,0.10)",
            }}
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

      <RoleFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSaveRole}
        role={selectedRole}
        isEditing={isEditing}
      />

<DeleteRoleModal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleConfirmDelete}
              role={selectedRole}
            />
    </div>
  );
};

export default RoleManagement;