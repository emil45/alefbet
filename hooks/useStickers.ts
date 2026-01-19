'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { logEvent } from '@/utils/amplitude';
import { AmplitudeEventsEnum } from '@/models/amplitudeEvents';
import { useCelebration } from '@/hooks/useCelebration';

export interface StickerData {
  earnedStickerIds: string[];
}

const STORAGE_KEY = 'lepdy_sticker_data';

function getDefaultStickerData(): StickerData {
  return {
    earnedStickerIds: [],
  };
}

function loadStickerData(): StickerData {
  if (typeof window === 'undefined') {
    return getDefaultStickerData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load sticker data:', error);
  }
  return getDefaultStickerData();
}

function saveStickerData(data: StickerData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save sticker data:', error);
  }
}

export interface UseStickersReturn {
  stickerData: StickerData;
  hasSticker: (stickerId: string) => boolean;
  earnSticker: (stickerId: string, stickerName: string, pageNumber: number) => void;
  totalEarned: number;
  earnedStickerIds: Set<string>;
}

export function useStickers(): UseStickersReturn {
  const [stickerData, setStickerData] = useState<StickerData>(getDefaultStickerData);
  const [isInitialized, setIsInitialized] = useState(false);
  const { celebrate } = useCelebration();

  // Load sticker data on mount
  useEffect(() => {
    const data = loadStickerData();
    setStickerData(data);
    setIsInitialized(true);
  }, []);

  // Save whenever stickerData changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveStickerData(stickerData);
    }
  }, [stickerData, isInitialized]);

  // Memoized Set for O(1) lookup
  const earnedStickerIds = useMemo(() => {
    return new Set(stickerData.earnedStickerIds);
  }, [stickerData.earnedStickerIds]);

  const hasSticker = useCallback(
    (stickerId: string): boolean => {
      return earnedStickerIds.has(stickerId);
    },
    [earnedStickerIds]
  );

  const earnSticker = useCallback(
    (stickerId: string, stickerName: string, pageNumber: number) => {
      // Don't award if already earned
      if (earnedStickerIds.has(stickerId)) {
        return;
      }

      setStickerData((prev) => {
        const newEarnedIds = [...prev.earnedStickerIds, stickerId];
        return {
          ...prev,
          earnedStickerIds: newEarnedIds,
        };
      });

      // Trigger celebration
      celebrate('stickerUnlock');

      // Log amplitude event
      logEvent(AmplitudeEventsEnum.STICKER_EARNED, {
        sticker_id: stickerId,
        sticker_name: stickerName,
        page_number: pageNumber,
        total_stickers: earnedStickerIds.size + 1,
      });
    },
    [earnedStickerIds, celebrate]
  );

  const totalEarned = stickerData.earnedStickerIds.length;

  return {
    stickerData,
    hasSticker,
    earnSticker,
    totalEarned,
    earnedStickerIds,
  };
}

export default useStickers;
