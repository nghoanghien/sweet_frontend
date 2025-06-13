import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Eye, Lock, XCircle, CheckCircle, User, Users, Settings } from 'lucide-react';

const AccountListItem = ({ account, onView, onEdit, onDisable, onResetPassword, delay = 0 }) => {
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
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={account.disabled ? 'bg-gray-50' : 'hover:bg-gray-50'}
    >
      {/* User info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getAvatarColor(account.id)}`}>
            {getInitials(account.name)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{account.name}</div>
            <div className="text-sm text-gray-500">{account.email}</div>
          </div>
        </div>
      </td>
      
      {/* Account type */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {account.type === 'customer' ? (
            <span className="px-3 py-1.5 inline-flex text-xs font-semibold rounded-2xl bg-blue-100 text-blue-700 items-center gap-1 shadow-sm">
              <Users size={14} /> Khách hàng
            </span>
          ) : (
            <span className="px-3 py-1.5 inline-flex text-xs font-semibold rounded-2xl bg-indigo-100 text-indigo-700 items-center gap-1 shadow-sm">
              <Settings size={14} /> Nhân viên
            </span>
          )}
        </div>
      </td>
      
      {/* Role */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{account.role.name}</div>
      </td>

      {/* SĐT */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{account.phone}</div>
      </td>
      
      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        {account.disabled ? (
          <span className="px-3 py-1.5 inline-flex text-xs font-semibold rounded-2xl bg-red-100 text-red-700 items-center gap-1 shadow-sm">
            <XCircle size={14} /> Vô hiệu hóa
          </span>
        ) : (
          <span className="px-3 py-1.5 inline-flex text-xs font-semibold rounded-2xl bg-green-100 text-green-700 items-center gap-1 shadow-sm">
            <CheckCircle size={14} /> Hoạt động
          </span>
        )}
      </td>
      
      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <motion.button
            onClick={() => onView(account.id)}
            className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            layoutId={`detail-account-${account.id}`}
            transition={{ duration: 0.2, type: "spring", stiffness: 150, damping: 20 }}
          >
            <Eye size={18} />
          </motion.button>
          
          <motion.button
            onClick={() => onEdit(account.id)}
            className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            layoutId={`edit-account-${account.id}`}
            transition={{ duration: 0.2, type: "spring", stiffness: 150, damping: 20 }}
          >
            <Edit2 size={18} />
          </motion.button>
          
          <motion.button
            onClick={() => onResetPassword(account.id)}
            className="p-2 rounded-xl bg-amber-100 text-amber-600 hover:bg-amber-200 shadow-sm"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            layoutId={`resetPassword-account-${account.id}`}
            transition={{ duration: 0.2, type: "spring", stiffness: 150, damping: 20 }}
          >
            <Lock size={18} />
          </motion.button>
          
          <motion.button
            onClick={() => onDisable(account.id)}
            className={`p-2 rounded-xl shadow-sm ${account.disabled ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
          >
            {account.disabled ? <CheckCircle size={18} /> : <XCircle size={18} />}
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
};

export default AccountListItem; 