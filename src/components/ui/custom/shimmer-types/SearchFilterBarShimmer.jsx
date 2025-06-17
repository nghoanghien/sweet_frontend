import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

const SearchFilterBarShimmer = ({
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-gradient-to-br from-blue-50/80 to-white rounded-2xl shadow-[0_4px_24px_rgba(59,130,246,0.08)] mb-8 border border-blue-100"
    >
      {/* Background Icon - Large and Faded */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.div
            key="search-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          >
            <div className="opacity-[0.09] text-blue-400 transform scale-[2] translate-y-6 translate-x-20">
              <Search size={50} strokeWidth={3.2} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100/30 rounded-full -mr-20 -mt-20 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-100/30 rounded-full -ml-16 -mb-16 blur-xl"></div>

      {/* Toggle Button Shimmer */}
      <motion.div
        className="p-6 cursor-pointer relative z-10"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.15 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Icon shimmer */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: isExpanded ? 180 : 0,
              }}
              transition={{
                scale: { repeat: Infinity, duration: 2, repeatType: "loop" },
                rotate: { duration: 0.3 },
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2.5 rounded-xl shadow-[0_4px_16px_rgba(59,130,246,0.18)] relative overflow-hidden"
            >
              <Search size={20} className="text-white" />
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </motion.div>
            
            <div>
              {/* Title shimmer */}
              <div className="w-32 h-4 bg-blue-200 rounded relative overflow-hidden mb-1">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
              {/* Subtitle shimmer */}
              <div className="w-48 h-3 bg-blue-100 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Chevron shimmer */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-100 p-2 rounded-full relative overflow-hidden"
            >
              <ChevronDown size={20} className="text-blue-600" />
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Content Shimmer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
              opacity: { duration: 0.3 },
            }}
          >
            <div className="px-6 pb-6 relative z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl border border-blue-100 shadow-md overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-4 border-b border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
                    <div className="w-28 h-3 bg-blue-200 rounded relative overflow-hidden">
                      <motion.div
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Search Field 1 */}
                    <div className="space-y-2">
                      <div className="w-20 h-3 bg-blue-200 rounded relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        />
                      </div>
                      <div className="w-full h-10 bg-gray-100 rounded-lg relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        />
                      </div>
                    </div>

                    {/* Search Field 2 */}
                    <div className="space-y-2">
                      <div className="w-24 h-3 bg-blue-200 rounded relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        />
                      </div>
                      <div className="w-full h-10 bg-gray-100 rounded-lg relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        />
                      </div>
                    </div>

                    {/* Search Field 3 */}
                    <div className="space-y-2">
                      <div className="w-16 h-3 bg-blue-200 rounded relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        />
                      </div>
                      <div className="w-full h-10 bg-gray-100 rounded-lg relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchFilterBarShimmer;