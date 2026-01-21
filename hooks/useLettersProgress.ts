'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import letters from '@/data/letters';

export interface LettersProgressData {
  heardLetterIds: string[];
  totalClicks: number; // Total letter clicks/listens for practice milestones
}

const STORAGE_KEY = 'lepdy_letters_progress';
const TOTAL_LETTERS = letters.length; // 22 Hebrew letters

function getDefaultLettersProgressData(): LettersProgressData {
  return {
    heardLetterIds: [],
    totalClicks: 0,
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
  totalClicks: number; // Total clicks for practice milestones
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
      const isNewLetter = !prev.heardLetterIds.includes(letterId);
      return {
        ...prev,
        // Add to unique letters if new
        heardLetterIds: isNewLetter
          ? [...prev.heardLetterIds, letterId]
          : prev.heardLetterIds,
        // Always increment total clicks for practice milestones
        totalClicks: (prev.totalClicks || 0) + 1,
      };
    });
  }, []);

  const totalHeard = lettersProgressData.heardLetterIds.length;
  const totalClicks = lettersProgressData.totalClicks || 0;
  const hasHeardAll = totalHeard >= TOTAL_LETTERS;

  return {
    lettersProgressData,
    recordLetterHeard,
    hasHeardLetter,
    heardLetterIds,
    totalHeard,
    totalClicks,
    totalLetters: TOTAL_LETTERS,
    hasHeardAll,
  };
}

export default useLettersProgress;
