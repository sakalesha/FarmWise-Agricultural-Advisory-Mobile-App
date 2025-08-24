import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import AdviceCard from '../cards/AdviceCard';

const AdviceScreen = ({ advice }) => {
  const { t } = useLanguage();

  if (!advice) {
    return (
      <div className="p-4 pb-20">
        <div className="text-center py-8">
          <p className="text-gray-500">No advice selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      <AdviceCard advice={advice} />

      {/* Related Problems */}
      {advice.relatedTopics && advice.relatedTopics.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t('relatedProblems')}</h3>
          <div className="space-y-3">
            {advice.relatedTopics.slice(0, 2).map((topicId) => (
              <div key={topicId} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h4 className="font-medium text-gray-800 mb-1">{topicId.replace('_', ' ')}</h4>
                <p className="text-sm text-gray-600">Related issue that may affect your crops</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ask Question Button */}
      <div className="bg-blue-50 rounded-xl p-4 text-center">
        <MessageCircle size={24} className="text-blue-600 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-800 mb-2">Need More Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Connect with agricultural experts for personalized advice
        </p>
        <button className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          {t('askQuestion')}
        </button>
      </div>
    </div>
  );
};

export default AdviceScreen;