import React from 'react';
import { Wheat, Bug, Calendar, Book, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import SearchBar from '../common/SearchBar';

const HomeScreen = ({ onNavigate, onSearch, searchQuery, setSearchQuery }) => {
  const { t } = useLanguage();

  const quickActions = [
    { key: 'crops', icon: Wheat, label: t('browseByCrop'), color: 'bg-green-500', description: 'Find crop-specific guidance' },
    { key: 'problems', icon: Bug, label: t('browseByProblem'), color: 'bg-orange-500', description: 'Diagnose and solve issues' },
    { key: 'calendar', icon: Calendar, label: t('seasonalCalendar'), color: 'bg-blue-500', description: 'Monthly farming schedule' },
    { key: 'practices', icon: Book, label: t('bestPractices'), color: 'bg-purple-500', description: 'Agricultural best practices' }
  ];

  const todaysTip = {
    title: "January Farming Tip",
    content: "This is the perfect time for harvesting rabi crops and preparing land for summer planting. Monitor your wheat crop for aphids.",
    icon: TrendingUp
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        onFocus={() => onNavigate('search')}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.key}
              onClick={() => onNavigate(action.key)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{action.label}</h3>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Today's Tip */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
            <TrendingUp size={18} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t('todaysTip')}</h3>
            <p className="text-green-100 text-sm leading-relaxed">{todaysTip.content}</p>
          </div>
        </div>
      </div>

      {/* Featured Content */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Featured This Month</h2>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🌾</span>
            <div>
              <h3 className="font-semibold text-gray-800">Wheat Harvest Season</h3>
              <p className="text-sm text-gray-600">Essential tips for optimal yield</p>
            </div>
          </div>
          <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
            Learn more →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;