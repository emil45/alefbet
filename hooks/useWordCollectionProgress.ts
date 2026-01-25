'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { HEBREW_WORDS, HebrewWord } from '@/data/hebrewWords';

export interface CollectedWord {
  wordId: string;
  timesBuilt: number;
  firstBuiltDate: string;
  lastBuiltDate: string;
}

interface WordCollectionData {
  collectedWords: CollectedWord[];
  totalWordsBuilt: number;
}

export interface UseWordCollectionReturn {
  recordWordBuilt: (word: HebrewWord) => void;
  collectedWords: CollectedWord[];
  collectedWordsWithData: (CollectedWord & { word: HebrewWord })[];
  uniqueWordsCollected: number;
  totalWordsBuilt: number;
  totalAvailableWords: number;
  getRecentlyCollected: (limit?: number) => (CollectedWord & { word: HebrewWord })[];
  getNewWords: () => (CollectedWord & { word: HebrewWord })[];
  getCollectedCountInCategory: (category: string) => number;
  availableCategories: string[];
  hasStorageError: boolean;
}

const STORAGE_KEY = 'lepdy_word_collection';

function getDefaultData(): WordCollectionData {
  return { collectedWords: [], totalWordsBuilt: 0 };
}

function getWordId(word: HebrewWord): string {
  return `${word.category}_${word.word}`;
}

function loadData(): { data: WordCollectionData; error: boolean } {
  if (typeof window === 'undefined') {
    return { data: getDefaultData(), error: false };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { data: getDefaultData(), error: false };
    }
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed.collectedWords)) {
      return {
        data: {
          collectedWords: parsed.collectedWords,
          totalWordsBuilt: parsed.totalWordsBuilt || 0,
        },
        error: false,
      };
    }
    console.warn('[word-collection] Data malformed, resetting');
    return { data: getDefaultData(), error: true };
  } catch (error) {
    console.error('[word-collection] Failed to load:', error);
    return { data: getDefaultData(), error: true };
  }
}

function saveData(data: WordCollectionData): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('[word-collection] Failed to save:', error);
    return false;
  }
}

export function useWordCollectionProgress(): UseWordCollectionReturn {
  const [data, setData] = useState<WordCollectionData>(getDefaultData);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasStorageError, setHasStorageError] = useState(false);

  useEffect(() => {
    const { data: loadedData, error } = loadData();
    setData(loadedData);
    setHasStorageError(error);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      const success = saveData(data);
      if (!success) {
        setHasStorageError(true);
      }
    }
  }, [data, isInitialized]);

  const hebrewWordsMap = useMemo(() => {
    const map = new Map<string, HebrewWord>();
    for (const word of HEBREW_WORDS) {
      map.set(getWordId(word), word);
    }
    return map;
  }, []);

  const availableCategories = useMemo(() => {
    return [...new Set(HEBREW_WORDS.map((w) => w.category))].sort();
  }, []);

  const recordWordBuilt = useCallback((word: HebrewWord) => {
    const wordId = getWordId(word);
    const now = new Date().toISOString();

    setData((prev) => {
      const existingIndex = prev.collectedWords.findIndex((w) => w.wordId === wordId);

      if (existingIndex >= 0) {
        // Update existing word
        const updated = [...prev.collectedWords];
        updated[existingIndex] = {
          ...updated[existingIndex],
          timesBuilt: updated[existingIndex].timesBuilt + 1,
          lastBuiltDate: now,
        };
        return {
          collectedWords: updated,
          totalWordsBuilt: prev.totalWordsBuilt + 1,
        };
      } else {
        // Add new word
        const newWord: CollectedWord = {
          wordId,
          timesBuilt: 1,
          firstBuiltDate: now,
          lastBuiltDate: now,
        };
        return {
          collectedWords: [...prev.collectedWords, newWord],
          totalWordsBuilt: prev.totalWordsBuilt + 1,
        };
      }
    });
  }, []);

  const collectedWordsWithData = useMemo(() => {
    return data.collectedWords
      .map((collected) => {
        const word = hebrewWordsMap.get(collected.wordId);
        if (!word) return null;
        return { ...collected, word };
      })
      .filter((item): item is CollectedWord & { word: HebrewWord } => item !== null);
  }, [data.collectedWords, hebrewWordsMap]);

  const getRecentlyCollected = useCallback(
    (limit = 10) => {
      return [...collectedWordsWithData]
        .sort((a, b) => new Date(b.lastBuiltDate).getTime() - new Date(a.lastBuiltDate).getTime())
        .slice(0, limit);
    },
    [collectedWordsWithData]
  );

  const getNewWords = useCallback(() => {
    return collectedWordsWithData.filter((w) => w.timesBuilt === 1);
  }, [collectedWordsWithData]);

  const getCollectedCountInCategory = useCallback(
    (category: string) => {
      return data.collectedWords.filter((w) => {
        const word = hebrewWordsMap.get(w.wordId);
        return word?.category === category;
      }).length;
    },
    [data.collectedWords, hebrewWordsMap]
  );

  return {
    recordWordBuilt,
    collectedWords: data.collectedWords,
    collectedWordsWithData,
    uniqueWordsCollected: data.collectedWords.length,
    totalWordsBuilt: data.totalWordsBuilt,
    totalAvailableWords: HEBREW_WORDS.length,
    getRecentlyCollected,
    getNewWords,
    getCollectedCountInCategory,
    availableCategories,
    hasStorageError,
  };
}

export { getWordId };
export default useWordCollectionProgress;
