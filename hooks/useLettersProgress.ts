'use client';

import { useCallback } from 'react';
import letters from '@/data/letters';
import { useCategoryProgress, StorageErrorType } from './useCategoryProgress';

const STORAGE_KEY = 'lepdy_letters_progress';
const TOTAL_LETTERS = letters.length; // 22 Hebrew letters

/**
 * @deprecated Use the generic fields from useCategoryProgress instead.
 * Kept for backward compatibility with existing code.
 */
export interface LettersProgressData {
  heardLetterIds: string[];
  totalClicks: number;
}

export interface UseLettersProgressReturn {
  /** @deprecated Use recordItemHeard from useCategoryProgress */
  lettersProgressData: LettersProgressData;
  recordLetterHeard: (letterId: string) => void;
  hasHeardLetter: (letterId: string) => boolean;
  heardLetterIds: Set<string>;
  totalHeard: number;
  totalClicks: number;
  totalLetters: number;
  hasHeardAll: boolean;
  /** Storage error state - UI can show gentle feedback if needed */
  storageError: StorageErrorType;
  clearStorageError: () => void;
}

/**
 * Hook for tracking letters progress (discovery + practice).
 * Wraps the generic useCategoryProgress with letters-specific naming.
 */
export function useLettersProgress(): UseLettersProgressReturn {
  const {
    recordItemHeard,
    hasHeardItem,
    heardItemIds,
    totalHeard,
    totalClicks,
    totalItems,
    hasHeardAll,
    storageError,
    clearStorageError,
  } = useCategoryProgress({
    storageKey: STORAGE_KEY,
    totalItems: TOTAL_LETTERS,
    categoryName: 'letters',
  });

  // Map to letters-specific naming for backward compatibility
  const recordLetterHeard = useCallback(
    (letterId: string) => recordItemHeard(letterId),
    [recordItemHeard]
  );

  const hasHeardLetter = useCallback(
    (letterId: string) => hasHeardItem(letterId),
    [hasHeardItem]
  );

  // Create legacy data structure for backward compatibility
  const lettersProgressData: LettersProgressData = {
    heardLetterIds: Array.from(heardItemIds),
    totalClicks,
  };

  return {
    lettersProgressData,
    recordLetterHeard,
    hasHeardLetter,
    heardLetterIds: heardItemIds,
    totalHeard,
    totalClicks,
    totalLetters: totalItems,
    hasHeardAll,
    storageError,
    clearStorageError,
  };
}

export default useLettersProgress;
