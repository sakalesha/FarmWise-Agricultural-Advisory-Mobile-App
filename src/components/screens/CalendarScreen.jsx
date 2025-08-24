import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { seasonalGuidance } from '../../utils/knowledgeBase';
import SeasonalCard from '../cards/SeasonalCard';

const CalendarScreen = () => {
  const { t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = January

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonthData = seasonalGuidance[months[selectedMonth].toLowerCase()];

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setSelectedMonth(prev => prev === 0 ? 11 : prev - 1);
    } else {
      setSelectedMonth(prev => prev === 11 ? 0 : prev + 1);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Month Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">{months[selectedMonth]}</h2>
            <p className="text-sm text-gray-600">2025</p>
          </div>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Month Quick Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(index)}
            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedMonth === index
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {month.substring(0, 3)}
          </button>
        ))}
      </div>

      {/* Seasonal Guidance */}
      <SeasonalCard
        monthData={currentMonthData}
        monthName={months[selectedMonth]}
      />

      {/* Reminder Section */}
      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <h3 className="font-semibold text-gray-800 mb-2">Coming Soon</h3>
        <p className="text-sm text-gray-600 mb-3">
          Set personalized reminders for important farming activities based on your crops and location.
        </p>
        <button className="text-yellow-700 text-sm font-medium hover:text-yellow-800 transition-colors">
          Enable Notifications →
        </button>
      </div>
    </div>
  );
};

export default CalendarScreen;