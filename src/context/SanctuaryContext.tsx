import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ActiveAudioTrack,
  AnnouncementEntity,
  BibleBookmarkEntity,
  JoinedGroupEntity,
  JournalEntity,
  PastorMessageEntity,
  StaffAccount,
  ThemePalette,
  Translation,
} from '../types';
import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_JOURNALS,
  INITIAL_PASTOR_CHAT,
  INITIAL_PRAYER_GROUPS,
  STAFF_ACCOUNTS,
} from '../data/seedData';

export type ScreenId =
  | 'home'
  | 'scripture'
  | 'devotion'
  | 'pastors'
  | 'groups'
  | 'journal'
  | 'profile'
  | 'companion-portal'
  | 'settings';

interface InAppBanner {
  id: string;
  title: string;
  message: string;
  type: 'broadcast' | 'reminder' | 'info';
  timestamp: string;
}

interface SanctuaryContextType {
  // Navigation
  activeScreen: ScreenId;
  navigateTo: (screen: ScreenId, extra?: { book?: string; chapter?: number; verse?: number }) => void;

  // Theming & Preferences
  themePalette: ThemePalette;
  setThemePalette: (theme: ThemePalette) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onboardingCompleted: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Scripture Reader
  currentBook: string;
  currentChapter: number;
  currentTranslation: Translation;
  targetVerse: number | null;
  fontSize: number;
  bookmarks: BibleBookmarkEntity[];
  setCurrentBook: (book: string) => void;
  setCurrentChapter: (chapter: number) => void;
  setCurrentTranslation: (trans: Translation) => void;
  setTargetVerse: (verse: number | null) => void;
  setFontSize: (size: number) => void;
  toggleBookmark: (book: string, chapter: number, verse: number, translation: Translation, text: string) => void;
  isBookmarked: (book: string, chapter: number, verse: number, translation: Translation) => boolean;
  jumpToScripture: (book: string, chapter: number, verse?: number) => void;

  // Audio Player
  audioTrack: ActiveAudioTrack | null;
  isPlaying: boolean;
  audioTime: number;
  audioDuration: number;
  playbackSpeed: number;
  playAudio: (track: ActiveAudioTrack) => void;
  togglePlayPause: () => void;
  seekAudio: (seconds: number) => void;
  setSpeed: (speed: number) => void;
  closeAudio: () => void;

  // Announcements
  announcements: AnnouncementEntity[];
  addAnnouncement: (announcement: Omit<AnnouncementEntity, 'id' | 'publishedAt' | 'isBroadcastSent'>) => void;
  deleteAnnouncement: (id: string) => void;
  broadcastAnnouncement: (id: string) => void;

  // Prayer Groups
  prayerGroups: JoinedGroupEntity[];
  toggleGroupRsvp: (id: string, status: 'attending' | 'interested' | 'none') => void;
  toggleGroupReminder: (id: string) => void;

  // Journal
  journalEntries: JournalEntity[];
  addJournalEntry: (title: string, content: string, scriptureTag?: string, gratitudePrompt?: string) => void;
  deleteJournalEntry: (id: string) => void;

  // Pastor Chat
  chatMessages: PastorMessageEntity[];
  sendPastorMessage: (content: string) => void;

  // Staff Portal
  loggedInStaff: StaffAccount | null;
  loginStaff: (passcode: string) => boolean;
  logoutStaff: () => void;

  // Notification Banners
  activeBanner: InAppBanner | null;
  triggerBanner: (title: string, message: string, type?: 'broadcast' | 'reminder' | 'info') => void;
  dismissBanner: () => void;

  // Reminders Settings
  dailyVerseReminder: boolean;
  setDailyVerseReminder: (enabled: boolean) => void;
  devotionalReminder: boolean;
  setDevotionalReminder: (enabled: boolean) => void;

  // Flutter Architecture Inspector
  isFlutterInspectorOpen: boolean;
  setIsFlutterInspectorOpen: (open: boolean) => void;
}

