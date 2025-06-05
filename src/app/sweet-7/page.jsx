'use client';

import React from 'react';
import {
  CreditCard,
  Plus,
  Edit2,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  ChevronRight,
  Filter,
} from 'lucide-react';

// --- Account Card Component ---
const AccountCard = ({
  type,
  description,
  accountNumber,
  balance,
  isActive,
  lastUpdated,
  cardColor,
  iconBgColor,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">{type}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <CreditCard size={20} className="text-white" />
        </div>
      </div>

      {/* Account Number */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Account Number</p>
        <p className="text-sm font-medium text-gray-700">{accountNumber}</p>
      </div>

      {/* Current Balance */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Current Balance</p>
        <p className={`text-sm font-bold ${cardColor}`}>••••••• VND</p>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
          <span className="text-xs text-gray-500">
            Active <span className="mx-1">•</span> Updated {lastUpdated}
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
            <Edit2 size={16} />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Transaction Row Component ---
const TransactionRow = ({ type, account, date, amount, status }) => {
  // Determine icon and color based on transaction type
  let icon, amountColor, amountPrefix;
  
  switch (type) {
    case 'Deposit':
      icon = <ArrowDownRight size={16} className="text-green-500" />;
      amountColor = 'text-green-500';
      amountPrefix = '+';
      break;
    case 'Withdrawal':
      icon = <ArrowUpRight size={16} className="text-red-500" />;
      amountColor = 'text-red-500';
      amountPrefix = '-';
      break;
    case 'Transfer':
      icon = <ArrowLeftRight size={16} className="text-blue-500" />;
      amountColor = 'text-blue-500';
      amountPrefix = '-';
      break;
    default:
      icon = <CreditCard size={16} className="text-gray-500" />;
      amountColor = 'text-gray-700';
      amountPrefix = '';
  }
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-3 pl-4 pr-2">
        <div className="flex items-center">
          <div className="p-1.5 bg-gray-100 rounded-md mr-2">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{type}</p>
            <p className="text-xs text-gray-500">{type === 'Deposit' ? 'From ATM Bank' : type === 'Withdrawal' ? 'ATM Withdrawal' : 'To Bank Acc X'}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2 text-sm text-gray-600">{account}</td>
      <td className="py-3 px-2 text-sm text-gray-600">{date}</td>
      <td className={`py-3 px-2 text-sm font-medium ${amountColor}`}>
        {amountPrefix}{amount}
      </td>
      <td className="py-3 pl-2 pr-4">
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
          Completed
        </span>
      </td>
    </tr>
  );
};

// --- Main Page Component ---
export default function PaymentAccountsPage() {
  const accounts = [
    {
      type: 'Primary Account',
      description: 'Savings Account',
      accountNumber: '•••• •••• •••• 1234',
      balance: '•••••••',
      isActive: true,
      lastUpdated: '5h ago',
      cardColor: 'text-blue-600',
      iconBgColor: 'bg-blue-500',
    },
    {
      type: 'Secondary Account',
      description: 'Checking Account',
      accountNumber: '•••• •••• •••• 5678',
      balance: '•••••••',
      isActive: true,
      lastUpdated: '3h ago',
      cardColor: 'text-purple-600',
      iconBgColor: 'bg-purple-500',
    },
    {
      type: 'Business Account',
      description: 'Corporate Account',
      accountNumber: '•••• •••• •••• 9012',
      balance: '•••••••',
      isActive: true,
      lastUpdated: '2h ago',
      cardColor: 'text-teal-600',
      iconBgColor: 'bg-teal-500',
    },
    {
      type: 'Investment Account',
      description: 'Securities Account',
      accountNumber: '•••• •••• •••• 3456',
      balance: '•••••••',
      isActive: true,
      lastUpdated: '1d ago',
      cardColor: 'text-amber-600',
      iconBgColor: 'bg-amber-500',
    },
  ];

  const transactions = [
    {
      type: 'Deposit',
      account: '•••• 1234',
      date: 'Today, 10:45 AM',
      amount: '5,000,000 VND',
      status: 'Completed',
    },
    {
      type: 'Withdrawal',
      account: '•••• 5678',
      date: 'Yesterday, 12:30 PM',
      amount: '2,000,000 VND',
      status: 'Completed',
    },
    {
      type: 'Transfer',
      account: '•••• 9012',
      date: 'Oct 25, 2023',
      amount: '15,000,000 VND',
      status: 'Completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <CreditCard size={20} className="text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-800">Payment Accounts</h1>
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
              4 Active
            </span>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm flex items-center">
              <Filter size={14} className="mr-1" />
              <span>Filter</span>
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm flex items-center">
              <Plus size={14} className="mr-1" />
              <span>Add New Account</span>
            </button>
          </div>
        </div>

        {/* Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {accounts.map((account, index) => (
            <AccountCard key={index} {...account} />
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <button className="flex items-center text-blue-600 text-sm font-medium">
              <Filter size={14} className="mr-1" />
              <span>Filter</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
                  <th className="py-2 pl-4 pr-2 font-medium">Transaction</th>
                  <th className="py-2 px-2 font-medium">Account</th>
                  <th className="py-2 px-2 font-medium">Date</th>
                  <th className="py-2 px-2 font-medium">Amount</th>
                  <th className="py-2 pl-2 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <TransactionRow key={index} {...transaction} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <a href="#" className="inline-flex items-center text-sm text-blue-600 font-medium hover:text-blue-800">
              View All Transactions
              <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}