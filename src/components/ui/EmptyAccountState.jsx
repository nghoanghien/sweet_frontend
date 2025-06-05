import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

const EmptyAccountState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <div className="p-3 bg-blue-100 rounded-full mb-4">
        <CreditCard size={32} className="text-blue-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Chưa có tài khoản thanh toán</h2>
      <p className="text-gray-600 mb-4">Bạn chưa có tài khoản thanh toán nào. Hãy tạo tài khoản mới để bắt đầu.</p>
      <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-all duration-200">
        <Plus size={16} />
        <span>Tạo tài khoản mới</span>
      </button>
    </div>
  );
};

export default EmptyAccountState; 