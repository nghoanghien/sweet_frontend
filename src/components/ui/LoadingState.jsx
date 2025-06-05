import React from 'react';

const LoadingState = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
};

export default LoadingState; 