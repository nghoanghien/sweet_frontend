import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, UserCheck, Shield, Edit2, Lock, Eye, XCircle, Users, Unlock } from 'lucide-react';

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

  // Xác định loại tài khoản dựa trên customerID/employeeID
  const getAccountType = (account) => {
    return account.customerID ? 'customer' : 'staff';
  };

  // Kiểm tra trạng thái disabled
  const isDisabled = (account) => {
    return account.accountStatus === 'disabled';
  };

  // Hàm chọn màu nền cho avatar dựa trên ID và loại tài khoản
  const getAvatarColor = (id, type, disabled = false) => {
    if (disabled) {
      return 'bg-gray-400';
    }
    
    if (type === 'customer') {
      const customerColors = [
        'bg-emerald-500',
        'bg-teal-500',
        'bg-green-500',
        'bg-cyan-500',
      ];
      const index = parseInt(String(id || '0').replace(/[^0-9]/g, '') || '0') % customerColors.length;
      return customerColors[index];
    } else {
      const staffColors = [
        'bg-violet-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-blue-500',
      ];
      const index = parseInt(String(id || '0').replace(/[^0-9]/g, '') || '0') % staffColors.length;
      return staffColors[index];
    }
  };

  // Hàm chọn icon dựa trên loại tài khoản
  const getAccountIcon = (accountType, disabled = false) => {
    const iconColor = disabled ? "text-gray-500" : 
      accountType === 'customer' ? "text-emerald-600" : "text-violet-600";
    
    switch (accountType) {
      case 'customer':
        return <Users className={iconColor} size={24} />;
      case 'staff':
        return <UserCheck className={iconColor} size={24} />;
      default:
        return <User className="text-gray-500" size={24} />;
    }
  };

  // Hàm lấy style cho card dựa trên loại tài khoản và trạng thái
  const getCardStyle = (accountType, disabled = false) => {
    if (disabled) {
      return {
        gradient: "from-gray-100 via-gray-50 to-white",
        border: "border-gray-300",
        iconBg: "bg-gray-200",
        shadow: "shadow-[0_4px_25px_rgba(0,0,0,0.08)]",
        hoverShadow: "0 8px 35px rgba(0,0,0,0.12)",
        roleBg: "bg-gray-100",
        roleText: "text-gray-600"
      };
    }
    
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

  const cardStyle = getCardStyle(getAccountType(account), isDisabled(account));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`relative bg-gradient-to-br ${cardStyle.gradient} rounded-2xl ${cardStyle.shadow} px-4 p-6 border-2 ${cardStyle.border} overflow-hidden`}
        whileHover={{
          scale: isDisabled(account) ? 1 : 1.02,
          boxShadow: isDisabled(account) ? cardStyle.shadow : cardStyle.hoverShadow,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        layoutId={`detail-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}`}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
        }}
      >

        {/* Main content */}
        <motion.div
          animate={{
            opacity: isDisabled(account) ? 0.4 : 1,
            filter: isDisabled(account) ? "grayscale(0.8)" : "grayscale(0)"
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex items-center mb-4">
            <motion.div
              className={`mr-5 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getAvatarColor(
                account.id,
                getAccountType(account),
                isDisabled(account)
              )}`}
              whileHover={{ scale: isDisabled(account) ? 1 : 1.05, rotate: isDisabled(account) ? 0 : [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
              animate={{
                scale: isDisabled(account) ? 0.95 : 1,
              }}
            >
              {getInitials(account.fullName)}
            </motion.div>
            <div>
              <motion.h3 
                className="font-bold text-lg mb-1 truncate max-w-[180px]"
                animate={{
                  color: isDisabled(account) ? "#6b7280" : "#1f2937"
                }}
                transition={{ duration: 0.5 }}
              >
                {account.fullName}
              </motion.h3>
              <motion.p 
                className="text-sm italic max-w-[220px] line-clamp-2"
                animate={{
                  color: isDisabled(account) ? "#9ca3af" : "#6b7280"
                }}
                transition={{ duration: 0.5 }}
              >
                {account.email}
              </motion.p>
            </div>
          </div>

          {/* Role info */}
          <div className="mb-4">
            <div
              className={`flex items-center px-3 py-2 rounded-xl ${
                cardStyle.roleBg
              } border border-opacity-30 ${
                isDisabled(account) ? "border-gray-200" :
                getAccountType(account) === "customer"
                  ? "border-emerald-200"
                  : "border-violet-200"
              }`}
            >
              <div className={`mr-3 p-1.5 rounded-lg ${cardStyle.iconBg}`}>
                {getAccountIcon(getAccountType(account), isDisabled(account))}
              </div>
              <div>
                <p className={`text-sm font-semibold ${cardStyle.roleText}`}>
                  {account.role?.roleName || 'Chưa có vai trò'}
                </p>
                <p className="text-xs text-gray-500 italic">
                  {getAccountType(account) === "customer" ? "Khách hàng" : "Nhân viên"}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons - only visible when not disabled */}
          {!isDisabled(account) && (
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => onView(
                  account?.employeeID ? account.employeeID : account?.customerID,
                  account?.employeeID ? 'employee' : 'customer'
                )}
                className="flex items-center px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm shadow-sm transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
              >
                <Eye size={14} className="mr-1" />
                <span className="font-semibold">Xem</span>
              </motion.button>

              <motion.button
                onClick={() => onEdit(
                  account?.employeeID ? account.employeeID : account?.customerID,
                  account?.employeeID ? 'employee' : 'customer'
                )}
                className={`flex items-center px-3 py-1.5 rounded-xl text-sm shadow-sm transition-colors duration-200 ${
                  getAccountType(account) === "customer"
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                layoutId={`edit-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}`}
                transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 16 }}
              >
                <Edit2 size={14} className="mr-1" />
                <span className="font-semibold">Sửa</span>
              </motion.button>

              <motion.button
                onClick={() => onResetPassword(
                  account?.employeeID ? account.employeeID : account?.customerID,
                  account?.employeeID ? 'employee' : 'customer'
                )}
                className="flex items-center px-3 py-1.5 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 text-sm shadow-sm transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                layoutId={`resetPassword-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}`}
                transition={{ duration: 0.2, type: "spring", stiffness: 150, damping: 20 }}
              >
                <Lock size={14} className="mr-1" />
                <span className="font-semibold">Đổi MK</span>
              </motion.button>

              <motion.button
                onClick={() => onDisable(
                  account?.employeeID ? account.employeeID : account?.customerID,
                  account?.employeeID ? 'employee' : 'customer'
                )}
                className="flex items-center px-3 py-1.5 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 text-sm shadow-sm transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
              >
                <XCircle size={14} className="mr-1" />
                <span className="font-semibold">Khóa</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Glass overlay for disabled state */}
        <AnimatePresence>
          {isDisabled(account) && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-white/0 rounded-2xl z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="flex gap-4">
                {/* View button with glass effect */}
                <motion.button
                  onClick={() => onView(
                    account?.employeeID ? account.employeeID : account?.customerID,
                    account?.employeeID ? 'employee' : 'customer'
                  )}
                  className="flex items-center px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 hover:bg-white/30 shadow-lg transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Eye size={18} className="mr-2" />
                  <span className="font-semibold">Xem</span>
                </motion.button>

                {/* Unlock button with glass effect */}
                <motion.button
                  onClick={() => onDisable(
                    account?.employeeID ? account.employeeID : account?.customerID,
                    account?.employeeID ? 'employee' : 'customer'
                  )}
                  className="flex items-center px-6 py-3 rounded-2xl bg-green-400/20 backdrop-blur-sm text-emerald-700 hover:bg-emerald-500/30 shadow-lg transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 32px rgba(16,185,129,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Unlock size={18} className="mr-2" />
                  <span className="font-semibold">Mở khóa</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccountCard;