import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, 
  List, 
  ArrowLeft, 
  Search, 
  FileText, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Download,
  Eye
} from 'lucide-react';

// Import sub-components (we'll create these next)
import ReportGrid from './report-list/ReportGrid';
import ReportList from './report-list/ReportList';
import ReportSearchBar from './report-list/ReportSearchBar';
import ReportDetail from './report-detail/ReportDetail';
import ExportButtons from './report-detail/ExportButtons';

const SalesReportPage = () => {
  // State for view type (grid or list)
  const [viewType, setViewType] = useState('grid');
  
  // State for selected report
  const [selectedReport, setSelectedReport] = useState(null);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for reports
  const [reports, setReports] = useState([
    {
      id: 'rep-2023-12',
      month: 12,
      year: 2023,
      totalCapital: 1250000000000,
      netCapital: 980000000000,
      standardSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 12500000000, totalExpense: 8200000000 },
          { id: 2, term: 3, totalIncome: 28700000000, totalExpense: 18500000000 },
          { id: 3, term: 6, totalIncome: 45200000000, totalExpense: 27800000000 },
          { id: 4, term: 9, totalIncome: 32100000000, totalExpense: 19500000000 },
          { id: 5, term: 12, totalIncome: 68400000000, totalExpense: 42300000000 },
        ]
      },
      flexibleSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 8400000000, totalExpense: 5800000000 },
          { id: 2, term: 3, totalIncome: 15600000000, totalExpense: 10200000000 },
          { id: 3, term: 6, totalIncome: 23800000000, totalExpense: 15400000000 },
          { id: 4, term: 9, totalIncome: 18700000000, totalExpense: 12100000000 },
          { id: 5, term: 12, totalIncome: 35600000000, totalExpense: 22800000000 },
        ]
      }
    },
    {
      id: 'rep-2023-11',
      month: 11,
      year: 2023,
      totalCapital: 1180000000000,
      netCapital: 920000000000,
      standardSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 11800000000, totalExpense: 7900000000 },
          { id: 2, term: 3, totalIncome: 26500000000, totalExpense: 17200000000 },
          { id: 3, term: 6, totalIncome: 42100000000, totalExpense: 26300000000 },
          { id: 4, term: 9, totalIncome: 29800000000, totalExpense: 18400000000 },
          { id: 5, term: 12, totalIncome: 64200000000, totalExpense: 40100000000 },
        ]
      },
      flexibleSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 7900000000, totalExpense: 5300000000 },
          { id: 2, term: 3, totalIncome: 14800000000, totalExpense: 9700000000 },
          { id: 3, term: 6, totalIncome: 22500000000, totalExpense: 14600000000 },
          { id: 4, term: 9, totalIncome: 17600000000, totalExpense: 11400000000 },
          { id: 5, term: 12, totalIncome: 33800000000, totalExpense: 21500000000 },
        ]
      }
    },
    {
      id: 'rep-2023-10',
      month: 10,
      year: 2023,
      totalCapital: 1120000000000,
      netCapital: 870000000000,
      standardSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 11200000000, totalExpense: 7500000000 },
          { id: 2, term: 3, totalIncome: 25100000000, totalExpense: 16300000000 },
          { id: 3, term: 6, totalIncome: 39800000000, totalExpense: 24900000000 },
          { id: 4, term: 9, totalIncome: 28200000000, totalExpense: 17400000000 },
          { id: 5, term: 12, totalIncome: 60800000000, totalExpense: 38000000000 },
        ]
      },
      flexibleSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 7500000000, totalExpense: 5000000000 },
          { id: 2, term: 3, totalIncome: 14000000000, totalExpense: 9200000000 },
          { id: 3, term: 6, totalIncome: 21300000000, totalExpense: 13800000000 },
          { id: 4, term: 9, totalIncome: 16700000000, totalExpense: 10800000000 },
          { id: 5, term: 12, totalIncome: 32000000000, totalExpense: 20300000000 },
        ]
      }
    },
    {
      id: 'rep-2023-09',
      month: 9,
      year: 2023,
      totalCapital: 1080000000000,
      netCapital: 840000000000,
      standardSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 10800000000, totalExpense: 7200000000 },
          { id: 2, term: 3, totalIncome: 24300000000, totalExpense: 15700000000 },
          { id: 3, term: 6, totalIncome: 38400000000, totalExpense: 24000000000 },
          { id: 4, term: 9, totalIncome: 27200000000, totalExpense: 16800000000 },
          { id: 5, term: 12, totalIncome: 58600000000, totalExpense: 36600000000 },
        ]
      },
      flexibleSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 7200000000, totalExpense: 4800000000 },
          { id: 2, term: 3, totalIncome: 13500000000, totalExpense: 8800000000 },
          { id: 3, term: 6, totalIncome: 20500000000, totalExpense: 13300000000 },
          { id: 4, term: 9, totalIncome: 16100000000, totalExpense: 10400000000 },
          { id: 5, term: 12, totalIncome: 30900000000, totalExpense: 19600000000 },
        ]
      }
    },
    {
      id: 'rep-2023-08',
      month: 8,
      year: 2023,
      totalCapital: 1050000000000,
      netCapital: 820000000000,
      standardSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 10500000000, totalExpense: 7000000000 },
          { id: 2, term: 3, totalIncome: 23600000000, totalExpense: 15300000000 },
          { id: 3, term: 6, totalIncome: 37300000000, totalExpense: 23300000000 },
          { id: 4, term: 9, totalIncome: 26400000000, totalExpense: 16300000000 },
          { id: 5, term: 12, totalIncome: 56900000000, totalExpense: 35600000000 },
        ]
      },
      flexibleSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 7000000000, totalExpense: 4700000000 },
          { id: 2, term: 3, totalIncome: 13100000000, totalExpense: 8600000000 },
          { id: 3, term: 6, totalIncome: 19900000000, totalExpense: 12900000000 },
          { id: 4, term: 9, totalIncome: 15600000000, totalExpense: 10100000000 },
          { id: 5, term: 12, totalIncome: 30000000000, totalExpense: 19000000000 },
        ]
      }
    },
    {
      id: 'rep-2023-07',
      month: 7,
      year: 2023,
      totalCapital: 1020000000000,
      netCapital: 790000000000,
      standardSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 10200000000, totalExpense: 6800000000 },
          { id: 2, term: 3, totalIncome: 22900000000, totalExpense: 14900000000 },
          { id: 3, term: 6, totalIncome: 36200000000, totalExpense: 22600000000 },
          { id: 4, term: 9, totalIncome: 25600000000, totalExpense: 15800000000 },
          { id: 5, term: 12, totalIncome: 55200000000, totalExpense: 34500000000 },
        ]
      },
      flexibleSavings: {
        terms: [
          { id: 1, term: 1, totalIncome: 6800000000, totalExpense: 4500000000 },
          { id: 2, term: 3, totalIncome: 12700000000, totalExpense: 8300000000 },
          { id: 3, term: 6, totalIncome: 19300000000, totalExpense: 12500000000 },
          { id: 4, term: 9, totalIncome: 15200000000, totalExpense: 9800000000 },
          { id: 5, term: 12, totalIncome: 29100000000, totalExpense: 18500000000 },
        ]
      }
    }
  ]);

  // Filter reports based on search query
  const filteredReports = reports.filter(report => {
    const searchString = `${report.month}/${report.year}`;
    return searchString.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle view report
  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  // Handle back to list
  const handleBackToList = () => {
    setSelectedReport(null);
  };

  // Handle export
  const handleExport = (format) => {
    console.log(`Exporting report ${selectedReport.id} as ${format}`);
    // In a real application, this would trigger the export process
  };

  return (
    <div className="container mx-auto p-0 md:p-6 max-w-7xl">
      <AnimatePresence mode="wait">
        {!selectedReport ? (
          // Reports List View
          <motion.div
            key="report-list"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Báo Cáo Doanh Số</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Xem và phân tích báo cáo doanh số theo từng tháng
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-lg ${viewType === 'grid' 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Grid size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-lg ${viewType === 'list' 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <List size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <ReportSearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            {/* Reports Display (Grid or List) */}
            <div className="mt-6">
              {viewType === 'grid' ? (
                <ReportGrid 
                  reports={filteredReports}
                  onViewReport={handleViewReport}
                  formatCurrency={formatCurrency}
                />
              ) : (
                <ReportList 
                  reports={filteredReports}
                  onViewReport={handleViewReport}
                  formatCurrency={formatCurrency}
                />
              )}
            </div>
          </motion.div>
        ) : (
          // Report Detail View
          <motion.div
            key="report-detail"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.05, x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToList}
                  className="mr-4 p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <ArrowLeft size={20} />
                </motion.button>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Báo Cáo Doanh Số Tháng {selectedReport.month}/{selectedReport.year}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
                    <Calendar size={14} className="mr-1 flex-shrink-0" />
                    Dữ liệu cập nhật ngày 15/{selectedReport.month}/{selectedReport.year}
                  </p>
                </div>
              </div>
              
              {/* Export Buttons */}
              <ExportButtons onExport={handleExport} />
            </div>
            
            {/* Report Summary */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="md:mt-8 bg-gradient-to-br from-blue-50/80 to-white rounded-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] p-6 mb-8 border border-blue-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,170,255,0.10)' }}
                  className="bg-white/80 rounded-2xl p-5 flex items-center shadow-[0_2px_12px_rgba(0,170,255,0.06)] border border-blue-50"
                >
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2, ease: 'easeInOut' }}
                    className="mr-4 flex-shrink-0"
                  >
                    <DollarSign size={28} className="text-blue-500" />
                  </motion.span>
                  <div>
                    <p className="text-sm text-gray-500">Tổng số vốn huy động</p>
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(selectedReport.totalCapital)}</p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,170,255,0.10)' }}
                  className="bg-white/80 rounded-2xl p-5 flex items-center shadow-[0_2px_12px_rgba(0,170,255,0.06)] border border-blue-50"
                >
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.2, ease: 'easeInOut' }}
                    className="mr-4 flex-shrink-0"
                  >
                    <TrendingUp size={28} className="text-blue-500" />
                  </motion.span>
                  <div>
                    <p className="text-sm text-gray-500">Tổng số vốn huy động ròng</p>
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(selectedReport.netCapital)}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Report Detail Content */}
            <ReportDetail 
              report={selectedReport}
              formatCurrency={formatCurrency}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalesReportPage; 