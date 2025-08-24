import React from 'react';
import { Cloud, Droplets, Sun, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const SeasonalCard = ({ monthData, monthName }) => {
  const { currentLanguage } = useLanguage();

  if (!monthData) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p className="text-gray-500 text-center">No data available for {monthName}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Weather */}
      <div className="p-4 bg-blue-50 border-b border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <Cloud size={18} className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">Weather</h3>
        </div>
        <p className="text-sm text-gray-700">{monthData.weather[currentLanguage]}</p>
      </div>

      {/* Activities */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Sun size={18} className="text-orange-600" />
          <h3 className="font-semibold text-gray-800">Key Activities</h3>
        </div>
        <div className="space-y-2">
          {monthData.activities[currentLanguage].map((activity, index) => (
            <div key={index} className="flex gap-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-sm text-gray-700">{activity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={18} className="text-red-600" />
          <h3 className="font-semibold text-gray-800">Alerts</h3>
        </div>
        <div className="space-y-2">
          {monthData.alerts[currentLanguage].map((alert, index) => (
            <div key={index} className="flex gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-sm text-gray-700">{alert}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Irrigation */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Droplets size={18} className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">Irrigation</h3>
        </div>
        <p className="text-sm text-gray-700">{monthData.irrigation[currentLanguage]}</p>
      </div>
    </div>
  );
};

export default SeasonalCard;