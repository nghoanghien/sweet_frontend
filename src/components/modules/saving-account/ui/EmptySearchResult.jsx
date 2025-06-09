import React from 'react';
import { AlertCircle } from 'lucide-react';

const EmptySearchResult = ({ searchQuery }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm">
      <AlertCircle size={32} className="text-gray-400 mb-2" />
      <p className="text-gray-600">Không tìm thấy tài khoản phù hợp với từ khóa "{searchQuery}"</p>
    </div>
  );
};

export default EmptySearchResult; 