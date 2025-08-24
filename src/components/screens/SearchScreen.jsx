import React from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useSearch } from '../../hooks/useSearch';
import SearchBar from '../common/SearchBar';

const SearchScreen = ({ onAdviceSelect }) => {
  const { t } = useLanguage();
  const { searchQuery, setSearchQuery, searchFilter, setSearchFilter, searchResults } = useSearch();

  const filterOptions = [
    { key: 'all', label: 'All' },
    { key: 'crops', label: t('crops') },
    { key: 'problems', label: 'Problems' },
    { key: 'seasonal', label: 'Seasonal' }
  ];

  return (
    <div className="p-4 space-y-6 pb-20">
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={t('search')}
      />

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filterOptions.map(filter => (
          <button
            key={filter.key}
            onClick={() => setSearchFilter(filter.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              searchFilter === filter.key
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {searchQuery.trim() === '' ? (
          <div className="text-center py-8">
            <SearchIcon size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Search for Advice</h3>
            <p className="text-sm text-gray-500">
              Type crop names, problems, or farming questions above
            </p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">{t('noResults')}</h3>
            <p className="text-sm text-gray-500">
              Try different keywords or browse by category
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {searchResults.map(result => (
              <div
                key={result.id}
                onClick={() => result.type === 'advice' && onAdviceSelect(result.id)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    result.type === 'crop' ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    <span className="text-lg">
                      {result.type === 'crop' ? '🌱' : '💡'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {typeof result.title === 'object' ? result.title.english : result.title}
                    </h3>
                    <p className="text-sm text-gray-600">{result.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        result.type === 'crop' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {result.type}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full ${
                              i < Math.round(result.relevance * 5) ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;