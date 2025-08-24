import React from 'react';
import { Search, Mic } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const SearchBar = ({ value, onChange, onFocus, placeholder }) => {
  const { t } = useLanguage();

  return (
    <div className="relative mb-6">
      <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Search size={20} className="text-gray-400 ml-4" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder || t('search')}
          className="flex-1 p-3 pl-3 text-base text-gray-800 placeholder-gray-500 bg-transparent border-none outline-none"
        />
        <button 
          className="p-3 text-gray-400 hover:text-green-600 transition-colors"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <Mic size={18} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;