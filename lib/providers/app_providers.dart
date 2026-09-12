// Riverpod StateNotifiers & AsyncNotifiers for Church Sanctuary
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/models.dart';
import '../data/seed_data.dart';
import '../theme/app_theme.dart';

// Theme Mode & Palette Providers
final themePaletteProvider = StateProvider<AppThemePalette>((ref) => AppThemePalette.graceSanctuaryNavy);
final isDarkModeProvider = StateProvider<bool>((ref) => false);
final onboardingCompletedProvider = StateProvider<bool>((ref) => false);

// Staff Auth State
final currentStaffProvider = StateProvider<StaffAccount?>((ref) => null);

// Current Screen Tab Index (0: Home, 1: Scripture, 2: Devotion, 3: Pastors, 4: Groups, 5: Journal, 6: Profile)
final selectedNavIndexProvider = StateProvider<int>((ref) => 0);

// Scripture Reader State
class ScriptureState {
  final String book;
  final int chapter;
  final String translation; // 'KJV', 'WEB', 'ASV', 'BBE'
  final int? targetVerse;
  final double fontSize;

  ScriptureState({
    this.book = 'Psalms',
    this.chapter = 23,
    this.translation = 'KJV',
    this.targetVerse,
    this.fontSize = 18.0,
  });

  ScriptureState copyWith({
    String? book,
    int? chapter,
    String? translation,
    int? targetVerse,
    double? fontSize,
  }) {
    return ScriptureState(
      book: book ?? this.book,
      chapter: chapter ?? this.chapter,
      translation: translation ?? this.translation,
      targetVerse: targetVerse ?? this.targetVerse,
      fontSize: fontSize ?? this.fontSize,
    );
  }
}

final scriptureStateProvider = StateNotifierProvider<ScriptureNotifier, ScriptureState>((ref) {
  return ScriptureNotifier();
});

class ScriptureNotifier extends StateNotifier<ScriptureState> {
  ScriptureNotifier() : super(ScriptureState());

  void setTranslation(String translation) {
    state = state.copyWith(translation: translation);
  }

  void jumpTo(String book, int chapter, [int? verse]) {
    state = state.copyWith(book: book, chapter: chapter, targetVerse: verse);
  }

  void adjustFontSize(double delta) {
    state = state.copyWith(fontSize: (state.fontSize + delta).clamp(14.0, 26.0));
  }
}

// Announcements Notifier
class AnnouncementsNotifier extends StateNotifier<List<AnnouncementModel>> {
  AnnouncementsNotifier() : super(kInitialAnnouncements);

  void addAnnouncement(AnnouncementModel announcement) {
    state = [announcement, ...state];
  }

  void broadcastAnnouncement(String id) {
    state = state.map((a) => a.id == id ? AnnouncementModel(
      id: a.id,
      title: a.title,
      content: a.content,
      authorName: a.authorName,
      scriptureRef: a.scriptureRef,
      ctaLabel: a.ctaLabel,
      ctaLink: a.ctaLink,
      category: a.category,
      isPinned: a.isPinned,
      isScheduled: a.isScheduled,
      scheduledAt: a.scheduledAt,
      publishedAt: a.publishedAt,
      isBroadcastSent: true,
    ) : a).toList();
  }
}

final announcementsProvider = StateNotifierProvider<AnnouncementsNotifier, List<AnnouncementModel>>((ref) {
  return AnnouncementsNotifier();
});

// Audio Player State
class AudioPlayerState {
  final bool isPlaying;
  final String title;
  final String subtitle;
  final Duration currentPosition;
  final Duration totalDuration;
  final double playbackSpeed;
  final bool isVisible;

  AudioPlayerState({
    this.isPlaying = false,
    this.title = '',
    this.subtitle = '',
    this.currentPosition = Duration.zero,
    this.totalDuration = const Duration(minutes: 25),
    this.playbackSpeed = 1.0,
    this.isVisible = false,
  });

  AudioPlayerState copyWith({
    bool? isPlaying,
    String? title,
    String? subtitle,
    Duration? currentPosition,
    Duration? totalDuration,
    double? playbackSpeed,
    bool? isVisible,
  }) {
    return AudioPlayerState(
      isPlaying: isPlaying ?? this.isPlaying,
      title: title ?? this.title,
      subtitle: subtitle ?? this.subtitle,
      currentPosition: currentPosition ?? this.currentPosition,
      totalDuration: totalDuration ?? this.totalDuration,
      playbackSpeed: playbackSpeed ?? this.playbackSpeed,
      isVisible: isVisible ?? this.isVisible,
    );
  }
}

