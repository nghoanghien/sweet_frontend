import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DonutTooltip = ({ active, payload, formatCurrency }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-sm bg-white/80 border border-blue-100 shadow-lg rounded-2xl p-4 min-w-[140px]"
      >
        <div className="flex items-center gap-2 mb-1">
          <DollarSign size={16} className="text-blue-500" />
          <span className="font-semibold text-blue-700 text-sm">{item.name}</span>
        </div>
        <div className="text-xs text-gray-500">Giá trị: <span className="font-bold text-indigo-700">{formatCurrency(item.value)}</span></div>
      </motion.div>
    );
  }
  return null;
};

const DonutChart = ({ totalCapital, netCapital, formatCurrency }) => {
  const data = [
    { name: 'Vốn ròng', value: netCapital, color: '#6366F1' },
    { name: 'Khác', value: totalCapital - netCapital, color: '#E0E7EF' },
  ];
  const percentage = Math.round((netCapital / totalCapital) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-gradient-to-br from-blue-50/80 to-white rounded-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] p-6 border border-blue-100"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <DollarSign size={18} className="text-blue-500 mr-2" />
        Tỷ lệ vốn huy động ròng
      </h3>
      <div className="flex items-center justify-center">
        <div className="relative w-56 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                isAnimationActive
                stroke="none"
              >
                {data.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip formatCurrency={formatCurrency} />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.p
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl font-bold text-blue-600"
            >
              {percentage}%
            </motion.p>
            <p className="text-sm text-gray-500">Vốn ròng</p>
          </div>
        </div>
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

export default DonutChart; 