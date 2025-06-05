
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const SavingsTermTable = ({ title, terms, formatCurrency }) => {
  // Find the term with the highest difference (most effective)
  const findMostEffectiveTerm = () => {
    if (!terms || terms.length === 0) return null;
    
    let mostEffectiveTerm = terms[0];
    let maxDifference = terms[0].totalIncome - terms[0].totalExpense;
    
    terms.forEach(term => {
      const difference = term.totalIncome - term.totalExpense;
      if (difference > maxDifference) {
        maxDifference = difference;
        mostEffectiveTerm = term;
      }
    });
    
    return mostEffectiveTerm.id;
  };
  
  const mostEffectiveTermId = findMostEffectiveTerm();
  
  // Format currency for mobile - convert to tỷ/tr format
  const formatCurrencyMobile = (amount) => {
    if (amount >= 1000000000) { // >= 1 billion
      return `${(amount / 1000000000).toFixed(1)} tỷ`;
    } else if (amount >= 1000000) { // >= 1 million
      return `${Math.round(amount / 1000000)}tr`;
    }
    return formatCurrency(amount);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl shadow-[0_4px_20px_rgba(99,102,241,0.10)] border border-blue-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-8 py-5 border-b border-blue-100">
        <h3 className="text-lg font-bold text-gray-800 tracking-wide">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-50/60">
            <tr>
              {/* STT column - hidden on mobile */}
              <th className="hidden sm:table-cell px-6 py-3 text-center text-xs font-bold text-blue-700 uppercase tracking-wider">STT</th>
              
              {/* Kỳ hạn column */}
              <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-blue-700 uppercase tracking-wider">
                <span className="block sm:inline">Kỳ hạn</span>
                <span className="block sm:inline sm:ml-1">(tháng)</span>
              </th>
              
              {/* Tổng thu column */}
              <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-blue-700 uppercase tracking-wider">
                <span className="block sm:inline">Tổng</span>
                <span className="block sm:inline sm:ml-1">thu</span>
              </th>
              
              {/* Tổng chi column */}
              <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-blue-700 uppercase tracking-wider">
                <span className="block sm:inline">Tổng</span>
                <span className="block sm:inline sm:ml-1">chi</span>
              </th>
              
              {/* Chênh lệch column */}
              <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-blue-700 uppercase tracking-wider">
                <span className="block sm:inline">Chênh</span>
                <span className="block sm:inline sm:ml-1">lệch</span>
              </th>
              
              {/* Hiệu quả column - hidden on mobile */}
              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Hiệu quả</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-50">
            {terms.map((term) => {
              const difference = term.totalIncome - term.totalExpense;
              const effectivenessPercentage = ((difference / term.totalExpense) * 100).toFixed(1);
              const isMostEffective = term.id === mostEffectiveTermId;
              return (
                <motion.tr
                  key={term.id}
                  className={`hover:bg-blue-50/40 text-center transition-colors ${isMostEffective ? 'bg-blue-50/80' : ''}`}
                  whileHover={{ backgroundColor: 'rgba(219,234,254,0.5)' }}
                >
                  {/* STT column - hidden on mobile */}
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{term.id}</td>
                  
                  {/* Kỳ hạn column */}
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className={`p-2 rounded-lg text-sm sm:text-base ${isMostEffective ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-gray-100 text-gray-700'}`}>
                      <span>{term.term}</span>
                      {/* Show STT on mobile as a small badge */}
                      <span className="sm:hidden ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">#{term.id}</span>
                    </div>
                  </td>
                  
                  {/* Tổng thu column */}
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm text-green-600 font-medium">
                    <span className="sm:hidden">{formatCurrencyMobile(term.totalIncome)}</span>
                    <span className="hidden sm:inline">{formatCurrency(term.totalIncome)}</span>
                  </td>
                  
                  {/* Tổng chi column */}
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm text-red-600 font-medium">
                    <span className="sm:hidden">{formatCurrencyMobile(term.totalExpense)}</span>
                    <span className="hidden sm:inline">{formatCurrency(term.totalExpense)}</span>
                  </td>
                  
                  {/* Chênh lệch column */}
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm text-indigo-600 font-bold">
                    <div>
                      <span className="sm:hidden">{formatCurrencyMobile(difference)}</span>
                      <span className="hidden sm:inline">{formatCurrency(difference)}</span>
                      {/* Show effectiveness on mobile as a small indicator */}
                      <div className="sm:hidden mt-1">
                        <div className="flex items-center justify-center">
                          {difference > 0 ? (
                            <TrendingUp size={12} className="text-green-500 mr-1" />
                          ) : difference < 0 ? (
                            <TrendingDown size={12} className="text-red-500 mr-1" />
                          ) : (
                            <Minus size={12} className="text-gray-500 mr-1" />
                          )}
                          <span className={`text-xs font-bold ${difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {effectivenessPercentage}%
                          </span>
                          {isMostEffective && (
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
                              className="ml-1 px-1.5 py-0.5 bg-gradient-to-r from-blue-400/20 to-indigo-400/10 text-blue-700 text-xs rounded-full border border-blue-200 shadow-sm font-semibold"
                            >
                              ★
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Hiệu quả column - hidden on mobile */}
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {difference > 0 ? (
                        <TrendingUp size={16} className="text-green-500 mr-1" />
                      ) : difference < 0 ? (
                        <TrendingDown size={16} className="text-red-500 mr-1" />
                      ) : (
                        <Minus size={16} className="text-gray-500 mr-1" />
                      )}
                      <span className={`text-sm font-bold ${difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                        {effectivenessPercentage}%
                      </span>
                      {isMostEffective && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
                          className="ml-2 px-2 py-0.5 bg-gradient-to-r from-blue-400/20 to-indigo-400/10 text-blue-700 text-xs rounded-full border border-blue-200 shadow-sm font-semibold"
                        >
                          Tốt nhất
                        </motion.span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};


export default SavingsTermTable; 