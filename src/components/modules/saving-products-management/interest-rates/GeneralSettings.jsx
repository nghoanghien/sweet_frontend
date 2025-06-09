import React from 'react';
import { DollarSign, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import NumberInput from '@/components/ui/custom/NumberInput';

const GeneralSettings = ({
  minimumDeposit,
  noTermRate,
  onMinimumDepositChange,
  onNoTermRateChange,
  highlightChanges = {},
  readOnly = false,
  errors = {}
}) => {
  // Format currency (VND)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Minimum Deposit Amount */}
      <motion.div
        className={`bg-gradient-to-br from-blue-50/80 to-white p-6 rounded-2xl border shadow-[0_4px_24px_rgba(0,170,255,0.08)] 
          ${errors.minimumDeposit ? 'border-red-300 bg-red-50' :
            highlightChanges.minimumDeposit ? 'border-green-300 bg-green-50' : 'border-blue-100'}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-base font-semibold text-blue-800 mb-3 flex items-center">
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2, repeatType: 'loop' }}
            className="mr-2"
          >
            <DollarSign size={20} className="text-blue-500" />
          </motion.span>
          Số tiền gửi tối thiểu
        </h3>
        
        <div className="flex items-center space-x-4">
          {readOnly ? (
            <div className={`text-lg font-semibold ${highlightChanges.minimumDeposit ? 'text-green-600' : 'text-gray-800'}`}>
              {formatCurrency(minimumDeposit)}
            </div>
          ) : (
            <NumberInput
              value={minimumDeposit}
              onChange={onMinimumDepositChange}
              suffix="VNĐ"
              min={0}
              step={100000}
              allowDecimal={false}
              error={errors.minimumDeposit}
              highlightChange={highlightChanges.minimumDeposit}
              placeholder="Nhập số tiền gửi tối thiểu"
            />
          )}
        </div>
        
        {!readOnly && !errors.minimumDeposit && (
          <p className="mt-2 text-xs text-gray-500">
            Số tiền tối thiểu khách hàng cần gửi để mở tài khoản tiết kiệm
          </p>
        )}
      </motion.div>
      
      {/* No-term Interest Rate */}
      <motion.div
        className={`bg-gradient-to-br from-blue-50/80 to-white p-6 rounded-2xl border shadow-[0_4px_24px_rgba(0,170,255,0.08)] 
          ${errors.noTermRate ? 'border-red-300 bg-red-50' :
            highlightChanges.noTermRate ? 'border-green-300 bg-green-50' : 'border-blue-100'}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3 className="text-base font-semibold text-blue-800 mb-3 flex items-center">
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, repeatType: 'loop' }}
            className="mr-2"
          >
            <TrendingUp size={20} className="text-blue-500" />
          </motion.span>
          Lãi suất không kỳ hạn
        </h3>
        
        <div className="flex items-center space-x-4">
          {readOnly ? (
            <div className={`text-lg font-semibold ${highlightChanges.noTermRate ? 'text-green-600' : 'text-gray-800'}`}>
              {noTermRate}%
            </div>
          ) : (
            <NumberInput
              value={noTermRate}
              onChange={onNoTermRateChange}
              suffix="%"
              min={0}
              max={5}
              step={0.1}
              decimalPlaces={1}
              error={errors.noTermRate}
              highlightChange={highlightChanges.noTermRate}
              placeholder="Nhập lãi suất không kỳ hạn"
            />
          )}
        </div>
        
        {!readOnly && !errors.noTermRate && (
          <p className="mt-2 text-xs text-gray-500">
            Lãi suất áp dụng cho tiền gửi không có kỳ hạn
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default GeneralSettings; 