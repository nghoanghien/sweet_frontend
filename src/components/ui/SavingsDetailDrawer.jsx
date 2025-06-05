'use client';

import React, { useState } from 'react';
import { 
  X, 
  PiggyBank, 
  Clock, 
  Percent, 
  Calendar, 
  DollarSign, 
  Eye, 
  EyeOff, 
  ArrowDownRight, 
  ArrowUpRight, 
  RefreshCw,
  TrendingUp,
  Receipt,
  History
} from 'lucide-react';
import { formatCurrency } from '../../utils/accountUtils';

const SavingsDetailDrawer = ({ 
  isOpen, 
  onClose, 
  account, 
  selectedTab,
  onTabChange,
  transactions = [],
  interestHistory = [],
  isHidden = true,
  onToggleHide
}) => {
  if (!isOpen || !account) return null;

  // Format lãi suất
  const formatInterestRate = (rate) => {
    return `${rate}%/năm`;
  };

  // Các tab hiển thị
  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: <TrendingUp size={16} /> },
    { id: 'transactions', label: 'Lịch sử giao dịch', icon: <History size={16} /> },
    { id: 'interest', label: 'Lịch sử lãi', icon: <Receipt size={16} /> }
  ];

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`absolute top-0 right-0 h-full w-full md:w-[500px] lg:w-[600px] bg-white shadow-xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className={`p-5 ${account.color} relative`}>
          {/* Hiệu ứng gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer"></div>
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <PiggyBank size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-white text-lg font-medium">{account.nickname}</h2>
                <p className="text-white/80 text-sm font-mono">{account.depositNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={onToggleHide}
                className="rounded-full p-2 bg-white/20 hover:bg-white/30 transition-all"
                aria-label={isHidden ? "Hiển thị thông tin" : "Ẩn thông tin"}
              >
                {isHidden ? 
                  <Eye size={18} className="text-white" /> : 
                  <EyeOff size={18} className="text-white" />
                }
              </button>
              <button 
                onClick={onClose}
                className="rounded-full p-2 bg-white/20 hover:bg-white/30 transition-all"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex justify-between items-center">
              <p className="text-white/80 text-sm">Số tiền gửi</p>
              <p className="text-white font-semibold text-xl">
                {isHidden ? "••••••••" : formatCurrency(account.amount)}
              </p>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-white/80 text-sm">Tổng tiền nhận dự kiến</p>
              <p className="text-white font-semibold">
                {isHidden ? "••••••••" : formatCurrency(account.totalReceivable)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center px-5 py-3 whitespace-nowrap transition-colors ${
                  selectedTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab content */}
        <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 230px)' }}>
          {/* Tổng quan */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Thông tin chính */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock size={16} className="text-gray-500" />
                    <p className="text-gray-500 text-sm">Kỳ hạn</p>
                  </div>
                  <p className="font-medium">{account.term}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Percent size={16} className="text-gray-500" />
                    <p className="text-gray-500 text-sm">Lãi suất</p>
                  </div>
                  <p className="font-medium">{formatInterestRate(account.interestRate)}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar size={16} className="text-gray-500" />
                    <p className="text-gray-500 text-sm">Ngày mở sổ</p>
                  </div>
                  <p className="font-medium">{account.startDate}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar size={16} className="text-gray-500" />
                    <p className="text-gray-500 text-sm">Ngày đáo hạn</p>
                  </div>
                  <p className="font-medium">{account.endDate}</p>
                </div>
              </div>
              
              {/* Tiến độ kỳ hạn */}
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-gray-800 font-medium mb-3">Tiến độ kỳ hạn</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Còn lại</span>
                  <span className="text-indigo-600 font-medium">{account.daysRemaining} ngày</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${account.color}`}
                    style={{ width: `${((account.termDays - account.daysRemaining) / account.termDays) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-gray-500">{account.startDate}</span>
                  <span className="text-gray-500">{account.endDate}</span>
                </div>
              </div>
              
              {/* Thông tin chi tiết */}
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-gray-800 font-medium mb-3">Thông tin chi tiết</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Loại tiền gửi</p>
                    <p className="text-gray-800">{account.depositType}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Kỳ trả lãi</p>
                    <p className="text-gray-800">{account.interestFrequency}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Khi đáo hạn</p>
                    <p className="text-gray-800">{account.maturityOption}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Lãi đã nhận</p>
                    <p className="text-gray-800">
                      {isHidden ? "••••••••" : formatCurrency(account.receivedInterest)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Lãi dự kiến</p>
                    <p className="text-indigo-600 font-medium">
                      {isHidden ? "••••••••" : formatCurrency(account.totalReceivable - account.amount)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Tài khoản nhận tiền</p>
                    <p className="text-gray-800">{account.receivingAccount || "Tài khoản thanh toán mặc định"}</p>
                  </div>
                </div>
              </div>
              
              {/* Nút tác vụ */}
              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl text-white hover:shadow-md transition-all flex items-center justify-center">
                  <RefreshCw size={16} className="mr-2" />
                  Tái tục sổ
                </button>
                <button className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <DollarSign size={16} className="mr-2" />
                  Rút tiền
                </button>
              </div>
            </div>
          )}
          
          {/* Lịch sử giao dịch */}
          {selectedTab === 'transactions' && (
            <div>
              <h3 className="text-gray-800 font-medium mb-4">Lịch sử giao dịch</h3>
              
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">Chưa có giao dịch nào</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map(transaction => (
                    <div 
                      key={transaction.id}
                      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            transaction.isDeposit 
                              ? 'bg-green-100' 
                              : transaction.isInterest 
                                ? 'bg-blue-100' 
                                : 'bg-gray-100'
                          }`}>
                            {transaction.isDeposit ? (
                              <ArrowDownRight size={18} className="text-green-600" />
                            ) : transaction.isInterest ? (
                              <TrendingUp size={18} className="text-blue-600" />
                            ) : (
                              <RefreshCw size={18} className="text-gray-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{transaction.type}</p>
                            <p className="text-xs text-gray-500">{transaction.time}</p>
                            <p className="text-xs text-gray-500 mt-1">{transaction.content}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {transaction.isInterest ? (
                            <p className="font-medium text-blue-600">
                              {isHidden ? "••••••••" : `+${formatCurrency(transaction.interestAmount)}`}
                            </p>
                          ) : transaction.isDeposit ? (
                            <p className="font-medium text-green-600">
                              {isHidden ? "••••••••" : `+${formatCurrency(transaction.amount)}`}
                            </p>
                          ) : (
                            <p className="text-gray-800">
                              {transaction.channel}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Số dư: {isHidden ? "••••••••" : formatCurrency(transaction.balanceAfter)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Lịch sử lãi */}
          {selectedTab === 'interest' && (
            <div>
              <h3 className="text-gray-800 font-medium mb-4">Lịch sử lãi</h3>
              
              {interestHistory.length === 0 ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Receipt size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">Chưa có lịch sử lãi nào</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {interestHistory.map(item => (
                    <div 
                      key={item.id}
                      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-800">{item.period}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              item.status === 'Đã thanh toán' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-amber-100 text-amber-600'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Ngày trả: {item.date}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.method} {item.targetAccount && `(${item.targetAccount})`}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium text-blue-600">
                            {isHidden ? "••••••••" : `+${formatCurrency(item.amount)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsDetailDrawer; 