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
  Sparkles,
  ChevronRight,
  Layers,
  Library,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    activeScreen,
    navigateTo,
    loggedInStaff,
  } = useSanctuary();

  // Desktop / iPadOS Sidebar items
  const congregationItems: { id: ScreenId; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'home', label: 'Today', icon: <Home className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'scripture', label: 'Scripture', icon: <BookOpen className="w-4 h-4" />, color: 'bg-amber-500' },
    { id: 'sermons', label: 'Sermon Library', icon: <Library className="w-4 h-4" />, color: 'bg-amber-600' },
    { id: 'devotion', label: 'Devotions', icon: <Sun className="w-4 h-4" />, color: 'bg-orange-500' },
    { id: 'pastors', label: 'Pastoral Care', icon: <Headphones className="w-4 h-4" />, color: 'bg-purple-500' },
    { id: 'groups', label: 'Fellowship', icon: <Users className="w-4 h-4" />, color: 'bg-emerald-500' },
    { id: 'journal', label: 'Prayer Journal', icon: <Feather className="w-4 h-4" />, color: 'bg-teal-500' },
  ];

  const secondaryItems: { id: ScreenId; label: string; icon: React.ReactNode; color: string; badge?: string }[] = [
    { id: 'profile', label: 'My Sanctuary', icon: <User className="w-4 h-4" />, color: 'bg-stone-500' },
    {
      id: 'companion-portal',
      label: 'Staff Portal',
      icon: <ShieldCheck className="w-4 h-4" />,
      color: 'bg-indigo-500',
      badge: loggedInStaff ? 'Staff' : undefined,
    },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, color: 'bg-zinc-500' },
  ];

  // Mobile iOS 5-Tab Bar items
  const mobileTabs: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Today', icon: <Home className="w-5 h-5" /> },
    { id: 'scripture', label: 'Scripture', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'sermons', label: 'Sermons', icon: <Library className="w-5 h-5" /> },
    { id: 'groups', label: 'Fellowship', icon: <Users className="w-5 h-5" /> },
    { id: 'profile', label: 'Sanctuary', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* iPadOS / macOS Desktop Sidebar (>= 768px) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-black/[0.08] dark:border-white/[0.08] ios-glass flex-shrink-0 h-screen sticky top-0 z-30 select-none">
        {/* App Title Header */}
        <div className="px-5 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-[9px] bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-[15px] leading-tight text-[#1C1C1E] dark:text-white">
              Church Sanctuary
            </h1>
            <span className="text-[11px] font-medium text-[#8E8E93]">
              Offline Edition
            </span>
          </div>
        </div>

        {/* Sidebar Sections */}
        <nav className="flex-1 px-3 py-1 space-y-4 overflow-y-auto">
          {/* Group 1: Spiritual Rhythms */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] px-3 pb-1">
              Congregation
            </p>
            <div className="space-y-0.5">
              {congregationItems.map((item) => {
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[10px] text-[14px] font-medium transition-colors ${
                      isActive
                        ? 'bg-black/[0.08] dark:bg-white/[0.12] text-[#1C1C1E] dark:text-white font-semibold'
                        : 'text-[#3C3C43] dark:text-[#EBEBF5]/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-[7px] ${item.color} text-white flex items-center justify-center shadow-2xs`}>
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Ministry & Tools */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] px-3 pb-1">
              Sanctuary
            </p>
            <div className="space-y-0.5">
              {secondaryItems.map((item) => {
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[10px] text-[14px] font-medium transition-colors ${
                      isActive
                        ? 'bg-black/[0.08] dark:bg-white/[0.12] text-[#1C1C1E] dark:text-white font-semibold'
                        : 'text-[#3C3C43] dark:text-[#EBEBF5]/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-[7px] ${item.color} text-white flex items-center justify-center shadow-2xs`}>
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Offline Badge Footer */}
        <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-[9px] bg-black/[0.03] dark:bg-white/[0.05]">
            <span className="text-[11px] font-medium text-[#8E8E93]">Offline Cache</span>
            <span className="text-[10px] font-semibold font-mono text-emerald-600 dark:text-emerald-400">
              Active
            </span>
          </div>
        </div>
      </aside>

      {/* iOS Canonical Bottom Tab Bar (< 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 ios-glass border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-around px-2 h-14 pb-safe select-none">
        {mobileTabs.map((item) => {
          const isActive =
            activeScreen === item.id ||
            (item.id === 'profile' &&
              (activeScreen === 'journal' ||
                activeScreen === 'pastors' ||
                activeScreen === 'companion-portal' ||
                activeScreen === 'settings'));

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className="flex-1 flex flex-col items-center justify-center py-1 group active:scale-90 transition-transform"
            >
              <div
                className={`transition-colors ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-[#8E8E93] group-hover:text-[#3C3C43] dark:group-hover:text-[#EBEBF5]'
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] mt-0.5 font-medium tracking-tight transition-colors ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 font-semibold'
                    : 'text-[#8E8E93]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
