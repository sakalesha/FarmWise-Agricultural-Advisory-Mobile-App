import React from 'react';
import { Home, Wheat, Calendar, User } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const Navigation = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const tabs = [
    { key: 'home', label: t('home'), icon: Home },
    { key: 'crops', label: t('crops'), icon: Wheat },
    { key: 'calendar', label: t('calendar'), icon: Calendar },
    { key: 'profile', label: t('profile'), icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
      <div className="max-w-lg mx-auto flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
              style={{ minHeight: '60px' }}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;