import React from 'react';
import FilterableTransactionList from './FilterableTransactionList';
import { FileText } from 'lucide-react';

const SavingsTransactionsTab = ({ transactions = [], isHidden = false, isLoading = false, channelLabels = {} }) => {
  return (
    <div className="py-4">
      <FilterableTransactionList 
        transactions={transactions} 
        isHidden={isHidden}
        externalIsLoading={isLoading}
        emptyMessage="Không có giao dịch nào cho sổ tiết kiệm này"
        emptyIcon={<FileText size={48} className="text-gray-400" />}
        channelLabels={channelLabels}
      />
    </div>
  );
};

export default SavingsTransactionsTab;