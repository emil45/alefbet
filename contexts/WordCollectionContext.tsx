'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useWordCollectionProgress, UseWordCollectionReturn } from '@/hooks/useWordCollectionProgress';

const WordCollectionContext = createContext<UseWordCollectionReturn | null>(null);

interface WordCollectionProviderProps {
  children: ReactNode;
}

export function WordCollectionProvider({ children }: WordCollectionProviderProps) {
  const wordCollectionValue = useWordCollectionProgress();

  return (
    <WordCollectionContext.Provider value={wordCollectionValue}>
      {children}
    </WordCollectionContext.Provider>
  );
}

export function useWordCollectionContext(): UseWordCollectionReturn {
  const context = useContext(WordCollectionContext);
  if (!context) {
    throw new Error('useWordCollectionContext must be used within a WordCollectionProvider');
  }
  return context;
}

export default WordCollectionContext;
