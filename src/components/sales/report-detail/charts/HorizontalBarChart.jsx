import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList
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
          <BarChart2 size={16} className="text-blue-500" />
          <span className="font-semibold text-blue-700 text-sm">{item.label}</span>
        </div>
        <div className="text-xs text-gray-500">Giá trị: <span className="font-bold text-indigo-700">{formatCurrency(item.value)}</span></div>
      </motion.div>
    );
  }
  return null;
};

const HorizontalBarChart = ({ totalCapital, netCapital, formatCurrency }) => {
  const data = [
    { label: 'Tổng vốn huy động', value: totalCapital, fill: 'url(#totalGradient)' },
    { label: 'Vốn huy động ròng', value: netCapital, fill: 'url(#netGradient)' },
  ];

  const gradients = (
    <defs>
      <linearGradient id="totalGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#93C5FD" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id="netGradient" x1="0" y1="0" x2="1" y2="0">
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
        <BarChart2 size={18} className="text-blue-500 mr-2" />
        So sánh vốn huy động
      </h3>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            {gradients}
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E7EF" />
            <XAxis type="number" tickFormatter={v => v >= 1e12 ? (v/1e12)+ 'T' : v >= 1e9 ? (v/1e9)+'B' : v >= 1e6 ? (v/1e6)+'M' : v >= 1e3 ? (v/1e3)+'K' : v} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <YAxis dataKey="label" type="category" tick={{ fontSize: 13, fill: '#6366F1', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip formatCurrency={formatCurrency} />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
            <Bar dataKey="value" radius={[10, 10, 10, 10]} isAnimationActive>
              <LabelList dataKey="value" position="right" formatter={formatCurrency} fill="#6366F1" fontWeight={700} fontSize={13} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-gray-500">Tổng vốn huy động</p>
          <p className="text-sm font-medium text-gray-800">{formatCurrency(totalCapital)}</p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-3">
          <p className="text-xs text-gray-500">Vốn huy động ròng</p>
          <p className="text-sm font-medium text-gray-800">{formatCurrency(netCapital)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalBarChart; 