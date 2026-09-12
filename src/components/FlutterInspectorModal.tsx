import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { X, Code2, Folder, FileCode, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface FileSnippet {
  name: string;
  path: string;
  category: string;
  content: string;
}

export const FlutterInspectorModal: React.FC = () => {
  const { isFlutterInspectorOpen, setIsFlutterInspectorOpen } = useSanctuary();
  const [copied, setCopied] = useState<boolean>(false);

  const files: FileSnippet[] = [
    {
      name: 'pubspec.yaml',
      path: '/pubspec.yaml',
      category: 'Project Manifest',
      content: `name: church_sanctuary
description: "Church Sanctuary - An offline-first church companion app with public-domain Scripture reader, devotions, sermon audio, prayer groups, and staff portal."
version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"
  flutter: ">=3.10.0"

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.1
  drift: ^2.18.0
  drift_sqflite: ^2.0.1
  sqlite3_flutter_libs: ^0.5.24
  go_router: ^14.1.4
  just_audio: ^0.9.38
  flutter_local_notifications: ^17.1.2
  cupertino_icons: ^1.0.8
  google_fonts: ^6.2.1

flutter:
  uses-material-design: true
  assets:
    - assets/bible/
    - assets/audio/`,
    },
    {
      name: 'database.dart',
      path: '/lib/data/database.dart',
      category: 'Drift SQLite Database',
      content: `// Drift Database schema mirroring Room entities
import 'package:drift/drift.dart';

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
}`,
    },
    {
      name: 'app_providers.dart',
      path: '/lib/providers/app_providers.dart',
      category: 'Riverpod MVVM Notifiers',
      content: `// Riverpod StateNotifiers & AsyncNotifiers
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/models.dart';

final themePaletteProvider = StateProvider<AppThemePalette>((ref) => AppThemePalette.graceSanctuaryNavy);
final isDarkModeProvider = StateProvider<bool>((ref) => false);
final currentStaffProvider = StateProvider<StaffAccount?>((ref) => null);

class ScriptureNotifier extends StateNotifier<ScriptureState> {
  ScriptureNotifier() : super(ScriptureState());
  void setTranslation(String translation) => state = state.copyWith(translation: translation);
  void jumpTo(String book, int chapter, [int? verse]) =>
      state = state.copyWith(book: book, chapter: chapter, targetVerse: verse);
}

class AudioPlayerNotifier extends StateNotifier<AudioPlayerState> {
  AudioPlayerNotifier() : super(AudioPlayerState());
  void playTrack(String title, String subtitle, Duration duration) {
    state = AudioPlayerState(isPlaying: true, title: title, subtitle: subtitle, totalDuration: duration);
  }
}`,
    },
    {
      name: 'main.dart',
      path: '/lib/main.dart',
      category: 'App Entry & Responsive Scaffold',
      content: `// Responsive layout: bottom nav on compact, side nav rail on wide
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: ChurchSanctuaryApp()));
}`,
    },
    {
      name: 'app_theme.dart',
      path: '/lib/theme/app_theme.dart',
      category: 'Material 3 ColorSchemes',
      content: `// 4 Theme Palettes: Grace Sanctuary Navy, Heavenly Gold, Olive Peace, Royal Amethyst
enum AppThemePalette {
  graceSanctuaryNavy,
  heavenlyGold,
  olivePeace,
  royalAmethyst,
}`,
    },
  ];

  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const activeFile = files[activeFileIndex];

  if (!isFlutterInspectorOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-stone-900 text-stone-100 rounded-3xl shadow-2xl border border-stone-800 overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-4 md:px-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Flutter (Dart) Codebase & Architecture
              </h3>
              <p className="text-xs text-stone-400">
                Cross-platform Android & Web codebase generated according to specifications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition border border-stone-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy File
                </>
              )}
            </button>
            <button
              onClick={() => setIsFlutterInspectorOpen(false)}
              className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Columns: File Tree + Code Preview */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-stone-800">
          {/* File Explorer Sidebar */}
          <div className="w-full md:w-64 bg-stone-950/60 p-3 overflow-y-auto space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              Flutter Deliverables
            </p>
            {files.map((file, idx) => (
              <button
                key={file.path}
                onClick={() => setActiveFileIndex(idx)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition ${
                  activeFileIndex === idx
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                }`}
              >
                <FileCode className="w-4 h-4 flex-shrink-0" />
                <div className="truncate">
                  <div className="truncate">{file.name}</div>
                  <div className="text-[10px] text-stone-400 font-sans">{file.category}</div>
                </div>
              </button>
            ))}

            <div className="pt-4 px-3">
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Terminal className="w-3.5 h-3.5" /> Build Commands
                </div>
                <p className="font-mono text-[10px] text-stone-300">flutter build apk</p>
                <p className="font-mono text-[10px] text-stone-300">flutter build web</p>
              </div>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 bg-stone-900 flex flex-col overflow-hidden">
            <div className="px-4 py-2 bg-stone-950/40 border-b border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
              <span>{activeFile.path}</span>
              <span className="text-amber-400/80">{activeFile.category}</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-stone-300 leading-relaxed whitespace-pre selection:bg-amber-500/30">
              {activeFile.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 px-6 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>All packages & public-domain texts are 100% royalty-free</span>
          <button
            onClick={() => setIsFlutterInspectorOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
