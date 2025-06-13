import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCheck, 
  Users, 
  Shield, 
  Edit2, 
  Trash2, 
  CreditCard, 
  PiggyBank, 
  UserCog, 
  Package, 
  BarChart3, 
  Settings,
  ChevronDown,
  ChevronUp 
} from 'lucide-react';

const RoleCard = ({ role, onEdit, onDelete, isSystemRole = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Hàm chọn icon dựa trên loại vai trò
  const getRoleIcon = (roleType) => {
    switch (roleType) {
      case 'customer':
        return <Users className="text-emerald-600" size={24} />;
      case 'staff':
        return <UserCheck className="text-violet-600" size={24} />;
      default:
        return <UserCheck className="text-gray-500" size={24} />;
    }
  };

  // Hàm chọn icon cho quyền hạn
  const getPermissionIcon = (permissionId) => {
    const iconMap = {
      'perm1': CreditCard,
      'perm2': PiggyBank,
      'perm4': Users,
      'perm5': UserCog,
      'perm7': Package,
      'perm8': BarChart3,
      'perm9': Settings,
      'perm10': Shield
    };
   
    return iconMap[permissionId] || Shield;
  };

  // Hàm lấy style cho quyền hạn dựa trên loại vai trò
  const getPermissionStyle = (roleType) => {
    if (roleType === 'customer') {
      return {
        container: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200/50 text-emerald-700",
        icon: "text-emerald-600",
        hover: "hover:from-emerald-100 hover:to-teal-100 hover:border-emerald-300"
      };
    } else {
      return {
        container: "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200/50 text-violet-700",
        icon: "text-violet-600", 
        hover: "hover:from-violet-100 hover:to-purple-100 hover:border-violet-300"
      };
    }
  };

  // Hàm lấy style cho card dựa trên loại vai trò
  const getCardStyle = (roleType) => {
    if (roleType === 'customer') {
      return {
        gradient: "from-emerald-50/90 via-teal-50/50 to-white",
        border: "border-emerald-200/60",
        iconBg: "bg-emerald-100/70",
        shadow: "shadow-[0_4px_25px_rgba(16,185,129,0.12)]",
        hoverShadow: "0 8px 35px rgba(16,185,129,0.18)"
      };
    } else {
      return {
        gradient: "from-violet-50/90 via-purple-50/50 to-white",
        border: "border-violet-200/60", 
        iconBg: "bg-violet-100/70",
        shadow: "shadow-[0_4px_25px_rgba(139,92,246,0.12)]",
        hoverShadow: "0 8px 35px rgba(139,92,246,0.18)"
      };
    }
  };

  const cardStyle = getCardStyle(role.type);
  const permissionStyle = getPermissionStyle(role.type);
  const visiblePermissions = role.permissions.slice(0, 2);
  const hiddenPermissions = role.permissions.slice(2);
  const hasHiddenPermissions = hiddenPermissions.length > 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
      className={`bg-gradient-to-br ${cardStyle.gradient} rounded-2xl ${cardStyle.shadow} p-6 border-2 ${cardStyle.border} relative`}
      whileHover={{
        scale: 1.02,
        boxShadow: cardStyle.hoverShadow,
      }}
      layoutId={`role-card-${role.id}`}
      transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
    >
      {/* Background icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="opacity-[0.08] transform scale-[6] translate-y-16 translate-x-24">
          {getRoleIcon(role.type)}
        </div>
      </div>

      {/* System role badge */}
      {isSystemRole && (
        <motion.span 
          className="absolute top-3 right-3 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-2xl text-xs font-semibold shadow-sm border border-amber-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hệ thống
        </motion.span>
      )}

      {/* Header */}
      <div className="flex items-center mb-4">
        <motion.div
          className={`mr-5 p-3 rounded-2xl ${cardStyle.iconBg} shadow-sm`}
          whileHover={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ duration: 0.2 }}
        >
          {getRoleIcon(role.type)}
        </motion.div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate max-w-[180px]">
            {role.name}
          </h3>
          <p className="text-sm text-gray-500 italic max-w-[220px] line-clamp-2">
            {role.description}
          </p>
        </div>
      </div>

      {/* Permission badges */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-3 font-medium">Quyền hạn:</p>
        
        {role.permissions.length === 0 ? (
          <span className="text-xs text-gray-400 italic">
            Không có quyền hạn
          </span>
        ) : (
          <div className="space-y-2">
            {/* Always visible permissions */}
            <div className="flex flex-wrap gap-2">
              {visiblePermissions.map((permission) => {
                const IconComponent = getPermissionIcon(permission.id);
                return (
                  <motion.div
                    key={permission.id}
                    className={`flex items-center px-3 py-2 ${permissionStyle.container} rounded-xl text-xs font-semibold border transition-all duration-200 ${permissionStyle.hover}`}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <IconComponent size={14} className={`mr-1.5 ${permissionStyle.icon}`} />
                    {permission.name}
                  </motion.div>
                );
              })}
              
              {/* Expand/Collapse button */}
              {hasHiddenPermissions && (
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`flex items-center px-3 py-2 ${permissionStyle.container} rounded-xl text-xs font-semibold border transition-all duration-200 ${permissionStyle.hover} cursor-pointer`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={14} className={`mr-1 ${permissionStyle.icon}`} />
                      Thu gọn
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} className={`mr-1 ${permissionStyle.icon}`} />
                      +{hiddenPermissions.length} khác
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {/* Expandable permissions */}
            <AnimatePresence>
              {isExpanded && hasHiddenPermissions && (
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {hiddenPermissions.map((permission, index) => {
                    const IconComponent = getPermissionIcon(permission.id);
                    return (
                      <motion.div
                        key={permission.id}
                        className={`flex items-center px-3 py-2 ${permissionStyle.container} rounded-xl text-xs font-semibold border transition-all duration-200 ${permissionStyle.hover}`}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <IconComponent size={14} className={`mr-1.5 ${permissionStyle.icon}`} />
                        {permission.name}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer */}
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
              className={`p-2 rounded-xl ${role.type === 'customer' ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' : 'bg-violet-100 text-violet-600 hover:bg-violet-200'} shadow-sm transition-colors duration-200`}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <Edit2 size={18} />
            </motion.button>
            <motion.button
              onClick={() => onDelete(role.id)}
              className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 shadow-sm transition-colors duration-200"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              layoutId={`delete-role-${role.id}`}
              transition={{
                layout: {
                  type: "spring",
                  damping: 16,
                  stiffness: 100,
                }
              }}
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
          
        )}
      </div>
    </motion.div>
    </AnimatePresence>
  );
};

export default RoleCard;