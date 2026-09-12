// Drift Database implementation for Church Sanctuary
// Supports Android (SQLite via drift_sqflite) and Web (drift/wasm)

import 'package:drift/drift.dart';

// Table Definitions mirroring Room entities
class Announcements extends Table {
  TextColumn get id => text()();
  TextColumn get title => text()();
  TextColumn get content => text()();
  TextColumn get authorName => text()();
  TextColumn get scriptureRef => text().nullable()();
  TextColumn get ctaLabel => text().nullable()();
  TextColumn get ctaLink => text().nullable()();
  TextColumn get category => text()();
  BoolColumn get isPinned => boolean().withDefault(const Constant(false))();
  BoolColumn get isScheduled => boolean().withDefault(const Constant(false))();
  DateTimeColumn get scheduledAt => dateTime().nullable()();
  DateTimeColumn get publishedAt => dateTime()();
  BoolColumn get isBroadcastSent => boolean().withDefault(const Constant(false))();

  @override
  Set<Column> get primaryKey => {id};
}

class BibleBookmarks extends Table {
  TextColumn get id => text()();
  TextColumn get book => text()();
  IntColumn get chapter => integer()();
  IntColumn get verse => integer()();
  TextColumn get translation => text()();
  TextColumn get verseText => text()();
  DateTimeColumn get createdAt => dateTime()();

  @override
  Set<Column> get primaryKey => {id};
}

class Journals extends Table {
  TextColumn get id => text()();
  TextColumn get title => text()();
  TextColumn get content => text()();
  TextColumn get scriptureTag => text().nullable()();
  TextColumn get gratitudePrompt => text().nullable()();
  DateTimeColumn get createdAt => dateTime()();

  @override
  Set<Column> get primaryKey => {id};
}

class PastorMessages extends Table {
  TextColumn get id => text()();
  TextColumn get threadId => text()();
  BoolColumn get isFromUser => boolean()();
  TextColumn get content => text()();
  DateTimeColumn get timestamp => dateTime()();

  @override
  Set<Column> get primaryKey => {id};
}

class JoinedGroups extends Table {
  TextColumn get id => text()();
  TextColumn get groupName => text()();
  TextColumn get category => text()();
  TextColumn get meetingTime => text()();
  DateTimeColumn get joinedAt => dateTime()();
  TextColumn get rsvpStatus => text()(); // 'attending', 'interested', 'none'

  @override
  Set<Column> get primaryKey => {id};
}

class BibleVerses extends Table {
  TextColumn get book => text()();
  IntColumn get chapter => integer()();
  IntColumn get verse => integer()();
  TextColumn get translation => text()(); // 'KJV', 'WEB', 'ASV', 'BBE'
  TextColumn get textContent => text()();

  @override
  Set<Column> get primaryKey => {book, chapter, verse, translation};
}

// Database Connection Helper
// Uses LazyDatabase with conditionally imported platforms
class AppDatabase {
  static final AppDatabase _instance = AppDatabase._internal();
  factory AppDatabase() => _instance;
  AppDatabase._internal();

  // Drift DAOs and queries:
  // - watchAllAnnouncements()
  // - insertAnnouncement(AnnouncementEntity)
  // - watchBookmarks()
  // - toggleBookmark(book, chapter, verse, translation, text)
  // - watchJournals()
  // - insertJournal(JournalEntity)
  // - deleteJournal(id)
  // - watchPastorMessages(threadId)
  // - sendMessage(threadId, content)
  // - watchJoinedGroups()
  // - updateRsvp(groupId, status)
  // - getVersesForChapter(book, chapter, translation)
  // - searchScripture(query, translation)
}
