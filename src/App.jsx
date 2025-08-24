import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import { useLanguage } from './hooks/useLanguage';
import { adviceEntries } from './utils/knowledgeBase';

// Components
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import WelcomeScreen from './components/screens/WelcomeScreen';
import HomeScreen from './components/screens/HomeScreen';
import CropsScreen from './components/screens/CropsScreen';
import ProblemsScreen from './components/screens/ProblemsScreen';
import AdviceScreen from './components/screens/AdviceScreen';
import CalendarScreen from './components/screens/CalendarScreen';
import SearchScreen from './components/screens/SearchScreen';

function AppContent() {
  const { t } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedAdvice, setSelectedAdvice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGetStarted = () => {
    setCurrentScreen('home');
  };

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  const handleTabChange = (tab) => {
    setCurrentScreen(tab);
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'search':
      case 'crops':
      case 'problems':
      case 'calendar':
        setCurrentScreen('home');
        break;
      case 'advice':
        setCurrentScreen('home');
        break;
      default:
        setCurrentScreen('home');
    }
  };

  const handleCropSelect = (crop) => {
    // Find advice for this crop
    const cropAdvice = adviceEntries.find(entry => entry.cropId === crop.id);
    if (cropAdvice) {
      setSelectedAdvice(cropAdvice);
      setCurrentScreen('advice');
    }
  };

  const handleProblemSelect = (problem) => {
    // Find advice for this problem
    const problemAdvice = adviceEntries.find(entry => entry.problemId === problem.id);
    if (problemAdvice) {
      setSelectedAdvice(problemAdvice);
      setCurrentScreen('advice');
    }
  };

  const handleAdviceSelect = (adviceId) => {
    const advice = adviceEntries.find(entry => entry.id === adviceId);
    if (advice) {
      setSelectedAdvice(advice);
      setCurrentScreen('advice');
    }
  };

  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'home': return t('appName');
      case 'crops': return t('crops');
      case 'problems': return t('browseByProblem');
      case 'calendar': return t('seasonalCalendar');
      case 'search': return t('searchResults');
      case 'advice': return selectedAdvice ? `${selectedAdvice.crop} - ${selectedAdvice.problem}` : 'Advice';
      default: return t('appName');
    }
  };

  const shouldShowHeader = currentScreen !== 'welcome';
  const shouldShowNavigation = currentScreen !== 'welcome' && currentScreen !== 'advice';
  const shouldShowBack = currentScreen === 'advice' || currentScreen === 'search';

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {shouldShowHeader && (
        <Header
          title={getHeaderTitle()}
          showBack={shouldShowBack}
          onBack={handleBack}
          showLanguageSwitcher={true}
        />
      )}

      <main className="max-w-lg mx-auto bg-white min-h-screen">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigation}
            onSearch={handleNavigation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {currentScreen === 'crops' && (
          <CropsScreen onCropSelect={handleCropSelect} />
        )}
        {currentScreen === 'problems' && (
          <ProblemsScreen onProblemSelect={handleProblemSelect} />
        )}
        {currentScreen === 'calendar' && <CalendarScreen />}
        {currentScreen === 'search' && (
          <SearchScreen onAdviceSelect={handleAdviceSelect} />
        )}
        {currentScreen === 'advice' && (
          <AdviceScreen advice={selectedAdvice} />
        )}
      </main>

      {shouldShowNavigation && (
        <Navigation
          activeTab={currentScreen}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </Router>
  );
}

export default App;