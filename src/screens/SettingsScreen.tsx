import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { ThemePalette } from '../types';
import {
  Bell,
  Moon,
  Sun,
  ShieldCheck,
  RefreshCw,
  Info,
  ExternalLink,
  BookOpen,
  Sparkles,
  ChevronRight,
  Database,
  Check,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    themePalette,
    setThemePalette,
    isDarkMode,
    setIsDarkMode,
    resetOnboarding,
    bookmarks,
    journalEntries,
    announcements,
    dailyVerseReminder,
    setDailyVerseReminder,
    devotionalReminder,
    setDevotionalReminder,
    triggerBanner,
  } = useSanctuary();

  const palettes: { id: ThemePalette; name: string; sampleHex: string }[] = [
    { id: 'gold', name: 'Sanctuary Gold', sampleHex: 'bg-amber-500' },
    { id: 'navy', name: 'Sapphire Navy', sampleHex: 'bg-blue-600' },
    { id: 'olive', name: 'Olive Peace', sampleHex: 'bg-emerald-600' },
    { id: 'amethyst', name: 'Royal Amethyst', sampleHex: 'bg-purple-600' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Apple HIG Large Title */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <span className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider">
            Preferences
          </span>
          <h1 className="text-[34px] font-bold tracking-tight text-[#1C1C1E] dark:text-white leading-tight">
            Settings
          </h1>
        </div>

        <button
          onClick={() => {
            resetOnboarding();
            triggerBanner('Welcome Tour', 'Welcome guide restarted.', 'info');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[13px] font-medium text-[#1C1C1E] dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-95 transition"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span>Tour</span>
        </button>
      </div>

      {/* Group 1: Spiritual Rhythms & Notifications (iOS Inset Grouped Table) */}
      <div className="space-y-1.5">
        <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider px-3">
          Spiritual Rhythms & Alerts
        </span>
        <div className="ios-card divide-y divide-black/[0.06] dark:divide-white/[0.08] overflow-hidden">
          {/* Morning Verse */}
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-amber-500 text-white flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#1C1C1E] dark:text-white leading-tight">
                  Morning Verse of the Day
                </h4>
                <p className="text-[12px] text-[#8E8E93] mt-0.5">
                  Daily meditation at 07:00 AM
                </p>
              </div>
            </div>
            {/* iOS Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dailyVerseReminder}
                onChange={(e) => setDailyVerseReminder(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E5E5EA] dark:bg-[#39393D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
            </label>
          </div>

          {/* Twilight Devotional */}
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-indigo-500 text-white flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#1C1C1E] dark:text-white leading-tight">
                  Twilight Devotional Reminder
                </h4>
                <p className="text-[12px] text-[#8E8E93] mt-0.5">
                  Evening prayer alert at 08:30 PM
                </p>
              </div>
            </div>
            {/* iOS Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={devotionalReminder}
                onChange={(e) => setDevotionalReminder(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E5E5EA] dark:bg-[#39393D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
            </label>
          </div>

          {/* Pastoral Broadcasts */}
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-red-500 text-white flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#1C1C1E] dark:text-white leading-tight">
                  Pastoral Broadcast Notices
                </h4>
                <p className="text-[12px] text-[#8E8E93] mt-0.5">
                  Immediate alerts for church notices
                </p>
              </div>
            </div>
            {/* iOS Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E5E5EA] dark:bg-[#39393D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Group 2: Display & Appearance */}
      <div className="space-y-1.5">
        <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider px-3">
          Display & Appearance
        </span>
        <div className="ios-card divide-y divide-black/[0.06] dark:divide-white/[0.08] overflow-hidden">
          {/* Dark Mode Row */}
          <div className="p-4 flex items-center justify-between gap-4">
            <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white">
              Dark Appearance
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E5E5EA] dark:bg-[#39393D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
            </label>
          </div>

          {/* Accent Color Picker */}
          <div className="p-4 space-y-2">
            <span className="text-[13px] font-medium text-[#8E8E93] block">
              Color Palette Accent
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {palettes.map((p) => {
                const isSelected = themePalette === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setThemePalette(p.id)}
                    className={`p-2.5 rounded-[12px] text-left border flex items-center gap-2.5 transition ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full ${p.sampleHex}`} />
                    <span className="text-[12px] font-semibold text-[#1C1C1E] dark:text-white truncate">
                      {p.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-amber-600 dark:text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Group 3: Local Cache & Storage Metrics */}
      <div className="space-y-1.5">
        <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider px-3">
          Storage & Offline Cache
        </span>
        <div className="ios-card divide-y divide-black/[0.06] dark:divide-white/[0.08] overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-emerald-500 text-white flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white block">
                  Local Database
                </span>
                <span className="text-[12px] text-[#8E8E93]">
                  All Scripture & media cached locally
                </span>
              </div>
            </div>
            <span className="text-[12px] font-semibold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
              100% Offline
            </span>
          </div>

          <div className="p-4 grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-[10px] bg-black/[0.02] dark:bg-white/[0.03]">
              <div className="text-[19px] font-bold text-[#1C1C1E] dark:text-white">
                {bookmarks.length}
              </div>
              <div className="text-[10px] text-[#8E8E93] uppercase font-semibold">Bookmarks</div>
            </div>
            <div className="p-2.5 rounded-[10px] bg-black/[0.02] dark:bg-white/[0.03]">
              <div className="text-[19px] font-bold text-[#1C1C1E] dark:text-white">
                {journalEntries.length}
              </div>
              <div className="text-[10px] text-[#8E8E93] uppercase font-semibold">Journals</div>
            </div>
            <div className="p-2.5 rounded-[10px] bg-black/[0.02] dark:bg-white/[0.03]">
              <div className="text-[19px] font-bold text-[#1C1C1E] dark:text-white">
                {announcements.length}
              </div>
              <div className="text-[10px] text-[#8E8E93] uppercase font-semibold">Notices</div>
            </div>
          </div>
        </div>
      </div>

      {/* Group 4: Licensing & Public-Domain Guarantee */}
      <div className="space-y-1.5">
        <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider px-3">
          About & Licensing
        </span>
        <div className="ios-card p-4 space-y-3">
          <div className="flex items-center gap-2.5 text-[#1C1C1E] dark:text-white">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3 className="text-[15px] font-semibold">
              Public-Domain & Open-Source Guarantee
            </h3>
          </div>

          <p className="text-[13px] text-[#8E8E93] leading-relaxed">
            Every Scripture translation, font, icon set, and audio recording bundled in Church Sanctuary is guaranteed 100% free, open-source, or public-domain under CC0, MIT, or BSD licenses. No commercial subscriptions or paywalls.
          </p>

          <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] space-y-1 text-[12px] text-[#8E8E93]">
            <div className="flex justify-between py-0.5">
              <span>Scripture Translations</span>
              <span className="font-medium text-[#1C1C1E] dark:text-white">KJV, WEB, ASV, BBE</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Interface Guidelines</span>
              <span className="font-medium text-[#1C1C1E] dark:text-white">Apple HIG Standards</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Application Version</span>
              <span className="font-medium text-[#1C1C1E] dark:text-white">2.4.0 (Offline Ready)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
