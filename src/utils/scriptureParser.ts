import { BIBLE_BOOKS } from '../data/bibleDatabase';

export interface ParsedScripture {
  book: string;
  chapter: number;
  verse?: number;
  label: string;
}

export function parseScriptureRef(refString: string): ParsedScripture | null {
  if (!refString || typeof refString !== 'string') return null;

  // Clean string: e.g. [Romans 8:28-39] or "Romans 8:28-39"
  const clean = refString.replace(/[\[\]]/g, '').trim();

  // Match pattern: Optional number prefix (e.g. 1 or 2) + book name + chapter + optional :verse
  const match = clean.match(/^((?:\d\s+)?[A-Za-z\s]+?)\s+(\d+)(?::(\d+)(?:-\d+)?)?$/);
  if (!match) return null;

  const rawBook = match[1].trim();
  const chapter = parseInt(match[2], 10);
  const verse = match[3] ? parseInt(match[3], 10) : undefined;

  // Find matching book in database
  const normalizedRaw = rawBook.toLowerCase().replace(/s$/, ''); // e.g. psalm vs psalms
  const foundBook = BIBLE_BOOKS.find((b) => {
    const normalizedName = b.name.toLowerCase().replace(/s$/, '');
    return normalizedName === normalizedRaw || b.name.toLowerCase() === rawBook.toLowerCase();
  });

  const bookName = foundBook ? foundBook.name : (rawBook.toLowerCase().includes('psalm') ? 'Psalms' : rawBook);

  return {
    book: bookName,
    chapter,
    verse,
    label: clean,
  };
}
