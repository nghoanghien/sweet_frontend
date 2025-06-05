import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const ReportSearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full bg-gradient-to-r from-blue-50/80 to-white rounded-2xl shadow-[0_4px_20px_rgba(99,102,241,0.10)] p-5 border border-blue-100"
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-blue-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm báo cáo theo tháng/năm..."
          className="w-full pl-14 pr-14 py-3 bg-white border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 shadow-inner text-gray-700 placeholder-gray-400 text-base font-medium"
        />
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <div className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm">
              <X size={16} className="text-gray-500" />
            </div>
          </motion.button>
        )}
      </div>
      <div className="flex items-center mt-4 text-sm text-gray-500">
        <span className="mr-2 font-semibold">Gợi ý:</span>
        {['12/2023', '11/2023', '10/2023'].map((suggestion, index) => (
          <motion.button
            key={suggestion}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchQuery(suggestion)}
            className="mr-2 px-4 py-1.5 bg-white rounded-full border border-blue-100 hover:bg-blue-50 hover:border-blue-200 shadow-sm font-medium text-blue-700"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ReportSearchBar; 