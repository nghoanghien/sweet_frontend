import React from 'react';
import { motion } from 'framer-motion';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 mb-2">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium text-sm md:text-base transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(0,170,255,0.15)]'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          whileHover={{ scale: activeTab === tab.id ? 1.05 : 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: tabs.findIndex((t) => t.id === tab.id) * 0.1,
          }}
        >
          <span className="relative">
            {tab.icon}
            {activeTab === tab.id && (
              <motion.span
                className="absolute inset-0 rounded-full bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  repeatDelay: 1,
                }}
              />
            )}
          </span>
          {tab.name}
        </motion.button>
      ))}
    </div>
  );
};

export default TabNavigation; 