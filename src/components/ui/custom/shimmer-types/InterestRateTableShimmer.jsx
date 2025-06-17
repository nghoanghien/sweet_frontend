import React from 'react';
import { motion } from 'framer-motion';

const InterestRateTableShimmer = () => {
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

  // Mobile view shimmer
  const renderMobileShimmer = () => {
    return (
      <div className="md:hidden space-y-5">
        {[1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
            className="border-2 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,170,255,0.08)] bg-gradient-to-br from-blue-50/80 to-white border-blue-100"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-blue-50/60">
              <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
            
            {/* Content rows */}
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4].map((rowIndex) => (
                <div key={rowIndex} className="px-4 py-3 flex justify-between items-center">
                  <div className="w-24 h-3 bg-gray-200 rounded relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </div>
                  <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Desktop view shimmer
  const renderDesktopShimmer = () => {
    return (
      <div className="hidden md:block overflow-x-auto">
        <motion.div
          className="bg-white border-2 border-blue-100 rounded-3xl shadow-[0_4px_32px_rgba(0,170,255,0.10)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Table header */}
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 px-8 py-5 rounded-t-3xl">
            <div className="w-64 h-12 bg-white/20 rounded-2xl relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
          
          {/* Table content */}
          <div className="p-6">
            
            
            {/* Table structure */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table header row */}
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3">
                      <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        />
                      </div>
                    </th>
                    {[1, 2, 3, 4].map((index) => (
                      <th key={index} className="p-3">
                        <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
                          <motion.div
                            variants={shimmerVariants}
                            initial="initial"
                            animate="animate"
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                
                {/* Table body */}
                <tbody>
                  {[1, 2, 3, 4, 5].map((rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-100">
                      <td className="p-3">
                        <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
                          <motion.div
                            variants={shimmerVariants}
                            initial="initial"
                            animate="animate"
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                          />
                        </div>
                      </td>
                      {[1, 2, 3, 4].map((cellIndex) => (
                        <td key={cellIndex} className="p-3">
                          <div className="w-12 h-4 bg-gray-200 rounded relative overflow-hidden">
                            <motion.div
                              variants={shimmerVariants}
                              initial="initial"
                              animate="animate"
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div>
      {renderMobileShimmer()}
      {renderDesktopShimmer()}
    </div>
  );
};

export default InterestRateTableShimmer;