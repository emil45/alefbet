'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useGamesProgress, UseGamesProgressReturn } from '@/hooks/useGamesProgress';

const GamesProgressContext = createContext<UseGamesProgressReturn | null>(null);

interface GamesProgressProviderProps {
  children: ReactNode;
}

export function GamesProgressProvider({ children }: GamesProgressProviderProps) {
  const gamesProgressValue = useGamesProgress();

  return (
    <GamesProgressContext.Provider value={gamesProgressValue}>
      {children}
    </GamesProgressContext.Provider>
  );
}

export function useGamesProgressContext(): UseGamesProgressReturn {
  const context = useContext(GamesProgressContext);
  if (!context) {
    throw new Error('useGamesProgressContext must be used within a GamesProgressProvider');
  }
  return context;
}

export default GamesProgressContext;
