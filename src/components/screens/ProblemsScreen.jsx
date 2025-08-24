import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { problems } from '../../utils/knowledgeBase';
import ProblemCard from '../cards/ProblemCard';

const ProblemsScreen = ({ onProblemSelect }) => {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Problem Categories</h2>
        <p className="text-sm text-gray-600">Select a problem type to see affected crops and solutions</p>
      </div>

      <div className="space-y-4">
        {problems.map(problem => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            onClick={onProblemSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ProblemsScreen;