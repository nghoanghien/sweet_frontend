import React from 'react';
import { motion } from 'framer-motion';

const DataTableRowShimmer = ({
  columnCount = 6,
  index = 0,
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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.tr
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="hover:bg-blue-50/60 transition-colors"
    >
      {Array.from({ length: columnCount }, (_, colIndex) => (
        <td key={colIndex} className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
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
        </td>
      ))}
      {/* Actions column */}
      <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
      </td>
    </motion.tr>
  );
};

export default DataTableRowShimmer;