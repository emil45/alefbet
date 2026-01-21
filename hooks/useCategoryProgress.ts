'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Generic category progress data structure.
 * Tracks unique items heard (discovery) and total clicks (practice).
 */
export interface CategoryProgressData {
  heardItemIds: string[];
  totalClicks: number;
}

/**
 * Storage error types for debugging and potential UI feedback.
 */
export type StorageErrorType = 'load_failed' | 'save_failed' | null;

/**
 * Configuration for useCategoryProgress hook.
 */
export interface CategoryProgressConfig {
  /** localStorage key for this category */
  storageKey: string;
  /** Total number of items in this category (for "heard all" calculation) */
  totalItems: number;
  /** Category name for error logging */
  categoryName: string;
}

/**
 * Return type for useCategoryProgress hook.
 */
export interface UseCategoryProgressReturn {
  /** Record that an item was heard/clicked */
  recordItemHeard: (itemId: string) => void;
  /** Check if a specific item has been heard */
  hasHeardItem: (itemId: string) => boolean;
  /** Set of all heard item IDs (for O(1) lookup) */
  heardItemIds: Set<string>;
  /** Count of unique items heard */
  totalHeard: number;
  /** Total clicks/listens across all items */
  totalClicks: number;
  /** Total items in this category */
  totalItems: number;
  /** Whether all items have been heard at least once */
  hasHeardAll: boolean;
  /** Current storage error, if any. UI can use this to show a gentle indicator. */
  storageError: StorageErrorType;
  /** Clear the storage error (e.g., after showing a message) */
  clearStorageError: () => void;
}

function getDefaultProgressData(): CategoryProgressData {
  return {
    heardItemIds: [],
    totalClicks: 0,
  };
}

/**
 * Legacy key names used in older versions of category-specific hooks.
 * Maps old field names to the generic 'heardItemIds' field.
 */
const LEGACY_ID_KEYS = ['heardLetterIds', 'heardNumberIds', 'heardAnimalIds'];

/**
 * Migrate legacy data format to the new generic format.
 * Handles data stored with category-specific field names (e.g., heardLetterIds).
 */
function migrateData(parsed: Record<string, unknown>): CategoryProgressData | null {
  // Check for new format first
  if (Array.isArray(parsed.heardItemIds) && typeof parsed.totalClicks === 'number') {
    return parsed as unknown as CategoryProgressData;
  }

  // Check for legacy formats (heardLetterIds, heardNumberIds, heardAnimalIds)
  for (const legacyKey of LEGACY_ID_KEYS) {
    if (Array.isArray(parsed[legacyKey])) {
      return {
        heardItemIds: parsed[legacyKey] as string[],
        totalClicks: typeof parsed.totalClicks === 'number' ? parsed.totalClicks : 0,
      };
    }
  }

  return null;
}

/**
 * Safely load progress data from localStorage.
 * Returns default data if localStorage is unavailable or data is corrupted.
 * Handles migration from legacy category-specific formats.
 */
function loadProgressData(
  storageKey: string,
  categoryName: string
): { data: CategoryProgressData; error: boolean } {
  if (typeof window === 'undefined') {
    return { data: getDefaultProgressData(), error: false };
  }

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      const migrated = migrateData(parsed);
      if (migrated) {
        return { data: migrated, error: false };
      }
      // Data exists but is malformed - log and return defaults
      console.warn(
        `[${categoryName}] Progress data malformed, resetting to defaults:`,
        parsed
      );
      return { data: getDefaultProgressData(), error: true };
    }
    // No data yet - not an error
    return { data: getDefaultProgressData(), error: false };
  } catch (error) {
    // Log with context for debugging
    const errorType =
      error instanceof SyntaxError
        ? 'JSON parse error'
        : error instanceof DOMException
          ? `Storage error: ${error.name}`
          : 'Unknown error';
    console.error(`[${categoryName}] Failed to load progress (${errorType}):`, error);
    return { data: getDefaultProgressData(), error: true };
  }
}

/**
 * Safely save progress data to localStorage.
 * Returns success status for error tracking.
 */
function saveProgressData(
  storageKey: string,
  categoryName: string,
  data: CategoryProgressData
): boolean {
  if (typeof window === 'undefined') {
    return true; // SSR - no error
  }

  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
  } catch (error) {
    // Identify specific error types for better debugging
    if (error instanceof DOMException) {
      if (error.name === 'QuotaExceededError') {
        console.error(
          `[${categoryName}] Storage quota exceeded. Consider clearing old data.`
        );
      } else if (error.name === 'SecurityError') {
        console.error(
          `[${categoryName}] Storage access denied (private browsing or security settings).`
        );
      } else {
        console.error(`[${categoryName}] Storage error (${error.name}):`, error);
      }
    } else {
      console.error(`[${categoryName}] Failed to save progress:`, error);
    }
    return false;
  }
}

/**
 * Generic hook for tracking category progress (discovery + practice).
 * Used by letters, numbers, animals, and future category progress hooks.
 *
 * Features:
 * - Tracks unique items heard (discovery milestones)
 * - Tracks total clicks (practice milestones)
 * - Persists to localStorage with proper error handling
 * - Exposes storage error state for optional UI feedback
 */
export function useCategoryProgress(config: CategoryProgressConfig): UseCategoryProgressReturn {
  const { storageKey, totalItems, categoryName } = config;

  const [progressData, setProgressData] = useState<CategoryProgressData>(getDefaultProgressData);
  const [isInitialized, setIsInitialized] = useState(false);
  const [storageError, setStorageError] = useState<StorageErrorType>(null);

  // Load data on mount
  useEffect(() => {
    const { data, error } = loadProgressData(storageKey, categoryName);
    setProgressData(data);
    setStorageError(error ? 'load_failed' : null);
    setIsInitialized(true);
  }, [storageKey, categoryName]);

  // Save whenever data changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      const success = saveProgressData(storageKey, categoryName, progressData);
      if (!success) {
        setStorageError('save_failed');
      } else if (storageError === 'save_failed') {
        // Clear save error if save succeeds (recovery)
        setStorageError(null);
      }
    }
  }, [progressData, isInitialized, storageKey, categoryName, storageError]);

  // Memoized Set for O(1) lookup
  const heardItemIds = useMemo(() => {
    return new Set(progressData.heardItemIds);
  }, [progressData.heardItemIds]);

  const hasHeardItem = useCallback(
    (itemId: string): boolean => heardItemIds.has(itemId),
    [heardItemIds]
  );

  const recordItemHeard = useCallback((itemId: string) => {
    setProgressData((prev) => {
      const isNewItem = !prev.heardItemIds.includes(itemId);
      return {
        ...prev,
        heardItemIds: isNewItem ? [...prev.heardItemIds, itemId] : prev.heardItemIds,
        totalClicks: (prev.totalClicks || 0) + 1,
      };
    });
  }, []);

  const clearStorageError = useCallback(() => {
    setStorageError(null);
  }, []);

  const totalHeard = progressData.heardItemIds.length;
  const totalClicks = progressData.totalClicks || 0;
  const hasHeardAll = totalHeard >= totalItems;

  return {
    recordItemHeard,
    hasHeardItem,
    heardItemIds,
    totalHeard,
    totalClicks,
    totalItems,
    hasHeardAll,
    storageError,
    clearStorageError,
  };
}

export default useCategoryProgress;
