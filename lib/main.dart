// Church Sanctuary - Main Flutter Entry Point
// Multi-platform support: Android & Web
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'theme/app_theme.dart';
import 'providers/app_providers.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: ChurchSanctuaryApp()));
}

class ChurchSanctuaryApp extends ConsumerWidget {
  const ChurchSanctuaryApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final palette = ref.watch(themePaletteProvider);
    final isDark = ref.watch(isDarkModeProvider);

    return MaterialApp(
      title: 'Church Sanctuary',
      debugShowCheckedModeBanner: false,
      theme: AppThemes.getThemeData(palette: palette, isDark: false),
      darkTheme: AppThemes.getThemeData(palette: palette, isDark: true),
      themeMode: isDark ? ThemeMode.dark : ThemeMode.light,
      home: const SanctuaryMainScaffold(),
    );
  }
}

class SanctuaryMainScaffold extends ConsumerWidget {
  const SanctuaryMainScaffold({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedIndex = ref.watch(selectedNavIndexProvider);
    final isWide = MediaQuery.of(context).size.width >= 800;

    final pages = [
      const Center(child: Text('Home Feed')),
      const Center(child: Text('Scripture Reader')),
      const Center(child: Text('Daily Devotion')),
      const Center(child: Text('Sermons & Counseling')),
      const Center(child: Text('Prayer Groups')),
      const Center(child: Text('Journal')),
      const Center(child: Text('Profile & Settings')),
    ];

    if (isWide) {
      return Scaffold(
        body: Row(
          children: [
            NavigationRail(
              selectedIndex: selectedIndex,
              onDestinationSelected: (idx) {
                ref.read(selectedNavIndexProvider.notifier).state = idx;
              },
              labelType: NavigationRailLabelType.all,
              destinations: const [
                NavigationRailDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: Text('Home')),
                NavigationRailDestination(icon: Icon(Icons.menu_book_outlined), selectedIcon: Icon(Icons.menu_book), label: Text('Scripture')),
                NavigationRailDestination(icon: Icon(Icons.wb_sunny_outlined), selectedIcon: Icon(Icons.wb_sunny), label: Text('Devotion')),
                NavigationRailDestination(icon: Icon(Icons.podcasts_outlined), selectedIcon: Icon(Icons.podcasts), label: Text('Pastors')),
                NavigationRailDestination(icon: Icon(Icons.group_outlined), selectedIcon: Icon(Icons.group), label: Text('Groups')),
                NavigationRailDestination(icon: Icon(Icons.edit_note_outlined), selectedIcon: Icon(Icons.edit_note), label: Text('Journal')),
                NavigationRailDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: Text('Profile')),
              ],
            ),
            const VerticalDivider(thickness: 1, width: 1),
            Expanded(child: pages[selectedIndex]),
          ],
        ),
      );
    }

    return Scaffold(
      body: pages[selectedIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: selectedIndex,
        onDestinationSelected: (idx) {
          ref.read(selectedNavIndexProvider.notifier).state = idx;
        },
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.menu_book_outlined), selectedIcon: Icon(Icons.menu_book), label: 'Bible'),
          NavigationDestination(icon: Icon(Icons.wb_sunny_outlined), selectedIcon: Icon(Icons.wb_sunny), label: 'Devotion'),
          NavigationDestination(icon: Icon(Icons.podcasts_outlined), selectedIcon: Icon(Icons.podcasts), label: 'Pastors'),
          NavigationDestination(icon: Icon(Icons.group_outlined), selectedIcon: Icon(Icons.group), label: 'Groups'),
          NavigationDestination(icon: Icon(Icons.edit_note_outlined), selectedIcon: Icon(Icons.edit_note), label: 'Journal'),
          NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}
