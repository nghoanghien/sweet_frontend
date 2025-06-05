import React, { useState } from 'react';
import { User, Calendar, CreditCard, Phone, Mail, Eye, EyeOff, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerInfoCard = ({ info }) => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const customerData = [
    {
      label: 'Họ tên',
      value: info?.fullName || '-',
      icon: User,
      sensitive: true
    },
    {
      label: 'Ngày sinh',
      value: info?.birthDate || '-',
      icon: Calendar,
      sensitive: false
    },
    {
      label: 'Số CCCD',
      value: info?.idNumber || '-',
      icon: CreditCard,
      sensitive: true
    },
    {
      label: 'Số điện thoại',
      value: info?.phone || '-',
      icon: Phone,
      sensitive: true
    },
    {
      label: 'Email',
      value: info?.email || '-',
      icon: Mail,
      sensitive: true,
      fullWidth: true
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative group"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-indigo-200/40 to-purple-300/40 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl border border-purple-200/50 rounded-3xl p-6 shadow-lg">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Thông tin khách hàng
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Sparkles size={16} className="text-purple-500" />
                </motion.div>
              </h4>
              <p className="text-sm text-gray-600">Thông tin cá nhân của khách hàng</p>
            </div>
          </div>
          
          <motion.button
            onClick={toggleVisibility}
            className="p-3 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isHidden ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isHidden ? 
                <Eye size={18} className="text-purple-700" /> : 
                <EyeOff size={18} className="text-purple-700" />
              }
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Customer Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {customerData.map((item, index) => {
            const IconComponent = item.icon;
            const shouldHide = isHidden && item.sensitive;
            
            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className={`relative group/item p-4 rounded-2xl border-2 border-gray-200/50 bg-gradient-to-br from-white/80 to-gray-50/50 hover:from-purple-50/80 hover:to-pink-50/50 hover:border-purple-200/50 transition-all duration-300 shadow-sm hover:shadow-md ${
                  item.fullWidth ? 'sm:col-span-2' : ''
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-sm group-hover/item:shadow-md transition-all duration-300">
                    <IconComponent size={14} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                      {item.label}
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={shouldHide ? 'hidden' : 'visible'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-bold text-gray-800 break-words"
                      >
                        {shouldHide ? '••••••••••' : item.value}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover/item:from-purple-500/5 group-hover/item:to-pink-500/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Privacy Notice */}
        <motion.div
          variants={itemVariants}
          className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                <Sparkles size={12} className="text-white" />
              </motion.div>
            </div>
            <div>
              <h6 className="font-bold text-purple-800 mb-1 text-sm">Bảo mật thông tin</h6>
              <p className="text-xs text-purple-700 leading-relaxed">
                Thông tin khách hàng được bảo mật theo tiêu chuẩn ngân hàng. 
                Chỉ nhân viên có thẩm quyền mới được truy cập.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CustomerInfoCard;