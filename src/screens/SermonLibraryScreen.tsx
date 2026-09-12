import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSanctuary } from '../context/SanctuaryContext';
import { SermonEntity, PastorEntity } from '../types';
import { parseScriptureRef } from '../utils/scriptureParser';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  Play,
  Pause,
  ChevronLeft,
  Filter,
  User,
  Volume2,
  Tag,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Headphones,
  SlidersHorizontal,
} from 'lucide-react';

export const SermonLibraryScreen: React.FC = () => {
  const {
    sermons,
    pastors,
    selectedSermonId,
    setSelectedSermonId,
    jumpToScripture,
    playAudio,
    audioTrack,
    isPlaying,
    togglePlayPause,
    navigateTo,
  } = useSanctuary();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedPastorId, setSelectedPastorId] = useState<string>('all');
  const [datePreset, setDatePreset] = useState<'all' | 'week' | 'month' | 'year' | 'custom'>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  // Selected Sermon for Detail View
  const activeSermon = useMemo(() => {
    if (!selectedSermonId) return null;
    return sermons.find((s) => s.id === selectedSermonId) || null;
  }, [selectedSermonId, sermons]);

  const activePastor = useMemo(() => {
    if (!activeSermon) return null;
    return pastors.find((p) => p.id === activeSermon.pastorId) || null;
  }, [activeSermon, pastors]);

  // Unique Themes in database
  const availableThemes = useMemo(() => {
    const set = new Set<string>();
    sermons.forEach((s) => {
      if (s.theme) set.add(s.theme.trim());
    });
    return Array.from(set).sort();
  }, [sermons]);

  // Filtered sermons (published only for congregation view, newest first)
  const filteredSermons = useMemo(() => {
    const now = new Date();

    return sermons
      .filter((s) => s.isPublished)
      .filter((s) => {
        // Theme Filter
        if (selectedTheme !== 'all' && s.theme.toLowerCase() !== selectedTheme.toLowerCase()) {
          return false;
        }

        // Pastor Filter
        if (selectedPastorId !== 'all' && s.pastorId !== selectedPastorId) {
          return false;
        }

        // Date Filter
        if (datePreset !== 'all') {
          const sermonDate = new Date(s.sermonDate);
          if (datePreset === 'week') {
            const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (sermonDate < oneWeekAgo || sermonDate > now) return false;
          } else if (datePreset === 'month') {
            const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (sermonDate < oneMonthAgo || sermonDate > now) return false;
          } else if (datePreset === 'year') {
            const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            if (sermonDate < oneYearAgo || sermonDate > now) return false;
          } else if (datePreset === 'custom') {
            if (customStartDate && s.sermonDate < customStartDate) return false;
            if (customEndDate && s.sermonDate > customEndDate) return false;
          }
        }

        // Search Query (Title, Theme, Scripture Refs, Excerpt)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const pastor = pastors.find((p) => p.id === s.pastorId);
          const pastorName = pastor ? pastor.name.toLowerCase() : '';
          const matchTitle = s.title.toLowerCase().includes(q);
          const matchTheme = s.theme.toLowerCase().includes(q);
          const matchContent = s.markdownContent.toLowerCase().includes(q);
          const matchPastor = pastorName.includes(q);
          const matchRefs = s.scriptureRefs?.some((r) => r.toLowerCase().includes(q)) || false;
          return matchTitle || matchTheme || matchContent || matchPastor || matchRefs;
        }

        return true;
      })
      .sort((a, b) => new Date(b.sermonDate).getTime() - new Date(a.sermonDate).getTime());
  }, [sermons, selectedTheme, selectedPastorId, datePreset, customStartDate, customEndDate, searchQuery, pastors]);

  // Helper for Theme Badge Styling
  const getThemeBadgeClass = (theme: string) => {
    switch (theme.toLowerCase()) {
      case 'grace':
        return 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800/50';
      case 'faith':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800/50';
      case 'family':
        return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800/50';
      case 'worship':
        return 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800/50';
      case 'youth':
        return 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800/50';
      case 'prayer':
        return 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 border-teal-200 dark:border-teal-800/50';
      default:
        return 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700';
    }
  };

  // Helper to extract clean plain-text excerpt from Markdown
  const getExcerpt = (markdown: string, maxLength: number = 140) => {
    if (!markdown) return '';
    const plain = markdown
      .replace(/#+\s+/g, '') // remove headers
      .replace(/>\s+/g, '') // remove blockquotes
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // remove links
      .replace(/[*_~`]/g, '') // remove markdown styling
      .replace(/\n+/g, ' ') // normalize spaces
      .trim();
    if (plain.length <= maxLength) return plain;
    return plain.slice(0, maxLength).trim() + '...';
  };

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Format Duration helper
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '30 min';
    const m = Math.floor(seconds / 60);
    return `${m} min`;
  };

  // Clear all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTheme('all');
    setSelectedPastorId('all');
    setDatePreset('all');
    setCustomStartDate('');
    setCustomEndDate('');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedTheme !== 'all' ||
    selectedPastorId !== 'all' ||
    datePreset !== 'all';

  // Handle Scripture reference click
  const handleScriptureRefClick = (refStr: string) => {
    const parsed = parseScriptureRef(refStr);
    if (parsed) {
      jumpToScripture(parsed.book, parsed.chapter, parsed.verse);
    }
  };

  // -------------------------------------------------------------
  // DETAIL VIEW
  // -------------------------------------------------------------
  if (activeSermon) {
    const isThisTrackActive = audioTrack?.id === activeSermon.id && isPlaying;

    return (
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-200">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedSermonId(null)}
            className="flex items-center gap-1 text-[15px] font-medium text-amber-600 dark:text-amber-400 hover:opacity-80 active:scale-95 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Sermon Library</span>
          </button>

          <span className="text-[12px] font-medium text-[#8E8E93]">
            {formatDate(activeSermon.sermonDate)}
          </span>
        </div>

        {/* Sermon Title & Meta Header Card */}
        <div className="ios-card p-6 md:p-8 space-y-5 border border-black/[0.04] dark:border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full border ${getThemeBadgeClass(
                activeSermon.theme
              )}`}
            >
              {activeSermon.theme}
            </span>
            <span className="text-[12px] text-[#8E8E93]">
              {formatDuration(activeSermon.durationSec)}
            </span>
          </div>

          <h1 className="text-[26px] md:text-[32px] font-bold text-[#1C1C1E] dark:text-white leading-tight font-serif">
            {activeSermon.title}
          </h1>

          {/* Preacher Profile Bar */}
          {activePastor && (
            <div className="flex items-center gap-3.5 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center font-bold text-[14px] shadow-2xs flex-shrink-0">
                {activePastor.name
                  .split(' ')
                  .map((n) => n[0])
                  .filter((_, idx, arr) => idx === 0 || idx === arr.length - 1)
                  .join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-[#1C1C1E] dark:text-white truncate">
                  {activePastor.name}
                </h3>
                <p className="text-[12px] text-[#8E8E93] truncate">
                  {activePastor.roleTitle}
                </p>
              </div>
            </div>
          )}

          {/* Scripture Deep-Links Strip */}
          {activeSermon.scriptureRefs && activeSermon.scriptureRefs.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block mb-1.5">
                Scripture References (Tap to Read)
              </span>
              <div className="flex flex-wrap gap-2">
                {activeSermon.scriptureRefs.map((ref) => (
                  <button
                    key={ref}
                    onClick={() => handleScriptureRefClick(ref)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[12px] font-medium transition active:scale-95 border border-amber-500/20"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{ref}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Audio Mini-Player (if recording attached) */}
          {activeSermon.audioUrl && (
            <div className="p-4 rounded-[14px] bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (isThisTrackActive) {
                      togglePlayPause();
                    } else {
                      playAudio({
                        id: activeSermon.id,
                        title: activeSermon.title,
                        subtitle: activePastor?.name || 'Sermon Audio',
                        type: 'sermon',
                        durationSec: activeSermon.durationSec || 1800,
                      });
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-xs active:scale-95 transition flex-shrink-0"
                >
                  {isThisTrackActive ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>
                <div>
                  <h4 className="text-[14px] font-semibold text-[#1C1C1E] dark:text-white leading-snug">
                    {isThisTrackActive ? 'Now Playing Sermon Audio' : 'Listen to Sermon'}
                  </h4>
                  <span className="text-[12px] text-[#8E8E93]">
                    {formatDuration(activeSermon.durationSec)} • Offline Audio Recording
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          )}
        </div>

        {/* Sermon Expository Notes & Markdown Content */}
        <div className="ios-card p-6 md:p-8 border border-black/[0.04] dark:border-white/[0.06] shadow-xs">
          <div className="sermon-markdown font-reading text-[16px] md:text-[17px] text-[#1C1C1E] dark:text-[#EBEBF5]">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => {
                  const text = String(children);
                  return (
                    <button
                      onClick={() => handleScriptureRefClick(text)}
                      className="text-amber-600 dark:text-amber-400 font-semibold underline underline-offset-4 hover:opacity-80 inline"
                    >
                      {children}
                    </button>
                  );
                },
              }}
            >
              {activeSermon.markdownContent}
            </ReactMarkdown>
          </div>
        </div>

        {/* Pastor Bio Card */}
        {activePastor?.bio && (
          <div className="ios-card p-5 border border-black/[0.04] dark:border-white/[0.06] text-[13px] text-[#8E8E93] leading-relaxed flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
              <User className="w-4 h-4 text-[#8E8E93]" />
            </div>
            <div>
              <span className="font-semibold text-[#1C1C1E] dark:text-white block mb-0.5">
                About {activePastor.name}
              </span>
              <p>{activePastor.bio}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // LIST VIEW
  // -------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Apple HIG Large Title Header */}
      <div className="flex items-end justify-between pb-1">
        <div>
          <span className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider block">
            Sanctuary Expositions
          </span>
          <h1 className="text-[34px] font-bold tracking-tight text-[#1C1C1E] dark:text-white leading-tight">
            Sermon Library
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-[#8E8E93] bg-black/[0.04] dark:bg-white/[0.06] px-3 py-1 rounded-full">
            {filteredSermons.length} {filteredSermons.length === 1 ? 'Message' : 'Messages'}
          </span>
        </div>
      </div>

      {/* Search Input Field */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search sermons by title, theme, pastor, scripture..."
          className="w-full pl-10 pr-4 py-2.5 text-[14px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[12px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500 border border-transparent transition"
        />
      </div>

      {/* Multi-Filter Bar: Themes, Pastors, Date Presets */}
      <div className="space-y-3 pt-1">
        {/* Row 1: Themes Filter Chips */}
        <div>
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93]">
              Filter by Theme
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedTheme('all')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition active:scale-95 whitespace-nowrap ${
                selectedTheme === 'all'
                  ? 'bg-amber-500 text-white shadow-xs font-semibold'
                  : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12]'
              }`}
            >
              All Themes
            </button>
            {availableThemes.map((theme) => {
              const isActive = selectedTheme.toLowerCase() === theme.toLowerCase();
              return (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(isActive ? 'all' : theme)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition active:scale-95 whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs font-semibold'
                      : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12]'
                  }`}
                >
                  {theme}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Pastor Filter Avatar Chips */}
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block mb-1.5 px-1">
            Filter by Pastor
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedPastorId('all')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition active:scale-95 whitespace-nowrap ${
                selectedPastorId === 'all'
                  ? 'bg-amber-500 text-white shadow-xs font-semibold'
                  : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>All Preachers</span>
            </button>
            {pastors.map((pastor) => {
              const isActive = selectedPastorId === pastor.id;
              const initials = pastor.name
                .split(' ')
                .map((n) => n[0])
                .filter((_, idx, arr) => idx === 0 || idx === arr.length - 1)
                .join('');
              return (
                <button
                  key={pastor.id}
                  onClick={() => setSelectedPastorId(isActive ? 'all' : pastor.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition active:scale-95 whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs font-semibold'
                      : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      isActive ? 'bg-white text-amber-600' : 'bg-amber-500 text-white'
                    }`}
                  >
                    {initials}
                  </div>
                  <span>{pastor.name.replace(/^(Rev\.\s+Dr\.\s+|Pastor\s+)/, '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Date Presets & Custom Date Range Picker */}
        <div className="pt-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block mb-1.5 px-1">
            Filter by Date
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'all', label: 'All Time' },
                { id: 'week', label: 'This Week' },
                { id: 'month', label: 'This Month' },
                { id: 'year', label: 'This Year' },
                { id: 'custom', label: 'Custom Range' },
              ] as const
            ).map((preset) => {
              const isActive = datePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setDatePreset(preset.id)}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition active:scale-95 ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs font-semibold'
                      : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Custom Date Inputs if 'custom' is selected */}
          {datePreset === 'custom' && (
            <div className="mt-2.5 p-3 rounded-[14px] bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#8E8E93]">From:</span>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="px-2.5 py-1 text-[12px] rounded-[8px] bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white border border-black/[0.1] dark:border-white/[0.1] focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#8E8E93]">To:</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="px-2.5 py-1 text-[12px] rounded-[8px] bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white border border-black/[0.1] dark:border-white/[0.1] focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sermon List Grid (Newest First) */}
      {filteredSermons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {filteredSermons.map((sermon) => {
            const pastor = pastors.find((p) => p.id === sermon.pastorId);
            const initials = pastor
              ? pastor.name
                  .split(' ')
                  .map((n) => n[0])
                  .filter((_, idx, arr) => idx === 0 || idx === arr.length - 1)
                  .join('')
              : 'P';

            return (
              <button
                key={sermon.id}
                onClick={() => setSelectedSermonId(sermon.id)}
                className="ios-card p-5 text-left flex flex-col justify-between border border-black/[0.04] dark:border-white/[0.06] hover:border-amber-500/40 transition duration-150 active:scale-99 group shadow-xs hover:shadow-sm"
              >
                <div>
                  {/* Card Top: Theme Badge & Formatted Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getThemeBadgeClass(
                        sermon.theme
                      )}`}
                    >
                      {sermon.theme}
                    </span>
                    <span className="text-[12px] text-[#8E8E93] font-medium">
                      {formatDate(sermon.sermonDate)}
                    </span>
                  </div>

                  {/* Sermon Title */}
                  <h3 className="text-[17px] font-bold text-[#1C1C1E] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition leading-snug font-serif mb-2 line-clamp-2">
                    {sermon.title}
                  </h3>

                  {/* Short Excerpt */}
                  <p className="text-[13px] text-[#8E8E93] line-clamp-3 leading-relaxed mb-4">
                    {getExcerpt(sermon.markdownContent)}
                  </p>
                </div>

                {/* Card Footer: Pastor Info & Audio/Reading info */}
                <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <span className="text-[12px] font-semibold text-[#1C1C1E] dark:text-white truncate max-w-[140px]">
                      {pastor ? pastor.name : 'Guest Preacher'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[12px] text-amber-600 dark:text-amber-400 font-medium">
                    {sermon.audioUrl ? (
                      <Headphones className="w-3.5 h-3.5" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5" />
                    )}
                    <span>{formatDuration(sermon.durationSec)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="ios-card p-10 text-center space-y-4 border border-black/[0.04] dark:border-white/[0.06] mt-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[17px] font-semibold text-[#1C1C1E] dark:text-white">
              No Sermons Found
            </h3>
            <p className="text-[13px] text-[#8E8E93] max-w-sm mx-auto mt-1">
              No messages match your selected filters. Try broadening your theme, pastor, or date range.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-white font-medium text-[13px] hover:bg-amber-600 transition active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
