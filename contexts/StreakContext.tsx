'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useStreak, UseStreakReturn } from '@/hooks/useStreak';

const StreakContext = createContext<UseStreakReturn | null>(null);

interface StreakProviderProps {
  children: ReactNode;
}

export function StreakProvider({ children }: StreakProviderProps) {
  const streakValue = useStreak();

  return (
    <StreakContext.Provider value={streakValue}>
      {children}
    </StreakContext.Provider>
  );
}

export function useStreakContext(): UseStreakReturn {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error('useStreakContext must be used within a StreakProvider');
  }
  return context;
}

export default StreakContext;
