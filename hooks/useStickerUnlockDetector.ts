'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  STICKERS,
  StickerProgressValues,
  getUnlockedStickerIds,
} from '@/data/stickers';
import { useStickerContext } from '@/contexts/StickerContext';
import { useStreakContext } from '@/contexts/StreakContext';
import { useLettersProgressContext } from '@/contexts/LettersProgressContext';
import { useNumbersProgressContext } from '@/contexts/NumbersProgressContext';
import { useAnimalsProgressContext } from '@/contexts/AnimalsProgressContext';
import { useGamesProgressContext } from '@/contexts/GamesProgressContext';
import { useWordCollectionContext } from '@/contexts/WordCollectionContext';

/**
 * Gathers all progress values from contexts into a single object.
 * Memoized to prevent unnecessary recalculations.
 */
function useProgressValues(): StickerProgressValues {
  const { streakData } = useStreakContext();
  const { totalHeard: lettersHeard, totalClicks: lettersTotalClicks } =
    useLettersProgressContext();
  const { totalHeard: numbersHeard, totalClicks: numbersTotalClicks } =
    useNumbersProgressContext();
  const { totalHeard: animalsHeard, totalClicks: animalsTotalClicks } =
    useAnimalsProgressContext();
  const {
    uniqueGamesPlayed,
    memoryWins,
    simonHighScore,
    speedChallengeHighScores,
    wordBuilderCompletions,
    soundMatchingPerfect,
    countingGameCompletions,
    totalGamesCompleted,
  } = useGamesProgressContext();
  const { uniqueWordsCollected } = useWordCollectionContext();

  return useMemo(
    () => ({
      currentStreak: streakData.currentStreak,
      lettersHeard,
      lettersTotalClicks,
      numbersHeard,
      numbersTotalClicks,
      animalsHeard,
      animalsTotalClicks,
      uniqueGamesPlayed,
      memoryWins,
      simonHighScore,
      speedChallengeHighScores,
      wordBuilderCompletions,
      soundMatchingPerfect,
      countingGameCompletions,
      totalGamesCompleted,
      uniqueWordsCollected,
    }),
    [
      streakData.currentStreak,
      lettersHeard,
      lettersTotalClicks,
      numbersHeard,
      numbersTotalClicks,
      animalsHeard,
      animalsTotalClicks,
      uniqueGamesPlayed,
      memoryWins,
      simonHighScore,
      speedChallengeHighScores,
      wordBuilderCompletions,
      soundMatchingPerfect,
      countingGameCompletions,
      totalGamesCompleted,
      uniqueWordsCollected,
    ]
  );
}

/**
 * Hook that automatically detects when stickers become unlocked
 * and triggers earnSticker to award them + show toast notification.
 *
 * Should be used once at the app level (in providers).
 */
export function useStickerUnlockDetector(): void {
  const t = useTranslations();
  const { hasSticker, earnSticker } = useStickerContext();
  const progress = useProgressValues();

  // Track stickers that were unlocked at mount time (to avoid toasting them)
  const initialUnlockedRef = useRef<Set<string> | null>(null);
  // Track which stickers we've already processed to avoid duplicate toasts
  const processedRef = useRef<Set<string>>(new Set());

  // Get currently unlocked sticker IDs
  const currentlyUnlocked = useMemo(
    () => getUnlockedStickerIds(progress),
    [progress]
  );

  useEffect(() => {
    // First render: capture initial state, don't toast anything
    if (initialUnlockedRef.current === null) {
      initialUnlockedRef.current = new Set(currentlyUnlocked);
      // Also mark already-earned stickers as processed
      STICKERS.forEach((s) => {
        if (hasSticker(s.id)) {
          processedRef.current.add(s.id);
        }
      });
      return;
    }

    // Find stickers that are:
    // 1. Currently unlocked
    // 2. Not already earned
    // 3. Not in our initial set (i.e., newly unlocked this session)
    // 4. Not already processed
    const newlyUnlocked = STICKERS.filter((sticker) => {
      if (!currentlyUnlocked.has(sticker.id)) return false;
      if (hasSticker(sticker.id)) return false;
      if (initialUnlockedRef.current?.has(sticker.id)) return false;
      if (processedRef.current.has(sticker.id)) return false;
      return true;
    });

    // Award each newly unlocked sticker
    for (const sticker of newlyUnlocked) {
      processedRef.current.add(sticker.id);

      let name: string;
      try {
        name = t(sticker.translationKey);
      } catch (error) {
        console.warn(
          `[useStickerUnlockDetector] Translation failed for "${sticker.translationKey}". Using sticker ID.`,
          error
        );
        name = sticker.id;
      }

      earnSticker(sticker.id, name, sticker.pageNumber);
    }
  }, [currentlyUnlocked, hasSticker, earnSticker, t]);
}
