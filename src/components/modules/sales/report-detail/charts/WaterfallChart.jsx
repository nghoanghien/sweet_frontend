import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList, Legend
} from 'recharts';

// Custom Tooltip
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
          <TrendingUp size={16} className="text-blue-500" />
          <span className="font-semibold text-blue-700 text-sm">{item.label}</span>
        </div>
        <div className="text-xs text-gray-500">Giá trị: <span className="font-bold text-indigo-700">{formatCurrency(item.value)}</span></div>
      </motion.div>
    );
  }
  return null;
};

const WaterfallChart = ({ data, formatCurrency }) => {
  // Chuẩn hóa dữ liệu cho waterfall
  const chartData = [
    { label: 'Bắt đầu', value: 0, fill: 'url(#startGradient)' },
    { label: 'Thu', value: data?.totalIncome || 0, fill: 'url(#incomeGradient)' },
    { label: 'Chi', value: -(data?.totalExpense || 0), fill: 'url(#expenseGradient)' },
    { label: 'Chênh lệch', value: (data?.totalIncome || 0) - (data?.totalExpense || 0), fill: 'url(#endGradient)' },
  ];

  // Tính toán giá trị tích lũy để vẽ waterfall
  let acc = 0;
  const waterfallData = chartData.map((d, i) => {
    if (i === 0) {
      acc = 0;
      return { ...d, acc: 0 };
    }
    if (d.label === 'Chi') {
      acc = acc - Math.abs(d.value);
      return { ...d, acc };
    }
    acc = acc + Math.abs(d.value);
    return { ...d, acc };
  });

  // Tạo gradient cho từng bar
  const gradients = (
    <defs>
      <linearGradient id="startGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#CBD5E1" stopOpacity={0.3} />
      </linearGradient>
      <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22C55E" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#A7F3D0" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#FCA5A5" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id="endGradient" x1="0" y1="0" x2="0" y2="1">
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
        <TrendingUp size={18} className="text-blue-500 mr-2" />
        Dòng tiền theo kỳ hạn
      </h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 10, bottom: 30 }}>
            {gradients}
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E7EF" />
            <XAxis dataKey="label" tick={{ fontSize: 13, fill: '#6366F1', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => v >= 1e12 ? (v/1e12)+ 'T' : v >= 1e9 ? (v/1e9)+'B' : v >= 1e6 ? (v/1e6)+'M' : v >= 1e3 ? (v/1e3)+'K' : v} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip formatCurrency={formatCurrency} />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
            <Bar dataKey="value" radius={[12, 12, 6, 6]} isAnimationActive fill="#6366F1">
              <LabelList dataKey="value" position="top" formatter={formatCurrency} fill="#6366F1" fontWeight={700} fontSize={13} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-green-50 rounded-xl p-3">
          <p className="text-xs text-gray-500">Tổng thu</p>
          <p className="text-sm font-medium text-green-700">{formatCurrency(data?.totalIncome || 0)}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-3">
          <p className="text-xs text-gray-500">Tổng chi</p>
          <p className="text-sm font-medium text-red-700">{formatCurrency(data?.totalExpense || 0)}</p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-3">
          <p className="text-xs text-gray-500">Chênh lệch</p>
          <p className="text-sm font-medium text-indigo-700">
            {formatCurrency((data?.totalIncome || 0) - (data?.totalExpense || 0))}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WaterfallChart; 