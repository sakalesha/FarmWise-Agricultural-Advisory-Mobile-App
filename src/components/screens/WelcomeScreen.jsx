import React from 'react';
import { Sprout, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const WelcomeScreen = ({ onGetStarted }) => {
  const { t, changeLanguage, currentLanguage } = useLanguage();

  const languages = [
    { key: 'english', label: 'English', flag: '🇺🇸' },
    { key: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
    { key: 'kannada', label: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sprout size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('appName')}</h1>
          <p className="text-green-100 text-lg">{t('subtitle')}</p>
        </div>

        {/* Language Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('selectLanguage')}</h2>
          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.key}
                onClick={() => changeLanguage(lang.key)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                  currentLanguage === lang.key
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                </div>
                {currentLanguage === lang.key && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Get Started Button */}
        <button
          onClick={onGetStarted}
          className="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
        >
          {t('getStarted')}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;