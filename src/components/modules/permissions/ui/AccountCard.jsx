import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, UserCheck, Shield, Edit2, Lock, Eye, XCircle, Users, Unlock, MoreVertical } from 'lucide-react';
import { useUser } from '@/store/useUserStore';

const AccountCard = ({ account, onView, onEdit, onDisable, onResetPassword }) => {
  const { detailInfo } = useUser();
  
  // Kiểm tra xem có phải tài khoản hiện tại đang thao tác không
  const isCurrentUserAccount = () => {
    if (!detailInfo) return false;
    
    // Nếu account là nhân viên và có employeeID trùng với detailInfo.employeeID
    if (account.employeeID) {
      return account.employeeID === detailInfo.id;
    }
    
    return false;
  };
  
  // Kiểm tra có nên ẩn nút sửa và khóa không
  const shouldHideEditAndLockButtons = () => {
    return isCurrentUserAccount() && getAccountType(account) === 'staff';
  };

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
        'bg-gradient-to-br from-emerald-400 to-emerald-600',
        'bg-gradient-to-br from-teal-400 to-teal-600',
        'bg-gradient-to-br from-green-400 to-green-600',
        'bg-gradient-to-br from-cyan-400 to-cyan-600',
      ];
      const index = parseInt(String(id || '0').replace(/[^0-9]/g, '') || '0') % customerColors.length;
      return customerColors[index];
    } else {
      const staffColors = [
        'bg-gradient-to-br from-violet-400 to-violet-600',
        'bg-gradient-to-br from-purple-400 to-purple-600',
        'bg-gradient-to-br from-indigo-400 to-indigo-600',
        'bg-gradient-to-br from-blue-400 to-blue-600',
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
        return <Users className={iconColor} size={20} />;
      case 'staff':
        return <UserCheck className={iconColor} size={20} />;
      default:
        return <User className="text-gray-500" size={20} />;
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
        className={`relative bg-gradient-to-br ${cardStyle.gradient} rounded-3xl ${cardStyle.shadow} p-6 border-2 ${cardStyle.border} overflow-hidden`}
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
        {/* Nút xem ở góc trên phải */}
        {!isDisabled(account) && (
          <motion.button
            onClick={() => onView(
              account?.employeeID ? account.employeeID : account?.customerID,
              account?.employeeID ? 'employee' : 'customer'
            )}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-100 border border-gray-300 flex items-center justify-center shadow-sm transition-all duration-200 z-20"
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={18} className="text-gray-700" />
          </motion.button>
        )}

        {/* Header với avatar và thông tin cơ bản */}
        <motion.div
          animate={{
            opacity: isDisabled(account) ? 0.6 : 1,
            filter: isDisabled(account) ? "grayscale(0.5)" : "grayscale(0)"
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Avatar tròn với gradient đẹp */}
              <motion.div
                className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getAvatarColor(
                  account.id,
                  getAccountType(account),
                  isDisabled(account)
                )}`}
                whileHover={{ scale: isDisabled(account) ? 1 : 1.1, rotate: isDisabled(account) ? 0 : [0, -3, 3, 0] }}
                transition={{ duration: 0.3 }}
                animate={{
                  scale: isDisabled(account) ? 0.95 : 1,
                }}
              >
                {getInitials(account.fullName)}
              </motion.div>
              
              {/* Thông tin tên và email */}
              <div className="flex-1">
                <motion.h3 
                  className="font-bold text-xl text-gray-900 mb-1 leading-tight"
                  animate={{
                    color: isDisabled(account) ? "#6b7280" : "#111827"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {account.fullName}
                </motion.h3>
                <motion.p 
                  className="text-sm text-gray-600 font-medium"
                  animate={{
                    color: isDisabled(account) ? "#9ca3af" : "#6b7280"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {account.email}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Role và loại tài khoản */}
          <div className="mb-4">
            <div className={`flex items-center px-4 py-3 rounded-xl ${cardStyle.statusBg} ${cardStyle.roleBg} border border-opacity-50 ${cardStyle.border}`}>
              <div className="mr-3 p-2 rounded-lg bg-white shadow-sm">
                {getAccountIcon(getAccountType(account), isDisabled(account))}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-bold ${cardStyle.statusText} mb-0.5`}>
                  {account.role?.roleName || 'Chưa có vai trò'}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {getAccountType(account) === "customer" ? "Khách hàng" : "Nhân viên"}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons - chỉ hiển thị khi không bị disabled */}
          {!isDisabled(account) && (
            <motion.div 
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!shouldHideEditAndLockButtons() && (
                <motion.button
                  onClick={() => onEdit(
                    account?.employeeID ? account.employeeID : account?.customerID,
                    account?.employeeID ? 'employee' : 'customer'
                  )}
                  className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors duration-200 border ${
                    getAccountType(account) === "customer"
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                      : "bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layoutId={`edit-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}`}
                  transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 16 }}
                >
                  <Edit2 size={16} className="mr-2" />
                  <span>Sửa</span>
                </motion.button>
              )}

              <motion.button
                onClick={() => onResetPassword(
                  account?.employeeID ? account.employeeID : account?.customerID,
                  account?.employeeID ? 'employee' : 'customer'
                )}
                className="flex items-center px-4 py-2.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 text-sm font-semibold shadow-sm transition-colors duration-200 border border-amber-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layoutId={`resetPassword-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}`}
                transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 18 }}
              >
                <Lock size={16} className="mr-2" />
                <span>Đổi MK</span>
              </motion.button>

              {!shouldHideEditAndLockButtons() && (
                <motion.button
                  onClick={() => onDisable(
                    account?.employeeID ? account.employeeID : account?.customerID,
                    account?.employeeID ? 'employee' : 'customer'
                  )}
                  className="flex items-center px-4 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-sm font-semibold shadow-sm transition-all duration-200 border border-red-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <XCircle size={16} className="mr-2" />
                  <span>Khóa</span>
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Glass overlay cho trạng thái disabled */}
        <AnimatePresence>
          {isDisabled(account) && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-white/10 rounded-2xl z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex gap-4">
                {/* View button với glass effect */}
                <motion.button
                  onClick={() => onView(
                    account?.employeeID ? account.employeeID : account?.customerID,
                    account?.employeeID ? 'employee' : 'customer'
                  )}
                  className="flex items-center px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/50 text-gray-700 hover:bg-white/50 shadow-lg transition-all duration-300 font-semibold"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Eye size={18} className="mr-2" />
                  <span className="font-semibold">Xem</span>
                </motion.button>

                {/* Unlock button với glass effect */}
                <motion.button
                  onClick={() => onDisable(
                    account?.employeeID ? account.employeeID : account?.customerID,
                    account?.employeeID ? 'employee' : 'customer'
                  )}
                  className="flex items-center px-6 py-3 rounded-2xl bg-emerald-400/20 backdrop-blur-sm border border-emerald-300/40 text-emerald-700 hover:bg-emerald-500/30 shadow-lg transition-all duration-300 font-semibold"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 40px rgba(16,185,129,0.25)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Unlock size={18} className="mr-2" />
                  <span>Mở khóa</span>
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