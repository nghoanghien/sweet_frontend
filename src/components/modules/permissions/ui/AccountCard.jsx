import React from 'react';
import { motion } from 'framer-motion';
import { User, UserCheck, Shield, Edit2, Lock, Eye, XCircle, Users } from 'lucide-react';

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

  // Hàm chọn màu nền cho avatar dựa trên ID và loại tài khoản
  const getAvatarColor = (id, type) => {
    if (type === 'customer') {
      const customerColors = [
        'bg-emerald-500',
        'bg-teal-500',
        'bg-green-500',
        'bg-cyan-500',
      ];
      const index = parseInt(id.replace(/[^0-9]/g, '')) % customerColors.length;
      return customerColors[index];
    } else {
      const staffColors = [
        'bg-violet-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-blue-500',
      ];
      const index = parseInt(id.replace(/[^0-9]/g, '')) % staffColors.length;
      return staffColors[index];
    }
  };

  // Hàm chọn icon dựa trên loại tài khoản
  const getAccountIcon = (accountType) => {
    switch (accountType) {
      case 'customer':
        return <Users className="text-emerald-600" size={24} />;
      case 'staff':
        return <UserCheck className="text-violet-600" size={24} />;
      default:
        return <User className="text-gray-500" size={24} />;
    }
  };

  // Hàm lấy style cho card dựa trên loại tài khoản
  const getCardStyle = (accountType) => {
    if (accountType === 'customer') {
      return {
        gradient: "from-emerald-50/90 via-teal-50/50 to-white",
        border: "border-emerald-200/60",
        iconBg: "bg-emerald-100/70",
        shadow: "shadow-[0_4px_25px_rgba(16,185,129,0.12)]",
        hoverShadow: "0 8px 35px rgba(16,185,129,0.18)",
        roleBg: "bg-emerald-50",
        roleText: "text-emerald-600"
      };
    } else {
      return {
        gradient: "from-violet-50/90 via-purple-50/50 to-white",
        border: "border-violet-200/60", 
        iconBg: "bg-violet-100/70",
        shadow: "shadow-[0_4px_25px_rgba(139,92,246,0.12)]",
        hoverShadow: "0 8px 35px rgba(139,92,246,0.18)",
        roleBg: "bg-violet-50",
        roleText: "text-violet-600"
      };
    }
  };

  const cardStyle = getCardStyle(account.type);

  return (
    <motion.div
      className={`bg-gradient-to-br ${cardStyle.gradient} rounded-2xl ${cardStyle.shadow} px-4 p-6 border-2 ${cardStyle.border} relative transition-all duration-300`}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: cardStyle.hoverShadow
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* Disabled badge */}
      {account.disabled && (
        <motion.span 
          className="absolute top-3 right-3 px-3 py-1.5 bg-red-100 text-red-700 rounded-2xl text-xs font-semibold flex items-center shadow-sm border border-red-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <XCircle size={14} className="mr-1" />
          Vô hiệu hóa
        </motion.span>
      )}

      <div className="flex items-center mb-4">
        <motion.div
          className={`mr-5 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getAvatarColor(account.id, account.type)}`}
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
        >
          {getInitials(account.name)}
        </motion.div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate max-w-[180px]">{account.name}</h3>
          <p className="text-sm text-gray-500 italic max-w-[220px] line-clamp-2">{account.email}</p>
        </div>
      </div>
      
      {/* Role info */}
      <div className="mb-4">
        <div className={`flex items-center px-3 py-2 rounded-xl ${cardStyle.roleBg} border border-opacity-30 ${account.type === 'customer' ? 'border-emerald-200' : 'border-violet-200'}`}>
          <div className={`mr-3 p-1.5 rounded-lg ${cardStyle.iconBg}`}>
            {getAccountIcon(account.type)}
          </div>
          <div>
            <p className={`text-sm font-semibold ${cardStyle.roleText}`}>{account.role.name}</p>
            <p className="text-xs text-gray-500 italic">{account.type === 'customer' ? 'Khách hàng' : 'Nhân viên'}</p>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          onClick={() => onView(account.id)}
          className="flex items-center px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm shadow-sm transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <Eye size={14} className="mr-1" />
          <span className="font-semibold">Xem</span>
        </motion.button>
        
        <motion.button
          onClick={() => onEdit(account.id)}
          className={`flex items-center px-3 py-1.5 rounded-xl text-sm shadow-sm transition-colors duration-200 ${
            account.type === 'customer' 
              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
              : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <Edit2 size={14} className="mr-1" />
          <span className="font-semibold">Sửa</span>
        </motion.button>
        
        <motion.button
          onClick={() => onResetPassword(account.id)}
          className="flex items-center px-3 py-1.5 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 text-sm shadow-sm transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <Lock size={14} className="mr-1" />
          <span className="font-semibold">Đổi MK</span>
        </motion.button>
        
        <motion.button
          onClick={() => onDisable(account.id)}
          className={`flex items-center px-3 py-1.5 rounded-xl text-sm shadow-sm transition-colors duration-200 ${
            account.disabled
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <XCircle size={14} className="mr-1" />
          <span className="font-semibold">{account.disabled ? 'Mở' : 'Khóa'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AccountCard;