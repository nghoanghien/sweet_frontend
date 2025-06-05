import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SavingsTypeToggle = ({ 
  savingsTypes, 
  activeSavingsType, 
  onToggle 
}) => {
  return (
    <div className="flex justify-center my-6">
      <motion.div
        className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-2 rounded-2xl shadow-[0_4px_24px_rgba(0,170,255,0.08)] inline-flex border border-blue-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {savingsTypes.map((type, index) => {
          const isActive = type.id === activeSavingsType;
          
          return (
            <motion.button
              key={type.id}
              onClick={() => onToggle(type.id)}
              className={`
                relative px-7 py-3 rounded-xl text-base font-semibold tracking-wide
                transition-all duration-200
                ${isActive 
                  ? 'text-white z-10' 
                  : 'text-blue-700 hover:bg-blue-100/60 z-0'
                }
              `}
              whileHover={{ scale: isActive ? 1.04 : 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              {isActive && (
                <motion.div
                  layoutId="savings-type-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-[0_4px_20px_rgba(0,170,255,0.18)]"
                  initial={false}
                  transition={{ type: 'spring', duration: 0.5 }}
                ></motion.div>
              )}
              <span className="relative flex items-center gap-2">
                {index === 0 && (
                  <motion.span
                    animate={isActive ? { x: -2, scale: 1.15 } : { x: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <ArrowLeft size={18} />
                  </motion.span>
                )}
                {type.name}
                {index === savingsTypes.length - 1 && (
                  <motion.span
                    animate={isActive ? { x: 2, scale: 1.15 } : { x: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                )}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SavingsTypeToggle; 