'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import numbers from '@/data/numbers';

export interface NumbersProgressData {
  heardNumberIds: string[];
  totalClicks: number; // Total number clicks/listens for practice milestones
}

const STORAGE_KEY = 'lepdy_numbers_progress';
const TOTAL_NUMBERS = numbers.length; // 10 numbers

function getDefaultNumbersProgressData(): NumbersProgressData {
  return {
    heardNumberIds: [],
    totalClicks: 0,
  };
}

function loadNumbersProgressData(): NumbersProgressData {
  if (typeof window === 'undefined') {
    return getDefaultNumbersProgressData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load numbers progress data:', error);
  }
  return getDefaultNumbersProgressData();
}

function saveNumbersProgressData(data: NumbersProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save numbers progress data:', error);
  }
}

export interface UseNumbersProgressReturn {
  numbersProgressData: NumbersProgressData;
  recordNumberHeard: (numberId: string) => void;
  hasHeardNumber: (numberId: string) => boolean;
  heardNumberIds: Set<string>;
  totalHeard: number;
  totalClicks: number; // Total clicks for practice milestones
  totalNumbers: number;
  hasHeardAll: boolean;
}

export function useNumbersProgress(): UseNumbersProgressReturn {
  const [numbersProgressData, setNumbersProgressData] = useState<NumbersProgressData>(
    getDefaultNumbersProgressData
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data on mount
  useEffect(() => {
    const data = loadNumbersProgressData();
    setNumbersProgressData(data);
    setIsInitialized(true);
  }, []);

  // Save whenever data changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveNumbersProgressData(numbersProgressData);
    }
  }, [numbersProgressData, isInitialized]);

  // Memoized Set for O(1) lookup
  const heardNumberIds = useMemo(() => {
    return new Set(numbersProgressData.heardNumberIds);
  }, [numbersProgressData.heardNumberIds]);

  const hasHeardNumber = useCallback(
    (numberId: string): boolean => heardNumberIds.has(numberId),
    [heardNumberIds]
  );

  const recordNumberHeard = useCallback((numberId: string) => {
    setNumbersProgressData((prev) => {
      const isNewNumber = !prev.heardNumberIds.includes(numberId);
      return {
        ...prev,
        // Add to unique numbers if new
        heardNumberIds: isNewNumber
          ? [...prev.heardNumberIds, numberId]
          : prev.heardNumberIds,
        // Always increment total clicks for practice milestones
        totalClicks: (prev.totalClicks || 0) + 1,
      };
    });
  }, []);

  const totalHeard = numbersProgressData.heardNumberIds.length;
  const totalClicks = numbersProgressData.totalClicks || 0;
  const hasHeardAll = totalHeard >= TOTAL_NUMBERS;

  return {
    numbersProgressData,
    recordNumberHeard,
    hasHeardNumber,
    heardNumberIds,
    totalHeard,
    totalClicks,
    totalNumbers: TOTAL_NUMBERS,
    hasHeardAll,
  };
}

export default useNumbersProgress;
