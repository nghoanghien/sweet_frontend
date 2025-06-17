import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import DataTableFilterShimmer from './DataTableFilterShimmer';

const DataTableShimmer = ({
  rowCount = 10,
  columnCount = 6,
  showFilter = true,
  ...props
}) => {
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

  // Row animation variants
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.4,
        ease: 'easeOut'
      }
    })
  };

  const ShimmerRow = ({ index, isHeader = false }) => (
    <motion.tr
      custom={index}
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      className={isHeader ? '' : 'hover:bg-blue-50/60 transition-colors'}
    >
      {Array.from({ length: columnCount }, (_, colIndex) => (
        <td key={colIndex} className={`px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap ${isHeader ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : ''}`}>
          {isHeader ? (
            // Header shimmer
            <div className="relative overflow-hidden">
              <div className="h-4 bg-white/30 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
          ) : (
            // Data cell shimmer
            <div className="relative overflow-hidden">
              <div className={`h-4 bg-gray-200 rounded relative overflow-hidden ${
                colIndex === columnCount - 1 ? 'w-16' : // Actions column
                colIndex === 0 ? 'w-32' : // Name column
                colIndex === 1 ? 'w-24' : // Date column
                colIndex === 2 ? 'w-40' : // Email column
                colIndex === 3 ? 'w-28' : // Phone column
                colIndex === 4 ? 'w-32' : // ID column
                'w-20' // Status column
              }`}>
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
          )}
        </td>
      ))}
      {/* Actions column */}
      <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {isHeader ? (
          <div className="relative overflow-hidden">
            <div className="h-4 bg-white/30 rounded relative overflow-hidden w-16 ml-auto">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-end space-x-2">
            {/* Edit button shimmer */}
            <div className="w-8 h-8 bg-gray-200 rounded-full relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            {/* Lock/Unlock button shimmer */}
            <div className="w-8 h-8 bg-gray-200 rounded-full relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
        )}
      </td>
    </motion.tr>
  );

  return (
    <AnimatePresence>
      <div>
        {/* Filter Shimmer */}
        {showFilter && <DataTableFilterShimmer />}
        
        {/* Table Shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-100">
              {/* Header */}
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600">
                <ShimmerRow index={0} isHeader={true} />
              </thead>
              
              {/* Body */}
              <tbody className="bg-white divide-y divide-blue-50">
                {Array.from({ length: rowCount }, (_, index) => (
                  <ShimmerRow key={index} index={index + 1} />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DataTableShimmer;