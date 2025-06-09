import React from 'react';
import { motion } from 'framer-motion';
import { BarChart as BarChartIcon } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label, formatCurrency }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-sm bg-white/80 border border-blue-100 shadow-lg rounded-2xl p-4 min-w-[140px]"
      >
        <div className="flex items-center gap-2 mb-1">
          <BarChartIcon size={16} className="text-blue-500" />
          <span className="font-semibold text-blue-700 text-sm">{item.term} tháng</span>
        </div>
        <div className="text-xs text-gray-500">Thu: <span className="font-bold text-green-700">{formatCurrency(item.totalIncome)}</span></div>
        <div className="text-xs text-gray-500">Chi: <span className="font-bold text-red-700">{formatCurrency(item.totalExpense)}</span></div>
        <div className="text-xs text-gray-500">Chênh lệch: <span className="font-bold text-indigo-700">{formatCurrency(item.totalIncome - item.totalExpense)}</span></div>
      </motion.div>
    );
  }
  return null;
};

const GroupedBarChart = ({ data, formatCurrency }) => {
  // Tìm kỳ hạn hiệu quả nhất
  const bestTerm = data && data.length > 0 ? data.reduce((best, item) => {
    const diff = item.totalIncome - item.totalExpense;
    return diff > (best.totalIncome - best.totalExpense) ? item : best;
  }, data[0]) : null;

  // Tạo gradient cho từng bar
  const gradients = (
    <defs>
      <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22C55E" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#A7F3D0" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#FCA5A5" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id="diffGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#C7D2FE" stopOpacity={0.5} />
      </linearGradient>
    </defs>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-gradient-to-br from-blue-50/80 to-white rounded-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] p-6 border border-blue-100"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <BarChartIcon size={18} className="text-blue-500 mr-2" />
        Phân tích thu chi theo kỳ hạn
      </h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 30 }}>
            {gradients}
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E7EF" />
            <XAxis dataKey="term" tick={{ fontSize: 13, fill: '#6366F1', fontWeight: 600 }} axisLine={false} tickLine={false} unit=" tháng" />
            <YAxis tickFormatter={v => v >= 1e12 ? (v/1e12)+ 'T' : v >= 1e9 ? (v/1e9)+'B' : v >= 1e6 ? (v/1e6)+'M' : v >= 1e3 ? (v/1e3)+'K' : v} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip formatCurrency={formatCurrency} />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: '#6366F1', fontWeight: 600 }} />
            <Bar dataKey="totalIncome" name="Thu" fill="url(#incomeGradient)" radius={[10, 10, 0, 0]} isAnimationActive />
            <Bar dataKey="totalExpense" name="Chi" fill="url(#expenseGradient)" radius={[10, 10, 0, 0]} isAnimationActive />
            <Bar dataKey={row => row.totalIncome - row.totalExpense} name="Chênh lệch" fill="url(#diffGradient)" radius={[10, 10, 0, 0]} isAnimationActive />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {bestTerm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100"
        >
          <p className="text-xs text-blue-700 font-medium">Kỳ hạn hiệu quả nhất: <span className="font-bold text-indigo-700">{bestTerm.term} tháng</span></p>
          <p className="text-xs text-gray-600 mt-1">
            Chênh lệch: <span className="font-medium text-green-600">{formatCurrency(bestTerm.totalIncome - bestTerm.totalExpense)}</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GroupedBarChart;