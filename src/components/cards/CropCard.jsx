import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const CropCard = ({ crop, onClick }) => {
  const { currentLanguage, t } = useLanguage();

  return (
    <div
      onClick={() => onClick(crop)}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="text-4xl">{crop.emoji}</div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">
            {crop.name[currentLanguage]}
          </h3>
          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            {crop.topics} {t('topicsAvailable')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CropCard;