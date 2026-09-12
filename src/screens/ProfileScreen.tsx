import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { ThemePalette } from '../types';
import {
  User,
  Bookmark,
  Flame,
  Clock,
  Palette,
  ShieldCheck,
  Moon,
  Sun,
  Trash2,
  BookOpen,
  ChevronRight,
  Sparkles,
  Feather,
  Headphones,
  Users,
  Settings as SettingsIcon,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    bookmarks,
    toggleBookmark,
    jumpToScripture,
    themePalette,
    setThemePalette,
    isDarkMode,
    setIsDarkMode,
    journalEntries,
    prayerGroups,
    navigateTo,
    loggedInStaff,
  } = useSanctuary();

  const palettes: { id: ThemePalette; name: string; desc: string; sampleHex: string }[] = [
    {
      id: 'gold',
      name: 'Sanctuary Gold',
      desc: 'Warm imperial gold & parchment',
      sampleHex: 'bg-amber-500',
    },
    {
      id: 'navy',
      name: 'Sapphire Navy',
      desc: 'Deep naval sapphire & gold',
      sampleHex: 'bg-blue-600',
    },
    {
      id: 'olive',
      name: 'Olive Peace',
      desc: 'Serene biblical olive & sage',
      sampleHex: 'bg-emerald-600',
    },
    {
      id: 'amethyst',
      name: 'Royal Amethyst',
      desc: 'Imperial purple & lavender',
      sampleHex: 'bg-purple-600',
    },
  ];

  const activeRsvps = prayerGroups.filter((g) => g.rsvpStatus === 'attending').length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Apple HIG Large Title */}
      <div className="pb-2">
        <span className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider">
          Account
        </span>
        <h1 className="text-[34px] font-bold tracking-tight text-[#1C1C1E] dark:text-white leading-tight">
          My Sanctuary
        </h1>
      </div>

      {/* Profile ID Card - Apple iOS Contact Card Style */}
      <div className="ios-card p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center text-xl font-bold shadow-xs flex-shrink-0">
          {loggedInStaff ? loggedInStaff.name.split(' ').pop()?.[0] || 'S' : 'M'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[19px] font-semibold text-[#1C1C1E] dark:text-white truncate">
              {loggedInStaff ? loggedInStaff.name : 'Sanctuary Pilgrim'}
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
              {loggedInStaff ? loggedInStaff.role : 'Member'}
            </span>
          </div>
          <p className="text-[13px] text-[#8E8E93] truncate mt-0.5">
            {loggedInStaff ? loggedInStaff.role : 'Offline Pilgrim & Reader'}
          </p>
        </div>
        <button
          onClick={() => navigateTo('settings')}
          className="w-9 h-9 rounded-full bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white active:scale-95 transition"
          title="Open Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Spiritual Metrics - Apple Fitness / Health Style Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="ios-card p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#8E8E93]">Streak</span>
            <div className="w-6 h-6 rounded-[6px] bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-[24px] font-bold tracking-tight text-[#1C1C1E] dark:text-white">
            14 <span className="text-[13px] font-normal text-[#8E8E93]">days</span>
          </div>
        </div>

        <div className="ios-card p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#8E8E93]">Bookmarks</span>
            <div className="w-6 h-6 rounded-[6px] bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Bookmark className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-[24px] font-bold tracking-tight text-[#1C1C1E] dark:text-white">
            {bookmarks.length}
          </div>
        </div>

        <div className="ios-card p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#8E8E93]">Circles</span>
            <div className="w-6 h-6 rounded-[6px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-[24px] font-bold tracking-tight text-[#1C1C1E] dark:text-white">
            {activeRsvps}
          </div>
        </div>

        <div className="ios-card p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#8E8E93]">Journals</span>
            <div className="w-6 h-6 rounded-[6px] bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-[24px] font-bold tracking-tight text-[#1C1C1E] dark:text-white">
            {journalEntries.length}
          </div>
        </div>
      </div>

      {/* Quick Access - iOS Inset Grouped Table */}
      <div className="space-y-1.5">
        <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider px-3">
          Shortcuts
        </span>
        <div className="ios-card divide-y divide-black/[0.06] dark:divide-white/[0.08] overflow-hidden">
          <button
            onClick={() => navigateTo('journal')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.03] active:bg-black/[0.05] transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-teal-500 text-white flex items-center justify-center">
                <Feather className="w-4 h-4" />
              </div>
              <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white">
                Prayer Journal
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#8E8E93]">
              <span className="text-[13px]">{journalEntries.length} entries</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          <button
            onClick={() => navigateTo('pastors')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.03] active:bg-black/[0.05] transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-purple-500 text-white flex items-center justify-center">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white">
                Pastoral Care
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
          </button>

          <button
            onClick={() => navigateTo('companion-portal')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.03] active:bg-black/[0.05] transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-indigo-500 text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white">
                  Staff Companion Portal
                </span>
                <span className="text-[11px] text-[#8E8E93]">
                  {loggedInStaff ? `Logged in as ${loggedInStaff.name}` : 'Post announcements & broadcasts'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
          </button>
        </div>
      </div>

      {/* Appearance & Color Palettes - iOS Inset Group */}
      <div className="space-y-1.5">
        <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider px-3">
          Appearance
        </span>
        <div className="ios-card p-4 space-y-4">
          {/* iOS Segmented Control for Light / Dark */}
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white">
              Interface Theme
            </span>
            <div className="ios-segmented flex items-center p-0.5 rounded-[9px] w-44">
              <button
                onClick={() => setIsDarkMode(false)}
                className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-[7px] text-[12px] font-semibold transition ${
                  !isDarkMode
                    ? 'bg-white text-black shadow-xs'
                    : 'text-[#8E8E93] hover:text-[#1C1C1E]'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setIsDarkMode(true)}
                className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-[7px] text-[12px] font-semibold transition ${
                  isDarkMode
                    ? 'bg-[#3A3A3C] text-white shadow-xs'
                    : 'text-[#8E8E93] hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Color Palettes */}
          <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
            <span className="text-[12px] font-semibold text-[#8E8E93] block mb-2.5">
              Accent Palette
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {palettes.map((p) => {
                const isSelected = themePalette === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setThemePalette(p.id)}
                    className={`p-2.5 rounded-[12px] text-left border flex flex-col gap-1.5 transition ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-4 h-4 rounded-full ${p.sampleHex} shadow-2xs`} />
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                      )}
                    </div>
                    <span className="text-[12px] font-semibold text-[#1C1C1E] dark:text-white truncate">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarked Verses - iOS List Style */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-3">
          <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
            Saved Verses ({bookmarks.length})
          </span>
        </div>

        {bookmarks.length === 0 ? (
          <div className="ios-card p-8 text-center space-y-2">
            <Bookmark className="w-8 h-8 text-[#8E8E93] mx-auto opacity-50" />
            <p className="text-[15px] font-medium text-[#1C1C1E] dark:text-white">
              No verses bookmarked yet
            </p>
            <p className="text-[13px] text-[#8E8E93] max-w-sm mx-auto">
              Tap the bookmark ribbon on any passage while reading Scripture to store your verses here.
            </p>
          </div>
        ) : (
          <div className="ios-card divide-y divide-black/[0.06] dark:divide-white/[0.08] overflow-hidden">
            {bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="p-4 flex items-start justify-between gap-3 hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => jumpToScripture(bm.book, bm.chapter, bm.verse)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#1C1C1E] dark:text-white">
                      {bm.book} {bm.chapter}:{bm.verse}
                    </span>
                    <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      {bm.translation}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#3C3C43] dark:text-[#EBEBF5]/80 font-reading italic mt-1 leading-relaxed">
                    "{bm.verseText}"
                  </p>
                  <span className="text-[11px] text-[#8E8E93] mt-1.5 block">
                    Saved on {new Date(bm.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <button
                  onClick={() => toggleBookmark(bm.book, bm.chapter, bm.verse, bm.translation, bm.verseText)}
                  className="p-2 text-[#8E8E93] hover:text-red-500 active:scale-95 transition"
                  title="Remove Bookmark"
                  aria-label="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
