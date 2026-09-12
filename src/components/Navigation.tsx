import React from 'react';
import { useSanctuary, ScreenId } from '../context/SanctuaryContext';
import {
  Home,
  BookOpen,
  Sun,
  Headphones,
  Users,
  Feather,
  User,
  ShieldCheck,
  Settings,
  Code2,
  Sparkles,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    activeScreen,
    navigateTo,
    loggedInStaff,
    setIsFlutterInspectorOpen,
  } = useSanctuary();

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'scripture', label: 'Scripture', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'devotion', label: 'Devotion', icon: <Sun className="w-5 h-5" /> },
    { id: 'pastors', label: 'Pastors', icon: <Headphones className="w-5 h-5" /> },
    { id: 'groups', label: 'Groups', icon: <Users className="w-5 h-5" /> },
    { id: 'journal', label: 'Journal', icon: <Feather className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop & Tablet Side Navigation Rail (>= 768px) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md flex-shrink-0 h-screen sticky top-0 z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 dark:bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 leading-tight">
                Church Sanctuary
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
                Offline Companion
              </p>
            </div>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1.5">
            Congregation
          </p>

          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-md font-semibold'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <span className={`${isActive ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1.5">
              Ministry & Tools
            </p>

            {/* Companion Portal (Staff Gated) */}
            <button
              onClick={() => navigateTo('companion-portal')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeScreen === 'companion-portal'
                  ? 'bg-amber-600 text-white shadow-md font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" />
                <span>Staff Portal</span>
              </div>
              {loggedInStaff && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white uppercase">
                  Staff
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={() => navigateTo('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeScreen === 'settings'
                  ? 'bg-amber-600 text-white shadow-md font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* Flutter Code Inspector Button in Sidebar */}
        <div className="p-3 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          <button
            onClick={() => setIsFlutterInspectorOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-amber-300 text-xs font-semibold shadow transition border border-stone-800"
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Flutter (Dart) Code</span>
          </button>
        </div>
      </aside>

      {/* Mobile Compact Bottom Navigation Bar (< 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 flex items-center justify-around px-1 py-1.5 shadow-2xl safe-area-bottom">
        {navItems.slice(0, 5).map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
              }`}
            >
              <div
                className={`p-1 rounded-full transition ${
                  isActive ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* Mobile More / Profile */}
        <button
          onClick={() => navigateTo('profile')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            activeScreen === 'profile' || activeScreen === 'companion-portal' || activeScreen === 'settings'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
          }`}
        >
          <div
            className={`p-1 rounded-full transition ${
              activeScreen === 'profile' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : ''
            }`}
          >
            <User className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">More</span>
        </button>
      </nav>
    </>
  );
};
