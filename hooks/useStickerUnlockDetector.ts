'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  STICKERS,
  StickerProgressValues,
  getUnlockedStickerIds,
} from '@/data/stickers';
import { useStickerContext } from '@/contexts/StickerContext';
import { useStickerToastContext } from '@/contexts/StickerToastContext';
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
 * Hook that detects when stickers become unlocked and shows a toast notification.
 * Does NOT auto-earn the sticker - kids enjoy peeling them in the sticker album!
 *
 * Should be used once at the app level (in providers).
 */
export function useStickerUnlockDetector(): void {
  const t = useTranslations();
  const { hasSticker } = useStickerContext();
  const { showStickerToast } = useStickerToastContext();
  const progress = useProgressValues();

  // Track stickers that were unlocked at mount time (to avoid toasting them)
  const initialUnlockedRef = useRef<Set<string> | null>(null);
  // Track which stickers we've already notified about to avoid duplicate toasts
  const notifiedRef = useRef<Set<string>>(new Set());

  // Get currently unlocked sticker IDs
  const currentlyUnlocked = useMemo(
    () => getUnlockedStickerIds(progress),
    [progress]
  );

  useEffect(() => {
    // First render: capture initial state, don't toast anything
    if (initialUnlockedRef.current === null) {
      initialUnlockedRef.current = new Set(currentlyUnlocked);
      // Also mark already-earned stickers as notified
      STICKERS.forEach((s) => {
        if (hasSticker(s.id)) {
          notifiedRef.current.add(s.id);
        }
      });
      return;
    }

    // Find stickers that are:
    // 1. Currently unlocked (meets requirements)
    // 2. Not already earned (still peelable)
    // 3. Not in our initial set (i.e., newly unlocked this session)
    // 4. Not already notified
    const newlyUnlocked = STICKERS.filter((sticker) => {
      if (!currentlyUnlocked.has(sticker.id)) return false;
      if (hasSticker(sticker.id)) return false;
      if (initialUnlockedRef.current?.has(sticker.id)) return false;
      if (notifiedRef.current.has(sticker.id)) return false;
      return true;
    });

    // Show toast for each newly unlocked sticker (but don't earn it)
    for (const sticker of newlyUnlocked) {
      notifiedRef.current.add(sticker.id);

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

      // Just show the toast - let kids peel the sticker themselves!
      showStickerToast({
        emoji: sticker.emoji,
        name,
        pageNumber: sticker.pageNumber,
      });
    }
  }, [currentlyUnlocked, hasSticker, showStickerToast, t]);
}
