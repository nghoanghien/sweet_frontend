import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  PiggyBank, 
  Users, 
  UserCog, 
  Package, 
  BarChart3, 
  Settings, 
  Shield,
  ChevronRight 
} from 'lucide-react';

const PermissionCard = ({ permission, onClick }) => {
  // Mapping icons cho từng quyền hạn cụ thể
  const getPermissionIcon = (permissionId, type) => {
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
    
    const IconComponent = iconMap[permissionId] || Shield;
    return <IconComponent size={32} className="drop-shadow-lg" />;
  };

  // Định nghĩa màu sắc cho từng quyền hạn
  const getCardColors = (permissionId, type) => {
    if (type === 'customer') {
      const customerColors = {
        'perm1': {
          gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
          border: 'border-emerald-300',
          glow: 'shadow-[0_0_30px_rgba(16,185,129,0.4)]',
          icon: 'text-white',
          accent: 'bg-emerald-100',
          primary: '#10b981', // emerald
        },
        'perm2': {
          gradient: 'from-blue-400 via-indigo-500 to-purple-600',
          border: 'border-blue-300',
          glow: 'shadow-[0_0_30px_rgba(59,130,246,0.4)]',
          icon: 'text-white',
          accent: 'bg-blue-100',
          primary: '#3b82f6', // blue
        }
      };
      return customerColors[permissionId] || customerColors['perm1'];
    } else {
      const staffColors = {
        'perm4': {
          gradient: 'from-orange-400 via-red-500 to-pink-600',
          border: 'border-orange-300',
          glow: 'shadow-[0_0_30px_rgba(251,146,60,0.4)]',
          icon: 'text-white',
          accent: 'bg-orange-100',
          primary: '#f59e0b', // amber
        },
        'perm5': {
          gradient: 'from-purple-400 via-violet-500 to-indigo-600',
          border: 'border-purple-300',
          glow: 'shadow-[0_0_30px_rgba(168,85,247,0.4)]',
          icon: 'text-white',
          accent: 'bg-purple-100',
          primary: '#8b5cf6', // purple
        },
        'perm7': {
          gradient: 'from-yellow-400 via-amber-500 to-orange-600',
          border: 'border-yellow-300',
          glow: 'shadow-[0_0_30px_rgba(251,191,36,0.4)]',
          icon: 'text-white',
          accent: 'bg-yellow-100',
          primary: '#f59e0b', // yellow
        },
        'perm8': {
          gradient: 'from-teal-400 via-cyan-500 to-blue-600',
          border: 'border-teal-300',
          glow: 'shadow-[0_0_30px_rgba(20,184,166,0.4)]',
          icon: 'text-white',
          accent: 'bg-teal-100',
          primary: '#14b8a6', // teal
        },
        'perm9': {
          gradient: 'from-gray-400 via-slate-500 to-gray-600',
          border: 'border-gray-300',
          glow: 'shadow-[0_0_30px_rgba(107,114,128,0.4)]',
          icon: 'text-white',
          accent: 'bg-gray-100',
          primary: '#6b7280', // gray
        },
        'perm10': {
          gradient: 'from-rose-400 via-pink-500 to-red-600',
          border: 'border-rose-300',
          glow: 'shadow-[0_0_30px_rgba(251,113,133,0.4)]',
          icon: 'text-white',
          accent: 'bg-rose-100',
          primary: '#ef4444', // red
        }
      };
      return staffColors[permissionId] || staffColors['perm4'];
    }
  };

  const colors = getCardColors(permission.id, permission.type);

  return (
    <motion.div
      onClick={onClick}
      className={`
        relative bg-gradient-to-br from-amber-50/90 via-yellow-50/80 to-orange-50/90
        rounded-2xl cursor-pointer transition-all duration-300
        border-4 ${colors.border}
        shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        hover:${colors.glow}
        overflow-hidden
        backdrop-blur-sm
      `}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="opacity-[0.11] transform scale-[7] md:scale-[9] translate-y-12 translate-x-20"
          style={{ color: colors.primary }}
        >
          {getPermissionIcon(permission.id, permission.type)}
        </div>
      </div>

      {/* Decorative border effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-20 rounded-xl`}
      />

      {/* Corner ornaments */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-amber-400 rounded-tl-lg opacity-60" />
      <div className="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-amber-400 rounded-tr-lg opacity-60" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-amber-400 rounded-bl-lg opacity-60" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-amber-400 rounded-br-lg opacity-60" />

      {/* Main content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          {/* Icon section */}
          <motion.div
            className={`
              p-4 rounded-2xl bg-gradient-to-br ${colors.gradient}
              shadow-[0_4px_20px_rgba(0,0,0,0.25)]
              border-3 border-white/30
              ${colors.icon}
            `}
            whileHover={{
              rotate: [0, -10, 10, -5, 0],
              scale: 1.1,
            }}
            transition={{ duration: 0.5 }}
          >
            {getPermissionIcon(permission.id, permission.type)}
          </motion.div>

          {/* Type badge */}
          <div className="flex items-center gap-2">
            <motion.span
              className={`
                px-4 py-2 rounded-full text-sm font-bold
                bg-gradient-to-r ${colors.gradient} text-white
                shadow-[0_4px_15px_rgba(0,0,0,0.2)]
                border-2 border-white/20
              `}
              whileHover={{ scale: 1.05 }}
            >
              {permission.type === "customer"
                ? "👤 Khách hàng"
                : "👨‍💼 Nhân viên"}
            </motion.span>
            <ChevronRight size={24} className="text-amber-600" />
          </div>
        </div>

        {/* Title and description */}
        <div className="mb-4">
          <h3 className="font-bold text-xl text-gray-800 mb-2 drop-shadow-sm">
            {permission.name}
          </h3>
          <p className="text-sm text-gray-600 italic leading-relaxed">
            {permission.description}
          </p>
        </div>

        {/* Functions tags */}
        <div className="flex flex-wrap gap-2">
          {permission.functions &&
            permission.functions.slice(0, 3).map((func, index) => (
              <motion.span
                key={index}
                className={`
                px-3 py-1.5 text-xs font-semibold rounded-lg
                bg-gradient-to-r from-amber-100 to-yellow-100
                text-amber-800 border border-amber-200
                shadow-[0_2px_8px_rgba(0,0,0,0.1)]
              `}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#fef3c7",
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {func}
              </motion.span>
            ))}
          {permission.functions && permission.functions.length > 3 && (
            <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600 border border-gray-200">
              +{permission.functions.length - 3} khác
            </span>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full opacity-20" />
        <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-br from-orange-300 to-red-400 rounded-full opacity-15" />
      </div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 rounded-xl pointer-events-none" />
    </motion.div>
  );
};

export default PermissionCard;