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
  ChevronRight,
  Play,
} from 'lucide-react';

export const DevotionScreen: React.FC = () => {
  const { jumpToScripture, playAudio } = useSanctuary();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const devotional: Devotional = SAMPLE_DEVOTIONALS[selectedIdx] || SAMPLE_DEVOTIONALS[0];

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
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Apple HIG Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
        <div>
          <span className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider block">
            Spiritual Rhythms
          </span>
          <h1 className="text-[34px] font-bold tracking-tight text-[#1C1C1E] dark:text-white leading-tight">
            Devotions
          </h1>
        </div>

        {/* Date Segmented Control */}
        <div className="ios-segmented flex p-0.5 rounded-[9px] self-start sm:self-auto">
          {SAMPLE_DEVOTIONALS.map((d, idx) => (
            <button
              key={d.date}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1 rounded-[7px] text-[12px] font-semibold transition ${
                selectedIdx === idx
                  ? 'bg-white dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white shadow-xs'
                  : 'text-[#8E8E93]'
              }`}
            >
              {d.date}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Devotional Card */}
      <div className="ios-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
            {devotional.date} Daily Focus
          </span>
          <span className="text-[12px] text-[#8E8E93]">
            {Math.floor(devotional.audioDurationSec / 60)} min meditation
          </span>
        </div>

        <h2 className="text-[22px] sm:text-[26px] font-bold text-[#1C1C1E] dark:text-white leading-tight">
          {devotional.title}
        </h2>

        {/* Readings pill tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[12px] text-[#8E8E93] mr-1">Passages:</span>
          {devotional.scriptureRefs.map((ref) => (
            <button
              key={ref}
              onClick={() => handleScriptureClick(ref)}
              className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition flex items-center gap-1 active:scale-95"
            >
              <BookOpen className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>{ref}</span>
            </button>
          ))}
        </div>

        {/* Spoken Narration Button */}
        <div className="pt-2">
          <button
            onClick={() =>
              playAudio({
                id: `dev-${devotional.date}`,
                title: devotional.title,
                subtitle: `Devotional Spoken Narration • ${devotional.date}`,
                type: 'devotional',
                durationSec: devotional.audioDurationSec,
              })
            }
            className="w-full py-3 rounded-[12px] bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-xs transition"
          >
            <Headphones className="w-4 h-4" />
            <span>Listen to Spoken Narration</span>
          </button>
        </div>
      </div>

      {/* Reflections Inset Cards: Dawn & Twilight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Dawn Meditation */}
        <div className="ios-card p-5 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[7px] bg-amber-500 text-white flex items-center justify-center">
              <Sun className="w-4 h-4" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#1C1C1E] dark:text-white">
              Dawn Meditation
            </h3>
          </div>
          <p className="text-[14px] font-reading text-[#3C3C43] dark:text-[#EBEBF5]/90 leading-relaxed">
            {devotional.morningReflection}
          </p>
          <span className="text-[11px] text-[#8E8E93] block pt-1 italic">
            Psalm 143:8
          </span>
        </div>

        {/* Twilight Examination */}
        <div className="ios-card p-5 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[7px] bg-indigo-500 text-white flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#1C1C1E] dark:text-white">
              Twilight Examination
            </h3>
          </div>
          <p className="text-[14px] font-reading text-[#3C3C43] dark:text-[#EBEBF5]/90 leading-relaxed">
            {devotional.eveningReflection}
          </p>
          <span className="text-[11px] text-[#8E8E93] block pt-1 italic">
            Psalm 4:8
          </span>
        </div>
      </div>

      {/* Introspective Heart Questions - iOS List */}
      <div className="space-y-1.5">
        <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider px-3">
          Heart Examination
        </span>
        <div className="ios-card divide-y divide-black/[0.06] dark:divide-white/[0.08] overflow-hidden">
          {devotional.questions.map((q, i) => (
            <div key={i} className="p-4 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-[14px] font-medium text-[#1C1C1E] dark:text-white leading-relaxed">
                {q}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Pastoral Prayer */}
      <div className="ios-card p-5 space-y-2 border-l-4 border-l-amber-500">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
          <HeartHandshake className="w-4 h-4" />
          <span className="text-[12px] font-semibold uppercase tracking-wider">
            Pastoral Benediction
          </span>
        </div>
        <blockquote className="font-reading text-[15px] italic text-[#1C1C1E] dark:text-white leading-relaxed">
          "{devotional.closingPrayer}"
        </blockquote>
      </div>
    </div>
  );
};
