// Plain Dart domain models for Church Sanctuary

class AnnouncementModel {
  final String id;
  final String title;
  final String content;
  final String authorName;
  final String? scriptureRef;
  final String? ctaLabel;
  final String? ctaLink;
  final String category; // General, Worship, Outreach, Youth, Community
  final bool isPinned;
  final bool isScheduled;
  final DateTime? scheduledAt;
  final DateTime publishedAt;
  final bool isBroadcastSent;

  AnnouncementModel({
    required this.id,
    required this.title,
    required this.content,
    required this.authorName,
    this.scriptureRef,
    this.ctaLabel,
    this.ctaLink,
    required this.category,
    this.isPinned = false,
    this.isScheduled = false,
    this.scheduledAt,
    required this.publishedAt,
    this.isBroadcastSent = false,
  });
}

class BibleBookmarkModel {
  final String id;
  final String book;
  final int chapter;
  final int verse;
  final String translation;
  final String verseText;
  final DateTime createdAt;

  BibleBookmarkModel({
    required this.id,
    required this.book,
    required this.chapter,
    required this.verse,
    required this.translation,
    required this.verseText,
    required this.createdAt,
  });
}

class JournalModel {
  final String id;
  final String title;
  final String content;
  final String? scriptureTag;
  final String? gratitudePrompt;
  final DateTime createdAt;

  JournalModel({
    required this.id,
    required this.title,
    required this.content,
    this.scriptureTag,
    this.gratitudePrompt,
    required this.createdAt,
  });
}

class PastorMessageModel {
  final String id;
  final String threadId;
  final bool isFromUser;
  final String content;
  final DateTime timestamp;

  PastorMessageModel({
    required this.id,
    required this.threadId,
    required this.isFromUser,
    required this.content,
    required this.timestamp,
  });
}

class JoinedGroupModel {
  final String id;
  final String groupName;
  final String category;
  final String meetingTime;
  final DateTime joinedAt;
  final String rsvpStatus; // 'attending', 'interested', 'none'

  JoinedGroupModel({
    required this.id,
    required this.groupName,
    required this.category,
    required this.meetingTime,
    required this.joinedAt,
    required this.rsvpStatus,
  });
}

class StaffAccount {
  final String name;
  final String role;
  final String presetPasscode;
  final String avatarInitials;

  const StaffAccount({
    required this.name,
    required this.role,
    required this.presetPasscode,
    required this.avatarInitials,
  });
}

class BibleVerse {
  final String book;
  final int chapter;
  final int verse;
  final String translation;
  final String text;

  const BibleVerse({
    required this.book,
    required this.chapter,
    required this.verse,
    required this.translation,
    required this.text,
  });
}

class Devotional {
  final String date;
  final String title;
  final String morningReflection;
  final String eveningReflection;
  final List<String> scriptureRefs;
  final List<String> questions;
  final String closingPrayer;
  final String audioUrl;

  const Devotional({
    required this.date,
    required this.title,
    required this.morningReflection,
    required this.eveningReflection,
    required this.scriptureRefs,
    required this.questions,
    required this.closingPrayer,
    required this.audioUrl,
  });
}

class Sermon {
  final String id;
  final String title;
  final String speaker;
  final String series;
  final String category;
  final int durationSec;
  final String audioUrl;
  final String scriptureRef;

  const Sermon({
    required this.id,
    required this.title,
    required this.speaker,
    required this.series,
    required this.category,
    required this.durationSec,
    required this.audioUrl,
    required this.scriptureRef,
  });
}
