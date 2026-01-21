// Sticker definitions for the Sticker Book feature
// MVP: Only streak-based stickers (Page 5) are unlockable
// All others show as greyed placeholders

export interface Sticker {
  id: string;
  translationKey: string;
  emoji: string;
  pageNumber: number;
  // Unlock types:
  // - 'streak': daily streaks
  // - 'letters_progress': unique letters heard
  // - 'letters_total': total letter clicks/listens (practice milestone)
  // - 'future': shows as locked
  unlockType: 'streak' | 'letters_progress' | 'letters_total' | 'future';
  // For streak: the streak day required
  // For letters_progress: unique letters heard count
  // For letters_total: total letter clicks count
  unlockValue?: number;
}

export interface StickerPage {
  pageNumber: number;
  titleKey: string;
  color: string;
}

// 34 stickers across 6 pages
export const STICKERS: Sticker[] = [
  // Page 1: Letters - Discovery (unique letters heard)
  { id: 'letters_first', translationKey: 'stickers.letters.first', emoji: '🔤', pageNumber: 1, unlockType: 'letters_progress', unlockValue: 1 },
  { id: 'letters_five', translationKey: 'stickers.letters.five', emoji: '📝', pageNumber: 1, unlockType: 'letters_progress', unlockValue: 5 },
  { id: 'letters_ten', translationKey: 'stickers.letters.ten', emoji: '📖', pageNumber: 1, unlockType: 'letters_progress', unlockValue: 10 },
  { id: 'letters_fifteen', translationKey: 'stickers.letters.fifteen', emoji: '⭐', pageNumber: 1, unlockType: 'letters_progress', unlockValue: 15 },
  { id: 'letters_all', translationKey: 'stickers.letters.all', emoji: '🎓', pageNumber: 1, unlockType: 'letters_progress', unlockValue: 22 },
  // Page 1: Letters - Practice (total letter clicks)
  { id: 'letters_practice_50', translationKey: 'stickers.letters.practice50', emoji: '🎯', pageNumber: 1, unlockType: 'letters_total', unlockValue: 50 },
  { id: 'letters_practice_100', translationKey: 'stickers.letters.practice100', emoji: '💪', pageNumber: 1, unlockType: 'letters_total', unlockValue: 100 },
  { id: 'letters_practice_200', translationKey: 'stickers.letters.practice200', emoji: '🚀', pageNumber: 1, unlockType: 'letters_total', unlockValue: 200 },
  { id: 'letters_practice_300', translationKey: 'stickers.letters.practice300', emoji: '🏅', pageNumber: 1, unlockType: 'letters_total', unlockValue: 300 },

  // Page 2: Numbers (all future/locked for MVP)
  { id: 'numbers_one', translationKey: 'stickers.numbers.one', emoji: '1️⃣', pageNumber: 2, unlockType: 'future' },
  { id: 'numbers_five', translationKey: 'stickers.numbers.five', emoji: '5️⃣', pageNumber: 2, unlockType: 'future' },
  { id: 'numbers_ten', translationKey: 'stickers.numbers.ten', emoji: '🔟', pageNumber: 2, unlockType: 'future' },
  { id: 'numbers_master', translationKey: 'stickers.numbers.master', emoji: '🧮', pageNumber: 2, unlockType: 'future' },
  { id: 'numbers_math', translationKey: 'stickers.numbers.math', emoji: '⭐', pageNumber: 2, unlockType: 'future' },

  // Page 3: Animals (all future/locked for MVP)
  { id: 'animals_first', translationKey: 'stickers.animals.first', emoji: '🐾', pageNumber: 3, unlockType: 'future' },
  { id: 'animals_five', translationKey: 'stickers.animals.five', emoji: '🦁', pageNumber: 3, unlockType: 'future' },
  { id: 'animals_all', translationKey: 'stickers.animals.all', emoji: '🐘', pageNumber: 3, unlockType: 'future' },
  { id: 'animals_sounds', translationKey: 'stickers.animals.sounds', emoji: '🔊', pageNumber: 3, unlockType: 'future' },
  { id: 'animals_zoo', translationKey: 'stickers.animals.zoo', emoji: '🦓', pageNumber: 3, unlockType: 'future' },

  // Page 4: Games (all future/locked for MVP)
  { id: 'games_first', translationKey: 'stickers.games.first', emoji: '🎮', pageNumber: 4, unlockType: 'future' },
  { id: 'games_memory', translationKey: 'stickers.games.memory', emoji: '🧩', pageNumber: 4, unlockType: 'future' },
  { id: 'games_simon', translationKey: 'stickers.games.simon', emoji: '🚦', pageNumber: 4, unlockType: 'future' },
  { id: 'games_speed', translationKey: 'stickers.games.speed', emoji: '⚡', pageNumber: 4, unlockType: 'future' },
  { id: 'games_master', translationKey: 'stickers.games.master', emoji: '🏆', pageNumber: 4, unlockType: 'future' },

  // Page 5: Streaks (THESE ARE UNLOCKABLE IN MVP!)
  { id: 'streak_day_1', translationKey: 'stickers.streaks.day1', emoji: '🔥', pageNumber: 5, unlockType: 'streak', unlockValue: 1 },
  { id: 'streak_day_3', translationKey: 'stickers.streaks.day3', emoji: '🌟', pageNumber: 5, unlockType: 'streak', unlockValue: 3 },
  { id: 'streak_day_7', translationKey: 'stickers.streaks.day7', emoji: '✨', pageNumber: 5, unlockType: 'streak', unlockValue: 7 },
  { id: 'streak_day_14', translationKey: 'stickers.streaks.day14', emoji: '💫', pageNumber: 5, unlockType: 'streak', unlockValue: 14 },
  { id: 'streak_day_30', translationKey: 'stickers.streaks.day30', emoji: '👑', pageNumber: 5, unlockType: 'streak', unlockValue: 30 },

  // Page 6: Explorer (all future/locked for MVP)
  { id: 'explorer_colors', translationKey: 'stickers.explorer.colors', emoji: '🎨', pageNumber: 6, unlockType: 'future' },
  { id: 'explorer_shapes', translationKey: 'stickers.explorer.shapes', emoji: '🔷', pageNumber: 6, unlockType: 'future' },
  { id: 'explorer_food', translationKey: 'stickers.explorer.food', emoji: '🍎', pageNumber: 6, unlockType: 'future' },
  { id: 'explorer_words', translationKey: 'stickers.explorer.words', emoji: '📚', pageNumber: 6, unlockType: 'future' },
  { id: 'explorer_super', translationKey: 'stickers.explorer.super', emoji: '🌈', pageNumber: 6, unlockType: 'future' },
];

// Page themes with colors
export const STICKER_PAGES: StickerPage[] = [
  { pageNumber: 1, titleKey: 'stickers.pages.letters', color: '#FF6B9D' },
  { pageNumber: 2, titleKey: 'stickers.pages.numbers', color: '#4ECDC4' },
  { pageNumber: 3, titleKey: 'stickers.pages.animals', color: '#FF8C42' },
  { pageNumber: 4, titleKey: 'stickers.pages.games', color: '#45B7D1' },
  { pageNumber: 5, titleKey: 'stickers.pages.streaks', color: '#FFD93D' },
  { pageNumber: 6, titleKey: 'stickers.pages.explorer', color: '#9B59B6' },
];

export const TOTAL_PAGES = 6;
export const TOTAL_STICKERS = 34;

// Helper to get stickers for a specific page
export function getStickersForPage(pageNumber: number): Sticker[] {
  return STICKERS.filter((s) => s.pageNumber === pageNumber);
}

// Helper to get page info
export function getPageInfo(pageNumber: number): StickerPage | undefined {
  return STICKER_PAGES.find((p) => p.pageNumber === pageNumber);
}
