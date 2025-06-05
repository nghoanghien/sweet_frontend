'use client';

import React from 'react';
import { X } from 'lucide-react';
import SwipeToConfirm from './SwipeToConfirm';

const SwipeConfirmationModal = ({ 
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Quẹt để xác nhận",
  confirmDetails = null,
  isProcessing = false
}) => {
  if (!isOpen) return null;

  const handleConfirmComplete = () => {
    onConfirm && onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            disabled={isProcessing}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">{message}</p>

            {/* Optional confirmation details */}
            {confirmDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                {Object.entries(confirmDetails).map(([label, value]) => (
                  <div key={label} className="flex justify-between mb-2 last:mb-0">
                    <span className="text-gray-600">{label}:</span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Swipe button */}
          <div className="flex justify-center">
            <SwipeToConfirm 
              onComplete={handleConfirmComplete} 
              text={confirmText}
              disabled={isProcessing}
            />
          </div>

          {/* Processing message */}
          {isProcessing && (
            <div className="mt-4 text-center text-amber-600 animate-pulse">
              Đang xử lý, vui lòng đợi...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwipeConfirmationModal; 