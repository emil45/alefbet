'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import letters from '@/data/letters';

export interface LettersProgressData {
  heardLetterIds: string[];
}

const STORAGE_KEY = 'lepdy_letters_progress';
const TOTAL_LETTERS = letters.length; // 22 Hebrew letters

function getDefaultLettersProgressData(): LettersProgressData {
  return {
    heardLetterIds: [],
  };
}

function loadLettersProgressData(): LettersProgressData {
  if (typeof window === 'undefined') {
    return getDefaultLettersProgressData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load letters progress data:', error);
  }
  return getDefaultLettersProgressData();
}

function saveLettersProgressData(data: LettersProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save letters progress data:', error);
  }
}

export interface UseLettersProgressReturn {
  lettersProgressData: LettersProgressData;
  recordLetterHeard: (letterId: string) => void;
  hasHeardLetter: (letterId: string) => boolean;
  heardLetterIds: Set<string>;
  totalHeard: number;
  totalLetters: number;
  hasHeardAll: boolean;
}

export function useLettersProgress(): UseLettersProgressReturn {
  const [lettersProgressData, setLettersProgressData] = useState<LettersProgressData>(
    getDefaultLettersProgressData
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data on mount
  useEffect(() => {
    const data = loadLettersProgressData();
    setLettersProgressData(data);
    setIsInitialized(true);
  }, []);

  // Save whenever data changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveLettersProgressData(lettersProgressData);
    }
  }, [lettersProgressData, isInitialized]);

  // Memoized Set for O(1) lookup
  const heardLetterIds = useMemo(() => {
    return new Set(lettersProgressData.heardLetterIds);
  }, [lettersProgressData.heardLetterIds]);

  const hasHeardLetter = useCallback(
    (letterId: string): boolean => heardLetterIds.has(letterId),
    [heardLetterIds]
  );

  const recordLetterHeard = useCallback((letterId: string) => {
    setLettersProgressData((prev) => {
      // Check inside updater for most recent state to avoid race conditions
      if (prev.heardLetterIds.includes(letterId)) {
        return prev;
      }
      return {
        ...prev,
        heardLetterIds: [...prev.heardLetterIds, letterId],
      };
    });
  }, []);

  const totalHeard = lettersProgressData.heardLetterIds.length;
  const hasHeardAll = totalHeard >= TOTAL_LETTERS;

  return {
    lettersProgressData,
    recordLetterHeard,
    hasHeardLetter,
    heardLetterIds,
    totalHeard,
    totalLetters: TOTAL_LETTERS,
    hasHeardAll,
  };
}

export default useLettersProgress;
