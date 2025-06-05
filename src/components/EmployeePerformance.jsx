import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart4, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Sparkles,
  Award,
  Star,
  RefreshCw,
  Clock
} from 'lucide-react';
import DateRangePicker from './DateRangePicker';

// Helper component for preset date ranges
const PresetDateRange = ({ onSelect }) => {
  // Format date as DD/MM/YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Calculate date ranges
  const getPresetDateRange = (preset) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let endDate = formatDate(today);
    let startDate = '';
    
    switch (preset) {
      case 'last7days':
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 6); // -6 because we include today
        startDate = formatDate(last7Days);
        break;
      case 'last30days':
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 29); // -29 because we include today
        startDate = formatDate(last30Days);
        break;
      case 'thisMonth':
        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        startDate = formatDate(thisMonth);
        break;
      case 'lastMonth':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        startDate = formatDate(lastMonth);
        // If we're in the current month, use yesterday as the end date
        // Otherwise use the last day of last month
        if (today.getDate() === 1) {
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          endDate = formatDate(yesterday);
        } else {
          endDate = formatDate(lastDayOfLastMonth);
        }
        break;
      default:
        break;
    }
    
    return { startDate, endDate };
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(getPresetDateRange('last7days'))}
        className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 flex items-center"
      >
        <Clock size={14} className="mr-1" />
        7 ngày qua
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(getPresetDateRange('last30days'))}
        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center"
      >
        <Clock size={14} className="mr-1" />
        30 ngày qua
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(getPresetDateRange('thisMonth'))}
        className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-100 flex items-center"
      >
        <Calendar size={14} className="mr-1" />
        Tháng này
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(getPresetDateRange('lastMonth'))}
        className="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-sm font-medium hover:bg-amber-100 flex items-center"
      >
        <Calendar size={14} className="mr-1" />
        Tháng trước
      </motion.button>
    </div>
  );
};

