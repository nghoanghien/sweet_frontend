import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';

const FrequencySelector = ({ 
  allFrequencies, 
  activeFrequencies, 
  onToggleFrequency,
  readOnly = false
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, repeatType: 'loop' }}
        >
          <Clock size={18} className="text-blue-500" />
        </motion.span>
        Tần suất nhận lãi
      </h3>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {allFrequencies.map((frequency) => {
          const isActive = activeFrequencies.includes(frequency.id);
          
          return (
            <motion.button
              key={frequency.id}
              disabled={readOnly}
              onClick={() => !readOnly && onToggleFrequency(frequency.id)}
              className={`flex items-center justify-between px-5 py-4 sm:py-5 rounded-2xl border-2 transition-all text-base font-semibold tracking-wide shadow-[0_4px_16px_rgba(0,170,255,0.08)] w-full
                ${isActive 
                  ? 'border-blue-400 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 text-blue-800'
                  : 'border-gray-200 bg-white hover:bg-blue-50/60 text-blue-700'
                }
                ${readOnly && !isActive ? 'opacity-50' : ''}
              `}
              whileHover={!readOnly ? { scale: 1.04, boxShadow: '0 0 12px rgba(0,170,255,0.10)' } : {}}
              whileTap={!readOnly ? { scale: 0.97 } : {}}
            >
              <span className="text-base font-semibold text-blue-800">
                {frequency.name}
              </span>
              {isActive && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, repeatType: 'loop' }}
                  className="flex items-center justify-center h-7 w-7 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full shadow-[0_2px_8px_rgba(0,170,255,0.18)]"
                >
                  <Check size={16} />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default FrequencySelector; 