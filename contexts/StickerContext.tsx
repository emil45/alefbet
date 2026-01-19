'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useStickers, UseStickersReturn } from '@/hooks/useStickers';

const StickerContext = createContext<UseStickersReturn | null>(null);

interface StickerProviderProps {
  children: ReactNode;
}

export function StickerProvider({ children }: StickerProviderProps) {
  const stickerValue = useStickers();

  return (
    <StickerContext.Provider value={stickerValue}>
      {children}
    </StickerContext.Provider>
  );
}

export function useStickerContext(): UseStickersReturn {
  const context = useContext(StickerContext);
  if (!context) {
    throw new Error('useStickerContext must be used within a StickerProvider');
  }
  return context;
}

export default StickerContext;
