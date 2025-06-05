import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Unlock, Calendar, ChevronRight, Activity, Shield, ExternalLink, CreditCard } from 'lucide-react';
import { getStatusInfo, maskAccountNumber, formatCurrency } from '../../utils/accountUtils';

const AccountListItem = ({ account, isHidden, onToggleHide, onLockToggle, onViewDetail }) => {
  const [isLocked, setIsLocked] = useState(account.status === 'locked' || account.status === 'permanent_locked');
  const statusInfo = getStatusInfo(account.status);
  
  // Cập nhật trạng thái khóa khi account.status thay đổi
  useEffect(() => {
    setIsLocked(account.status === 'locked' || account.status === 'permanent_locked');
  }, [account.status]);
  
  const handleLockToggle = () => {
    if (account.status === 'permanent_locked') return;
    const newLockedState = !isLocked;
    onLockToggle(account.id, newLockedState);
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
        {/* Account Info */}
        <div className="flex items-center mb-3 md:mb-0">
          <div className={`w-10 h-10 rounded-xl ${account.color} flex items-center justify-center text-white mr-3 group-hover:scale-105 transition-transform duration-300`}>
            <CreditCard size={20} className="text-white" />
          </div>
          
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-gray-800 mr-2">{account.type}</h3>
              <div className={`px-2 py-0.5 rounded-full text-xs flex items-center ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                {statusInfo.icon}
                <span>{statusInfo.text}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-mono">
              {isHidden ? 
                maskAccountNumber(account.accountNumber) : 
                <span className="animate-fadeIn">{account.accountNumber}</span>
              }
            </p>
          </div>
        </div>
        
        {/* Account Number and Balance */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Số dư</p>
            <p className="text-sm font-semibold text-gray-800">
              {isHidden ? "••••••••" : formatCurrency(account.balance)}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onToggleHide(account.id)}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label={isHidden ? "Hiển thị thông tin" : "Ẩn thông tin"}
            >
              {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            
            {account.status !== "permanent_locked" && (
              <button 
                onClick={handleLockToggle}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label={account.status === "active" ? "Tạm khóa tài khoản" : "Mở khóa tài khoản"}
              >
                {account.status === "active" ? <Lock size={16} /> : <Unlock size={16} />}
              </button>
            )}
            
            <button 
              onClick={onViewDetail}
              className={`${account.color} text-white text-xs font-medium px-4 py-1.5 rounded-full hover:shadow-md transition-all duration-300`}
            >
              Chi tiết
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom info */}
      <div className="border-t border-gray-100 px-4 py-2 flex justify-between items-center bg-gray-50">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Calendar size={12} className="text-gray-400" />
          <span>{account.openDate}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <Activity size={12} className="text-gray-400 mr-1" />
          <span>Hoạt động gần đây</span>
        </div>
      </div>
    </div>
  );
};

export default AccountListItem;