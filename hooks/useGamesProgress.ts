'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameType } from '@/models/amplitudeEvents';

/**
 * Storage error types for debugging and potential UI feedback.
 */
export type StorageErrorType = 'load_failed' | 'save_failed' | null;

/**
 * Games progress data structure.
 * Tracks game completions and achievements for sticker unlocks.
 */
export interface GamesProgressData {
  /** Set of game types that have been completed at least once */
  completedGameTypes: GameType[];
  /** Number of times memory-match-game has been won */
  memoryWins: number;
  /** Highest level reached in simon-game */
  simonHighScore: number;
  /** Number of times speed-challenge was completed with high accuracy (>=70%) */
  speedChallengeHighScores: number;
  /** Number of times word-builder was completed */
  wordBuilderCompletions: number;
  /** Number of times sound-matching was completed with perfect score (10/10) */
  soundMatchingPerfect: number;
  /** Number of times counting-game was completed */
  countingGameCompletions: number;
  /** Total number of games completed across all types */
  totalGamesCompleted: number;
}

export interface UseGamesProgressReturn {
  /** Record that a game was completed */
  recordGameCompleted: (gameType: GameType, score: number, options?: GameCompletionOptions) => void;
  /** Check if a specific game type has been played */
  hasPlayedGame: (gameType: GameType) => boolean;
  /** Set of all completed game types (for O(1) lookup) */
  completedGameTypes: Set<GameType>;
  /** Number of unique games played */
  uniqueGamesPlayed: number;
  /** Total number of game types available */
  totalGameTypes: number;
  /** Whether all games have been played at least once */
  hasPlayedAllGames: boolean;
  /** Number of memory game wins */
  memoryWins: number;
  /** Highest level in Simon game */
  simonHighScore: number;
  /** Number of speed challenge high score completions */
  speedChallengeHighScores: number;
  /** Number of word builder completions */
  wordBuilderCompletions: number;
  /** Number of perfect sound matching scores */
  soundMatchingPerfect: number;
  /** Number of counting game completions */
  countingGameCompletions: number;
  /** Total games completed across all types */
  totalGamesCompleted: number;
  /** Storage error state - UI can show gentle feedback if needed */
  storageError: StorageErrorType;
  /** Clear the storage error */
  clearStorageError: () => void;
}

export interface GameCompletionOptions {
  /** For speed-challenge: whether this was a high accuracy completion (>=70%) */
  isHighAccuracy?: boolean;
  /** For sound-matching: whether this was a perfect score (10/10) */
  isPerfectScore?: boolean;
}

const STORAGE_KEY = 'lepdy_games_progress';

// All available game types (8 games as per the app)
const ALL_GAME_TYPES: GameType[] = [
  'guess-game',
  'memory-match-game',
  'simon-game',
  'speed-challenge',
  'word-builder',
  'letter-rain',
  'sound-matching',
  'counting-game',
];

const TOTAL_GAME_TYPES = ALL_GAME_TYPES.length;

function getDefaultProgressData(): GamesProgressData {
  return {
    completedGameTypes: [],
    memoryWins: 0,
    simonHighScore: 0,
    speedChallengeHighScores: 0,
    wordBuilderCompletions: 0,
    soundMatchingPerfect: 0,
    countingGameCompletions: 0,
    totalGamesCompleted: 0,
  };
}

/**
 * Safely load progress data from localStorage.
 */
function loadProgressData(): { data: GamesProgressData; error: boolean } {
  if (typeof window === 'undefined') {
    return { data: getDefaultProgressData(), error: false };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate the structure (minimal validation for backwards compatibility)
      if (Array.isArray(parsed.completedGameTypes)) {
        // Merge with defaults to handle missing new fields
        const data: GamesProgressData = {
          ...getDefaultProgressData(),
          ...parsed,
        };
        return { data, error: false };
      }
      // Data exists but is malformed
      console.warn('[games] Progress data malformed, resetting to defaults:', parsed);
      return { data: getDefaultProgressData(), error: true };
    }
    return { data: getDefaultProgressData(), error: false };
  } catch (error) {
    const errorType =
      error instanceof SyntaxError
        ? 'JSON parse error'
        : error instanceof DOMException
          ? `Storage error: ${(error as DOMException).name}`
          : 'Unknown error';
    console.error(`[games] Failed to load progress (${errorType}):`, error);
    return { data: getDefaultProgressData(), error: true };
  }
}

/**
 * Safely save progress data to localStorage.
 */
