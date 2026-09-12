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
  Radio,
  Share2,
  Bookmark,
  Users,
  Clock,
  Play,
  ArrowUpRight,
  X,
  Volume2,
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
  } = useSanctuary();

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementEntity | null>(null);

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

  const featuredSermon = SAMPLE_SERMONS[0];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Greeting & Community Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/70 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Church Sanctuary • Congregation Feed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Peace Be Multiplied to You
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Your sacred sanctuary for Scripture reading, daily devotion, and church life.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 bg-stone-100 dark:bg-stone-800/80 p-2 px-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 text-xs text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-1.5 font-medium">
            <Bookmark className="w-3.5 h-3.5 text-amber-600" />
            <span>{bookmarks.length} Verses</span>
          </div>
          <span className="text-stone-300 dark:text-stone-600">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>{journalEntries.length} Journals</span>
          </div>
        </div>
      </header>

      {/* 1. Verse of the Day Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Background Subtle Flourish */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/15 text-amber-200 backdrop-blur-sm">
                Verse of the Day
              </span>
              <span className="text-xs text-amber-200/80 font-mono">
                {verseOfTheDay.translation} • Public Domain
              </span>
            </div>

            <blockquote className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed italic text-stone-100">
              "{verseOfTheDay.text}"
            </blockquote>

            <div className="flex items-center gap-2 pt-1 text-sm font-semibold text-amber-200">
              <span>{verseOfTheDay.reference}</span>
            </div>
          </div>

          <div className="flex sm:flex-col items-center justify-end gap-2 flex-shrink-0 pt-2 sm:pt-0">
            <button
              onClick={() => jumpToScripture(verseOfTheDay.book, verseOfTheDay.chapter, verseOfTheDay.verse)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 active:scale-95 text-amber-900 text-xs font-bold shadow-md transition"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Read Chapter</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quick Sermon Player & Prayer Groups Preview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Sermon Banner */}
        <div className="lg:col-span-1 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">
                Latest Message
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                {Math.floor(featuredSermon.durationSec / 60)} mins
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 line-clamp-2">
              {featuredSermon.title}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {featuredSermon.speaker} • {featuredSermon.series}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <button
              onClick={() =>
                playAudio({
                  id: featuredSermon.id,
                  title: featuredSermon.title,
                  subtitle: `${featuredSermon.speaker} • ${featuredSermon.scriptureRef}`,
                  type: 'sermon',
                  durationSec: featuredSermon.durationSec,
                })
              }
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow transition active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Listen Now</span>
            </button>

            <button
              onClick={() => navigateTo('pastors')}
              className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 font-medium flex items-center gap-1"
            >
              Archive <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Prayer Groups Strip */}
        <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                Prayer & Fellowship Circles
              </h3>
            </div>
            <button
              onClick={() => navigateTo('groups')}
              className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-0.5"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {prayerGroups.slice(0, 2).map((group) => {
              const isAttending = group.rsvpStatus === 'attending';
              return (
                <div
                  key={group.id}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300">
                        {group.category}
                      </span>
                      {isAttending && (
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          ✓ Attending
                        </span>
                      )}
                    </div>
                    <h5 className="font-semibold text-xs text-stone-900 dark:text-stone-100 mt-2 truncate">
                      {group.groupName}
                    </h5>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                      {group.meetingTime}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 flex items-center justify-between text-xs">
                    <button
                      onClick={() => toggleGroupRsvp(group.id, isAttending ? 'none' : 'attending')}
                      className={`px-3 py-1 rounded-lg font-semibold transition text-xs ${
                        isAttending
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      {isAttending ? 'Joined' : 'RSVP'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Pastoral Announcements Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
              Pastoral Announcements
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Live updates, weekly services, and ministry callouts from pastoral leadership.
            </p>
          </div>
          <span className="text-xs font-mono text-stone-400">
            {announcements.length} Published
          </span>
        </div>

        <div className="space-y-4">
          {sortedAnnouncements.map((item) => (
            <article
              key={item.id}
              className={`rounded-3xl p-5 sm:p-6 transition-all border shadow-sm ${
                item.isPinned
                  ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300/60 dark:border-amber-900/50'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {item.isPinned && (
                    <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-600 text-white">
                      <Pin className="w-3 h-3" /> Pinned
                    </span>
                  )}
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {item.category}
                  </span>
                  {item.isBroadcastSent && (
                    <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                      <Radio className="w-3 h-3 text-indigo-500 animate-pulse" /> Broadcasted
                    </span>
                  )}
                </div>

                <span className="text-[11px] text-stone-400 font-mono">
                  {new Date(item.publishedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 mt-2.5 mb-1.5">
                {item.title}
              </h4>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                {item.content}
              </p>

              {item.scriptureRef && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-200/50 dark:border-amber-900/40">
                    📖 Ref: {item.scriptureRef}
                  </span>
                </div>
              )}

              <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-stone-500 dark:text-stone-400 font-medium">
                  By <span className="text-stone-800 dark:text-stone-200 font-semibold">{item.authorName}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.ctaLabel && (
                    <button
                      onClick={() => setSelectedAnnouncement(item)}
                      className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 text-white dark:text-stone-900 font-semibold transition"
                    >
                      {item.ctaLabel}
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedAnnouncement(item)}
                    className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    title="View Announcement Details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Expandable Announcement Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {selectedAnnouncement.category} Notice
                </span>
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mt-1">
                  {selectedAnnouncement.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Authored by {selectedAnnouncement.authorName}
                </p>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                {selectedAnnouncement.content}
              </p>

              {selectedAnnouncement.scriptureRef && (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/50 text-xs">
                  <span className="font-bold text-amber-900 dark:text-amber-200">Scripture Reference: </span>
                  <span className="text-amber-800 dark:text-amber-300">{selectedAnnouncement.scriptureRef}</span>
                </div>
              )}
            </div>

            <div className="p-4 px-6 bg-stone-50 dark:bg-stone-800/60 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-mono">
                Published {new Date(selectedAnnouncement.publishedAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
