import React, { useState } from 'react';
import { Eye, EyeOff, Wallet, Calendar, TrendingUp, CreditCard, Settings, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../../utils/accountUtils';
import CustomerInfoCard from './CustomerInfoCard';

const DetailInfo = ({ 
  account, 
  showCustomerInfo = false, 
  customerInfo = null 
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  // Data sections with enhanced styling
  const depositInfoItems = [
    { 
      label: 'Số tiền gốc', 
      value: formatCurrency(account.amount), 
      color: 'text-blue-600',
      icon: <Wallet size={14} className="text-blue-500" />
    },
    { 
      label: 'Kỳ hạn', 
      value: account.term, 
      color: 'text-gray-700',
      icon: <Calendar size={14} className="text-gray-500" />
    },
    { 
      label: 'Lãi suất', 
      value: `${account.interestRate}%/năm`, 
      color: 'text-green-600',
      icon: <TrendingUp size={14} className="text-green-500" />
    },
    { 
      label: 'Ngày đáo hạn', 
      value: account.endDate, 
      color: 'text-gray-700',
      icon: <Calendar size={14} className="text-gray-500" />
    },
    { 
      label: 'Tiền lãi đã nhận', 
      value: formatCurrency(account.receivedInterest), 
      color: 'text-emerald-600',
      icon: <TrendingUp size={14} className="text-emerald-500" />
    },
    { 
      label: 'Số dư còn lại', 
      value: formatCurrency(account.remainingAmount), 
      color: 'text-indigo-700',
      icon: <Wallet size={14} className="text-indigo-500" />
    },
    { 
      label: 'Tổng tiền bạn sẽ nhận', 
      value: formatCurrency(account.totalReceivable), 
      color: 'text-pink-600',
      icon: <Sparkles size={14} className="text-pink-500" />,
      highlight: true
    }
  ];

  const accountInfoItems = [
    { 
      label: 'Số tài khoản', 
      value: account.accountNumber, 
      color: 'text-gray-700',
      icon: <CreditCard size={14} className="text-gray-500" />
    },
    { 
      label: 'Loại tiết kiệm', 
      value: account.depositType, 
      color: 'text-blue-600',
      icon: <Settings size={14} className="text-blue-500" />
    },
    { 
      label: 'Tần suất nhận lãi', 
      value: account.interestFrequency, 
      color: 'text-gray-700',
      icon: <Calendar size={14} className="text-gray-500" />
    },
    { 
      label: 'Hình thức đáo hạn', 
      value: account.maturityOption, 
      color: 'text-gray-700',
      icon: <Settings size={14} className="text-gray-500" />
    },
    { 
      label: 'Tên gợi nhớ', 
      value: account.nickname, 
      color: 'text-purple-600',
      icon: <Sparkles size={14} className="text-purple-500" />
    }
  ];

  const InfoCard = ({ title, items, gradientFrom, gradientTo, borderColor, iconBg, titleIcon }) => (
    <motion.div
      variants={itemVariants}
      className="relative group mb-6"
    >
      {/* Background blur effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
      
      {/* Main card */}
      <div className={`relative bg-white/90 backdrop-blur-xl border ${borderColor} rounded-3xl p-6 shadow-lg`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${iconBg} rounded-2xl flex items-center justify-center`}>
              {titleIcon}
            </div>
            <h4 className="text-xl font-bold text-gray-800">{title}</h4>
          </div>
          
          <motion.button
            onClick={toggleVisibility}
            className="p-3 rounded-2xl bg-gray-100/80 hover:bg-gray-200/80 transition-all duration-300 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isHidden ? 'hidden' : 'visible'}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {isHidden ? 
                  <Eye size={18} className="text-gray-600" /> : 
                  <EyeOff size={18} className="text-gray-600" />
                }
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Content */}
        <div className="space-y-1">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              className={`flex justify-between items-center py-3 px-4 rounded-2xl transition-all duration-300 ${
                item.highlight 
                  ? 'bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 shadow-sm' 
                  : 'bg-gray-50/50 hover:bg-gray-100/50'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-gray-600 font-medium text-sm">{item.label}</span>
              </div>
              <motion.span 
                className={`font-bold text-sm ${item.color} ${item.highlight ? 'text-base' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isHidden ? 'hidden' : 'visible'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isHidden ? "••••••••" : item.value}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative pb-40 md:pb-0">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-2xl pointer-events-none"></div>

      <motion.div 
        className="py-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Deposit Information Card */}
        <InfoCard
          title="Thông tin tiền gửi"
          items={depositInfoItems}
          gradientFrom="from-blue-200/30"
          gradientTo="to-indigo-200/30"
          borderColor="border-blue-200/50"
          iconBg="bg-gradient-to-br from-blue-500 to-indigo-600"
          titleIcon={<Wallet size={20} className="text-white" />}
        />

        {/* Account Information Card */}
        <InfoCard
          title="Thông tin tài khoản"
          items={accountInfoItems}
          gradientFrom="from-purple-200/30"
          gradientTo="to-pink-200/30"
          borderColor="border-purple-200/50"
          iconBg="bg-gradient-to-br from-purple-500 to-pink-600"
          titleIcon={<CreditCard size={20} className="text-white" />}
        />

        {/* Customer Information Card */}
        <AnimatePresence>
          {showCustomerInfo && customerInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <CustomerInfoCard info={customerInfo} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DetailInfo;