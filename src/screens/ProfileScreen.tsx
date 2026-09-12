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
  Code2,
  Trash2,
  BookOpen,
  ChevronRight,
  Sparkles,
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
    setIsFlutterInspectorOpen,
  } = useSanctuary();

  const palettes: { id: ThemePalette; name: string; desc: string; sampleHex: string }[] = [
    {
      id: 'navy',
      name: 'Grace Sanctuary Navy',
      desc: 'Deep naval sapphire & warm gold',
      sampleHex: 'bg-blue-900 border-amber-400',
    },
    {
      id: 'gold',
      name: 'Heavenly Gold',
      desc: 'Warm imperial gold & rich parchment',
      sampleHex: 'bg-amber-600 border-amber-200',
    },
    {
      id: 'olive',
      name: 'Olive Peace',
      desc: 'Serene biblical olive & sage',
      sampleHex: 'bg-lime-800 border-lime-300',
    },
    {
      id: 'amethyst',
      name: 'Royal Amethyst',
      desc: 'Imperial purple & soft lavender',
      sampleHex: 'bg-purple-900 border-purple-300',
    },
  ];

  const activeRsvps = prayerGroups.filter((g) => g.rsvpStatus === 'attending').length;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <User className="w-4 h-4" />
            <span>Member Profile</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Spiritual Journey & Saved Word
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Reading milestones, bookmarked verses, and app theme preferences.
          </p>
        </div>

        {/* Staff Portal Badge / Jump */}
        <button
          onClick={() => navigateTo('companion-portal')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-900 dark:bg-stone-800 hover:bg-black text-white text-xs font-bold shadow-md transition"
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>{loggedInStaff ? `Staff: ${loggedInStaff.name}` : 'Staff Portal Access'}</span>
        </button>
      </div>

      {/* 1. Spiritual Activity & Milestone Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
            14 Days
          </div>
          <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
            Reading Streak
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Bookmark className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
            {bookmarks.length}
          </div>
          <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
            Saved Verses
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
            {activeRsvps}
          </div>
          <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
            Prayer Circles
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
            {journalEntries.length}
          </div>
          <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
            Journals Logged
          </p>
        </div>
      </div>

      {/* 2. Theme Palette Switcher (Grace Sanctuary Navy, Heavenly Gold, Olive Peace, Royal Amethyst) */}
      <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Material 3 Color Palettes
            </h3>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {palettes.map((p) => {
            const isSelected = themePalette === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setThemePalette(p.id)}
                className={`p-3.5 rounded-2xl text-left border flex items-center gap-3 transition ${
                  isSelected
                    ? 'border-amber-600 bg-amber-500/10 dark:bg-amber-950/30'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 shadow-sm flex-shrink-0 ${p.sampleHex}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs text-stone-900 dark:text-stone-100 flex items-center justify-between">
                    <span>{p.name}</span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                    {p.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Saved Verses (Bookmarks) List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
              Saved Scripture Verses ({bookmarks.length})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Verses bookmarked during personal reading and devotional study.
            </p>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500 text-xs">
            No bookmarked verses yet. Tap the star icon next to any verse in the Scripture reader.
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start justify-between gap-4 shadow-sm hover:border-amber-300 dark:hover:border-amber-900 transition"
              >
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => jumpToScripture(b.book, b.chapter, b.verse)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-amber-700 dark:text-amber-400">
                      {b.book} {b.chapter}:{b.verse}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                      {b.translation}
                    </span>
                  </div>
                  <p className="font-serif text-xs text-stone-700 dark:text-stone-300 leading-relaxed mt-1 italic">
                    "{b.verseText}"
                  </p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => jumpToScripture(b.book, b.chapter, b.verse)}
                    className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                    title="Open in Scripture"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleBookmark(b.book, b.chapter, b.verse, b.translation, b.verseText)}
                    className="p-2 text-rose-400 hover:text-rose-600"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Developer Tools & Code Inspector */}
      <section className="p-6 rounded-3xl bg-stone-100 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
            Cross-Platform Flutter Codebase
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            View the Riverpod providers, Drift SQLite tables, and pubspec.yaml generated for Android & Web.
          </p>
        </div>

        <button
          onClick={() => setIsFlutterInspectorOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-amber-300 text-xs font-semibold shadow transition"
        >
          <Code2 className="w-4 h-4" />
          <span>Open Code Inspector</span>
        </button>
      </section>
    </div>
  );
};
