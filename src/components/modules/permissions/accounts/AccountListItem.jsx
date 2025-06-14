
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Eye, Lock, XCircle, CheckCircle, User, Users, Settings, Unlock } from 'lucide-react';

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

  // Hàm chọn màu nền cho avatar dựa trên ID và trạng thái
  const getAvatarColor = (id, disabled = false) => {
    if (disabled) {
      return 'bg-gray-400';
    }
    
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
      className={`relative ${
        account.disabled ? "bg-gray-50/50" : "hover:bg-gray-50"
      }`}
    >
      {/* User info */}
      <td className="px-6 py-4 whitespace-nowrap relative">
        <motion.div
          className="flex items-center"
          animate={{
            opacity: account.disabled ? 0.4 : 1,
            filter: account.disabled ? "grayscale(0.8)" : "grayscale(0)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getAvatarColor(
              account.id,
              account.disabled
            )}`}
            animate={{
              scale: account.disabled ? 0.95 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {getInitials(account.name)}
          </motion.div>
          <div className="ml-4">
            <motion.div
              className="text-sm font-medium"
              animate={{
                color: account.disabled ? "#6b7280" : "#111827",
              }}
              transition={{ duration: 0.5 }}
            >
              {account.name}
            </motion.div>
            <motion.div
              className="text-sm"
              animate={{
                color: account.disabled ? "#9ca3af" : "#6b7280",
              }}
              transition={{ duration: 0.5 }}
            >
              {account.email}
            </motion.div>
          </div>
        </motion.div>
      </td>

      {/* Account type */}
      <td className="px-6 py-4 whitespace-nowrap">
        <motion.div
          className="flex items-center"
          animate={{
            opacity: account.disabled ? 0.4 : 1,
            filter: account.disabled ? "grayscale(0.8)" : "grayscale(0)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {account.type === "customer" ? (
            <span
              className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-2xl items-center gap-1 shadow-sm ${
                account.disabled
                  ? "bg-gray-100 text-gray-600"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              <Users size={14} /> Khách hàng
            </span>
          ) : (
            <span
              className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-2xl items-center gap-1 shadow-sm ${
                account.disabled
                  ? "bg-gray-100 text-gray-600"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              <Settings size={14} /> Nhân viên
            </span>
          )}
        </motion.div>
      </td>

      {/* Role */}
      <td className="px-6 py-4 whitespace-nowrap">
        <motion.div
          className="text-sm"
          animate={{
            color: account.disabled ? "#6b7280" : "#111827",
            opacity: account.disabled ? 0.4 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          {account.role.name}
        </motion.div>
      </td>

      {/* SĐT */}
      <td className="px-6 py-4 whitespace-nowrap">
        <motion.div
          className="text-sm"
          animate={{
            color: account.disabled ? "#6b7280" : "#111827",
            opacity: account.disabled ? 0.4 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          {account.phone}
        </motion.div>
      </td>

      {/* Status - Luôn giữ màu */}
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

      {/* Actions - ẩn khi disabled */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
        {!account.disabled && (
          <motion.div
            className="flex justify-end gap-2"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => onView(account.id)}
              className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              layoutId={`detail-account-${account.id}`}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
            >
              <Eye size={18} />
            </motion.button>

            <motion.button
              onClick={() => onEdit(account.id)}
              className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              layoutId={`edit-account-${account.id}`}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
            >
              <Edit2 size={18} />
            </motion.button>

            <motion.button
              onClick={() => onResetPassword(account.id)}
              className="p-2 rounded-xl bg-amber-100 text-amber-600 hover:bg-amber-200 shadow-sm"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              layoutId={`resetPassword-account-${account.id}`}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
            >
              <Lock size={18} />
            </motion.button>

            <motion.button
              onClick={() => onDisable(account.id)}
              className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 shadow-sm"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <XCircle size={18} />
            </motion.button>
          </motion.div>
        )}

        {/* Glass overlay for disabled state - chỉ hiện ở cột actions */}
        <AnimatePresence>
          {account.disabled && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="flex gap-2">
                {/* View button with glass effect */}
                <motion.button
                  onClick={() => onView(account.id)}
                  className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  layoutId={`detail-account-${account.id}`}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  }}
                >
                  <Eye size={18} />
                </motion.button>

                {/* Unlock button with glass effect */}
                <motion.button
                  onClick={() => onDisable(account.id)}
                  className="p-2 rounded-xl bg-green-400/30 backdrop-blur-md text-emerald-700 hover:bg-emerald-500/40 transition-all duration-100"
                  whileHover={{
                    scale: 1.12,
                    boxShadow: "0 4px 20px rgba(16,185,129,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Unlock size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </td>
    </motion.tr>
  );
};
export default AccountListItem; 