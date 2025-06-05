import React from 'react';
import { motion } from 'framer-motion';
import { User, UserCheck, Shield, Edit2, Lock, Eye, XCircle } from 'lucide-react';

const AccountCard = ({ account, onView, onEdit, onDisable, onResetPassword }) => {
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
    <motion.div
      className={`bg-gradient-to-br ${
        account.type === 'customer'
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
      {/* Disabled badge */}
      {account.disabled && (
        <span className="absolute top-3 right-3 px-3 py-1.5 bg-red-100 text-red-700 rounded-2xl text-xs font-semibold flex items-center shadow-sm border border-red-200">
          <XCircle size={14} className="mr-1" />
          Vô hiệu hóa
        </span>
      )}

      <div className="flex items-center mb-4">
        <motion.div
          className={`mr-5 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getAvatarColor(account.id)}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {getInitials(account.name)}
        </motion.div>
        <div>
          <h3 className="font-bold text-lg mb-1 truncate max-w-[180px]">{account.name}</h3>
          <p className="text-sm italic max-w-[220px] line-clamp-2">{account.email}</p>
        </div>
      </div>
      
      {/* Role info */}
      <div className="mb-4">
        <div className={`flex items-center px-3 py-2 rounded-xl ${
          account.type === 'customer' ? 'bg-blue-50' : 'bg-indigo-50'
        }`}>
          <UserCheck size={18} className={`mr-2 ${
            account.type === 'customer' ? 'text-blue-600' : 'text-indigo-600'
          }`} />
          <div>
            <p className="text-sm text-gray-700 font-semibold">{account.role.name}</p>
            <p className="text-xs text-gray-500 italic">{account.type === 'customer' ? 'Khách hàng' : 'Nhân viên'}</p>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          onClick={() => onView(account.id)}
          className="flex items-center px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <Eye size={14} className="mr-0" />
          <span className="font-semibold">Xem</span>
        </motion.button>
        
        <motion.button
          onClick={() => onEdit(account.id)}
          className="flex items-center px-3 py-1.5 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <Edit2 size={14} className="mr-0" />
          <span className="font-semibold">Sửa</span>
        </motion.button>
        
        <motion.button
          onClick={() => onResetPassword(account.id)}
          className="flex items-center px-3 py-1.5 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 text-sm shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <Lock size={14} className="mr-0" />
          <span className="font-semibold">Đổi MK</span>
        </motion.button>
        
        <motion.button
          onClick={() => onDisable(account.id)}
          className={`flex items-center px-3 py-1.5 rounded-xl text-sm shadow-sm ${
            account.disabled
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <XCircle size={14} className="mr-0" />
          <span className="font-semibold">{account.disabled ? 'Mở' : 'Khóa'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AccountCard; 