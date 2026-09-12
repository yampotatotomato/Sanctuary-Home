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
  Sparkles,
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
    'What is one quiet blessing you received from God today?',
    'Who is someone God used to encourage your heart this week?',
    'What difficult circumstance produced unexpected endurance in you?',
    'For which answered prayer are you offering thanksgiving right now?',
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
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Feather className="w-4 h-4" />
            <span>Spiritual Reflection</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Personal Prayer Journal
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Private, offline gratitude entries, scripture tags, and answered prayers.
          </p>
        </div>

        <button
          onClick={() => setIsComposerOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-bold shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Journal Entry</span>
        </button>
      </div>

      {/* Search & Entry Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search reflections & scripture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <span className="text-xs text-stone-500 font-mono">
          {filteredEntries.length} Saved {filteredEntries.length === 1 ? 'Entry' : 'Entries'}
        </span>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
            <Feather className="w-8 h-8 text-stone-400 mx-auto" />
            <h4 className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
              Your journal is ready for your thoughts
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Document spiritual insights, answered prayers, and gratitude for God's blessings.
            </p>
            <button
              onClick={() => setIsComposerOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold"
            >
              Write First Entry
            </button>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4 hover:border-amber-300 dark:hover:border-amber-900 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(entry.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteJournalEntry(entry.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Gratitude Callout */}
              {entry.gratitudePrompt && (
                <div className="flex items-start gap-2 p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40 text-xs text-amber-950 dark:text-amber-200">
                  <Heart className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Gratitude: </span>
                    <span>{entry.gratitudePrompt}</span>
                  </div>
                </div>
              )}

              {/* Content Body */}
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-serif">
                {entry.content}
              </p>

              {/* Scripture Tag Jump Button */}
              {entry.scriptureTag && (
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
                  <button
                    onClick={() => handleScriptureTagClick(entry.scriptureTag!)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-stone-700 transition"
                  >
                    <BookOpen className="w-3 h-3 text-amber-600" />
                    <span>Tagged Scripture: {entry.scriptureTag}</span>
                  </button>
                </div>
              )}
            </article>
          ))
        )}
      </div>

      {/* Composer Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Feather className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  New Journal Reflection
                </h3>
              </div>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Reflection Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Walking in Quiet Trust"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Gratitude Prompt
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thankful for healing, family prayer, and God's peace"
                  value={gratitudePrompt}
                  onChange={(e) => setGratitudePrompt(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {gratitudePresets.slice(0, 2).map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGratitudePrompt(p)}
                      className="text-[10px] text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-lg text-left"
                    >
                      "{p.slice(0, 45)}..."
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Scripture Citation Tag (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Psalms 23:1 or Romans 8:31"
                  value={scriptureTag}
                  onChange={(e) => setScriptureTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Reflection Content
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="What is the Holy Spirit speaking to your heart today?..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow transition active:scale-95"
                >
                  Save Reflection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
