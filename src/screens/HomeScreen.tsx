import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { SAMPLE_SERMONS } from '../data/seedData';
import { AnnouncementEntity } from '../types';
import {
  Sparkles,
  BookOpen,
  Headphones,
  Pin,
  Calendar,
  ChevronRight,
  Bookmark,
  Users,
  Clock,
  Play,
  Share2,
  X,
  Volume2,
  Sun,
  Flame,
  CheckCircle2,
  Library,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    announcements,
    jumpToScripture,
    navigateTo,
    playAudio,
    prayerGroups,
    toggleGroupRsvp,
    bookmarks,
    journalEntries,
    sermons,
    pastors,
  } = useSanctuary();

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementEntity | null>(null);

  // Today's formatted date in Apple style
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Verse of the day
  const verseOfTheDay = {
    book: 'Romans',
    chapter: 8,
    verse: 38,
    reference: 'Romans 8:38-39',
    text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.',
    translation: 'KJV',
  };

  // Sort announcements: pinned first, then by date
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const latestSermon = sermons.find((s) => s.isPublished) || sermons[0];
  const latestPastor = pastors.find((p) => p.id === latestSermon?.pastorId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Apple HIG Today Large Title Header */}
      <div className="flex items-end justify-between pb-1">
        <div>
          <span className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider block">
            {todayFormatted}
          </span>
          <h1 className="text-[34px] font-bold tracking-tight text-[#1C1C1E] dark:text-white leading-tight">
            Today
          </h1>
        </div>

        <button
          onClick={() => navigateTo('profile')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition active:scale-95"
        >
          <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
            M
          </div>
          <span className="text-[12px] font-semibold text-[#1C1C1E] dark:text-white">
            Sanctuary
          </span>
        </button>
      </div>

      {/* 1. Verse of the Day Card - Apple Featured Card Style */}
      <div className="rounded-[22px] overflow-hidden bg-gradient-to-b from-[#925C1C] to-[#59360E] text-white p-6 shadow-sm relative">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
            Scripture of the Day
          </span>
          <span className="text-[12px] font-medium text-amber-200/90">
            {verseOfTheDay.translation} • Public Domain
          </span>
        </div>

        <blockquote className="font-reading text-[18px] sm:text-[20px] leading-relaxed italic text-white/95">
          "{verseOfTheDay.text}"
        </blockquote>

        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
          <span className="text-[14px] font-semibold text-amber-200 tracking-wide">
            {verseOfTheDay.reference}
          </span>

          <button
            onClick={() => jumpToScripture(verseOfTheDay.book, verseOfTheDay.chapter, verseOfTheDay.verse)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#59360E] hover:bg-amber-50 text-[13px] font-semibold active:scale-95 transition shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#59360E]" />
            <span>Read Passage</span>
          </button>
        </div>
      </div>

      {/* 2. Today's Spiritual Rhythms - Apple Health/Rings Inset Group */}
      <div className="space-y-1.5">
        <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider px-3">
          Daily Rhythms
        </span>
        <div className="ios-card divide-y divide-black/[0.06] dark:divide-white/[0.08] overflow-hidden">
          <button
            onClick={() => navigateTo('devotion')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.03] active:bg-black/[0.05] transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-orange-500 text-white flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white block leading-tight">
                  Morning Reflection
                </span>
                <span className="text-[12px] text-[#8E8E93]">
                  The Unfailing Anchor • Psalm 46:1-3
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
          </button>

          <button
            onClick={() => navigateTo('scripture')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.03] active:bg-black/[0.05] transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-amber-500 text-white flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white block leading-tight">
                  Scripture Reading
                </span>
                <span className="text-[12px] text-[#8E8E93]">
                  Romans Chapter 8 • 4 Public Domain Translations
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
          </button>

          <button
            onClick={() => navigateTo('journal')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.03] active:bg-black/[0.05] transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-teal-500 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white block leading-tight">
                  Prayer Journal
                </span>
                <span className="text-[12px] text-[#8E8E93]">
                  {journalEntries.length} saved reflections
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
          </button>

          <button
            onClick={() => navigateTo('sermons')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.03] active:bg-black/[0.05] transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-amber-600 text-white flex items-center justify-center">
                <Library className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[15px] font-medium text-[#1C1C1E] dark:text-white block leading-tight">
                  Sermon Library
                </span>
                <span className="text-[12px] text-[#8E8E93]">
                  {sermons.filter((s) => s.isPublished).length} messages • Expositions & Audio
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
          </button>
        </div>
      </div>

      {/* 3. Featured Sermon Audio - Apple Podcasts Episode Cell Style */}
      {latestSermon && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-3">
            <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
              Latest Sermon Message
            </span>
            <button
              onClick={() => navigateTo('sermons')}
              className="text-[12px] font-medium text-amber-600 dark:text-amber-400 hover:underline"
            >
              View All
            </button>
          </div>
          <div
            onClick={() => navigateTo('sermons', { sermonId: latestSermon.id })}
            className="ios-card p-4 flex items-center gap-3.5 cursor-pointer hover:border-amber-500/30 transition border border-black/[0.04] dark:border-white/[0.06]"
          >
            <div className="w-14 h-14 rounded-[12px] bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center shadow-2xs flex-shrink-0">
              <Volume2 className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {latestSermon.theme}
              </span>
              <h4 className="text-[15px] font-semibold text-[#1C1C1E] dark:text-white truncate mt-0.5">
                {latestSermon.title}
              </h4>
              <p className="text-[12px] text-[#8E8E93] truncate">
                {latestPastor?.name || 'Pastor'} • {Math.floor((latestSermon.durationSec || 1800) / 60)} min
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playAudio({
                  id: latestSermon.id,
                  title: latestSermon.title,
                  subtitle: latestPastor?.name || 'Sermon Audio',
                  type: 'sermon',
                  durationSec: latestSermon.durationSec || 1800,
                });
              }}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-xs active:scale-95 transition flex-shrink-0"
              title="Listen Now"
              aria-label="Listen Now"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Pastoral Announcements Feed - Apple News Style */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-3">
          <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
            Announcements & Notices
          </span>
          <span className="text-[12px] text-[#8E8E93]">
            {announcements.length} notices
          </span>
        </div>

        <div className="space-y-2.5">
          {sortedAnnouncements.map((item) => (
            <div
              key={item.id}
              className={`ios-card p-4 transition-colors ${
                item.isPinned ? 'border border-amber-400/50 dark:border-amber-500/30' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white">
                    {item.category}
                  </span>
                  {item.isPinned && (
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                      <Pin className="w-3 h-3 fill-current" /> Pinned
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#8E8E93]">
                  {new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <h3 className="text-[16px] font-semibold text-[#1C1C1E] dark:text-white mt-2">
                {item.title}
              </h3>

              <p className="text-[14px] text-[#3C3C43] dark:text-[#EBEBF5]/80 mt-1 leading-relaxed line-clamp-2">
                {item.content}
              </p>

              <div className="mt-3 pt-2.5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-[12px] text-[#8E8E93]">
                  By {item.authorName}
                </span>

                <button
                  onClick={() => setSelectedAnnouncement(item)}
                  className="text-[13px] font-semibold text-amber-600 dark:text-amber-400 hover:opacity-80 active:scale-95 transition"
                >
                  Read Notice →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apple iOS Bottom Sheet Modal for Full Announcement Reading */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-t-[28px] sm:rounded-[24px] ios-card p-6 shadow-2xl border border-black/10 dark:border-white/10 max-h-[90vh] overflow-y-auto">
            {/* Grabber bar */}
            <div className="w-9 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 mx-auto mb-4" />

            <div className="flex items-start justify-between gap-4">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
                {selectedAnnouncement.category}
              </span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="w-7 h-7 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-[20px] font-bold text-[#1C1C1E] dark:text-white mt-2">
              {selectedAnnouncement.title}
            </h2>

            <p className="text-[12px] text-[#8E8E93] mt-1">
              {selectedAnnouncement.authorName} • {new Date(selectedAnnouncement.publishedAt).toLocaleDateString()}
            </p>

            <div className="mt-4 text-[15px] text-[#3C3C43] dark:text-[#EBEBF5]/90 leading-relaxed space-y-3 font-reading">
              {selectedAnnouncement.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {selectedAnnouncement.scriptureRef && (
              <div className="mt-4 p-3 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.05] flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#1C1C1E] dark:text-white">
                  Reference: {selectedAnnouncement.scriptureRef}
                </span>
                <button
                  onClick={() => {
                    setSelectedAnnouncement(null);
                    jumpToScripture('Romans', 12, 1);
                  }}
                  className="text-[12px] font-semibold text-amber-600 dark:text-amber-400"
                >
                  Open in Reader
                </button>
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="w-full py-2.5 rounded-[12px] bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/[0.1] text-[15px] font-semibold text-[#1C1C1E] dark:text-white transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
