import { useState, useMemo } from 'react';
import { crops, adviceEntries } from '../utils/knowledgeBase';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all'); // all, crops, problems, seasonal

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    let results = [];

    // Search crops
    if (searchFilter === 'all' || searchFilter === 'crops') {
      crops.forEach(crop => {
        const matchesName = Object.values(crop.name).some(name => 
          name.toLowerCase().includes(query)
        );
        if (matchesName) {
          results.push({
            type: 'crop',
            id: crop.id,
            title: crop.name,
            subtitle: `${crop.topics} topics available`,
            relevance: 0.9
          });
        }
      });
    }

    // Search advice entries
    if (searchFilter === 'all' || searchFilter === 'problems') {
      adviceEntries.forEach(entry => {
        const matchesContent = Object.values(entry.advice).some(advice =>
          advice.toLowerCase().includes(query)
        ) || entry.crop.toLowerCase().includes(query) ||
        entry.problem.toLowerCase().includes(query);

        if (matchesContent) {
          results.push({
            type: 'advice',
            id: entry.id,
            title: `${entry.crop} - ${entry.problem}`,
            subtitle: Object.values(entry.advice)[0].substring(0, 100) + '...',
            relevance: 0.8
          });
        }
      });
    }

    return results.sort((a, b) => b.relevance - a.relevance);
  }, [searchQuery, searchFilter]);

  return {
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    searchResults
  };
};