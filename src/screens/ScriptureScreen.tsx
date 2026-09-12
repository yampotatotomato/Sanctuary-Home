import React, { useState, useEffect } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import {
  getChapterVerses,
  searchBibleOffline,
  TRANSLATION_DETAILS,
  BIBLE_BOOKS,
} from '../data/bibleDatabase';
import { BookChapterPickerModal } from '../components/BookChapterPickerModal';
import { Translation } from '../types';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Search,
  Copy,
  Check,
  ShieldCheck,
  ChevronDown,
  Sliders,
} from 'lucide-react';

export const ScriptureScreen: React.FC = () => {
  const {
    currentBook,
    currentChapter,
    currentTranslation,
    targetVerse,
    fontSize,
    setCurrentBook,
    setCurrentChapter,
    setCurrentTranslation,
    setTargetVerse,
    setFontSize,
    toggleBookmark,
    isBookmarked,
  } = useSanctuary();

  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);
  const [showTypographyControls, setShowTypographyControls] = useState<boolean>(false);

  // Fetch current chapter verses
  const verses = getChapterVerses(currentBook, currentChapter, currentTranslation);

  // Find current book metadata
  const bookInfo = BIBLE_BOOKS.find((b) => b.name === currentBook) || BIBLE_BOOKS[0];

  // Scroll to target verse if requested
  useEffect(() => {
    if (targetVerse !== null) {
      const el = document.getElementById(`verse-${targetVerse}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetVerse, currentBook, currentChapter]);

  // Previous & Next Chapter navigation
  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      setTargetVerse(null);
    } else {
      const currentIndex = BIBLE_BOOKS.findIndex((b) => b.name === currentBook);
      if (currentIndex > 0) {
        const prevBook = BIBLE_BOOKS[currentIndex - 1];
        setCurrentBook(prevBook.name);
        setCurrentChapter(prevBook.chaptersCount);
        setTargetVerse(null);
      }
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < bookInfo.chaptersCount) {
      setCurrentChapter(currentChapter + 1);
      setTargetVerse(null);
    } else {
      const currentIndex = BIBLE_BOOKS.findIndex((b) => b.name === currentBook);
      if (currentIndex < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[currentIndex + 1];
        setCurrentBook(nextBook.name);
        setCurrentChapter(1);
        setTargetVerse(null);
      }
    }
  };

  const handleCopyVerse = (verseNum: number, text: string) => {
    navigator.clipboard.writeText(`${currentBook} ${currentChapter}:${verseNum} (${currentTranslation}) - "${text}"`);
    setCopiedVerse(verseNum);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const searchResults = searchQuery.trim()
    ? searchBibleOffline(searchQuery, currentTranslation)
    : [];

  const translations: Translation[] = ['KJV', 'WEB', 'ASV', 'BBE'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-5 animate-in fade-in duration-200">
      {/* Apple Books Style Top Navigation & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
        {/* Book & Chapter Button */}
        <button
          onClick={() => setIsPickerOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition active:scale-95 text-left select-none w-fit"
        >
          <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-[15px] font-semibold text-[#1C1C1E] dark:text-white">
            {currentBook} {currentChapter}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#8E8E93]" />
        </button>

        {/* Translation Segmented Control + Typography Button */}
        <div className="flex items-center gap-2">
          {/* iOS Segmented Bar for 4 Public Domain Translations */}
          <div className="ios-segmented flex p-0.5 rounded-[9px]">
            {translations.map((t) => (
              <button
                key={t}
                onClick={() => setCurrentTranslation(t)}
                className={`px-2.5 py-1 rounded-[7px] text-[12px] font-semibold transition ${
                  currentTranslation === t
                    ? 'bg-white dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white shadow-xs'
                    : 'text-[#8E8E93]'
                }`}
                title={TRANSLATION_DETAILS[t].name}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Apple Books Typography Button (aA) */}
          <button
            onClick={() => setShowTypographyControls(!showTypographyControls)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition active:scale-95 ${
              showTypographyControls
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08]'
            }`}
            title="Reading Typography"
          >
            aA
          </button>
        </div>
      </div>

      {/* Apple Books Typography Popover / Tray */}
      {showTypographyControls && (
        <div className="ios-card p-3.5 flex items-center justify-between gap-4 animate-in fade-in duration-150">
          <span className="text-[13px] font-medium text-[#8E8E93]">Text Size</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFontSize(Math.max(14, fontSize - 2))}
              className="w-8 h-8 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[12px] font-semibold text-[#1C1C1E] dark:text-white flex items-center justify-center active:scale-95"
            >
              A-
            </button>
            <span className="text-[13px] font-mono font-semibold text-[#1C1C1E] dark:text-white w-10 text-center">
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(Math.min(28, fontSize + 2))}
              className="w-8 h-8 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[14px] font-semibold text-[#1C1C1E] dark:text-white flex items-center justify-center active:scale-95"
            >
              A+
            </button>
          </div>
        </div>
      )}

      {/* Offline Search Field */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
        <input
          type="text"
          placeholder={`Search ${currentTranslation} text (e.g. love, peace, shepherd)...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-8 py-2 text-[14px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[11px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Search Results Drawer */}
      {searchQuery.trim() && (
        <div className="ios-card p-4 space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.08]">
            <span className="text-[13px] font-semibold text-[#1C1C1E] dark:text-white">
              Search Results ({searchResults.length})
            </span>
            <span className="text-[11px] text-[#8E8E93]">"{searchQuery}" in {currentTranslation}</span>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-[13px] text-[#8E8E93] py-2">
              No offline matches found for "{searchQuery}".
            </p>
          ) : (
            <div className="space-y-1.5 max-h-56 overflow-y-auto divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {searchResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentBook(r.book);
                    setCurrentChapter(r.chapter);
                    setTargetVerse(r.verse);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-2 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] rounded-[8px] transition"
                >
                  <span className="text-[12px] font-semibold text-amber-600 dark:text-amber-400">
                    {r.book} {r.chapter}:{r.verse}
                  </span>
                  <p className="text-[13px] text-[#3C3C43] dark:text-[#EBEBF5]/80 font-reading truncate mt-0.5">
                    {r.text}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Apple Books Classical Reading Canvas */}
      <article className="ios-card p-6 sm:p-10 space-y-6 select-text">
        {/* Chapter Heading */}
        <div className="text-center pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8E8E93]">
            {bookInfo.testament === 'OT' ? 'Old Testament' : 'New Testament'} • {bookInfo.genre}
          </span>
          <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-[#1C1C1E] dark:text-white mt-1">
            {currentBook} {currentChapter}
          </h1>
          <span className="text-[12px] text-[#8E8E93] block mt-1">
            {TRANSLATION_DETAILS[currentTranslation].name} ({currentTranslation})
          </span>
        </div>

        {/* Verses Flow */}
        <div className="space-y-3.5">
          {verses.map((v) => {
            const isSaved = isBookmarked(v.book, v.chapter, v.verse, currentTranslation);
            const isTarget = targetVerse === v.verse;

            return (
              <div
                key={v.verse}
                id={`verse-${v.verse}`}
                className={`group flex items-start gap-3 p-2 -mx-2 rounded-[12px] transition ${
                  isTarget
                    ? 'bg-amber-500/15'
                    : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                }`}
              >
                {/* Verse Number */}
                <span className="text-[11px] font-mono font-bold text-[#8E8E93] group-hover:text-amber-600 dark:group-hover:text-amber-400 w-5 pt-1 text-right flex-shrink-0 select-none">
                  {v.verse}
                </span>

                {/* Verse Text (Classical Reading Typography) */}
                <p
                  className="flex-1 font-reading text-[#1C1C1E] dark:text-white/95 leading-relaxed"
                  style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
                >
                  {v.text}
                </p>

                {/* Micro Actions (Apple Context Controls) */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0 pt-0.5 select-none">
                  <button
                    onClick={() => toggleBookmark(v.book, v.chapter, v.verse, currentTranslation, v.text)}
                    className={`p-1.5 rounded-full transition active:scale-90 ${
                      isSaved
                        ? 'text-amber-500 bg-amber-500/10'
                        : 'text-[#8E8E93] hover:text-amber-600'
                    }`}
                    title={isSaved ? 'Remove Bookmark' : 'Bookmark Verse'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => handleCopyVerse(v.verse, v.text)}
                    className="p-1.5 rounded-full text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white transition active:scale-90"
                    title="Copy Verse"
                  >
                    {copiedVerse === v.verse ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chapter Navigation Pagination Pills */}
        <div className="pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          <button
            onClick={handlePrevChapter}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[13px] font-semibold text-[#1C1C1E] dark:text-white transition active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-[12px] font-medium text-[#8E8E93]">
            {currentChapter} of {bookInfo.chaptersCount}
          </span>

          <button
            onClick={handleNextChapter}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[13px] font-semibold text-[#1C1C1E] dark:text-white transition active:scale-95"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </article>

      {/* Book & Chapter Picker Modal */}
      <BookChapterPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        currentBook={currentBook}
        currentChapter={currentChapter}
        onSelect={(book, chapter) => {
          setCurrentBook(book);
          setCurrentChapter(chapter);
          setTargetVerse(null);
        }}
      />
    </div>
  );
};
