'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLettersProgress, UseLettersProgressReturn } from '@/hooks/useLettersProgress';

const LettersProgressContext = createContext<UseLettersProgressReturn | null>(null);

interface LettersProgressProviderProps {
  children: ReactNode;
}

export function LettersProgressProvider({ children }: LettersProgressProviderProps) {
  const lettersProgressValue = useLettersProgress();

  return (
    <LettersProgressContext.Provider value={lettersProgressValue}>
      {children}
    </LettersProgressContext.Provider>
  );
}

export function useLettersProgressContext(): UseLettersProgressReturn {
  const context = useContext(LettersProgressContext);
  if (!context) {
    throw new Error('useLettersProgressContext must be used within a LettersProgressProvider');
  }
  return context;
}

export default LettersProgressContext;
