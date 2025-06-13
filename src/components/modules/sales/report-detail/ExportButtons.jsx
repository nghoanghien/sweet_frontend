import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';

const ExportButtons = ({ onExport }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.button
        whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px rgba(239,68,68,0.15)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onExport('pdf')}
        className="px-4 py-2 bg-white border border-red-200 rounded-xl text-red-600 hover:bg-red-50 shadow-sm flex items-center transition-all duration-300"
      >
        <FaFilePdf size={16} className="mr-2" />
        <span>PDF</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px rgba(34,197,94,0.15)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onExport('excel')}
        className="px-4 py-2 bg-white border border-green-200 rounded-xl text-green-600 hover:bg-green-50 shadow-sm flex items-center transition-all duration-300"
      >
        <FaFileExcel size={16} className="mr-2" />
        <span>Excel</span>
      </motion.button>
    </div>
  );
};

export default ExportButtons; 