const SanctuaryContext = createContext<SanctuaryContextType | undefined>(undefined);

export const SanctuaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');

  // Theming & Persistence
  const [themePalette, setThemePaletteState] = useState<ThemePalette>(() => {
    return (localStorage.getItem('church_sanctuary_palette') as ThemePalette) || 'navy';
  });

  const [isDarkMode, setIsDarkModeState] = useState<boolean>(() => {
    return localStorage.getItem('church_sanctuary_dark') === 'true';
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    return localStorage.getItem('church_sanctuary_onboarding') === 'true';
  });

  // Scripture State
  const [currentBook, setCurrentBookState] = useState<string>(() => {
    return localStorage.getItem('church_sanctuary_last_book') || 'Psalms';
  });
  const [currentChapter, setCurrentChapterState] = useState<number>(() => {
    return parseInt(localStorage.getItem('church_sanctuary_last_chapter') || '23', 10);
  });
  const [currentTranslation, setCurrentTranslationState] = useState<Translation>(() => {
    return (localStorage.getItem('church_sanctuary_translation') as Translation) || 'KJV';
  });
  const [targetVerse, setTargetVerse] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<number>(18);
  const [bookmarks, setBookmarks] = useState<BibleBookmarkEntity[]>(() => {
    const saved = localStorage.getItem('church_sanctuary_bookmarks');
    return saved ? JSON.parse(saved) : [
      {
        id: 'bm-1',
        book: 'Psalms',
        chapter: 23,
        verse: 1,
        translation: 'KJV',
        verseText: 'The LORD is my shepherd; I shall not want.',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // Audio State
  const [audioTrack, setAudioTrack] = useState<ActiveAudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioTime, setAudioTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(180);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Announcements
  const [announcements, setAnnouncements] = useState<AnnouncementEntity[]>(() => {
    const saved = localStorage.getItem('church_sanctuary_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // Prayer Groups
  const [prayerGroups, setPrayerGroups] = useState<JoinedGroupEntity[]>(() => {
    const saved = localStorage.getItem('church_sanctuary_prayer_groups');
    return saved ? JSON.parse(saved) : INITIAL_PRAYER_GROUPS;
  });

  // Journal
  const [journalEntries, setJournalEntries] = useState<JournalEntity[]>(() => {
    const saved = localStorage.getItem('church_sanctuary_journals');
    return saved ? JSON.parse(saved) : INITIAL_JOURNALS;
  });

  // Pastor Chat
  const [chatMessages, setChatMessages] = useState<PastorMessageEntity[]>(() => {
    const saved = localStorage.getItem('church_sanctuary_chat');
    return saved ? JSON.parse(saved) : INITIAL_PASTOR_CHAT;
  });

  // Staff Account
  const [loggedInStaff, setLoggedInStaff] = useState<StaffAccount | null>(() => {
    const saved = localStorage.getItem('church_sanctuary_staff_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Notifications Banner
  const [activeBanner, setActiveBanner] = useState<InAppBanner | null>(null);

  // Settings
  const [dailyVerseReminder, setDailyVerseReminderState] = useState<boolean>(() => {
    return localStorage.getItem('church_sanctuary_daily_verse_remind') !== 'false';
  });
  const [devotionalReminder, setDevotionalReminderState] = useState<boolean>(() => {
    return localStorage.getItem('church_sanctuary_devotional_remind') !== 'false';
  });

  // Flutter Code Inspector Modal
  const [isFlutterInspectorOpen, setIsFlutterInspectorOpen] = useState<boolean>(false);

  // Save changes to localStorage
  const setThemePalette = (palette: ThemePalette) => {
    setThemePaletteState(palette);
    localStorage.setItem('church_sanctuary_palette', palette);
  };

  const setIsDarkMode = (dark: boolean) => {
    setIsDarkModeState(dark);
    localStorage.setItem('church_sanctuary_dark', String(dark));
  };

  const completeOnboarding = () => {
    setOnboardingCompleted(true);
    localStorage.setItem('church_sanctuary_onboarding', 'true');
  };

  const resetOnboarding = () => {
    setOnboardingCompleted(false);
    localStorage.removeItem('church_sanctuary_onboarding');
  };

  const setCurrentBook = (book: string) => {
    setCurrentBookState(book);
    localStorage.setItem('church_sanctuary_last_book', book);
  };

  const setCurrentChapter = (ch: number) => {
    setCurrentChapterState(ch);
    localStorage.setItem('church_sanctuary_last_chapter', String(ch));
  };

  const setCurrentTranslation = (trans: Translation) => {
    setCurrentTranslationState(trans);
    localStorage.setItem('church_sanctuary_translation', trans);
  };

  const setDailyVerseReminder = (enabled: boolean) => {
    setDailyVerseReminderState(enabled);
    localStorage.setItem('church_sanctuary_daily_verse_remind', String(enabled));
  };

  const setDevotionalReminder = (enabled: boolean) => {
    setDevotionalReminderState(enabled);
    localStorage.setItem('church_sanctuary_devotional_remind', String(enabled));
  };

  // Scripture jump helper
  const jumpToScripture = (book: string, chapter: number, verse?: number) => {
    setCurrentBook(book);
    setCurrentChapter(chapter);
    setTargetVerse(verse || null);
    setActiveScreen('scripture');
  };

  const navigateTo = (screen: ScreenId, extra?: { book?: string; chapter?: number; verse?: number }) => {
    if (extra?.book && extra?.chapter) {
      jumpToScripture(extra.book, extra.chapter, extra.verse);
      return;
    }
    setActiveScreen(screen);
  };

  // Bookmarking
  const toggleBookmark = (book: string, chapter: number, verse: number, translation: Translation, text: string) => {
    const existingIndex = bookmarks.findIndex(
      (b) => b.book === book && b.chapter === chapter && b.verse === verse && b.translation === translation
    );

    let updated: BibleBookmarkEntity[];
    if (existingIndex >= 0) {
      updated = bookmarks.filter((_, idx) => idx !== existingIndex);
      triggerBanner('Bookmark Removed', `${book} ${chapter}:${verse} removed from saved verses.`, 'info');
    } else {
      const newBm: BibleBookmarkEntity = {
        id: `bm-${Date.now()}`,
        book,
        chapter,
        verse,
        translation,
        verseText: text,
        createdAt: new Date().toISOString(),
      };
      updated = [newBm, ...bookmarks];
      triggerBanner('Verse Saved', `${book} ${chapter}:${verse} added to your bookmarks.`, 'info');
    }
    setBookmarks(updated);
    localStorage.setItem('church_sanctuary_bookmarks', JSON.stringify(updated));
  };

  const isBookmarked = (book: string, chapter: number, verse: number, translation: Translation) => {
    return bookmarks.some(
      (b) => b.book === book && b.chapter === chapter && b.verse === verse && b.translation === translation
    );
  };

  // Audio timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && audioTrack) {
      interval = setInterval(() => {
        setAudioTime((prev) => {
          if (prev >= audioDuration) {
            setIsPlaying(false);
            return 0;
          }
          return Math.min(prev + playbackSpeed, audioDuration);
        });
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, audioTrack, audioDuration, playbackSpeed]);

  const playAudio = (track: ActiveAudioTrack) => {
    setAudioTrack(track);
    setAudioDuration(track.durationSec);
    setAudioTime(0);
    setIsPlaying(true);
    triggerBanner('Audio Playing', `Now listening to: ${track.title}`, 'info');
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const seekAudio = (sec: number) => {
    setAudioTime(Math.max(0, Math.min(sec, audioDuration)));
  };

  const setSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const closeAudio = () => {
    setIsPlaying(false);
    setAudioTrack(null);
  };

  // Announcements actions
  const addAnnouncement = (data: Omit<AnnouncementEntity, 'id' | 'publishedAt' | 'isBroadcastSent'>) => {
    const newAnnouncement: AnnouncementEntity = {
      ...data,
      id: `ann-${Date.now()}`,
      publishedAt: new Date().toISOString(),
      isBroadcastSent: false,
    };
    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('church_sanctuary_announcements', JSON.stringify(updated));
    triggerBanner('Post Published', `"${newAnnouncement.title}" added to pastoral feed.`, 'info');
  };

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('church_sanctuary_announcements', JSON.stringify(updated));
    triggerBanner('Announcement Removed', 'The notice was removed from congregation feed.', 'info');
  };

  const broadcastAnnouncement = (id: string) => {
    const target = announcements.find((a) => a.id === id);
    if (!target) return;

    const updated = announcements.map((a) => (a.id === id ? { ...a, isBroadcastSent: true } : a));
    setAnnouncements(updated);
    localStorage.setItem('church_sanctuary_announcements', JSON.stringify(updated));

    // Fire in-app broadcast banner
    triggerBanner(
      `Broadcast: ${target.title}`,
      `Published by ${target.authorName} • "${target.content.slice(0, 95)}..."`,
      'broadcast'
    );

    // If browser notifications are permitted, show native desktop notification
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(target.title, {
          body: target.content,
          icon: '/favicon.ico',
        });
      } catch (e) {
        // Fallback gracefully on web iframe restrictions
      }
    }
  };

  // Prayer Groups RSVP
  const toggleGroupRsvp = (id: string, status: 'attending' | 'interested' | 'none') => {
    const updated = prayerGroups.map((g) => (g.id === id ? { ...g, rsvpStatus: status } : g));
    setPrayerGroups(updated);
    localStorage.setItem('church_sanctuary_prayer_groups', JSON.stringify(updated));
    const grp = prayerGroups.find((g) => g.id === id);
    if (grp) {
      const msg =
        status === 'attending'
          ? `You're attending ${grp.groupName}!`
          : status === 'interested'
          ? `Marked interest in ${grp.groupName}`
          : `Removed RSVP for ${grp.groupName}`;
      triggerBanner('Group RSVP Updated', msg, 'info');
    }
  };

  const toggleGroupReminder = (id: string) => {
    const updated = prayerGroups.map((g) =>
      g.id === id ? { ...g, reminderEnabled: !g.reminderEnabled } : g
    );
    setPrayerGroups(updated);
    localStorage.setItem('church_sanctuary_prayer_groups', JSON.stringify(updated));
    const grp = prayerGroups.find((g) => g.id === id);
    if (grp) {
      triggerBanner(
        'Reminder Toggled',
        `${grp.reminderEnabled ? 'Disabled' : 'Enabled'} meeting reminder for ${grp.groupName}`,
        'reminder'
      );
    }
  };

  // Journal CRUD
  const addJournalEntry = (title: string, content: string, scriptureTag?: string, gratitudePrompt?: string) => {
    const newEntry: JournalEntity = {
      id: `jrn-${Date.now()}`,
      title,
      content,
      scriptureTag,
      gratitudePrompt,
      createdAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('church_sanctuary_journals', JSON.stringify(updated));
    triggerBanner('Journal Entry Saved', 'Your reflection has been securely stored offline.', 'info');
  };

  const deleteJournalEntry = (id: string) => {
    const updated = journalEntries.filter((e) => e.id !== id);
    setJournalEntries(updated);
    localStorage.setItem('church_sanctuary_journals', JSON.stringify(updated));
    triggerBanner('Entry Deleted', 'Journal reflection removed.', 'info');
  };

  // Pastor Chat
  const sendPastorMessage = (content: string) => {
    const userMsg: PastorMessageEntity = {
      id: `msg-${Date.now()}`,
      threadId: 'pastor-wright',
      isFromUser: true,
      content,
      timestamp: new Date().toISOString(),
    };
    const updatedWithUser = [...chatMessages, userMsg];
    setChatMessages(updatedWithUser);
    localStorage.setItem('church_sanctuary_chat', JSON.stringify(updatedWithUser));

    // Thoughtful automatic pastoral guidance response
    setTimeout(() => {
      const pastorReplies = [
        'Thank you for reaching out with this sincerity. Please be assured that our pastoral team is holding you in prayer. Remember Philippians 4:6-7: do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.',
        'Grace and peace to you. In seasons where the path feels steep, the Lord promises His rod and staff will comfort you. Stand firm in faith today, and don\'t hesitate to speak with me after Sunday\'s 9:00 AM gathering.',
        'I am touched by your honesty. The Psalms remind us that God is near to the brokenhearted. May His peace, which surpasses all human understanding, anchor your mind today.',
      ];
      const replyText = pastorReplies[Math.floor(Math.random() * pastorReplies.length)];
      const pastorMsg: PastorMessageEntity = {
        id: `msg-${Date.now() + 1}`,
        threadId: 'pastor-wright',
        isFromUser: false,
        content: replyText,
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => {
        const nextList = [...prev, pastorMsg];
        localStorage.setItem('church_sanctuary_chat', JSON.stringify(nextList));
        return nextList;
      });
      triggerBanner('Message from Pastor Wright', 'New reply received in Pastoral Counseling chat.', 'broadcast');
    }, 1200);
  };

  // Staff Portal Login
  const loginStaff = (passcode: string): boolean => {
    const match = STAFF_ACCOUNTS.find((s) => s.presetPasscode === passcode.trim());
    if (match) {
      setLoggedInStaff(match);
      localStorage.setItem('church_sanctuary_staff_user', JSON.stringify(match));
      triggerBanner('Staff Portal Authenticated', `Welcome back, ${match.name} (${match.role}).`, 'info');
      return true;
    }
    return false;
  };

  const logoutStaff = () => {
    setLoggedInStaff(null);
    localStorage.removeItem('church_sanctuary_staff_user');
    triggerBanner('Staff Signed Out', 'Companion Portal session ended.', 'info');
  };

  // Banner Alerts
  const triggerBanner = (title: string, message: string, type: 'broadcast' | 'reminder' | 'info' = 'info') => {
    setActiveBanner({
      id: `ban-${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date().toISOString(),
    });
  };

  const dismissBanner = () => {
    setActiveBanner(null);
  };

  return (
    <SanctuaryContext.Provider
      value={{
        activeScreen,
        navigateTo,
        themePalette,
        setThemePalette,
        isDarkMode,
        setIsDarkMode,
        onboardingCompleted,
        completeOnboarding,
        resetOnboarding,
        currentBook,
        currentChapter,
        currentTranslation,
        targetVerse,
        fontSize,
        bookmarks,
        setCurrentBook,
        setCurrentChapter,
        setCurrentTranslation,
        setTargetVerse,
        setFontSize,
        toggleBookmark,
        isBookmarked,
        jumpToScripture,
        audioTrack,
        isPlaying,
        audioTime,
        audioDuration,
        playbackSpeed,
        playAudio,
        togglePlayPause,
        seekAudio,
        setSpeed,
        closeAudio,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        broadcastAnnouncement,
        prayerGroups,
        toggleGroupRsvp,
        toggleGroupReminder,
        journalEntries,
        addJournalEntry,
        deleteJournalEntry,
        chatMessages,
        sendPastorMessage,
        loggedInStaff,
        loginStaff,
        logoutStaff,
        activeBanner,
        triggerBanner,
        dismissBanner,
        dailyVerseReminder,
        setDailyVerseReminder,
        devotionalReminder,
        setDevotionalReminder,
        isFlutterInspectorOpen,
        setIsFlutterInspectorOpen,
      }}
    >
      {children}
    </SanctuaryContext.Provider>
  );
};

export const useSanctuary = () => {
  const context = useContext(SanctuaryContext);
  if (!context) {
    throw new Error('useSanctuary must be used within a SanctuaryProvider');
  }
  return context;
};
