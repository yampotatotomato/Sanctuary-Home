import React from 'react';
import { SanctuaryProvider, useSanctuary } from './context/SanctuaryContext';
import { Navigation } from './components/Navigation';
import { NotificationBanner } from './components/NotificationBanner';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { OnboardingModal } from './components/OnboardingModal';
import { FlutterInspectorModal } from './components/FlutterInspectorModal';

import { HomeScreen } from './screens/HomeScreen';
import { ScriptureScreen } from './screens/ScriptureScreen';
import { DevotionScreen } from './screens/DevotionScreen';
import { PastorsScreen } from './screens/PastorsScreen';
import { PrayerGroupsScreen } from './screens/PrayerGroupsScreen';
import { JournalScreen } from './screens/JournalScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { CompanionPortalScreen } from './screens/CompanionPortalScreen';
import { SettingsScreen } from './screens/SettingsScreen';

import { Sparkles, Code2, Moon, Sun, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeScreen,
    isDarkMode,
    setIsDarkMode,
    themePalette,
    setIsFlutterInspectorOpen,
    loggedInStaff,
    navigateTo,
  } = useSanctuary();

  // Palette background and text classes
  const getThemeWrapperClass = () => {
    switch (themePalette) {
      case 'navy':
        return isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50/60 text-slate-900';
      case 'gold':
        return isDarkMode ? 'dark bg-stone-950 text-stone-100' : 'bg-amber-50/40 text-stone-900';
      case 'olive':
        return isDarkMode ? 'dark bg-stone-950 text-stone-100' : 'bg-emerald-50/30 text-stone-900';
      case 'amethyst':
        return isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-purple-50/30 text-zinc-900';
      default:
        return isDarkMode ? 'dark bg-stone-950 text-stone-100' : 'bg-stone-50/50 text-stone-900';
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
    <div className={`min-h-screen ${getThemeWrapperClass()} flex flex-col md:flex-row transition-colors duration-200 antialiased`}>
      {/* Top Banner Alert (Push Notification Simulation) */}
      <NotificationBanner />

      {/* 6-Step Onboarding Modal for First Launch */}
      <OnboardingModal />

      {/* Flutter (Dart) Code & Architecture Inspector Modal */}
      <FlutterInspectorModal />

      {/* Navigation (Side Rail on Desktop, Bottom Bar on Mobile) */}
      <Navigation />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Top Header (< 768px) */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 sticky top-0 z-30">
          <div className="flex items-center gap-2" onClick={() => navigateTo('home')}>
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 leading-tight">
                Church Sanctuary
              </h1>
              <p className="text-[9px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
                Offline Companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {loggedInStaff && (
              <button
                onClick={() => navigateTo('companion-portal')}
                className="p-1.5 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px] font-bold"
              >
                Staff
              </button>
            )}

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsFlutterInspectorOpen(true)}
              className="p-2 rounded-xl bg-stone-900 text-amber-400 hover:bg-black transition"
              title="Inspect Flutter Codebase"
            >
              <Code2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Screen View */}
        <main className="flex-1 pb-32 md:pb-24 overflow-x-hidden">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Global Sticky Persistent Audio Player Bar */}
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
