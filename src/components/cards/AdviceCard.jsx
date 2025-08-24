import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const AdviceCard = ({ advice }) => {
  const { currentLanguage, t } = useLanguage();
  const [showScientific, setShowScientific] = useState(false);

  const severityConfig = {
    low: { color: 'text-green-600', bg: 'bg-green-100', label: t('low') },
    medium: { color: 'text-orange-600', bg: 'bg-orange-100', label: t('medium') },
    high: { color: 'text-red-600', bg: 'bg-red-100', label: t('high') }
  };

  const currentSeverity = severityConfig[advice.severity];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="text-lg font-bold text-gray-800">
            {advice.crop} - {advice.problem}
          </h2>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${currentSeverity.bg} ${currentSeverity.color}`}>
            <AlertCircle size={12} />
            {currentSeverity.label}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          {advice.effect[currentLanguage]}
        </p>
      </div>

      {/* Main Advice */}
      <div className="p-4 space-y-6">
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-base text-gray-800 leading-relaxed">
            {advice.advice[currentLanguage]}
          </p>
        </div>

        {/* Action Steps */}
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
            {t('whatToDo')}
          </h3>
          <div className="space-y-2">
            {advice.actionSteps[currentLanguage].map((step, index) => (
              <div key={index} className="flex gap-3">
                <span className="w-6 h-6 bg-gray-200 text-gray-700 text-xs font-medium rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention Tips */}
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">🛡️</span>
            {t('preventionTips')}
          </h3>
          <div className="space-y-2">
            {advice.preventionTips[currentLanguage].map((tip, index) => (
              <div key={index} className="flex gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Details */}
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => setShowScientific(!showScientific)}
            className="flex items-center justify-between w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">
              {t('showScientificDetails')}
            </span>
            {showScientific ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {showScientific && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 leading-relaxed">
                {advice.scientificExplanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdviceCard;