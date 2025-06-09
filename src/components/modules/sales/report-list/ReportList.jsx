import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, Eye, ChevronRight } from 'lucide-react';

const ReportList = ({ reports, onViewReport, formatCurrency }) => {
  // If no reports, show empty state
  if (reports.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white overflow-y-auto rounded-xl p-10 text-center border border-blue-100 shadow-md"
      >
        <Calendar size={40} className="mx-auto text-blue-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">Không tìm thấy báo cáo</h3>
        <p className="text-gray-500">Không có báo cáo nào phù hợp với tìm kiếm của bạn.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl shadow-[0_4px_24px_rgba(99,102,241,0.10)] border border-blue-100/70 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-5 border-b border-blue-100">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 font-bold text-blue-700">Thời gian</div>
          <div className="col-span-4 font-bold text-blue-700">Tổng vốn huy động</div>
          <div className="col-span-4 font-bold text-blue-700">Vốn huy động ròng</div>
          <div className="col-span-2 font-bold text-blue-700 text-right">Thao tác</div>
        </div>
      </div>
      
      {/* Table Body */}
      <div>
        {reports.map((report, index) => {
          // Calculate difference between total and net capital
          const capitalDifference = report.totalCapital - report.netCapital;
          const percentDifference = Math.round((capitalDifference / report.totalCapital) * 100);
          
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`border-b border-blue-50 hover:bg-blue-50/40 transition-colors ${index % 2 === 0 ? 'bg-white/90' : 'bg-blue-50/10'}`}
            >
              <div className="px-8 py-5">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Time Period */}
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <Calendar size={18} className="text-blue-500 mr-2" />
                      <span className="font-bold text-gray-800 text-base">{report.month}/{report.year}</span>
                    </div>
                  </div>
                  
                  {/* Total Capital */}
                  <div className="col-span-4">
                    <div className="flex items-center">
                      <DollarSign size={18} className="text-green-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Tổng vốn</p>
                        <p className="text-base font-semibold text-gray-800">{formatCurrency(report.totalCapital)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Net Capital */}
                  <div className="col-span-4">
                    <div className="flex items-center">
                      <TrendingUp size={18} className="text-blue-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Vốn ròng <span className="text-blue-600 font-bold">({percentDifference}% khác biệt)</span></p>
                        <p className="text-base font-semibold text-gray-800">{formatCurrency(report.netCapital)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="col-span-2 text-right">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onViewReport(report)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base rounded-xl hover:shadow-md transition-all duration-200 font-semibold"
                    >
                      <Eye size={16} className="mr-1" />
                      <span>Chi tiết</span>
                      <ChevronRight size={16} className="ml-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportList; 