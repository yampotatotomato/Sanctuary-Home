import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { JournalEntity } from '../types';
import {
  Feather,
  Plus,
  Trash2,
  Calendar,
  BookOpen,
  Heart,
  Search,
  X,
} from 'lucide-react';

export const JournalScreen: React.FC = () => {
  const {
    journalEntries,
    addJournalEntry,
    deleteJournalEntry,
    jumpToScripture,
  } = useSanctuary();

  const [isComposerOpen, setIsComposerOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [scriptureTag, setScriptureTag] = useState<string>('Psalms 23:1');
  const [gratitudePrompt, setGratitudePrompt] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const gratitudePresets = [
    'A quiet blessing received today',
    'Someone who encouraged my faith',
    'Answered prayer of thanksgiving',
    'God’s comfort during hardship',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addJournalEntry(
      title.trim(),
      content.trim(),
      scriptureTag.trim() || undefined,
      gratitudePrompt.trim() || undefined
    );

    setTitle('');
    setContent('');
    setGratitudePrompt('');
    setIsComposerOpen(false);
  };

  const handleScriptureTagClick = (tag: string) => {
    const parts = tag.trim().split(' ');
    if (parts.length >= 2) {
      const book = parts.slice(0, -1).join(' ');
      const chVerse = parts[parts.length - 1].split(':');
      const chapter = parseInt(chVerse[0], 10) || 1;
      const verse = chVerse.length > 1 ? parseInt(chVerse[1], 10) : undefined;
      jumpToScripture(book, chapter, verse);
    }
  };

  const filteredEntries = journalEntries.filter((e) => {
    const q = searchQuery.toLowerCase();
    return (
      e.title.toLowerCase().includes(q) ||
      e.content.toLowerCase().includes(q) ||
      (e.scriptureTag && e.scriptureTag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-5 animate-in fade-in duration-200">
      {/* Apple HIG Header */}
      <div className="flex items-end justify-between pb-1">
        <div>
          <span className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider block">
            Reflections
          </span>
          <h1 className="text-[34px] font-bold tracking-tight text-[#1C1C1E] dark:text-white leading-tight">
            Prayer Journal
          </h1>
        </div>

        <button
          onClick={() => setIsComposerOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-[13px] font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Apple Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
        <input
          type="text"
          placeholder="Search reflections & scripture..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-[14px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[11px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {/* Journal Entries List (Apple Journal Style) */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="ios-card p-8 text-center space-y-2">
            <Feather className="w-8 h-8 text-[#8E8E93] mx-auto opacity-50" />
            <h3 className="text-[16px] font-semibold text-[#1C1C1E] dark:text-white">
              No journal reflections yet
            </h3>
            <p className="text-[13px] text-[#8E8E93] max-w-sm mx-auto">
              Record answered prayers, quiet blessings, and scripture meditations offline.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsComposerOpen(true)}
                className="px-4 py-2 rounded-full bg-amber-500 text-white text-[13px] font-semibold"
              >
                Create First Entry
              </button>
            </div>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="ios-card p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#1C1C1E] dark:text-white leading-snug">
                    {entry.title}
                  </h3>
                  <span className="text-[12px] text-[#8E8E93] block mt-0.5">
                    {new Date(entry.createdAt).toLocaleDateString(undefined, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <button
                  onClick={() => deleteJournalEntry(entry.id)}
                  className="w-7 h-7 rounded-full text-[#8E8E93] hover:text-red-500 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] flex items-center justify-center transition active:scale-95"
                  title="Delete Entry"
                  aria-label="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Gratitude Badge */}
              {entry.gratitudePrompt && (
                <div className="flex items-center gap-2 p-2.5 rounded-[10px] bg-amber-500/10 text-amber-900 dark:text-amber-200 text-[12px]">
                  <Heart className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span className="truncate">
                    <strong>Gratitude:</strong> {entry.gratitudePrompt}
                  </span>
                </div>
              )}

              {/* Reflection Body */}
              <p className="text-[14px] font-reading text-[#3C3C43] dark:text-[#EBEBF5]/90 leading-relaxed whitespace-pre-line">
                {entry.content}
              </p>

              {/* Tagged Scripture */}
              {entry.scriptureTag && (
                <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => handleScriptureTagClick(entry.scriptureTag!)}
                    className="flex items-center gap-1.5 text-[12px] font-semibold text-amber-600 dark:text-amber-400 hover:opacity-80"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Passage: {entry.scriptureTag}</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Apple iOS Modal Sheet for New Journal Entry */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200 select-none">
          <div className="w-full max-w-lg ios-card rounded-t-[28px] sm:rounded-[24px] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Grabber handle */}
            <div className="pt-3 pb-1">
              <div className="w-9 h-1 rounded-full bg-black/20 dark:bg-white/20 mx-auto" />
            </div>

            {/* iOS Modal Navigation Bar */}
            <div className="px-5 py-3 flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08]">
              <button
                onClick={() => setIsComposerOpen(false)}
                className="text-[15px] font-medium text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"
              >
                Cancel
              </button>

              <h3 className="text-[16px] font-semibold text-[#1C1C1E] dark:text-white">
                New Journal Entry
              </h3>

              <button
                onClick={handleSave}
                className="text-[15px] font-semibold text-amber-600 dark:text-amber-400"
              >
                Save
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto flex-1 select-text">
              <div>
                <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Walking in Quiet Trust"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-[15px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Gratitude Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="What are you thankful for today?"
                  value={gratitudePrompt}
                  onChange={(e) => setGratitudePrompt(e.target.value)}
                  className="w-full px-3.5 py-2 text-[14px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {gratitudePresets.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setGratitudePrompt(preset)}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white transition"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Scripture Tag (e.g. Romans 8:28)
                </label>
                <input
                  type="text"
                  placeholder="Psalms 23:1"
                  value={scriptureTag}
                  onChange={(e) => setScriptureTag(e.target.value)}
                  className="w-full px-3.5 py-2 text-[14px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Reflection Content
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write your meditation, prayer, or insights..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-[14px] font-reading bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none leading-relaxed"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
