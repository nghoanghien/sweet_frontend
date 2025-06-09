import React from 'react';
import FilterableWithdrawalList from './FilterableWithdrawalList';
import { ArrowUpRight } from 'lucide-react';

const SavingsWithdrawalsTab = ({ withdrawalHistory = [], isHidden = false }) => {
  return (
    <div className="py-4">
      <FilterableWithdrawalList 
        withdrawalHistory={withdrawalHistory} 
        isHidden={isHidden}
        emptyMessage="Không có lịch sử rút tiền nào cho sổ tiết kiệm này"
        emptyIcon={<ArrowUpRight size={48} className="text-gray-400" />}
      />
    </div>
  );
};

export default SavingsWithdrawalsTab; 