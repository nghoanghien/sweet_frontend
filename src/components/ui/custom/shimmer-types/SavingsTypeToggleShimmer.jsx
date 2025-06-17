import React from 'react';
import { motion } from 'framer-motion';

const SavingsTypeToggleShimmer = () => {
  // Shimmer animation variants
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear'
      }
    }
  };

  return (
    <div className="flex justify-center my-6">
      <motion.div
        className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-2 rounded-2xl shadow-[0_4px_24px_rgba(0,170,255,0.08)] inline-flex border border-blue-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Two shimmer buttons to match the typical savings type toggle */}
        {[0, 1].map((index) => (
          <div
            key={index}
            className="relative px-3 md:px-7 py-3 rounded-xl bg-gray-200 mx-1 overflow-hidden"
            style={{ width: '140px', height: '48px' }}
          >
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SavingsTypeToggleShimmer;