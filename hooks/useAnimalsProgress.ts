'use client';

import { useCallback } from 'react';
import animals from '@/data/animals';
import { useCategoryProgress, StorageErrorType } from './useCategoryProgress';

const STORAGE_KEY = 'lepdy_animals_progress';
const TOTAL_ANIMALS = animals.length; // 19 animals

/**
 * @deprecated Use the generic fields from useCategoryProgress instead.
 * Kept for backward compatibility with existing code.
 */
export interface AnimalsProgressData {
  heardAnimalIds: string[];
  totalClicks: number;
}

export interface UseAnimalsProgressReturn {
  /** @deprecated Use generic progress data instead */
  animalsProgressData: AnimalsProgressData;
  recordAnimalHeard: (animalId: string) => void;
  hasHeardAnimal: (animalId: string) => boolean;
  heardAnimalIds: Set<string>;
  totalHeard: number;
  totalClicks: number;
  totalAnimals: number;
  hasHeardAll: boolean;
  /** Storage error state - UI can show gentle feedback if needed */
  storageError: StorageErrorType;
  clearStorageError: () => void;
}

/**
 * Hook for tracking animals progress (discovery + practice).
 * Wraps the generic useCategoryProgress with animals-specific naming.
 */
export function useAnimalsProgress(): UseAnimalsProgressReturn {
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
    totalItems: TOTAL_ANIMALS,
    categoryName: 'animals',
  });

  // Map to animals-specific naming for backward compatibility
  const recordAnimalHeard = useCallback(
    (animalId: string) => recordItemHeard(animalId),
    [recordItemHeard]
  );

  const hasHeardAnimal = useCallback(
    (animalId: string) => hasHeardItem(animalId),
    [hasHeardItem]
  );

  // Create legacy data structure for backward compatibility
  const animalsProgressData: AnimalsProgressData = {
    heardAnimalIds: Array.from(heardItemIds),
    totalClicks,
  };

  return {
    animalsProgressData,
    recordAnimalHeard,
    hasHeardAnimal,
    heardAnimalIds: heardItemIds,
    totalHeard,
    totalClicks,
    totalAnimals: totalItems,
    hasHeardAll,
    storageError,
    clearStorageError,
  };
}

export default useAnimalsProgress;
