import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Zap } from 'lucide-react';
import CalendarDatePicker from '@/components/ui/CalendarDatePicker';

const ApplicationDateSelector = ({
  applicationType,
  applicationDate,
  onApplicationTypeChange,
  onApplicationDateChange,
  readOnly = false
}) => {
  // Application types
  const applicationTypes = [
    { id: 'immediate', name: 'Hôm nay', icon: <Zap size={16} className="mr-2" /> },
    { id: 'scheduled', name: 'Theo lịch', icon: <Calendar size={16} className="mr-2" /> }
  ];

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const [day, month, year] = dateString.split('/');
    return `${day}/${month}/${year}`;
  };
  
  // Get today's date in DD/MM/YYYY format
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle button click
  const handleTypeButtonClick = (typeId) => {
    if (!readOnly) {
      onApplicationTypeChange(typeId);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
        <Calendar size={18} className="text-blue-500" />
        Thời gian áp dụng
      </h3>
      {readOnly ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-blue-50/80 to-white p-5 rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)]"
        >
          <div className="flex items-center gap-2">
            {applicationType === 'immediate' ? (
              <>
                <Zap size={20} className="text-amber-500" />
                <span className="font-semibold text-blue-900">Ngày áp dụng: {getTodayDate()}</span>
              </>
            ) : (
              <>
                <Calendar size={20} className="text-blue-500" />
                <span className="font-semibold text-blue-900">Ngày áp dụng: {formatDate(applicationDate)}</span>
              </>
            )}
          </div>
        </motion.div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {applicationTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => handleTypeButtonClick(type.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-base transition-all border-2 w-full sm:w-auto
                  ${applicationType === type.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-400 shadow-[0_4px_20px_rgba(79,70,229,0.13)]'
                    : 'bg-white border-gray-200 text-blue-700 hover:bg-blue-50/60'
                  }
                `}
              >
                {type.icon}
                {type.name}
              </motion.button>
            ))}
          </div>
          {applicationType === 'scheduled' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-blue-50 max-w-lg p-5 rounded-2xl border border-blue-100 shadow-sm"
            >
              <CalendarDatePicker
                label="Ngày áp dụng"
                value={applicationDate}
                onChange={onApplicationDateChange}
                placeholder="DD/MM/YYYY"
                allowFutureDates={true}
                allowPastDates={false}
                className="mb-0"
              />
            </motion.div>
          )}
          {applicationType === 'immediate' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-amber-500" />
                <span className="font-semibold text-amber-900">Ngày áp dụng: {getTodayDate()}</span>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ApplicationDateSelector; 