function saveProgressData(data: GamesProgressData): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    if (error instanceof DOMException) {
      if (error.name === 'QuotaExceededError') {
        console.error('[games] Storage quota exceeded.');
      } else if (error.name === 'SecurityError') {
        console.error('[games] Storage access denied.');
      } else {
        console.error(`[games] Storage error (${error.name}):`, error);
      }
    } else {
      console.error('[games] Failed to save progress:', error);
    }
    return false;
  }
}

/**
 * Hook for tracking games progress (completions and achievements).
 * Used for unlocking game-related stickers.
 *
 * Tracks:
 * - Unique games played (any of 7 games)
 * - Memory match wins
 * - Simon game high score (level reached)
 * - Speed challenge high accuracy completions
 */
export function useGamesProgress(): UseGamesProgressReturn {
  const [progressData, setProgressData] = useState<GamesProgressData>(getDefaultProgressData);
  const [isInitialized, setIsInitialized] = useState(false);
  const [storageError, setStorageError] = useState<StorageErrorType>(null);

  // Load data on mount
  useEffect(() => {
    const { data, error } = loadProgressData();
    setProgressData(data);
    setStorageError(error ? 'load_failed' : null);
    setIsInitialized(true);
  }, []);

  // Save whenever data changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      const success = saveProgressData(progressData);
      if (!success) {
        setStorageError('save_failed');
      } else if (storageError === 'save_failed') {
        setStorageError(null);
      }
    }
  }, [progressData, isInitialized, storageError]);

  // Memoized Set for O(1) lookup
  const completedGameTypes = useMemo(() => {
    return new Set(progressData.completedGameTypes);
  }, [progressData.completedGameTypes]);

  const hasPlayedGame = useCallback(
    (gameType: GameType): boolean => completedGameTypes.has(gameType),
    [completedGameTypes]
  );

  const recordGameCompleted = useCallback(
    (gameType: GameType, score: number, options?: GameCompletionOptions) => {
      setProgressData((prev) => {
        const isNewGame = !prev.completedGameTypes.includes(gameType);

        const updates: Partial<GamesProgressData> = {};

        // Track unique games played
        if (isNewGame) {
          updates.completedGameTypes = [...prev.completedGameTypes, gameType];
        }

        // Track total games completed
        updates.totalGamesCompleted = (prev.totalGamesCompleted || 0) + 1;

        // Track game-specific achievements
        switch (gameType) {
          case 'memory-match-game':
            // Count wins (any completion is a win)
            updates.memoryWins = (prev.memoryWins || 0) + 1;
            break;

          case 'simon-game':
            // Track highest level (score = sequence length)
            if (score > (prev.simonHighScore || 0)) {
              updates.simonHighScore = score;
            }
            break;

          case 'speed-challenge':
            // Track high accuracy completions
            if (options?.isHighAccuracy) {
              updates.speedChallengeHighScores = (prev.speedChallengeHighScores || 0) + 1;
            }
            break;

          case 'word-builder':
            // Count completions
            updates.wordBuilderCompletions = (prev.wordBuilderCompletions || 0) + 1;
            break;

          case 'sound-matching':
            // Track perfect scores
            if (options?.isPerfectScore) {
              updates.soundMatchingPerfect = (prev.soundMatchingPerfect || 0) + 1;
            }
            break;

          case 'counting-game':
            // Count completions
            updates.countingGameCompletions = (prev.countingGameCompletions || 0) + 1;
            break;
        }

        // Only update if there are changes
        if (Object.keys(updates).length === 0) {
          return prev;
        }

        return {
          ...prev,
          ...updates,
          completedGameTypes: updates.completedGameTypes || prev.completedGameTypes,
        };
      });
    },
    []
  );

  const clearStorageError = useCallback(() => {
    setStorageError(null);
  }, []);

  const uniqueGamesPlayed = progressData.completedGameTypes.length;
  const hasPlayedAllGames = uniqueGamesPlayed >= TOTAL_GAME_TYPES;

  return {
    recordGameCompleted,
    hasPlayedGame,
    completedGameTypes,
    uniqueGamesPlayed,
    totalGameTypes: TOTAL_GAME_TYPES,
    hasPlayedAllGames,
    memoryWins: progressData.memoryWins || 0,
    simonHighScore: progressData.simonHighScore || 0,
    speedChallengeHighScores: progressData.speedChallengeHighScores || 0,
    wordBuilderCompletions: progressData.wordBuilderCompletions || 0,
    soundMatchingPerfect: progressData.soundMatchingPerfect || 0,
    countingGameCompletions: progressData.countingGameCompletions || 0,
    totalGamesCompleted: progressData.totalGamesCompleted || 0,
    storageError,
    clearStorageError,
  };
}

export default useGamesProgress;
