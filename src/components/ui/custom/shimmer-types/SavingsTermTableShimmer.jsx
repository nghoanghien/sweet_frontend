import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const SavingsTermTableShimmer = ({
  rowCount = 6,
  ...props
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl shadow-[0_4px_20px_rgba(99,102,241,0.10)] border border-blue-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-8 py-5 border-b border-blue-100">
          <div className="w-48 h-5 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            {/* Table Header */}
            <thead className="bg-blue-50/60">
              <tr>
                {/* STT column - hidden on mobile */}
                <th className="hidden sm:table-cell px-6 py-3 text-center">
                  <div className="w-8 h-3 bg-gray-200 rounded mx-auto relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                </th>
                
                {/* Kỳ hạn column */}
                <th className="px-3 sm:px-6 py-3 text-center">
                  <div className="w-16 h-3 bg-gray-200 rounded mx-auto relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                </th>
                
                {/* Tổng thu column */}
                <th className="px-3 sm:px-6 py-3 text-center">
                  <div className="w-12 h-3 bg-gray-200 rounded mx-auto relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                </th>
                
                {/* Tổng chi column */}
                <th className="px-3 sm:px-6 py-3 text-center">
                  <div className="w-12 h-3 bg-gray-200 rounded mx-auto relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                </th>
                
                {/* Chênh lệch column */}
                <th className="px-3 sm:px-6 py-3 text-center">
                  <div className="w-16 h-3 bg-gray-200 rounded mx-auto relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                </th>
                
                {/* Hiệu quả column - hidden on mobile */}
                <th className="hidden sm:table-cell px-6 py-3 text-left">
                  <div className="w-16 h-3 bg-gray-200 rounded relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-blue-50">
              {Array.from({ length: rowCount }, (_, index) => (
                <motion.tr
                  key={index}
                  className="hover:bg-blue-50/40 text-center transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* STT column - hidden on mobile */}
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="w-4 h-4 bg-gray-200 rounded mx-auto relative overflow-hidden">
                      <motion.div
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </div>
                  </td>
                  
                  {/* Kỳ hạn column */}
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="p-2 rounded-lg bg-gray-100 mx-auto w-12 h-8 relative overflow-hidden">
                      <motion.div
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </div>
                  </td>
                  
                  {/* Tổng thu column */}
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-4 bg-gray-200 rounded mx-auto relative overflow-hidden">
                      <motion.div
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </div>
                  </td>
                  
                  {/* Tổng chi column */}
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-4 bg-gray-200 rounded mx-auto relative overflow-hidden">
                      <motion.div
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </div>
                  </td>
                  
                  {/* Chênh lệch column */}
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      {/* Trend icon */}
                      <div className="w-4 h-4 bg-gray-200 rounded relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                      </div>
                      {/* Value */}
                      <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                      </div>
                    </div>
                  </td>
                  
                  {/* Hiệu quả column - hidden on mobile */}
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-left">
                    <div className="flex items-center space-x-2">
                      {/* Badge */}
                      <div className="w-16 h-6 bg-gray-200 rounded-full relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                      </div>
                      {/* Percentage */}
                      <div className="w-12 h-4 bg-gray-200 rounded relative overflow-hidden">
                        <motion.div
                          variants={shimmerVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SavingsTermTableShimmer;