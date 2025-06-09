
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  PiggyBank, 
  Users, 
  UserCog, 
  Package, 
  BarChart3, 
  Settings, 
  Shield,
  Star,
  Zap,
  Crown,
  Gem
} from 'lucide-react';

const PermissionDetailModal = ({ isOpen, onClose, permission }) => {
  if (!isOpen || !permission) return null;

  // Mapping icons cho từng quyền hạn cụ thể
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

  // Định nghĩa màu sắc cho từng quyền hạn
  const getCardColors = (permissionId, type) => {
    if (type === 'customer') {
      const customerColors = {
        'perm1': {
          primary: '#10b981', // emerald
          secondary: '#06d6a0',
          dark: '#047857',
          accent: '#6ee7b7',
          light: '#d1fae5'
        },
        'perm2': {
          primary: '#3b82f6', // blue
          secondary: '#8b5cf6',
          dark: '#1e40af',
          accent: '#93c5fd',
          light: '#dbeafe'
        }
      };
      return customerColors[permissionId] || customerColors['perm1'];
    } else {
      const staffColors = {
        'perm4': {
          primary: '#f59e0b', // amber
          secondary: '#ef4444',
          dark: '#d97706',
          accent: '#fbbf24',
          light: '#fef3c7'
        },
        'perm5': {
          primary: '#8b5cf6', // purple
          secondary: '#3b82f6',
          dark: '#7c3aed',
          accent: '#c4b5fd',
          light: '#ede9fe'
        },
        'perm7': {
          primary: '#f59e0b', // yellow
          secondary: '#fb923c',
          dark: '#d97706',
          accent: '#fed7aa',
          light: '#fef3c7'
        },
        'perm8': {
          primary: '#14b8a6', // teal
          secondary: '#06b6d4',
          dark: '#0f766e',
          accent: '#7dd3fc',
          light: '#ccfbf1'
        },
        'perm9': {
          primary: '#6b7280', // gray
          secondary: '#64748b',
          dark: '#4b5563',
          accent: '#d1d5db',
          light: '#f3f4f6'
        },
        'perm10': {
          primary: '#ef4444', // red
          secondary: '#ec4899',
          dark: '#dc2626',
          accent: '#fca5a5',
          light: '#fee2e2'
        }
      };
      return staffColors[permissionId] || staffColors['perm4'];
    }
  };

    // Hàm lấy đường dẫn ảnh cho từng quyền hạn
  const getPermissionImage = (permissionId) => {
    const imageMap = {
      perm1: "/images/payment.png",
      perm2: "/images/saving.png",
      perm4: "/images/customer-savingAccount.png",
      perm5: "/images/employee-management.png",
      perm7: "/images/saving-product.png",
      perm8: "/images/sale.png",
      perm9: "/images/settings.png",
      perm10: "/images/permission-removebg.png",
    };

    return imageMap[permissionId] || "/images/shield.png";
  };

  // Hàm tạo box shadow theo màu của từng quyền hạn
  const getPermissionBoxShadow = (permissionId, type, isHover = false) => {
    const colors = getCardColors(permissionId, type);

    // Chuyển hex sang rgba
    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const primaryRgba = hexToRgba(colors.primary, isHover ? 0.3 : 0.2);
    const primaryRgba2 = hexToRgba(colors.primary, isHover ? 0.15 : 0.1);
    const primaryRgba3 = hexToRgba(colors.primary, isHover ? 0.08 : 0.05);

    return `
      0 0 ${isHover ? "30px" : "20px"} ${primaryRgba},
      0 0 ${isHover ? "50px" : "40px"} ${primaryRgba2},
      0 0 ${isHover ? "80px" : "60px"} ${primaryRgba3},
      0 ${isHover ? "20px 48px" : "16px 40px"} rgba(0,0,0,${
      isHover ? "0.15" : "0.1"
    }),
      0 ${isHover ? "12px 20px" : "8px 16px"} rgba(0,0,0,${
      isHover ? "0.08" : "0.05"
    }),
      inset 0 2px 0 rgba(255,255,255,${isHover ? "0.3" : "0.2"})
    `;
  };

  const colors = getCardColors(permission.id, permission.type);
  const IconComponent = getPermissionIcon(permission.id);
  const rarity = permission.type === 'customer' ? 'Epic' : 'Legendary';
  const cost = permission.functions ? permission.functions.length * 10 : 50;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative backdrop-blur-sm w-96 max-h-[90vh] cursor-auto overflow-hidden"
            style={{
              background: `linear-gradient(145deg, 
                rgba(255,255,255,0.88) 10%, 
                rgba(248,250,252,0.85) 30%, 
                rgba(241,245,249,0.85) 100%
              )`,
              border: `2px solid ${colors.primary}40`,
              borderRadius: "24px",
              boxShadow: `
                0 32px 64px rgba(15, 23, 42, 0.2),
                inset 0 1px 0 rgba(255,255,255,0.9),
                inset 0 -1px 0 rgba(0,0,0,0.05)
              `,
            }}
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{
              duration: 0.4,
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Icon - Large and Faded */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div
                className="opacity-[0.09] transform scale-[4] translate-y-8 translate-x-20"
                style={{ color: colors.primary }}
              >
                <IconComponent size={120} strokeWidth={1} />
              </div>
            </div>

            {/* Animated Border Gradient */}
            <motion.div
              className="absolute inset-0 rounded-[24px] opacity-40 pointer-events-none"
              style={{
                background: `conic-gradient(from 0deg, ${colors.primary}40, transparent, ${colors.secondary}40, transparent, ${colors.primary}40)`,
                padding: "2px",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Rarity Gem */}
            <motion.div
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
              animate={{
                rotate: [0, 360],
                y: [0, -2, 0],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  boxShadow: `0 8px 32px ${colors.primary}60, 0 0 20px ${colors.primary}40`,
                }}
              >
                <Gem size={20} className="text-white drop-shadow-lg" />
              </div>
            </motion.div>

            {/* Enhanced Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/60 flex items-center justify-center z-30 shadow-xl"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(239,68,68,0.1)",
                borderColor: "#ef4444",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <X size={18} className="text-gray-600" />
            </motion.button>

            {/* Header Section */}
            <div className="relative p-8 text-center border-b border-gray-200/40">
              {/* Cost Badge */}
              <motion.div
                className="absolute top-6 left-6 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xl backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    boxShadow: `0 4px 16px ${colors.primary}40`,
                  }}
                >
                  {Math.floor(cost / 10)}
                </div>
                <Crown
                  size={18}
                  style={{ color: colors.primary }}
                  className="drop-shadow-sm"
                />
              </motion.div>

              {/* Rarity Badge */}
              <motion.div
                className="absolute top-6 right-16 flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm"
                style={{
                  background: `linear-gradient(90deg, ${colors.light}80, ${colors.primary}20)`,
                  border: `1px solid ${colors.primary}30`,
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Star size={14} style={{ color: colors.primary }} />
              </motion.div>

              {/* Enhanced Icon Section */}
              <motion.div
                className="relative mx-auto w-40 h-36 rounded-3xl flex items-center justify-center mt-6 mb-6"
                style={{
                  backgroundImage: `url(${getPermissionImage(permission.id)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center -13px",
                  backgroundRepeat: "no-repeat",
                  boxShadow: getPermissionBoxShadow(
                    permission.id,
                    permission.type
                  ),
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -3, 3, 0],
                  boxShadow: getPermissionBoxShadow(
                    permission.id,
                    permission.type,
                    true
                  ),
                }}
                transition={{ duration: 0.3 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
              >
                {/* Inner subtle glow overlay */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                  }}
                />

                {/* Enhanced Sparkle Effects */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-4 h-4 ${
                      i === 0
                        ? "-top-2 -right-2"
                        : i === 1
                        ? "-bottom-2 -left-2"
                        : "top-2 -left-3"
                    }`}
                    style={{
                      color: colors.accent,
                      filter: `drop-shadow(0 0 4px rgba(255, 215, 0, 0.5))`,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap size={16} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced Title */}
              <motion.h2
                className="text-2xl uppercase font-bold text-gray-600 mb-3 drop-shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {permission.name}
              </motion.h2>

              {/* Enhanced Type Badge */}
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${colors.light}60, ${colors.primary}20)`,
                  border: `1px solid ${colors.primary}40`,
                  color: colors.dark,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg">
                  {permission.type === "customer" ? "👤" : "👨‍💼"}
                </span>
                <span className="font-bold">
                  {permission.type === "customer" ? "Khách hàng" : "Nhân viên"}
                </span>
              </motion.div>
            </div>

            {/* Enhanced Abilities Section with Scroll */}
            <div className="flex flex-col h-80">
              <div className="py-0 p-6 pb-0">
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    <Zap size={16} className="text-white" />
                  </div>
                  <h3 className="text-gray-800 font-bold text-lg tracking-wide">
                    CHỨC NĂNG
                  </h3>
                </motion.div>
              </div>

              {/* Scrollable Functions List */}
              <div className="flex-1 px-6 pb-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-3">
                  {permission.functions &&
                    permission.functions.map((func, index) => (
                      <motion.div
                        key={index}
                        className="group flex items-center gap-4 p-4 rounded-xl text-sm shadow-sm backdrop-blur-sm cursor-pointer"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.35))",
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{
                          x: 8,
                          scale: 1.02,
                          backgroundColor: `${colors.primary}08`,
                          borderColor: `${colors.primary}30`,
                        }}
                      >
                        <motion.div
                          className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                          style={{ backgroundColor: colors.primary }}
                          whileHover={{ scale: 1.2 }}
                        />
                        <span className="text-gray-700 flex-1 font-medium group-hover:text-gray-800 transition-colors">
                          {func}
                        </span>
                        <motion.div
                          className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        >
                          <Zap size={12} style={{ color: colors.primary }} />
                        </motion.div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>

            {/* Enhanced Footer Stats */}
            <motion.div
              className="p-6 border-t border-gray-200/40 backdrop-blur-sm md:hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.light}40, rgba(255,255,255,0.6))`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex justify-between items-center">
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm"
                  style={{ backgroundColor: `${colors.primary}10` }}
                >
                  <Star size={14} style={{ color: colors.primary }} />
                  <span className="text-sm font-medium text-gray-700">
                    ID: {permission.id}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm"
                  style={{ backgroundColor: `${colors.primary}10` }}
                >
                  <Zap size={14} style={{ color: colors.primary }} />
                  <span className="text-sm font-medium text-gray-700">
                    {permission.functions ? permission.functions.length : 0}{" "}
                    chức năng
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-[24px]">
              {/* Floating particles with better animation */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    left: `${15 + i * 10}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    opacity: 0.4,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i) * 10, 0],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Enhanced Holographic overlay */}
            <motion.div
              className="absolute inset-0 rounded-[24px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 60%, transparent 80%)",
                opacity: 0.6,
              }}
              animate={{
                background: [
                  "linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 60%, transparent 80%)",
                  "linear-gradient(225deg, transparent 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 60%, transparent 80%)",
                  "linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 60%, transparent 80%)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PermissionDetailModal;