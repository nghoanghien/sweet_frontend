import React from 'react';
import { Search } from 'lucide-react';

const SearchAndViewToggle = ({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white rounded-xl shadow-sm p-4">
      <div className="relative w-full sm:w-64">
        <div className="flex items-center p-1 bg-gray-100 rounded-3xl border-4 border-gray-100">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm tài khoản..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gradient-to-r focus:from-blue-50 focus:to-indigo-50 transition-all duration-300"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center p-1 bg-gray-100 rounded-lg">
        <button 
          onClick={() => setViewMode('grid')} 
          className={`p-2 rounded-md transition-all duration-300 transform ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-105' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
          </svg>
        </button>
        <button 
          onClick={() => setViewMode('list')} 
          className={`p-2 rounded-md transition-all duration-300 transform ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-105' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchAndViewToggle;