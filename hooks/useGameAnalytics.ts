'use client';

import { useCallback, useRef } from 'react';
import { useLocale } from 'next-intl';
import { logEvent } from '@/utils/amplitude';
import { AmplitudeEventsEnum, GameType, LocaleType, CategoryType } from '@/models/amplitudeEvents';

interface UseGameAnalyticsOptions {
  gameType: GameType;
  category?: CategoryType;
}

export function useGameAnalytics({ gameType, category }: UseGameAnalyticsOptions) {
  const locale = useLocale() as LocaleType;
  const startTimeRef = useRef<number | null>(null);

  const trackGameStarted = useCallback(() => {
    startTimeRef.current = Date.now();
    logEvent(AmplitudeEventsEnum.GAME_STARTED, {
      game_type: gameType,
      locale,
      category,
    });
  }, [gameType, locale, category]);

  const trackGameCompleted = useCallback(
    (score: number, level?: number) => {
      const durationSeconds = startTimeRef.current
        ? Math.round((Date.now() - startTimeRef.current) / 1000)
        : 0;

      logEvent(AmplitudeEventsEnum.GAME_COMPLETED, {
        game_type: gameType,
        locale,
        score,
        duration_seconds: durationSeconds,
        category,
        level,
      });

      // Reset start time
      startTimeRef.current = null;
    },
    [gameType, locale, category]
  );

  return {
    trackGameStarted,
    trackGameCompleted,
  };
}
