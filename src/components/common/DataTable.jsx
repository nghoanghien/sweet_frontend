import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit, Trash, MoreHorizontal, RefreshCcw } from 'lucide-react';
import StatusBadge from '../ui/custom/StatusBadge';

const DataTable = ({
  data,
  columns,
  sortField,
  sortDirection,
  handleSort,
  onRowClick,
  onEditClick,
  onDeleteClick,
  keyField = 'id',
  className = '',
  headerClassName = 'bg-gradient-to-r from-blue-500 to-indigo-600',
  renderActions = null,
  emptyMessage = 'Không có dữ liệu để hiển thị',
  isLoading = false
}) => {
  // Animation variants
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: 'easeOut'
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)] overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className={headerClassName}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-3 sm:px-4 lg:px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-blue-600/80 transition-colors ${column.className || ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    <span>{column.label}</span>
                    {sortField === column.key && (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.4 }}
                      >
                        {sortDirection === 'asc' ? 
                          <ChevronUp className="ml-1 w-4 h-4" /> : 
                          <ChevronDown className="ml-1 w-4 h-4" />
                        }
                      </motion.span>
                    )}
                  </div>
                </th>
              ))}
              <th 
                scope="col" 
                className="px-3 sm:px-4 lg:px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-50">
            <AnimatePresence>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-10 text-center">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center text-gray-500"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCcw size={32} className="text-blue-400 animate-spin mb-3" />
                          <p>Đang tải dữ liệu...</p>
                        </>
                      ) : (
                        <>
                          <svg className="w-12 h-12 text-blue-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p>{emptyMessage}</p>
                        </>
                      )}
                    </motion.div>
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <motion.tr 
                    key={item[keyField]}
                    custom={i}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="hover:bg-blue-50/60 transition-colors cursor-pointer"
                    onClick={() => onRowClick && onRowClick(item)}
                    layoutId={`row-${item[keyField]}`}
                  >
                    {columns.map((column) => {
                      // Render special components based on column type
                      if (column.type === 'status') {
                        return (
                          <td key={column.key} className={`px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap ${column.className || ''}`}>
                            <StatusBadge status={item[column.key]} />
                          </td>
                        );
                      }
                      
                      // Handle nested properties
                      let value = item[column.key];
                      if (column.key.includes('.')) {
                        const keys = column.key.split('.');
                        value = keys.reduce((obj, key) => obj && obj[key], item);
                      }
                      
                      // Apply formatter if provided
                      if (column.formatter) {
                        value = column.formatter(value, item);
                      }
                      
                      return (
                        <td key={column.key} className={`px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap ${column.className || ''}`}>
                          {column.formatter ? value : (
                            <div className="text-sm text-gray-800">{value}</div>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                        {renderActions ? renderActions(item) : (
                          <>
                            {onEditClick && (
                              <motion.button
                                onClick={() => onEditClick(item)}
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-50"
                              >
                                <Edit size={18} />
                              </motion.button>
                            )}
                            {onDeleteClick && (
                              <motion.button
                                onClick={() => onDeleteClick(item)}
                                whileHover={{ scale: 1.15, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-50"
                              >
                                <Trash size={18} />
                              </motion.button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DataTable;