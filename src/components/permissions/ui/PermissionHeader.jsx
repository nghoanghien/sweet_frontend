import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar } from 'lucide-react';

const PermissionHeader = ({ currentUser, title, description }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <motion.h2 
          className="text-xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-sm text-gray-600 flex items-center mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <User size={14} className="mr-1 flex-shrink-0" />
          {currentUser.name} ({currentUser.role})
        </motion.p>
        {description && (
          <motion.p 
            className="text-sm text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {description}
          </motion.p>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="hidden sm:flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl"
      >
        <Calendar size={14} className="mr-2" />
        <span>
          {new Date().toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        </span>
      </motion.div>
    </div>
  );
};

export default PermissionHeader; 