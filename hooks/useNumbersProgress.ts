'use client';

import { useCallback } from 'react';
import numbers from '@/data/numbers';
import { useCategoryProgress, StorageErrorType } from './useCategoryProgress';

const STORAGE_KEY = 'lepdy_numbers_progress';
const TOTAL_NUMBERS = numbers.length; // 10 numbers

/**
 * @deprecated Use the generic fields from useCategoryProgress instead.
 * Kept for backward compatibility with existing code.
 */
export interface NumbersProgressData {
  heardNumberIds: string[];
  totalClicks: number;
}

export interface UseNumbersProgressReturn {
  /** @deprecated Use generic progress data instead */
  numbersProgressData: NumbersProgressData;
  recordNumberHeard: (numberId: string) => void;
  hasHeardNumber: (numberId: string) => boolean;
  heardNumberIds: Set<string>;
  totalHeard: number;
  totalClicks: number;
  totalNumbers: number;
  hasHeardAll: boolean;
  /** Storage error state - UI can show gentle feedback if needed */
  storageError: StorageErrorType;
  clearStorageError: () => void;
}

/**
 * Hook for tracking numbers progress (discovery + practice).
 * Wraps the generic useCategoryProgress with numbers-specific naming.
 */
export function useNumbersProgress(): UseNumbersProgressReturn {
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
    totalItems: TOTAL_NUMBERS,
    categoryName: 'numbers',
  });

  // Map to numbers-specific naming for backward compatibility
  const recordNumberHeard = useCallback(
    (numberId: string) => recordItemHeard(numberId),
    [recordItemHeard]
  );

  const hasHeardNumber = useCallback(
    (numberId: string) => hasHeardItem(numberId),
    [hasHeardItem]
  );

  // Create legacy data structure for backward compatibility
  const numbersProgressData: NumbersProgressData = {
    heardNumberIds: Array.from(heardItemIds),
    totalClicks,
  };

  return {
    numbersProgressData,
    recordNumberHeard,
    hasHeardNumber,
    heardNumberIds: heardItemIds,
    totalHeard,
    totalClicks,
    totalNumbers: totalItems,
    hasHeardAll,
    storageError,
    clearStorageError,
  };
}

export default useNumbersProgress;
