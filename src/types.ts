// Domain types matching Drift tables & Church Sanctuary requirements

export type Translation = 'KJV' | 'WEB' | 'ASV' | 'BBE';

export type ThemePalette = 'navy' | 'gold' | 'olive' | 'amethyst';

export interface StaffAccount {
  name: string;
  role: string;
  presetPasscode: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface AnnouncementEntity {
  id: string;
  title: string;
  content: string;
  authorName: string;
  scriptureRef?: string;
  ctaLabel?: string;
  ctaLink?: string;
  category: 'General' | 'Worship' | 'Outreach' | 'Youth' | 'Community';
  isPinned: boolean;
  isScheduled: boolean;
  scheduledAt?: string;
  publishedAt: string;
  isBroadcastSent: boolean;
}

export interface BibleBookmarkEntity {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  translation: Translation;
  verseText: string;
  createdAt: string;
}

export interface JournalEntity {
  id: string;
  title: string;
  content: string;
  scriptureTag?: string;
  gratitudePrompt?: string;
  createdAt: string;
}

export interface PastorMessageEntity {
  id: string;
  threadId: string;
  isFromUser: boolean;
  content: string;
  timestamp: string;
}

export interface JoinedGroupEntity {
  id: string;
  groupName: string;
  category: 'Youth' | "Men's" | "Women's" | 'Outreach' | 'Worship';
  meetingTime: string;
  joinedAt: string;
  rsvpStatus: 'attending' | 'interested' | 'none';
  reminderEnabled?: boolean;
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  translation: Translation;
  text: string;
}

export interface BibleBookInfo {
  name: string;
  testament: 'OT' | 'NT';
  chaptersCount: number;
  genre: string;
}

export interface Devotional {
  date: string;
  title: string;
  morningReflection: string;
  eveningReflection: string;
  scriptureRefs: string[];
  questions: string[];
  closingPrayer: string;
  audioDurationSec: number;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  series: string;
  category: 'Faith' | 'Grace' | 'Prayer' | 'Family' | 'Worship' | 'Youth';
  durationSec: number;
  scriptureRef: string;
  description: string;
}

export interface ActiveAudioTrack {
  id: string;
  title: string;
  subtitle: string;
  type: 'sermon' | 'devotional';
  durationSec: number;
}

export interface PastorEntity {
  id: string;
  name: string;
  roleTitle: string;
  photoAsset?: string;
  bio: string;
}

export interface SermonEntity {
  id: string;
  pastorId: string;
  title: string;
  theme: string;
  sermonDate: string; // YYYY-MM-DD
  markdownContent: string;
  audioUrl?: string;
  durationSec?: number;
  scriptureRefs?: string[];
  isPublished: boolean;
  createdAt: string;
}
