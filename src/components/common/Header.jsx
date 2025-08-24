import React from 'react';
import { ArrowLeft, Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const Header = ({ title, showBack, onBack, showLanguageSwitcher }) => {
  const { t, currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { key: 'english', label: 'EN', name: 'English' },
    { key: 'hindi', label: 'हि', name: 'हिंदी' },
    { key: 'kannada', label: 'ಕ', name: 'ಕನ್ನಡ' }
  ];

  return (
    <header className="bg-green-600 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-green-500 rounded-full transition-colors"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-lg font-bold truncate">{title}</h1>
        </div>
        
        {showLanguageSwitcher && (
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 hover:bg-green-500 rounded-lg transition-colors">
              <Globe size={18} />
              <span className="text-sm font-medium">
                {languages.find(l => l.key === currentLanguage)?.label}
              </span>
            </button>
            
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[120px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {languages.map(lang => (
                <button
                  key={lang.key}
                  onClick={() => changeLanguage(lang.key)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    currentLanguage === lang.key ? 'bg-green-50 text-green-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;