const EmployeePerformance = ({ employee }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animateMetrics, setAnimateMetrics] = useState(false);

  // Handle preset date range selection
  const handlePresetSelect = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setError(null);
  };

  // Animation effects
  useEffect(() => {
    if (performanceData) {
      // Trigger metrics animation after data is loaded
      setAnimateMetrics(true);
      
      // Reset animation flag after animation completes
      const timer = setTimeout(() => {
        setAnimateMetrics(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [performanceData]);

  // Function to fetch performance data based on date range
  const fetchPerformanceData = () => {
    if (!startDate || !endDate) {
      setError('Vui lòng chọn khoảng thời gian để xem hiệu suất');
      return;
    }
    
    // Parse dates for validation
    const startParts = startDate.split('/');
    const endParts = endDate.split('/');
    const startDateObj = new Date(startParts[2], startParts[1] - 1, startParts[0]);
    const endDateObj = new Date(endParts[2], endParts[1] - 1, endParts[0]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Validate date range
    if (endDateObj < startDateObj) {
      setError('Ngày kết thúc không thể trước ngày bắt đầu');
      return;
    }
    
    if (startDateObj > today || endDateObj > today) {
      setError('Không thể chọn ngày trong tương lai');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // In a real app, this would be an API call that passes the employee ID and date range
      // Mock response based on date range and employee
      const today = new Date();
      
      // Calculate days between dates
      const diffTime = Math.abs(endDateObj - startDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the end date
      
      // Generate random performance data based on employee and date range
      const totalCapitalMobilized = Math.round((100000 + Math.random() * 500000 + employee.id * 50000) * diffDays / 30);
      const netCapitalMobilized = Math.round(totalCapitalMobilized * (0.6 + Math.random() * 0.3));
      
      // Calculate trends (comparing to previous period of same length)
      const totalTrend = Math.round((Math.random() * 2 - 1) * 20);  // Between -20% and +20%
      const netTrend = Math.round((Math.random() * 2 - 1) * 25);    // Between -25% and +25%
      
      // Determine performance rating based on the amount mobilized
      let performanceRating;
      if (netCapitalMobilized > 400000) {
        performanceRating = 'excellent';
      } else if (netCapitalMobilized > 250000) {
        performanceRating = 'good';
      } else if (netCapitalMobilized > 100000) {
        performanceRating = 'average';
      } else {
        performanceRating = 'poor';
      }
      
      // Build achievement badges based on metrics
      const achievements = [];
      if (totalCapitalMobilized > 500000) {
        achievements.push({
          title: 'Đạt mức vốn cao',
          description: 'Đạt mức huy động vốn trên 500 triệu',
          icon: <Award size={20} className="text-yellow-500" />
        });
      }
      if (netTrend > 15) {
        achievements.push({
          title: 'Tăng trưởng xuất sắc',
          description: `Tăng ${netTrend}% so với kỳ trước`,
          icon: <Star size={20} className="text-indigo-500" />
        });
      }
      if (netCapitalMobilized / totalCapitalMobilized > 0.75) {
        achievements.push({
          title: 'Hiệu quả cao',
          description: 'Tỷ lệ vốn ròng trên 75%',
          icon: <Sparkles size={20} className="text-emerald-500" />
        });
      }
      
      setPerformanceData({
        totalCapitalMobilized,
        netCapitalMobilized,
        totalTrend,
        netTrend,
        performanceRating,
        achievements,
        period: {
          start: startDate,
          end: endDate,
          days: diffDays
        }
      });
      
      setLoading(false);
    }, 1200); // Simulate network delay
  };

  // Format currency function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get trend icon and color
  const getTrendIndicator = (trend) => {
    if (trend > 0) {
      return {
        icon: <ArrowUpRight size={18} />,
        color: 'text-emerald-500',
        label: `+${trend}%`
      };
    } else if (trend < 0) {
      return {
        icon: <ArrowDownRight size={18} />,
        color: 'text-rose-500',
        label: `${trend}%`
      };
    } else {
      return {
        icon: <RefreshCw size={18} />,
        color: 'text-gray-500',
        label: '0%'
      };
    }
  };

  // Get performance rating text and color
  const getPerformanceIndicator = (rating) => {
    switch (rating) {
      case 'excellent':
        return {
          label: 'Xuất sắc',
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-100',
          icon: <Award size={18} />
        };
      case 'good':
        return {
          label: 'Tốt',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: <Star size={18} />
        };
      case 'average':
        return {
          label: 'Trung bình',
          color: 'text-amber-600',
          bgColor: 'bg-amber-100',
          icon: <TrendingUp size={18} />
        };
      case 'poor':
        return {
          label: 'Cần cải thiện',
          color: 'text-rose-600',
          bgColor: 'bg-rose-100',
          icon: <TrendingDown size={18} />
        };
      default:
        return {
          label: 'Không xác định',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: <Calendar size={18} />
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Range Picker */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h4 className="text-base font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-indigo-600" />
          Chọn khoảng thời gian
        </h4>
        
        {/* Preset Date Range Buttons */}
        <PresetDateRange onSelect={handlePresetSelect} />
        
        <div className="mb-6">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            label="Khoảng thời gian hiệu suất"
            startPlaceholder="Ngày bắt đầu"
            endPlaceholder="Ngày kết thúc"
            required={true}
            error={error}
          />
        </div>
        
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchPerformanceData}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="mr-2 animate-spin" />
                Đang tải...
              </>
            ) : (
              <>
                <BarChart4 size={18} className="mr-2" />
                Xem hiệu suất
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Performance Metrics */}
      <AnimatePresence mode="wait">
        {performanceData && (
          <motion.div
            key="performance-metrics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-xl shadow-md overflow-hidden relative">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100/30 rounded-full -mr-20 -mt-20 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100/30 rounded-full -ml-16 -mb-16 blur-xl"></div>
              
              {/* Performance period */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-5">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold">Hiệu suất nhân viên</h4>
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                    <Calendar size={14} />
                    <span>
                      {performanceData.period.start} - {performanceData.period.end}
                    </span>
                  </div>
                </div>
                <p className="text-indigo-100 text-sm mt-1">
                  {performanceData.period.days} ngày • {employee.fullName} • Mã NV: {employee.code}
                </p>
              </div>
              
              {/* Performance rating */}
              <div className="p-5">
                {performanceData && (
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="text-center">
                      <motion.div 
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                        initial={{ scale: 0.8 }}
                        animate={{ 
                          scale: [0.8, 1.1, 1],
                          y: [0, -10, 0]
                        }}
                        transition={{ 
                          duration: 0.5,
                          times: [0, 0.7, 1],
                          ease: "easeOut"
                        }}
                        style={{
                          backgroundColor: getPerformanceIndicator(performanceData.performanceRating).bgColor,
                          color: getPerformanceIndicator(performanceData.performanceRating).color
                        }}
                      >
                        {getPerformanceIndicator(performanceData.performanceRating).icon}
                        <span className="ml-2">{getPerformanceIndicator(performanceData.performanceRating).label}</span>
                      </motion.div>
                    </div>
                    
                    {/* Achievement badges */}
                    <div className="flex gap-2 flex-wrap justify-center">
                      {performanceData.achievements.map((achievement, index) => (
                        <motion.div
                          key={`achievement-${index}`}
                          className="bg-white shadow-sm border border-indigo-100 rounded-lg p-2 flex items-center gap-2"
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ 
                            duration: 0.4,
                            delay: 0.2 + (index * 0.1) 
                          }}
                        >
                          <div className="p-1.5 bg-indigo-50 rounded-full">{achievement.icon}</div>
                          <div>
                            <p className="text-xs font-semibold text-gray-800">{achievement.title}</p>
                            <p className="text-xs text-gray-500">{achievement.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Total Capital Mobilized */}
                  <motion.div 
                    className="bg-white rounded-xl shadow-sm border border-indigo-100 p-5 relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {/* Decorative sparkle effect */}
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-indigo-400/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-400/20 rounded-full blur-md"></div>
                    
                    <div className="flex justify-between">
                      <div>
                        <h5 className="text-gray-500 text-sm">Tổng số vốn huy động</h5>
                        <motion.div 
                          className="flex items-end gap-2 mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={animateMetrics ? { 
                              y: [20, -10, 0],
                              opacity: [0, 1, 1]
                            } : { y: 0, opacity: 1 }}
                            transition={{ 
                              duration: 1,
                              times: [0, 0.6, 1],
                              ease: "easeOut"
                            }}
                            className="text-2xl font-bold text-gray-800"
                          >
                            {formatCurrency(performanceData.totalCapitalMobilized)}
                          </motion.div>
                          <div className={`flex items-center text-sm ${getTrendIndicator(performanceData.totalTrend).color}`}>
                            {getTrendIndicator(performanceData.totalTrend).icon}
                            <span className="ml-1">{getTrendIndicator(performanceData.totalTrend).label}</span>
                          </div>
                        </motion.div>
                      </div>
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                        <DollarSign size={22} />
                      </div>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="mt-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-indigo-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1, delay: 0.3 }}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Net Capital Mobilized */}
                  <motion.div 
                    className="bg-white rounded-xl shadow-sm border border-indigo-100 p-5 relative overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {/* Decorative sparkle effect */}
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-emerald-400/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-teal-400/20 rounded-full blur-md"></div>
                    
                    <div className="flex justify-between">
                      <div>
                        <h5 className="text-gray-500 text-sm">Tổng số vốn huy động ròng</h5>
                        <motion.div 
                          className="flex items-end gap-2 mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={animateMetrics ? { 
                              y: [20, -10, 0],
                              opacity: [0, 1, 1]
                            } : { y: 0, opacity: 1 }}
                            transition={{ 
                              duration: 1,
                              times: [0, 0.6, 1],
                              ease: "easeOut"
                            }}
                            className="text-2xl font-bold text-gray-800"
                          >
                            {formatCurrency(performanceData.netCapitalMobilized)}
                          </motion.div>
                          <div className={`flex items-center text-sm ${getTrendIndicator(performanceData.netTrend).color}`}>
                            {getTrendIndicator(performanceData.netTrend).icon}
                            <span className="ml-1">{getTrendIndicator(performanceData.netTrend).label}</span>
                          </div>
                        </motion.div>
                      </div>
                      <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        <TrendingUp size={22} />
                      </div>
                    </div>
                    
                    {/* Progress indicator relative to total */}
                    <div className="mt-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-emerald-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${(performanceData.netCapitalMobilized / performanceData.totalCapitalMobilized) * 100}%` 
                          }}
                          transition={{ duration: 1, delay: 0.5 }}
                        ></motion.div>
                      </div>
                      <div className="mt-1 text-xs text-right text-gray-500">
                        {Math.round((performanceData.netCapitalMobilized / performanceData.totalCapitalMobilized) * 100)}% của tổng vốn
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 text-blue-100"
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 0.3, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <Sparkles size={120} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Empty state */}
      {!performanceData && !loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mb-4"
          >
            <BarChart4 size={40} />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Chưa có dữ liệu hiệu suất</h3>
          <p className="text-gray-500 mb-4">Vui lòng chọn khoảng thời gian và nhấn "Xem hiệu suất" để xem thông tin hiệu suất của nhân viên.</p>
          
          <motion.div 
            className="mt-6 text-indigo-500"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Calendar size={24} className="mx-auto" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EmployeePerformance; 