'use client';

import React from 'react';
import { 
  Wallet, 
  DollarSign, 
  Clock, 
  Users, 
  Receipt, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowUp, 
  Percent, 
  Filter, 
  Share2,
  TrendingDown,
  ArrowDown,
  MoreVertical,
  PieChart,
  BarChart4,
  LineChart,
  DownloadCloud,
  ArrowUpCircle,
  ArrowDownCircle,
  Sparkles
} from "lucide-react";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Helper component for the card menu icon
const CardMenuIcon = ({ className = "text-white/70 hover:text-white" }) => (
  <button className={`absolute top-3 right-3 p-1 rounded-full ${className}`}>
    <MoreVertical size={18} />
  </button>
);

// Small avatar group component for team/customer display
const AvatarGroup = ({ count = 3 }) => (
  <div className="flex -space-x-2">
    {Array(count).fill().map((_, i) => (
      <div 
        key={i} 
        className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs text-white
                   ${i % 3 === 0 ? 'bg-indigo-500' : i % 3 === 1 ? 'bg-green-500' : 'bg-amber-500'}`}
      >
        {String.fromCharCode(65 + i)}
      </div>
    ))}
  </div>
);

// Styled progress bar component
const ProgressBar = ({ value, max, color, height = "h-2" }) => (
  <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${height}`}>
    <div 
      className={`${color} rounded-full`} 
      style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
    ></div>
  </div>
);

// Mini bar chart for visual statistics
const MiniBarChart = ({ data, colorClass = "bg-indigo-600" }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="flex items-end h-12 space-x-1 mt-2">
      {data.map((value, i) => (
        <div
          key={i}
          className={`${colorClass} w-[6px] rounded-sm transition-all duration-500 hover:opacity-80`}
          style={{ height: `${(value / maxValue) * 100}%` }}
        ></div>
      ))}
    </div>
  );
};

export default function BankOverview({ formatCurrency, bankStatistics }) {
  // Mini-dataset for trend bars
  const recentTrend = bankStatistics.monthlyCapitalTrend.slice(-6);
  const growthTrend = bankStatistics.monthlyGrowthRate.slice(-6);
  
  return (
    <div className="font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center">
            <Sparkles className="text-amber-500 mr-2" size={20} />
            Tổng quan Ngân hàng
          </h2>
          <p className="text-gray-600">Biểu đồ hoạt động và thống kê chi tiết</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl transition-all hover:bg-slate-200">
            <Filter size={16} />
            <span>Lọc dữ liệu</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl transition-all hover:bg-indigo-700">
            <DownloadCloud size={16} />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        {/* Featured Card - Monthly Growth */}
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg">
          <CardMenuIcon />
          <div className="relative z-10">
            <span className="text-indigo-200 text-sm">Tăng trưởng tháng này</span>
            <h3 className="text-4xl font-bold mt-1 mb-6">+8.5%</h3>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-indigo-100 text-sm mb-1">Vượt mục tiêu</p>
                <div className="flex items-center">
                  <ArrowUpRight className="text-green-300 mr-1" size={16} />
                  <span className="text-green-300 font-medium">1.5%</span>
                </div>
              </div>
              <MiniBarChart 
                data={growthTrend} 
                colorClass="bg-white/60" 
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 opacity-10">
            <TrendingUp size={180} />
          </div>
        </div>
        
        {/* Capital Stats */}
        <div className="md:col-span-3 bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 h-full flex flex-col">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Vốn huy động</h3>
            
            <div className="space-y-4 flex-grow">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tổng vốn</span>
                  <span className="font-medium">{formatCurrency(bankStatistics.totalCapitalRaised)}</span>
                </div>
                <ProgressBar value={bankStatistics.totalCapitalRaised} max={bankStatistics.totalCapitalRaised * 1.3} color="bg-blue-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Hiện tại</span>
                  <span className="font-medium">{formatCurrency(bankStatistics.currentCapital)}</span>
                </div>
                <ProgressBar value={bankStatistics.currentCapital} max={bankStatistics.totalCapitalRaised} color="bg-green-500" />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1 rounded-full bg-blue-50">
                  <ArrowUpCircle size={16} className="text-blue-600" />
                </div>
                <span className="text-gray-600">Tăng <span className="text-blue-600 font-medium">11.2%</span> so với quý trước</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Terms Stats */}
        <div className="md:col-span-4 grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-5 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500">Kỳ hạn TB</h3>
              <div className="p-1.5 bg-purple-50 text-purple-600 rounded-full">
                <Clock size={16} />
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-baseline">
                <p className="text-3xl font-bold">{bankStatistics.averageTermMonths}</p>
                <span className="ml-1 text-gray-500 text-sm">tháng</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-green-600 mt-3">
              <ArrowUpRight size={14} />
              <span>Tăng 0.6 tháng so với kỳ trước</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500">Tỷ lệ tái gửi</h3>
              <div className="p-1.5 bg-rose-50 text-rose-600 rounded-full">
                <Percent size={16} />
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex gap-1 items-baseline">
                <p className="text-3xl font-bold">{bankStatistics.renewalRateByValue}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-green-600 mt-3">
              <ArrowUp size={14} />
              <span>Tăng 4.2% so với kỳ trước</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customers and Deposits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Customer Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Khách hàng</h3>
            <div className="p-1.5 bg-amber-50 text-amber-600 rounded-full">
              <Users size={16} />
            </div>
          </div>
          
          <div className="flex justify-between items-center z-10 relative mb-6">
            <div>
              <p className="text-3xl font-bold">{bankStatistics.totalCustomers}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-green-600 font-medium">{bankStatistics.activeCustomers}</span> đang hoạt động
              </p>
            </div>
            
            <AvatarGroup count={4} />
          </div>
          
          <div className="relative z-10">
            <p className="text-xs text-gray-600 mb-1">Tỷ lệ hoạt động</p>
            <ProgressBar 
              value={bankStatistics.activeCustomers} 
              max={bankStatistics.totalCustomers} 
              color="bg-amber-500" 
              height="h-1.5" 
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs font-medium">
                {Math.round((bankStatistics.activeCustomers / bankStatistics.totalCustomers) * 100)}%
              </span>
            </div>
          </div>
          
          <div className="absolute -right-5 -bottom-10 opacity-[0.03]">
            <Users size={140} />
          </div>
        </div>
        
        {/* Deposits Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Phiếu gửi tiền</h3>
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-full">
              <Receipt size={16} />
            </div>
          </div>
          
          <div className="flex justify-between items-center z-10 relative mb-6">
            <div>
              <p className="text-3xl font-bold">{bankStatistics.totalDeposits}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-green-600 font-medium">{bankStatistics.activeDeposits}</span> đang mở
              </p>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                <span>Đang mở</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span>Đã đóng</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <p className="text-xs text-gray-600 mb-1">Tỷ lệ phiếu đang mở</p>
            <ProgressBar 
              value={bankStatistics.activeDeposits} 
              max={bankStatistics.totalDeposits} 
              color="bg-indigo-500" 
              height="h-1.5" 
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs font-medium">
                {Math.round((bankStatistics.activeDeposits / bankStatistics.totalDeposits) * 100)}%
              </span>
            </div>
          </div>
          
          <div className="absolute -right-5 -bottom-10 opacity-[0.03]">
            <Receipt size={140} />
          </div>
        </div>
        
        {/* Key Insights Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-sm font-medium text-slate-300 mb-4">
            Phân tích chính
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="p-1.5 bg-blue-900/50 text-blue-400 rounded-full mt-0.5">
                <TrendingUp size={14} />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">Tăng trưởng tốt</h4>
                <p className="text-xs text-slate-300 mt-0.5">Vốn huy động vượt mục tiêu 7% trong tháng này</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="p-1.5 bg-green-900/50 text-green-400 rounded-full mt-0.5">
                <Users size={14} />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">Khách hàng trung thành</h4>
                <p className="text-xs text-slate-300 mt-0.5">Tỷ lệ tái gửi đạt 82%, tăng 4.2%</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="p-1.5 bg-amber-900/50 text-amber-400 rounded-full mt-0.5">
                <Clock size={14} />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">Kỳ hạn dài hơn</h4>
                <p className="text-xs text-slate-300 mt-0.5">Kỳ hạn TB tăng lên 8.5 tháng, cải thiện dòng tiền</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="grid grid-cols-12 gap-5 mb-6">
        {/* Capital Trend Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full">
                <LineChart size={16} />
              </div>
              <h3 className="font-medium text-gray-800">Xu hướng vốn huy động</h3>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="text-gray-600">Theo tháng</span>
              </div>
            </div>
          </div>
          
          <div className="h-72">
            <Line 
              data={{
                labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                datasets: [
                  {
                    label: 'Vốn huy động (tỷ đồng)',
                    data: bankStatistics.monthlyCapitalTrend.map(val => val / 1000000000),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.03)',
                    },
                    ticks: {
                      callback: function(value) {
                        return value + ' tỷ';
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    padding: 12,
                    bodySpacing: 4,
                    boxPadding: 4,
                    callbacks: {
                      label: function(context) {
                        return `${context.parsed.y.toFixed(2)} tỷ đồng`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        
        {/* Deposit Term Distribution */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-1.5 bg-amber-100 text-amber-600 rounded-full">
              <BarChart4 size={16} />
            </div>
            <h3 className="font-medium text-gray-800">Phân bố kỳ hạn</h3>
          </div>
          
          <div className="h-72">
            <Bar
              data={{
                labels: bankStatistics.depositTermDistribution.map(item => item.term),
                datasets: [
                  {
                    label: 'Số lượng phiếu gửi',
                    data: bankStatistics.depositTermDistribution.map(item => item.count),
                    backgroundColor: [
                      'rgba(99, 102, 241, 0.8)',
                      'rgba(139, 92, 246, 0.8)',
                      'rgba(16, 185, 129, 0.8)',
                      'rgba(249, 115, 22, 0.8)',
                      'rgba(236, 72, 153, 0.8)',
                      'rgba(20, 184, 166, 0.8)',
                      'rgba(245, 158, 11, 0.8)'
                    ],
                    borderRadius: 10,
                    maxBarThickness: 25,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    grid: {
                      color: 'rgba(0, 0, 0, 0.03)',
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-5">
        {/* Monthly Growth Rate */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-green-100 text-green-600 rounded-full">
              <TrendingUp size={16} />
            </div>
            <h3 className="font-medium text-gray-800">Tốc độ tăng trưởng hàng tháng</h3>
          </div>
          
          <div className="h-72">
            <Bar
              data={{
                labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                datasets: [
                  {
                    label: 'Tăng trưởng (%)',
                    data: bankStatistics.monthlyGrowthRate,
                    backgroundColor: context => {
                      const value = context.raw;
                      return value < 0 
                        ? 'rgba(239, 68, 68, 0.85)' 
                        : 'rgba(16, 185, 129, 0.85)';
                    },
                    borderRadius: 8,
                    maxBarThickness: 40,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    grid: {
                      color: 'rgba(0, 0, 0, 0.03)',
                    },
                    ticks: {
                      callback: function(value) {
                        return value + '%';
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    callbacks: {
                      label: function(context) {
                        const value = context.parsed.y;
                        const prefix = value >= 0 ? '+' : '';
                        return `${prefix}${value}%`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        
        {/* Customer Segmentation */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-purple-100 text-purple-600 rounded-full">
              <PieChart size={16} />
            </div>
            <h3 className="font-medium text-gray-800">Phân khúc khách hàng</h3>
          </div>
          
          <div className="h-72 flex items-center justify-center">
            <div style={{ width: "85%", height: "100%" }}>
              <Doughnut
                data={{
                  labels: bankStatistics.customerSegmentation.map(item => item.segment),
                  datasets: [
                    {
                      label: 'Khách hàng',
                      data: bankStatistics.customerSegmentation.map(item => item.count),
                      backgroundColor: [
                        'rgba(79, 70, 229, 0.9)',
                        'rgba(16, 185, 129, 0.9)',
                        'rgba(245, 158, 11, 0.9)'
                      ],
                      borderColor: '#ffffff',
                      borderWidth: 2,
                      hoverOffset: 15,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '65%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        padding: 16,
                        usePointStyle: true,
                        pointStyle: 'circle'
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(17, 24, 39, 0.9)',
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          const percentage = bankStatistics.customerSegmentation[context.dataIndex].percentage;
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 