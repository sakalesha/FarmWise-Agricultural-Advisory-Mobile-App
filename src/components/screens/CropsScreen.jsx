import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { crops } from '../../utils/knowledgeBase';
import CropCard from '../cards/CropCard';

const CropsScreen = ({ onCropSelect }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'vegetables', label: 'Vegetables' },
    { key: 'grains', label: 'Grains' },
    { key: 'cash_crops', label: 'Cash Crops' },
    { key: 'fruits', label: 'Fruits' }
  ];

  const filteredCrops = selectedCategory === 'all' 
    ? crops 
    : crops.filter(crop => crop.category === selectedCategory);

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category.key
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredCrops.map(crop => (
          <CropCard
            key={crop.id}
            crop={crop}
            onClick={onCropSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default CropsScreen;