import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp } from 'lucide-react';

// Import charts and tables
import DonutChart from './charts/DonutChart';
import HorizontalBarChart from './charts/HorizontalBarChart';
import GroupedBarChart from './charts/GroupedBarChart';
import WaterfallChart from './charts/WaterfallChart';
import SavingsTermTable from './SavingsTermTable';

// Import shimmer components
import DonutChartShimmer from '@/components/ui/custom/shimmer-types/DonutChartShimmer';
import HorizontalBarChartShimmer from '@/components/ui/custom/shimmer-types/HorizontalBarChartShimmer';
import GroupedBarChartShimmer from '@/components/ui/custom/shimmer-types/GroupedBarChartShimmer';
import WaterfallChartShimmer from '@/components/ui/custom/shimmer-types/WaterfallChartShimmer';
import SavingsTermTableShimmer from '@/components/ui/custom/shimmer-types/SavingsTermTableShimmer';
import Skeleton from '@/components/ui/custom/Skeleton';

const ReportDetail = ({ report, formatCurrency }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Find the best term for each savings type
  const findBestTerm = (terms) => {
    if (!terms || terms.length === 0) return null;
    
    let bestTerm = terms[0];
    let maxDifference = terms[0].totalIncome - terms[0].totalExpense;
    
    terms.forEach(term => {
      const difference = term.totalIncome - term.totalExpense;
      if (difference > maxDifference) {
        maxDifference = difference;
        bestTerm = term;
      }
    });
    
    return bestTerm;
  };
  
  const standardBestTerm = findBestTerm(report.standardSavings.terms);
  const flexibleBestTerm = findBestTerm(report.flexibleSavings.terms);
  
  return (
    <div className="space-y-10">
      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {isLoading ? (
          <>
            <DonutChartShimmer />
            <HorizontalBarChartShimmer />
          </>
        ) : (
          <>
            <DonutChart 
              totalCapital={report.totalCapital} 
              netCapital={report.netCapital} 
              formatCurrency={formatCurrency} 
            />
            <HorizontalBarChart 
              totalCapital={report.totalCapital} 
              netCapital={report.netCapital} 
              formatCurrency={formatCurrency} 
            />
          </>
        )}
      </motion.div>
      
      {/* Standard Savings Section */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="bg-gradient-to-br from-blue-50/80 to-white rounded-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] p-4 md:p-8 border border-blue-100"
      >
        {isLoading ? (
          <>
            <div className="mb-7 flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded mr-2 relative overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <Skeleton isLoading={true} width="200px" height="28px" className="rounded" />
            </div>
            
            <SavingsTermTableShimmer />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <GroupedBarChartShimmer />
              <WaterfallChartShimmer />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-7 flex items-center">
              <FileText size={22} className="text-blue-500 mr-2" />
              Tiết kiệm tiêu chuẩn
            </h2>
            
            <SavingsTermTable 
              title="Bảng dữ liệu theo kỳ hạn" 
              terms={report.standardSavings.terms} 
              formatCurrency={formatCurrency} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <GroupedBarChart 
                data={report.standardSavings.terms} 
                formatCurrency={formatCurrency} 
              />
              <WaterfallChart 
                data={standardBestTerm} 
                formatCurrency={formatCurrency} 
              />
            </div>
          </>
        )}
      </motion.div>
      
      {/* Flexible Savings Section */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="bg-gradient-to-br from-indigo-50/80 to-white rounded-3xl shadow-[0_4px_30px_rgba(99,102,241,0.10)] p-4 sm:p-8 border border-indigo-100"
      >
        {isLoading ? (
          <>
            <div className="mb-7 flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded mr-2 relative overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <Skeleton isLoading={true} width="280px" height="28px" className="rounded" />
            </div>
            
            <SavingsTermTableShimmer />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <GroupedBarChartShimmer />
              <WaterfallChartShimmer />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-7 flex items-center">
              <TrendingUp size={22} className="text-indigo-500 mr-2" />
              Tiết kiệm rút gốc linh hoạt
            </h2>
            
            <SavingsTermTable 
              title="Bảng dữ liệu theo kỳ hạn" 
              terms={report.flexibleSavings.terms} 
              formatCurrency={formatCurrency} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <GroupedBarChart 
                data={report.flexibleSavings.terms} 
                formatCurrency={formatCurrency} 
              />
              <WaterfallChart 
                data={flexibleBestTerm} 
                formatCurrency={formatCurrency} 
              />
            </div>
          </>
        )}
      </motion.div>
      
      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="bg-gradient-to-br from-green-50/80 to-white rounded-3xl shadow-[0_4px_30px_rgba(34,197,94,0.10)] p-8 border border-green-100"
      >
        {isLoading ? (
          <>
            <div className="mb-6 flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded mr-2 relative overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <Skeleton isLoading={true} width="180px" height="28px" className="rounded" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white/90 rounded-2xl p-6 shadow-md border border-green-100">
                <Skeleton isLoading={true} width="160px" height="20px" className="rounded mb-4" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton isLoading={true} width="140px" height="16px" className="rounded" />
                    <Skeleton isLoading={true} width="80px" height="16px" className="rounded" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton isLoading={true} width="80px" height="16px" className="rounded" />
                    <Skeleton isLoading={true} width="120px" height="16px" className="rounded" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton isLoading={true} width="80px" height="16px" className="rounded" />
                    <Skeleton isLoading={true} width="120px" height="16px" className="rounded" />
                  </div>
                  <div className="flex justify-between border-t border-green-100 pt-2">
                    <Skeleton isLoading={true} width="80px" height="16px" className="rounded" />
                    <Skeleton isLoading={true} width="120px" height="16px" className="rounded" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 rounded-2xl p-6 shadow-md border border-green-100">
                <Skeleton isLoading={true} width="220px" height="20px" className="rounded mb-4" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton isLoading={true} width="140px" height="16px" className="rounded" />
                    <Skeleton isLoading={true} width="80px" height="16px" className="rounded" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton isLoading={true} width="80px" height="16px" className="rounded" />
                    <Skeleton isLoading={true} width="120px" height="16px" className="rounded" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton isLoading={true} width="80px" height="16px" className="rounded" />
                    <Skeleton isLoading={true} width="120px" height="16px" className="rounded" />
                  </div>
                  <div className="flex justify-between border-t border-green-100 pt-2">
                    <Skeleton isLoading={true} width="80px" height="16px" className="rounded" />
                    <Skeleton isLoading={true} width="120px" height="16px" className="rounded" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white/90 rounded-2xl p-6 shadow-md border border-green-100">
              <Skeleton isLoading={true} width="100px" height="20px" className="rounded mb-4" />
              <div className="space-y-2">
                <Skeleton isLoading={true} width="100%" height="16px" className="rounded" />
                <Skeleton isLoading={true} width="95%" height="16px" className="rounded" />
                <Skeleton isLoading={true} width="100%" height="16px" className="rounded" />
                <Skeleton isLoading={true} width="90%" height="16px" className="rounded" />
                <Skeleton isLoading={true} width="100%" height="16px" className="rounded" />
                <Skeleton isLoading={true} width="85%" height="16px" className="rounded" />
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FileText size={22} className="text-green-500 mr-2" />
              Tóm tắt báo cáo
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white/90 rounded-2xl p-6 shadow-md border border-green-100"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tiết kiệm tiêu chuẩn</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kỳ hạn hiệu quả nhất:</span>
                    <span className="font-medium text-blue-700">{standardBestTerm.term} tháng</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng thu:</span>
                    <span className="font-medium text-green-700">{formatCurrency(standardBestTerm.totalIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng chi:</span>
                    <span className="font-medium text-red-700">{formatCurrency(standardBestTerm.totalExpense)}</span>
                  </div>
                  <div className="flex justify-between border-t border-green-100 pt-2">
                    <span className="text-gray-600">Chênh lệch:</span>
                    <span className="font-medium text-indigo-700">
                      {formatCurrency(standardBestTerm.totalIncome - standardBestTerm.totalExpense)}
                    </span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/90 rounded-2xl p-6 shadow-md border border-green-100"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tiết kiệm rút gốc linh hoạt</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kỳ hạn hiệu quả nhất:</span>
                    <span className="font-medium text-indigo-700">{flexibleBestTerm.term} tháng</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng thu:</span>
                    <span className="font-medium text-green-700">{formatCurrency(flexibleBestTerm.totalIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng chi:</span>
                    <span className="font-medium text-red-700">{formatCurrency(flexibleBestTerm.totalExpense)}</span>
                  </div>
                  <div className="flex justify-between border-t border-green-100 pt-2">
                    <span className="text-gray-600">Chênh lệch:</span>
                    <span className="font-medium text-indigo-700">
                      {formatCurrency(flexibleBestTerm.totalIncome - flexibleBestTerm.totalExpense)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 bg-white/90 rounded-2xl p-6 shadow-md border border-green-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Kết luận</h3>
              <p className="text-gray-700">
                Báo cáo doanh số tháng {report.month}/{report.year} cho thấy tổng vốn huy động đạt {formatCurrency(report.totalCapital)}, 
                trong đó vốn huy động ròng đạt {formatCurrency(report.netCapital)} (chiếm {Math.round((report.netCapital / report.totalCapital) * 100)}%).
              </p>
              <p className="text-gray-700 mt-2">
                Đối với sản phẩm tiết kiệm tiêu chuẩn, kỳ hạn {standardBestTerm.term} tháng mang lại hiệu quả cao nhất với chênh lệch 
                {formatCurrency(standardBestTerm.totalIncome - standardBestTerm.totalExpense)}.
              </p>
              <p className="text-gray-700 mt-2">
                Đối với sản phẩm tiết kiệm rút gốc linh hoạt, kỳ hạn {flexibleBestTerm.term} tháng mang lại hiệu quả cao nhất với chênh lệch 
                {formatCurrency(flexibleBestTerm.totalIncome - flexibleBestTerm.totalExpense)}.
              </p>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ReportDetail;