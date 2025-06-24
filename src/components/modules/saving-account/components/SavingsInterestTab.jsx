import React from 'react';
import FilterableInterestList from './FilterableInterestList';
import { DollarSign } from 'lucide-react';

const SavingsInterestTab = ({ interestHistory = [], isHidden = false, isLoading = false }) => {
  return (
    <div className="py-4">
      <FilterableInterestList 
        interestHistory={interestHistory} 
        isHidden={isHidden}
        externalIsLoading={isLoading}
        emptyMessage="Không có lịch sử trả lãi nào cho sổ tiết kiệm này"
        emptyIcon={<DollarSign size={48} className="text-gray-400" />}
      />
    </div>
  );
};

export default SavingsInterestTab;