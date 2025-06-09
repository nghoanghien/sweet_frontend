import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, Eye } from 'lucide-react';

const ReportCard = ({ report, onViewReport, formatCurrency }) => {
  // Calculate difference between total and net capital
  const capitalDifference = report.totalCapital - report.netCapital;
  const percentDifference = Math.round((capitalDifference / report.totalCapital) * 100);
  
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.03, boxShadow: '0 20px 40px rgba(99,102,241,0.13)' }}
      className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl shadow-[0_4px_24px_rgba(99,102,241,0.10)] p-6 flex flex-col relative border border-blue-100 transition-all duration-300"
    >
      {/* Month/Year Badge */}
      <div className="absolute top-5 left-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base font-bold px-4 py-2 rounded-xl shadow-md">
        {report.month}/{report.year}
      </div>
      
      {/* Capital Difference Badge */}
      <div className="absolute top-5 right-5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
        {percentDifference}% khác biệt
      </div>
      
      {/* Main Content */}
      <div className="mt-16 mb-4">
        <div className="flex items-center mb-4">
          <Calendar size={18} className="text-blue-500 mr-2" />
          <h3 className="text-xl font-bold text-gray-800">
            Báo cáo tháng {report.month}/{report.year}
          </h3>
        </div>
        
        {/* Capital Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center">
            <DollarSign size={18} className="text-green-500 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Tổng vốn huy động</p>
              <p className="text-base font-semibold text-gray-700">{formatCurrency(report.totalCapital)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <TrendingUp size={18} className="text-blue-500 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Vốn huy động ròng</p>
              <p className="text-base font-semibold text-gray-700">{formatCurrency(report.netCapital)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* View Report Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onViewReport(report)}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base py-3 rounded-xl hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-auto flex items-center justify-center font-semibold"
      >
        <Eye size={18} className="mr-2" />
        Xem chi tiết
      </motion.button>
    </motion.div>
  );
};

const ReportGrid = ({ reports, onViewReport, formatCurrency }) => {
  // If no reports, show empty state
  if (reports.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl p-10 text-center border border-blue-100 shadow-md"
      >
        <Calendar size={40} className="mx-auto text-blue-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">Không tìm thấy báo cáo</h3>
        <p className="text-gray-500">Không có báo cáo nào phù hợp với tìm kiếm của bạn.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report, index) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ReportCard 
            report={report} 
            onViewReport={onViewReport} 
            formatCurrency={formatCurrency}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ReportGrid; 