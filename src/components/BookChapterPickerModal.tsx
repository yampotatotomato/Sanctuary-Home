import React, { useState } from 'react';
import { BIBLE_BOOKS } from '../data/bibleDatabase';
import { X, Search, BookOpen, Layers } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentBook: string;
  currentChapter: number;
  onSelect: (book: string, chapter: number) => void;
}

export const BookChapterPickerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentBook,
  currentChapter,
  onSelect,
}) => {
  const [selectedBook, setSelectedBook] = useState<string>(currentBook);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTestament, setFilterTestament] = useState<'ALL' | 'OT' | 'NT'>('ALL');

  if (!isOpen) return null;

  const currentBookInfo = BIBLE_BOOKS.find((b) => b.name === selectedBook) || BIBLE_BOOKS[0];

  const filteredBooks = BIBLE_BOOKS.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTestament = filterTestament === 'ALL' || b.testament === filterTestament;
    return matchesSearch && matchesTestament;
  });

  const chaptersArray = Array.from({ length: currentBookInfo.chaptersCount }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-t-3xl md:rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Select Scripture Passage
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Testament Filters */}
        <div className="p-4 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search 66 Books (e.g. Psalms, John, Genesis)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800 p-1 rounded-xl">
            <button
              onClick={() => setFilterTestament('ALL')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                filterTestament === 'ALL'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              All (66)
            </button>
            <button
              onClick={() => setFilterTestament('OT')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                filterTestament === 'OT'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Old Test. (39)
            </button>
            <button
              onClick={() => setFilterTestament('NT')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                filterTestament === 'NT'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              New Test. (27)
            </button>
          </div>
        </div>

        {/* Dual Panel: Books Column + Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-100 dark:divide-stone-800 overflow-y-auto flex-1 min-h-[360px]">
          {/* Left Column: Books list */}
          <div className="p-3 overflow-y-auto max-h-[220px] md:max-h-full space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2 py-1">
              Select Book
            </p>
            {filteredBooks.map((b) => (
              <button
                key={b.name}
                onClick={() => setSelectedBook(b.name)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between transition ${
                  selectedBook === b.name
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{b.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      selectedBook === b.name
                        ? 'bg-amber-700 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                    }`}
                  >
                    {b.testament}
                  </span>
                </div>
                <span
                  className={`text-xs ${
                    selectedBook === b.name ? 'text-amber-100' : 'text-stone-400'
                  }`}
                >
                  {b.chaptersCount} ch
                </span>
              </button>
            ))}
          </div>

          {/* Right Column: Chapters Grid */}
          <div className="p-4 overflow-y-auto flex-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-base text-stone-900 dark:text-stone-100 font-serif">
                  {currentBookInfo.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {currentBookInfo.genre} • {currentBookInfo.chaptersCount} Chapters total
                </p>
              </div>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              Select Chapter
            </p>
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {chaptersArray.map((ch) => {
                const isCurrent =
                  currentBook === currentBookInfo.name && currentChapter === ch;
                return (
                  <button
                    key={ch}
                    onClick={() => {
                      onSelect(currentBookInfo.name, ch);
                      onClose();
                    }}
                    className={`aspect-square rounded-xl text-sm font-semibold flex items-center justify-center transition border ${
                      isCurrent
                        ? 'bg-amber-600 border-amber-600 text-white shadow-md'
                        : 'border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/30'
                    }`}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-50 dark:bg-stone-800/80 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>All 66 books available completely offline</span>
          <button
            onClick={onClose}
            className="px-3 py-1 font-semibold rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