class AudioPlayerNotifier extends StateNotifier<AudioPlayerState> {
  AudioPlayerNotifier() : super(AudioPlayerState());

  void playTrack(String title, String subtitle, Duration duration) {
    state = AudioPlayerState(
      isPlaying: true,
      title: title,
      subtitle: subtitle,
      currentPosition: Duration.zero,
      totalDuration: duration,
      playbackSpeed: state.playbackSpeed,
      isVisible: true,
    );
  }

  void togglePlayPause() {
    state = state.copyWith(isPlaying: !state.isPlaying);
  }

  void seek(Duration position) {
    state = state.copyWith(currentPosition: position);
  }

  void setSpeed(double speed) {
    state = state.copyWith(playbackSpeed: speed);
  }

  void dismiss() {
    state = state.copyWith(isVisible: false, isPlaying: false);
  }
}

final audioPlayerProvider = StateNotifierProvider<AudioPlayerNotifier, AudioPlayerState>((ref) {
  return AudioPlayerNotifier();
});

// Pastoral Counseling Chat State
final pastoralChatProvider = StateNotifierProvider<PastoralChatNotifier, List<PastorMessageModel>>((ref) {
  return PastoralChatNotifier();
});

class PastoralChatNotifier extends StateNotifier<List<PastorMessageModel>> {
  PastoralChatNotifier() : super([
    PastorMessageModel(
      id: 'm1',
      threadId: 'pastor-wright',
      isFromUser: false,
      content: 'Grace and peace to you in Christ Jesus. If you have prayer requests, questions about Scripture, or need personal pastoral counsel, I am here for you.',
      timestamp: DateTime.now().subtract(const Duration(hours: 4)),
    ),
  ]);

  void sendUserMessage(String content) {
    final userMsg = PastorMessageModel(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      threadId: 'pastor-wright',
      isFromUser: true,
      content: content,
      timestamp: DateTime.now(),
    );
    state = [...state, userMsg];

    // Simulated thoughtful pastoral guidance response
    Future.delayed(const Duration(seconds: 1), () {
      final pastorReply = PastorMessageModel(
        id: (DateTime.now().millisecondsSinceEpoch + 1).toString(),
        threadId: 'pastor-wright',
        isFromUser: false,
        content: 'Thank you for sharing this with me. Know that you are covered in prayer. As Philippians 4:6-7 encourages us, bring everything to God with thanksgiving, and His peace will guard your heart.',
        timestamp: DateTime.now(),
      );
      state = [...state, pastorReply];
    });
  }
}

// Prayer Groups Notifier
final prayerGroupsProvider = StateNotifierProvider<PrayerGroupsNotifier, List<JoinedGroupModel>>((ref) {
  return PrayerGroupsNotifier();
});

class PrayerGroupsNotifier extends StateNotifier<List<JoinedGroupModel>> {
  PrayerGroupsNotifier() : super(kInitialPrayerGroups);

  void toggleRsvp(String id) {
    state = state.map((group) {
      if (group.id == id) {
        final newStatus = group.rsvpStatus == 'attending' ? 'none' : 'attending';
        return JoinedGroupModel(
          id: group.id,
          groupName: group.groupName,
          category: group.category,
          meetingTime: group.meetingTime,
          joinedAt: group.joinedAt,
          rsvpStatus: newStatus,
        );
      }
      return group;
    }).toList();
  }
}

// Journal Notifier
final journalProvider = StateNotifierProvider<JournalNotifier, List<JournalModel>>((ref) {
  return JournalNotifier();
});

class JournalNotifier extends StateNotifier<List<JournalModel>> {
  JournalNotifier() : super([
    JournalModel(
      id: 'j-1',
      title: 'Finding Rest in Anxious Times',
      content: 'Today was demanding at work, but spending 10 minutes meditating on Psalm 23 reminded me that my value is in Christ, not my productivity.',
      scriptureTag: 'Psalm 23:2',
      gratitudePrompt: 'Grateful for morning quiet time and family health.',
      createdAt: DateTime.now().subtract(const Duration(days: 1)),
    ),
  ]);

  void addEntry(String title, String content, String? scriptureTag, String? gratitudePrompt) {
    final entry = JournalModel(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      title: title,
      content: content,
      scriptureTag: scriptureTag,
      gratitudePrompt: gratitudePrompt,
      createdAt: DateTime.now(),
    );
    state = [entry, ...state];
  }

  void deleteEntry(String id) {
    state = state.where((item) => item.id != id).toList();
  }
}
