import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Users, Shield, Edit2, Trash2 } from 'lucide-react';

const RoleCard = ({ role, onEdit, onDelete, isSystemRole = false }) => {
  // Hàm chọn icon dựa trên loại vai trò
  const getRoleIcon = (roleType) => {
    switch (roleType) {
      case 'customer':
        return <Users className="text-blue-500" size={24} />;
      case 'staff':
        return <UserCheck className="text-indigo-600" size={24} />;
      default:
        return <UserCheck className="text-gray-500" size={24} />;
    }
  };

  return (
    <motion.div
      className={`bg-gradient-to-br ${
        role.type === 'customer'
          ? 'from-blue-50/80 to-white border-blue-100'
          : 'from-indigo-50/80 to-white border-indigo-100'
      } rounded-2xl shadow-[0_4px_20px_rgba(0,170,255,0.10)] p-6 border-2 relative transition-all`}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: '0 8px 30px rgba(0,170,255,0.15)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* System role badge */}
      {isSystemRole && (
        <span className="absolute top-3 right-3 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-2xl text-xs font-semibold shadow-sm border border-amber-200">Hệ thống</span>
      )}
      <div className="flex items-center mb-4">
        <motion.div
          className={`mr-5 p-3 rounded-2xl ${role.type === 'customer' ? 'bg-blue-100/60' : 'bg-indigo-100/60'} shadow-sm`}
          whileHover={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ duration: 0.2 }}
        >
          {getRoleIcon(role.type)}
        </motion.div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate max-w-[180px]">{role.name}</h3>
          <p className="text-sm text-gray-500 italic max-w-[220px] line-clamp-2">{role.description}</p>
        </div>
      </div>
      
      {/* Permission badges */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2 font-medium">Quyền hạn:</p>
        <div className="flex flex-wrap gap-2">
          {role.permissions.map((permission) => (
            <motion.div
              key={permission.id}
              className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold shadow-sm border border-blue-100 transition-all"
              whileHover={{ scale: 1.05, backgroundColor: '#dbeafe' }}
            >
              <Shield size={14} className="mr-1" />
              {permission.name}
            </motion.div>
          ))}
          {role.permissions.length === 0 && (
            <span className="text-xs text-gray-400 italic">Không có quyền hạn</span>
          )}
        </div>
      </div>
      
      {/* Account count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Users size={16} className="mr-1" />
          <span>{role.accountCount || 0} tài khoản</span>
        </div>
        
        {/* Action buttons */}
        {!isSystemRole && (
          <div className="flex gap-2">
            <motion.button
              onClick={() => onEdit(role.id)}
              className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <Edit2 size={18} />
            </motion.button>
            <motion.button
              onClick={() => onDelete(role.id)}
              className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 shadow-sm"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RoleCard; 