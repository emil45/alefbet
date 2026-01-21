'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAnimalsProgress, UseAnimalsProgressReturn } from '@/hooks/useAnimalsProgress';

const AnimalsProgressContext = createContext<UseAnimalsProgressReturn | null>(null);

interface AnimalsProgressProviderProps {
  children: ReactNode;
}

export function AnimalsProgressProvider({ children }: AnimalsProgressProviderProps) {
  const animalsProgressValue = useAnimalsProgress();

  return (
    <AnimalsProgressContext.Provider value={animalsProgressValue}>
      {children}
    </AnimalsProgressContext.Provider>
  );
}

export function useAnimalsProgressContext(): UseAnimalsProgressReturn {
  const context = useContext(AnimalsProgressContext);
  if (!context) {
    throw new Error('useAnimalsProgressContext must be used within an AnimalsProgressProvider');
  }
  return context;
}

export default AnimalsProgressContext;
