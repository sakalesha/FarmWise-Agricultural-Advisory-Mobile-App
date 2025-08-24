import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const ProblemCard = ({ problem, onClick }) => {
  const { currentLanguage, t } = useLanguage();

  const themeClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    red: 'bg-red-50 border-red-200 hover:bg-red-100',
    yellow: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    brown: 'bg-amber-50 border-amber-200 hover:bg-amber-100'
  };

  return (
    <div
      onClick={() => onClick(problem)}
      className={`rounded-xl p-4 border-2 transition-all duration-200 cursor-pointer active:scale-95 ${themeClasses[problem.theme]}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">{problem.icon}</div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800 mb-1">
            {problem.name[currentLanguage]}
          </h3>
          <p className="text-sm text-gray-600">
            {t('affectsCrops')}: {problem.affectedCrops}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;