import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Eye, Lock, XCircle, CheckCircle, User, Users, Settings, Unlock } from 'lucide-react';
import { useUser } from '@/store/useUserStore';

const AccountListItem = React.forwardRef(({ account, onView, onEdit, onDisable, onResetPassword, delay = 0 }, ref) => {
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
    const index = parseInt(String(id || '0').replace(/[^0-9]/g, '') || '0') % colors.length;
    return colors[index];
  };

  return (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="hover:bg-gray-50"
    >
      {/* User info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getAvatarColor(account.id)}`}
          >
            {getInitials(account.fullName)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {account.fullName}
            </div>
            <div className="text-sm text-gray-500">
              {account.email}
            </div>
          </div>
        </div>
      </td>

      {/* Account type */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {getAccountType(account) === "customer" ? (
            <span className="px-3 py-1.5 inline-flex text-xs font-semibold rounded-2xl items-center gap-1 shadow-sm bg-blue-100 text-blue-700">
              <Users size={14} /> Khách hàng
            </span>
          ) : (
            <span className="px-3 py-1.5 inline-flex text-xs font-semibold rounded-2xl items-center gap-1 shadow-sm bg-indigo-100 text-indigo-700">
              <Settings size={14} /> Nhân viên
            </span>
          )}
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {account.role?.roleName || 'Chưa có vai trò'}
        </div>
      </td>

      {/* SĐT */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {account.phoneNumber}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        {isDisabled(account) ? (
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
        <div className="flex justify-center gap-2">
          {/* View button - luôn hiện */}
          <motion.button
            onClick={() => onView(
              account?.employeeID ? account.employeeID : account?.customerID,
              account?.employeeID ? 'employee' : 'customer'
            )}
            className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            layoutId={`detail-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}`}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 150,
              damping: 20,
            }}
          >
            <Eye size={18} />
          </motion.button>

          {/* Các action khác - chỉ hiện khi không bị disabled */}
          <AnimatePresence>
            {!isDisabled(account) && (
              <>
                {!shouldHideEditAndLockButtons() && (
                  <motion.button
                    onClick={() => onEdit(
                      account?.employeeID ? account.employeeID : account?.customerID,
                      account?.employeeID ? 'employee' : 'customer'
                    )}
                    className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    layoutId={`edit-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                    }}
                  >
                    <Edit2 size={18} />
                  </motion.button>
                )}

                <motion.button
                  onClick={() => onResetPassword(
                    account?.employeeID ? account.employeeID : account?.customerID,
                    account?.employeeID ? 'employee' : 'customer'
                  )}
                  className="p-2 rounded-xl bg-amber-100 text-amber-600 hover:bg-amber-200 shadow-sm"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  layoutId={`resetPassword-account-${account?.employeeID ? `employee-${account.employeeID}` : `customer-${account?.customerID}`}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  }}
                >
                  <Lock size={18} />
                </motion.button>

                {!shouldHideEditAndLockButtons() && (
                  <motion.button
                    onClick={() => onDisable(
                      account?.employeeID ? account.employeeID : account?.customerID,
                      account?.employeeID ? 'employee' : 'customer'
                    )}
                    className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 shadow-sm"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                    }}
                  >
                    <XCircle size={18} />
                  </motion.button>
                )}
              </>
            )}
          </AnimatePresence>

          {/* Unlock button - chỉ hiện khi bị disabled */}
          <AnimatePresence>
            {isDisabled(account) && (
              <motion.button
                onClick={() => onDisable(
                  account?.employeeID ? account.employeeID : account?.customerID,
                  account?.employeeID ? 'employee' : 'customer'
                )}
                className="p-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.2,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
              >
                <Unlock size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </td>
    </motion.tr>
  );
});

AccountListItem.displayName = 'AccountListItem';

export default AccountListItem;