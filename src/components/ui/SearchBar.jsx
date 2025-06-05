import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  placeholder = "Tìm kiếm...",
  className = ""
}) => {
  // Handle clearing the search input
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group bg-white">
        {/* Outer gradient accent */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 group-focus-within:opacity-100 blur-sm -z-10 transition-opacity duration-300"></div>
        
        {/* Inner container */}
        <div className="flex items-center p-1">
          {/* Biểu tượng tìm kiếm */}
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <Search size={16} className="text-white" />
            </div>
          </div>
          
          {/* Input field */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="flex-grow h-10 bg-transparent border-0 focus:ring-0 focus:outline-none text-sm px-2"
          />
          
          {/* Clear button */}
          {searchTerm && (
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
              <button
                onClick={handleClearSearch}
                className="h-8 w-8 flex items-center justify-center bg-gray-50 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
        
        {/* Bottom indicator bar */}
        <div className="absolute left-0 right-0 bottom-0 mx-3 -mb-px h-0.5">
          <div className={`h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-300 ${searchTerm ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </div>
    </div>
  );
};

// Helper function to highlight text matches in content
export const highlightText = (text, searchTerm) => {
  if (!searchTerm || !text) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = String(text).split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? 
      <span key={index} className="bg-yellow-200 text-gray-800">{part}</span> : 
      part
  );
};

export default SearchBar; 