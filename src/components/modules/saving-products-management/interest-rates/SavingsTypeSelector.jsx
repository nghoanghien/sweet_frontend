import React from 'react';
import { motion } from 'framer-motion';
import { Check, PiggyBank, AlertCircle, Plus, Loader2 } from 'lucide-react';

const SavingsTypeSelector = ({ 
  allSavingsTypes, 
  activeSavingsTypes, 
  disabledSavingsTypes = [],
  onToggleSavingsType,
  readOnly = false,
  error = null,
  removedSavingsTypes = [],
  onAddRemovedSavingsType,
  loadingAddedType = null
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, repeatType: 'loop' }}
          className="mr-2"
        >
          <PiggyBank size={18} className="text-blue-500" />
        </motion.span>
        Loại sản phẩm tiết kiệm
      </h3>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-3 rounded-xl shadow-sm">
          <div className="flex items-center">
            <AlertCircle size={16} className="text-red-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-4">
        {allSavingsTypes
          .filter(type => activeSavingsTypes.some(activeId => activeId === type.id))
          .map((type) => {
            const isActive = activeSavingsTypes.includes(type.id);
            const isDisabled = disabledSavingsTypes.includes(type.id);
            
            return (
              <motion.button
                key={type.id}
                disabled={readOnly}
                onClick={() => !readOnly && onToggleSavingsType(type.id)}
                className={`
                  flex items-center justify-between px-5 py-4 rounded-2xl border transition-all text-base font-semibold tracking-wide shadow-sm
                  ${isActive && !isDisabled
                    ? 'border-blue-400 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 shadow-[0_4px_20px_rgba(0,170,255,0.10)] text-blue-800'
                    : isDisabled
                      ? 'border-gray-200 bg-gray-50 text-gray-400'
                      : 'border-gray-200 bg-white hover:bg-blue-50/60 text-blue-700'
                  }
                  ${readOnly && !isActive ? 'opacity-50' : ''}
                  ${error && disabledSavingsTypes.length === allSavingsTypes.length ? 'border-red-300' : ''}
                `}
                whileHover={!readOnly && !isDisabled ? { scale: 1.04, boxShadow: '0 0 12px rgba(0,170,255,0.10)' } : {}}
                whileTap={!readOnly && !isDisabled ? { scale: 0.97 } : {}}
              >
                <span className={`text-base font-semibold ${
                  isDisabled ? 'text-gray-400' : 'text-blue-800'
                }`}>
                  {type.name}
                </span>
                {isActive && !isDisabled && (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6, repeatType: 'loop' }}
                    className="flex items-center justify-center h-6 w-6 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full shadow-[0_2px_8px_rgba(0,170,255,0.18)]"
                  >
                    <Check size={14} />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
      </div>
      
      {/* Removed savings types that can be added back */}
      {removedSavingsTypes && removedSavingsTypes.length > 0 && !readOnly && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Loại tiết kiệm đã xóa
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {removedSavingsTypes.map((type) => {
              const isLoading = loadingAddedType === type.id;
              return (
                <motion.button
                  key={type.id}
                  onClick={() => !isLoading && onAddRemovedSavingsType(type.id)}
                  disabled={isLoading}
                  className={`
                    flex items-center justify-between px-5 py-4 rounded-2xl border-2 border-dashed 
                    ${isLoading 
                      ? 'border-blue-200 bg-blue-50/20 cursor-wait' 
                      : 'border-blue-300 bg-blue-50/40 hover:bg-blue-100/60'
                    } 
                    transition-all text-blue-700 font-semibold tracking-wide shadow-sm
                  `}
                  whileHover={!isLoading ? { scale: 1.04, boxShadow: '0 0 12px rgba(0,170,255,0.10)' } : {}}
                  whileTap={!isLoading ? { scale: 0.97 } : {}}
                >
                  <span className="text-base font-semibold text-blue-700">
                    {type.name}
                  </span>
                  <span className="flex items-center justify-center h-6 w-6 bg-blue-100 text-blue-600 rounded-full">
                    {isLoading ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 size={14} />
                      </motion.span>
                    ) : (
                      <Plus size={14} />
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-blue-600">
            Bạn có thể thêm lại các loại tiết kiệm đã xóa trước đó
          </p>
        </div>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        Chọn ít nhất một loại sản phẩm tiết kiệm để hiển thị trong quy định
      </p>
    </div>
  );
};

export default SavingsTypeSelector; 