import React from 'react';
import { SanctuaryProvider, useSanctuary } from './context/SanctuaryContext';
import { Navigation } from './components/Navigation';
import { NotificationBanner } from './components/NotificationBanner';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { OnboardingModal } from './components/OnboardingModal';

import { HomeScreen } from './screens/HomeScreen';
import { ScriptureScreen } from './screens/ScriptureScreen';
import { DevotionScreen } from './screens/DevotionScreen';
import { SermonLibraryScreen } from './screens/SermonLibraryScreen';
import { PastorsScreen } from './screens/PastorsScreen';
import { PrayerGroupsScreen } from './screens/PrayerGroupsScreen';
import { JournalScreen } from './screens/JournalScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { CompanionPortalScreen } from './screens/CompanionPortalScreen';
import { SettingsScreen } from './screens/SettingsScreen';

import { Sparkles, Moon, Sun, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeScreen,
    isDarkMode,
    setIsDarkMode,
    themePalette,
    loggedInStaff,
    navigateTo,
  } = useSanctuary();

  // Apple HIG System Grouped Backgrounds with subtle tint resonance
  const getThemeWrapperClass = () => {
    switch (themePalette) {
      case 'navy':
        return isDarkMode ? 'dark bg-[#0a0f1d] text-[#F2F2F7]' : 'bg-[#F2F4F8] text-[#1C1C1E]';
      case 'gold':
        return isDarkMode ? 'dark bg-[#12100d] text-[#F2F2F7]' : 'bg-[#F9F7F2] text-[#1C1C1E]';
      case 'olive':
        return isDarkMode ? 'dark bg-[#0e120f] text-[#F2F2F7]' : 'bg-[#F3F6F2] text-[#1C1C1E]';
      case 'amethyst':
        return isDarkMode ? 'dark bg-[#110e17] text-[#F2F2F7]' : 'bg-[#F6F3F8] text-[#1C1C1E]';
      default:
        return isDarkMode ? 'dark bg-[#000000] text-[#F2F2F7]' : 'bg-[#F2F2F7] text-[#1C1C1E]';
    }
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'scripture':
        return <ScriptureScreen />;
      case 'devotion':
        return <DevotionScreen />;
      case 'sermons':
        return <SermonLibraryScreen />;
      case 'pastors':
        return <PastorsScreen />;
      case 'groups':
        return <PrayerGroupsScreen />;
      case 'journal':
        return <JournalScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'companion-portal':
        return <CompanionPortalScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen ${getThemeWrapperClass()} flex flex-col md:flex-row transition-colors duration-200 antialiased selection:bg-amber-500/20`}>
      {/* Top Banner Alert (Push Notification Simulation) */}
      <NotificationBanner />

      {/* 6-Step Onboarding Modal for First Launch */}
      <OnboardingModal />

      {/* Navigation (iPadOS/macOS Side Rail on Desktop, iOS Tab Bar on Mobile) */}
      <Navigation />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Top Navigation Bar (< 768px) - Authentic Apple iOS Frosted Bar */}
        <header className="md:hidden flex items-center justify-between px-4 h-12 ios-glass border-b border-black/[0.06] dark:border-white/[0.08] sticky top-0 z-30">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 active:opacity-70 transition text-left"
          >
            <div className="w-7 h-7 rounded-[8px] bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] leading-tight tracking-tight text-[#1C1C1E] dark:text-white">
                Sanctuary
              </span>
              <span className="text-[10px] font-medium tracking-wide text-amber-600 dark:text-amber-400">
                Offline
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            {loggedInStaff && (
              <button
                onClick={() => navigateTo('companion-portal')}
                className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[11px] font-semibold active:scale-95 transition"
              >
                Staff
              </button>
            )}

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white active:scale-95 transition"
              title="Toggle Light/Dark Theme"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Dynamic Screen View */}
        <main className="flex-1 pb-28 md:pb-16 overflow-x-hidden">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Global Sticky Persistent Audio Player Bar - Apple Music / Podcasts Floating Pill */}
      <AudioPlayerBar />
    </div>
  );
};

export default function App() {
  return (
    <SanctuaryProvider>
      <AppContent />
    </SanctuaryProvider>
  );
}
