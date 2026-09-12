import React, { useState } from 'react';
import { BIBLE_BOOKS } from '../data/bibleDatabase';
import { X, Search, BookOpen, ChevronRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-xl ios-card rounded-t-[28px] sm:rounded-[24px] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Grabber Bar for iOS sheet feel */}
        <div className="pt-3 pb-1">
          <div className="w-9 h-1 rounded-full bg-black/20 dark:bg-white/20 mx-auto" />
        </div>

        {/* Navigation Bar */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <h3 className="text-[17px] font-semibold text-[#1C1C1E] dark:text-white leading-tight">
              Select Book & Chapter
            </h3>
            <span className="text-[12px] text-[#8E8E93]">
              66 Books • 1,189 Chapters
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white active:scale-95 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & iOS Segmented Filter */}
        <div className="p-3 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
          {/* Apple Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-[14px] bg-black/[0.05] dark:bg-white/[0.08] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none"
            />
          </div>

          {/* Segmented Control */}
          <div className="ios-segmented flex p-0.5 rounded-[9px]">
            <button
              onClick={() => setFilterTestament('ALL')}
              className={`flex-1 py-1 rounded-[7px] text-[12px] font-semibold transition ${
                filterTestament === 'ALL'
                  ? 'bg-white dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white shadow-xs'
                  : 'text-[#8E8E93]'
              }`}
            >
              All (66)
            </button>
            <button
              onClick={() => setFilterTestament('OT')}
              className={`flex-1 py-1 rounded-[7px] text-[12px] font-semibold transition ${
                filterTestament === 'OT'
                  ? 'bg-white dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white shadow-xs'
                  : 'text-[#8E8E93]'
              }`}
            >
              Old Test. (39)
            </button>
            <button
              onClick={() => setFilterTestament('NT')}
              className={`flex-1 py-1 rounded-[7px] text-[12px] font-semibold transition ${
                filterTestament === 'NT'
                  ? 'bg-white dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white shadow-xs'
                  : 'text-[#8E8E93]'
              }`}
            >
              New Test. (27)
            </button>
          </div>
        </div>

        {/* Dual Pane: Books Column & Chapters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06] dark:divide-white/[0.08] overflow-y-auto flex-1 min-h-[320px]">
          {/* Books List */}
          <div className="p-2 overflow-y-auto max-h-[220px] sm:max-h-[380px] space-y-0.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] px-3 py-1 block">
              Books
            </span>
            {filteredBooks.map((b) => {
              const isSelected = selectedBook === b.name;
              return (
                <button
                  key={b.name}
                  onClick={() => setSelectedBook(b.name)}
                  className={`w-full text-left px-3 py-2 rounded-[9px] text-[14px] font-medium flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-amber-500 text-white font-semibold'
                      : 'text-[#1C1C1E] dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{b.name}</span>
                  <span className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-[#8E8E93]'}`}>
                    {b.chaptersCount} ch
                  </span>
                </button>
              );
            })}
          </div>

          {/* Chapters Grid */}
          <div className="p-3 overflow-y-auto max-h-[220px] sm:max-h-[380px]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] px-2 py-1 block">
              {selectedBook} Chapters
            </span>
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {chaptersArray.map((ch) => {
                const isCurrent = selectedBook === currentBook && ch === currentChapter;
                return (
                  <button
                    key={ch}
                    onClick={() => {
                      onSelect(selectedBook, ch);
                      onClose();
                    }}
                    className={`h-9 rounded-[9px] text-[13px] font-semibold flex items-center justify-center transition active:scale-90 ${
                      isCurrent
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.1]'
                    }`}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
