import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { ThemePalette } from '../types';
import {
  Settings,
  Bell,
  Palette,
  Moon,
  Sun,
  ShieldCheck,
  RefreshCw,
  Code2,
  Info,
  ExternalLink,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    themePalette,
    setThemePalette,
    isDarkMode,
    setIsDarkMode,
    resetOnboarding,
    setIsFlutterInspectorOpen,
    bookmarks,
    journalEntries,
    announcements,
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

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Settings className="w-4 h-4" />
            <span>Preferences & Data</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Application Settings
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Configure offline cache, daily reminders, display palette, and licensing.
          </p>
        </div>

        <button
          onClick={resetOnboarding}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Replay Welcome Tour</span>
        </button>
      </div>

      {/* 1. Notifications & Spiritual Alarms */}
      <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-600" />
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            Spiritual Rhythms & Reminders
          </h3>
        </div>

        <div className="space-y-3 divide-y divide-stone-100 dark:divide-stone-800">
          <div className="pt-2 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Morning Verse of the Day
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Daily alert at 07:00 AM with public-domain Scripture.
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-amber-600 focus:ring-amber-500 w-5 h-5"
            />
          </div>

          <div className="pt-3 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Twilight Devotional Reminder
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Evening meditation alert at 08:30 PM with introspective prayer prompts.
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-amber-600 focus:ring-amber-500 w-5 h-5"
            />
          </div>

          <div className="pt-3 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Pastoral Broadcast Notifications
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Immediate alerts whenever senior pastors post emergency notices or service updates.
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-amber-600 focus:ring-amber-500 w-5 h-5"
            />
          </div>
        </div>
      </section>

      {/* 2. Theme & Visual Palettes */}
      <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Theming & Display
            </h3>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
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

      {/* 3. Offline Data & Storage Metrics */}
      <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            Offline Storage & Cache
          </h3>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-300/40">
            ● 100% Offline Ready
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800">
            <div className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {bookmarks.length}
            </div>
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Bookmarks</div>
          </div>
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800">
            <div className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {journalEntries.length}
            </div>
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Journals</div>
          </div>
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800">
            <div className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {announcements.length}
            </div>
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Notices</div>
          </div>
        </div>
      </section>

      {/* 4. Licensing & Resource Constraints Compliance */}
      <section className="rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <h3 className="font-serif font-bold text-base">
            Licensing & Public-Domain Guarantee
          </h3>
        </div>

        <p className="text-xs text-amber-950/80 dark:text-amber-200/80 leading-relaxed">
          Every component, font, icon set, audio track, and scripture passage bundled in Church Sanctuary is guaranteed 100% free, open-source, or public-domain under MIT, BSD, Apache-2.0, or CC0 licenses.
        </p>

        <ul className="text-xs text-amber-900/90 dark:text-amber-300/90 space-y-1 list-disc list-inside font-medium">
          <li><strong>Bible Translations:</strong> King James Version (1611), World English Bible (WEB), American Standard Version (1901), Bible in Basic English (1949/1964) — zero commercial restrictions.</li>
          <li><strong>Typography:</strong> Google Fonts (Open Font License).</li>
          <li><strong>Audio:</strong> CC0 / Public Domain ambient pastoral recordings.</li>
          <li><strong>No API subscriptions or paywalls:</strong> Built to serve the Church in perpetuity.</li>
        </ul>
      </section>
    </div>
  );
};
