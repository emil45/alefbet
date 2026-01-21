'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useNumbersProgress, UseNumbersProgressReturn } from '@/hooks/useNumbersProgress';

const NumbersProgressContext = createContext<UseNumbersProgressReturn | null>(null);

interface NumbersProgressProviderProps {
  children: ReactNode;
}

export function NumbersProgressProvider({ children }: NumbersProgressProviderProps) {
  const numbersProgressValue = useNumbersProgress();

  return (
    <NumbersProgressContext.Provider value={numbersProgressValue}>
      {children}
    </NumbersProgressContext.Provider>
  );
}

export function useNumbersProgressContext(): UseNumbersProgressReturn {
  const context = useContext(NumbersProgressContext);
  if (!context) {
    throw new Error('useNumbersProgressContext must be used within a NumbersProgressProvider');
  }
  return context;
}

export default NumbersProgressContext;
