// Material 3 ColorSchemes for Church Sanctuary (4 Theme Palettes)
import 'package:flutter/material.dart';

enum AppThemePalette {
  graceSanctuaryNavy,
  heavenlyGold,
  olivePeace,
  royalAmethyst,
}

class AppThemes {
  // 1. Grace Sanctuary Navy (Deep navy blue & soft gold accents)
  static final ColorScheme navyLight = ColorScheme.fromSeed(
    seedColor: const Color(0xFF1E3A8A),
    primary: const Color(0xFF1E3A8A),
    secondary: const Color(0xFFD97706),
    surface: const Color(0xFFF8FAFC),
    brightness: Brightness.light,
  );

  static final ColorScheme navyDark = ColorScheme.fromSeed(
    seedColor: const Color(0xFF1E3A8A),
    primary: const Color(0xFF60A5FA),
    secondary: const Color(0xFFFBBF24),
    surface: const Color(0xFF0F172A),
    brightness: Brightness.dark,
  );

  // 2. Heavenly Gold (Warm champagne gold & ivory)
  static final ColorScheme goldLight = ColorScheme.fromSeed(
    seedColor: const Color(0xFFB45309),
    primary: const Color(0xFF92400E),
    secondary: const Color(0xFFD97706),
    surface: const Color(0xFFFFFBEB),
    brightness: Brightness.light,
  );

  static final ColorScheme goldDark = ColorScheme.fromSeed(
    seedColor: const Color(0xFFB45309),
    primary: const Color(0xFFFDE68A),
    secondary: const Color(0xFFF59E0B),
    surface: const Color(0xFF1C1917),
    brightness: Brightness.dark,
  );

  // 3. Olive Peace (Deep sage olive & warm sand)
  static final ColorScheme oliveLight = ColorScheme.fromSeed(
    seedColor: const Color(0xFF3F6212),
    primary: const Color(0xFF365314),
    secondary: const Color(0xFF65A30D),
    surface: const Color(0xFFF7FEE7),
    brightness: Brightness.light,
  );

  static final ColorScheme oliveDark = ColorScheme.fromSeed(
    seedColor: const Color(0xFF3F6212),
    primary: const Color(0xFFA3E635),
    secondary: const Color(0xFF84CC16),
    surface: const Color(0xFF142008),
    brightness: Brightness.dark,
  );

  // 4. Royal Amethyst (Regal purple & warm rose accents)
  static final ColorScheme amethystLight = ColorScheme.fromSeed(
    seedColor: const Color(0xFF581C87),
    primary: const Color(0xFF6B21A8),
    secondary: const Color(0xFFA855F7),
    surface: const Color(0xFFFAF5FF),
    brightness: Brightness.light,
  );

  static final ColorScheme amethystDark = ColorScheme.fromSeed(
    seedColor: const Color(0xFF581C87),
    primary: const Color(0xFFD8B4FE),
    secondary: const Color(0xFFC084FC),
    surface: const Color(0xFF190D2E),
    brightness: Brightness.dark,
  );

  static ThemeData getThemeData({
    required AppThemePalette palette,
    required bool isDark,
  }) {
    ColorScheme scheme;
    switch (palette) {
      case AppThemePalette.graceSanctuaryNavy:
        scheme = isDark ? navyDark : navyLight;
        break;
      case AppThemePalette.heavenlyGold:
        scheme = isDark ? goldDark : goldLight;
        break;
      case AppThemePalette.olivePeace:
        scheme = isDark ? oliveDark : oliveLight;
        break;
      case AppThemePalette.royalAmethyst:
        scheme = isDark ? amethystDark : amethystLight;
        break;
    }

    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: scheme.surface,
      appBarTheme: AppBarTheme(
        centerTitle: false,
        backgroundColor: scheme.surface,
        foregroundColor: scheme.onSurface,
        elevation: 0,
      ),
      cardTheme: CardTheme(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(
            color: scheme.outlineVariant.withOpacity(0.4),
            width: 1,
          ),
        ),
      ),
    );
  }
}
