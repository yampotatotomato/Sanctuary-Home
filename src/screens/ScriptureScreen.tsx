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
  Star,
  Search,
  Type,
  Copy,
  Check,
  ShieldCheck,
  RotateCcw,
  Sparkles,
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
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Translation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <BookOpen className="w-4 h-4" />
            <span>Offline Holy Scripture</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Scripture Reader
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Public-domain translations with zero network calls required.
          </p>
        </div>

        {/* Translation Switcher (4 Public Domain Versions) */}
        <div className="flex items-center gap-2">
          <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl border border-stone-200 dark:border-stone-700">
            {translations.map((t) => (
              <button
                key={t}
                onClick={() => setCurrentTranslation(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  currentTranslation === t
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
                title={TRANSLATION_DETAILS[t].name}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => setFontSize(Math.max(14, fontSize - 2))}
              className="p-1.5 px-2 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition"
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-[11px] font-mono font-semibold px-1 text-stone-400">
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(Math.min(26, fontSize + 2))}
              className="p-1.5 px-2 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Book & Chapter Selector Bar + Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        {/* Click to open Book/Chapter Bottom-Sheet */}
        <button
          onClick={() => setIsPickerOpen(true)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-750 transition text-left border border-stone-200/80 dark:border-stone-700"
        >
          <BookOpen className="w-5 h-5 text-amber-600" />
          <div>
            <div className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>{currentBook}</span>
              <span className="text-amber-600 dark:text-amber-400">Chapter {currentChapter}</span>
            </div>
            <span className="text-[10px] text-stone-400 font-medium">
              Tap to switch book & chapter (66 books available)
            </span>
          </div>
        </button>

        {/* Quick Search */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search words (e.g. love, peace, shepherd)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-1.5 py-0.5 rounded-full"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Translation License Pill */}
      <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span>
            <strong>{TRANSLATION_DETAILS[currentTranslation].name} ({TRANSLATION_DETAILS[currentTranslation].year})</strong> — {TRANSLATION_DETAILS[currentTranslation].license}
          </span>
        </div>
        <span className="text-[10px] font-mono opacity-80 hidden sm:inline">Offline Ready</span>
      </div>

      {/* Live Search Results Overlay */}
      {searchQuery.trim() && (
        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-900 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              Offline Search Matches ({searchResults.length})
            </h4>
            <span className="text-xs text-stone-400">"{searchQuery}" in {currentTranslation}</span>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-xs text-stone-500 py-2">
              No direct matches found in offline catalog for "{searchQuery}".
            </p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map((r, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurrentBook(r.book);
                    setCurrentChapter(r.chapter);
                    setTargetVerse(r.verse);
                    setSearchQuery('');
                  }}
                  className="p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer text-xs border border-stone-100 dark:border-stone-800 transition"
                >
                  <div className="font-bold text-amber-700 dark:text-amber-400 font-serif">
                    {r.book} {r.chapter}:{r.verse}
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 mt-0.5 line-clamp-2">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scripture Verses View (Serif High-Contrast Minimalist Typography) */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 md:p-10 shadow-sm space-y-6">
        {/* Chapter Title */}
        <div className="text-center pb-6 border-b border-stone-100 dark:border-stone-800">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            {bookInfo.testament === 'OT' ? 'Old Testament' : 'New Testament'} • {bookInfo.genre}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            {currentBook} {currentChapter}
          </h1>
          <p className="text-xs text-stone-400 font-mono mt-1">
            {currentTranslation} • {verses.length} verses
          </p>
        </div>

        {/* Verses List */}
        <div className="space-y-4">
          {verses.map((v) => {
            const isSaved = isBookmarked(v.book, v.chapter, v.verse, currentTranslation);
            const isTarget = targetVerse === v.verse;

            return (
              <div
                key={v.verse}
                id={`verse-${v.verse}`}
                className={`group flex items-start gap-3 p-2.5 -mx-2.5 rounded-2xl transition duration-200 ${
                  isTarget
                    ? 'bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800'
                    : 'hover:bg-stone-50 dark:hover:bg-stone-800/50'
                }`}
              >
                {/* Verse Number Pill */}
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 w-6 pt-1 text-right flex-shrink-0 select-none">
                  {v.verse}
                </span>

                {/* Verse Text (Serif High-Contrast) */}
                <p
                  className="flex-1 font-serif text-stone-800 dark:text-stone-100 leading-relaxed tracking-normal"
                  style={{ fontSize: `${fontSize}px`, lineHeight: 1.75 }}
                >
                  {v.text}
                </p>

                {/* Action Buttons: Bookmark Star & Copy */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition flex-shrink-0 pt-0.5">
                  <button
                    onClick={() => toggleBookmark(v.book, v.chapter, v.verse, currentTranslation, v.text)}
                    className={`p-1.5 rounded-lg transition ${
                      isSaved
                        ? 'text-amber-500 fill-amber-500 hover:text-amber-600'
                        : 'text-stone-400 hover:text-amber-500'
                    }`}
                    title={isSaved ? 'Remove Bookmark' : 'Bookmark Verse'}
                  >
                    <Star className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => handleCopyVerse(v.verse, v.text)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition"
                    title="Copy Verse"
                  >
                    {copiedVerse === v.verse ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chapter Navigation Buttons */}
        <div className="pt-8 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <button
            onClick={handlePrevChapter}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          <button
            onClick={() => setIsPickerOpen(true)}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            {currentBook} {currentChapter} of {bookInfo.chaptersCount}
          </button>

          <button
            onClick={handleNextChapter}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold transition"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Book & Chapter Bottom-Sheet / Modal */}
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
