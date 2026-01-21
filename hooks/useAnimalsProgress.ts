'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import animals from '@/data/animals';

export interface AnimalsProgressData {
  heardAnimalIds: string[];
  totalClicks: number; // Total animal clicks/listens for practice milestones
}

const STORAGE_KEY = 'lepdy_animals_progress';
const TOTAL_ANIMALS = animals.length; // 19 animals

function getDefaultAnimalsProgressData(): AnimalsProgressData {
  return {
    heardAnimalIds: [],
    totalClicks: 0,
  };
}

function loadAnimalsProgressData(): AnimalsProgressData {
  if (typeof window === 'undefined') {
    return getDefaultAnimalsProgressData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load animals progress data:', error);
  }
  return getDefaultAnimalsProgressData();
}

function saveAnimalsProgressData(data: AnimalsProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save animals progress data:', error);
  }
}

export interface UseAnimalsProgressReturn {
  animalsProgressData: AnimalsProgressData;
  recordAnimalHeard: (animalId: string) => void;
  hasHeardAnimal: (animalId: string) => boolean;
  heardAnimalIds: Set<string>;
  totalHeard: number;
  totalClicks: number; // Total clicks for practice milestones
  totalAnimals: number;
  hasHeardAll: boolean;
}

export function useAnimalsProgress(): UseAnimalsProgressReturn {
  const [animalsProgressData, setAnimalsProgressData] = useState<AnimalsProgressData>(
    getDefaultAnimalsProgressData
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data on mount
  useEffect(() => {
    const data = loadAnimalsProgressData();
    setAnimalsProgressData(data);
    setIsInitialized(true);
  }, []);

  // Save whenever data changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveAnimalsProgressData(animalsProgressData);
    }
  }, [animalsProgressData, isInitialized]);

  // Memoized Set for O(1) lookup
  const heardAnimalIds = useMemo(() => {
    return new Set(animalsProgressData.heardAnimalIds);
  }, [animalsProgressData.heardAnimalIds]);

  const hasHeardAnimal = useCallback(
    (animalId: string): boolean => heardAnimalIds.has(animalId),
    [heardAnimalIds]
  );

  const recordAnimalHeard = useCallback((animalId: string) => {
    setAnimalsProgressData((prev) => {
      const isNewAnimal = !prev.heardAnimalIds.includes(animalId);
      return {
        ...prev,
        // Add to unique animals if new
        heardAnimalIds: isNewAnimal
          ? [...prev.heardAnimalIds, animalId]
          : prev.heardAnimalIds,
        // Always increment total clicks for practice milestones
        totalClicks: (prev.totalClicks || 0) + 1,
      };
    });
  }, []);

  const totalHeard = animalsProgressData.heardAnimalIds.length;
  const totalClicks = animalsProgressData.totalClicks || 0;
  const hasHeardAll = totalHeard >= TOTAL_ANIMALS;

  return {
    animalsProgressData,
    recordAnimalHeard,
    hasHeardAnimal,
    heardAnimalIds,
    totalHeard,
    totalClicks,
    totalAnimals: TOTAL_ANIMALS,
    hasHeardAll,
  };
}

export default useAnimalsProgress;
