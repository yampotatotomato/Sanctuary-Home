import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { SAMPLE_DEVOTIONALS } from '../data/seedData';
import { Devotional } from '../types';
import {
  Sun,
  Moon,
  Headphones,
  BookOpen,
  HelpCircle,
  HeartHandshake,
  Sparkles,
  Volume2,
  Calendar,
  ChevronRight,
} from 'lucide-react';

export const DevotionScreen: React.FC = () => {
  const { jumpToScripture, playAudio } = useSanctuary();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const devotional: Devotional = SAMPLE_DEVOTIONALS[selectedIdx] || SAMPLE_DEVOTIONALS[0];

  // Helper to parse scripture reference string (e.g. 'Psalms 23:1' or 'Romans 8:31')
  const handleScriptureClick = (refStr: string) => {
    const parts = refStr.trim().split(' ');
    if (parts.length >= 2) {
      const book = parts.slice(0, -1).join(' ');
      const chVerse = parts[parts.length - 1].split(':');
      const chapter = parseInt(chVerse[0], 10) || 1;
      const verse = chVerse.length > 1 ? parseInt(chVerse[1], 10) : undefined;
      jumpToScripture(book, chapter, verse);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Sun className="w-4 h-4" />
            <span>Daily Spiritual Rhythms</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Devotional Reflections
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Morning & evening meditations, spoken narration, and scripture deep-links.
          </p>
        </div>

        {/* Date Selector Tabs */}
        <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl border border-stone-200 dark:border-stone-700">
          {SAMPLE_DEVOTIONALS.map((d, idx) => (
            <button
              key={d.date}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedIdx === idx
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {d.date}
            </button>
          ))}
        </div>
      </div>

      {/* Devotional Hero Title & Audio Narration Card */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 flex-1">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
            {devotional.date}’s Focus
          </span>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-snug">
            {devotional.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-stone-500 dark:text-stone-400">Readings:</span>
            {devotional.scriptureRefs.map((ref) => (
              <button
                key={ref}
                onClick={() => handleScriptureClick(ref)}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40 hover:bg-amber-100 transition flex items-center gap-1"
                title={`Jump to ${ref} in Bible`}
              >
                <BookOpen className="w-3 h-3 text-amber-600" />
                <span>{ref}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Narration Trigger */}
        <div className="flex-shrink-0">
          <button
            onClick={() =>
              playAudio({
                id: `dev-${devotional.date}`,
                title: devotional.title,
                subtitle: `Devotional Audio Narration • ${devotional.date}`,
                type: 'devotional',
                durationSec: devotional.audioDurationSec,
              })
            }
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold text-xs shadow-md transition"
          >
            <Headphones className="w-4 h-4" />
            <span>Listen to Narration ({Math.floor(devotional.audioDurationSec / 60)}m)</span>
          </button>
        </div>
      </div>

      {/* Morning & Evening Cards (Material 3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Morning Reflection */}
        <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-3">
              <Sun className="w-5 h-5" />
              <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                Dawn Meditation
              </h4>
            </div>
            <p className="text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
              {devotional.morningReflection}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>Morning Offering</span>
            <span className="italic">Psalm 143:8</span>
          </div>
        </section>

        {/* Evening Reflection */}
        <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-3">
              <Moon className="w-5 h-5" />
              <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                Twilight Examination
              </h4>
            </div>
            <p className="text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
              {devotional.eveningReflection}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>Evening Rest</span>
            <span className="italic">Psalm 4:8</span>
          </div>
        </section>
      </div>

      {/* Introspective Questions */}
      <section className="rounded-3xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h4 className="font-serif font-bold text-lg">Introspective Heart Questions</h4>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Take five quiet moments to meditate on these prompts before the Lord:
        </p>

        <div className="space-y-3">
          {devotional.questions.map((q, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-750 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200"
            >
              <span className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {i + 1}
              </span>
              <p className="leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Prayer */}
      <section className="rounded-3xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-stone-900 dark:to-stone-850 border border-amber-200/60 dark:border-stone-800 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
          <HeartHandshake className="w-5 h-5" />
          <h4 className="font-serif font-bold text-lg">Pastoral Closing Prayer</h4>
        </div>

        <blockquote className="font-serif italic text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed">
          "{devotional.closingPrayer}"
        </blockquote>
      </section>
    </div>
  );
};
