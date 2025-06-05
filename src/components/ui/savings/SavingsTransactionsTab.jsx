import React from 'react';
import FilterableTransactionList from './FilterableTransactionList';
import { FileText } from 'lucide-react';

const SavingsTransactionsTab = ({ transactions = [], isHidden = false }) => {
  return (
    <div className="py-4">
      <FilterableTransactionList 
        transactions={transactions} 
        isHidden={isHidden}
        emptyMessage="Không có giao dịch nào cho sổ tiết kiệm này"
        emptyIcon={<FileText size={48} className="text-gray-400" />}
      />
    </div>
  );
};

export default SavingsTransactionsTab; 