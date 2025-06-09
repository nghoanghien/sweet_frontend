import React from 'react';
import { DollarSign, FileIcon, FileText, PiggyBank } from 'lucide-react';

const SavingAccountDetail = ({ account, isHidden, formatCurrency }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      {/* Thông tin tiền gửi */}
      <div className="p-4 border-b border-gray-100">
        <h4 className="text-lg text-base font-bold text-blue-600 mb-3 flex items-center">
          <DollarSign
            size={18}
            className="mr-2 text-indigo-500"
          />
          Thông tin tiền gửi
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Số tiền gốc
            </p>
            <p className="text-base font-semibold text-gray-800">
              {isHidden
                ? "••••••••"
                : formatCurrency(account.amount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Kỳ hạn</p>
            <p className="text-base font-semibold text-gray-800">
              {account.term}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Lãi suất</p>
            <p className="text-base font-semibold text-gray-800">
              {account.interestRate}%/năm
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Tiền lãi đã nhận
            </p>
            <p className="text-base font-semibold text-gray-800">
              {isHidden
                ? "••••••••"
                : formatCurrency(account.receivedInterest)}
            </p>
          </div>
          <div className="col-span-2 mt-4 ml-4">
            <p className="text-sm text-pink-500 mb-1 flex items-center">
              <PiggyBank className='mr-2 text-pink-500'/> Tổng tiền bạn sẽ nhận
            </p>
            <p className="text-lg font-bold text-pink-500 ml-4 pl-4">
              {isHidden
                ? "••••••••"
                : formatCurrency(account.totalReceivable)}
            </p>
          </div>
        </div>
      </div>

      {/* Thông tin tài khoản */}
      <div className="p-4">
        <h4 className="text-lg text-base font-bold text-blue-600 mb-3 flex items-center">
          <FileIcon size={18} className="mr-2 text-indigo-500" />
          Thông tin tài khoản tiền gửi
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Số tài khoản tiền gửi
            </p>
            <p className="text-base font-semibold text-gray-800">
              {account.accountNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Loại tiết kiệm
            </p>
            <p className="text-base font-semibold text-gray-800">
              {account.depositType}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Tần suất nhận lãi
            </p>
            <p className="text-base font-semibold text-gray-800">
              {account.interestFrequency}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Ngày đáo hạn
            </p>
            <p className="text-base font-semibold text-gray-800">
              {account.endDate}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Hình thức đáo hạn
            </p>
            <p className="text-base font-semibold text-gray-800">
              {account.maturityOption}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Tên gợi nhớ
            </p>
            <p className="text-base font-semibold text-gray-800">
              {account.nickname}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingAccountDetail;