'use client';

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useStickers, UseStickersReturn, StickerEarnedInfo } from '@/hooks/useStickers';
import { useStickerToastContext } from '@/contexts/StickerToastContext';
import { useStickerUnlockDetector } from '@/hooks/useStickerUnlockDetector';

const StickerContext = createContext<UseStickersReturn | null>(null);

/**
 * Internal component that runs the unlock detector.
 * Must be rendered inside StickerContext.Provider to access sticker state.
 */
function StickerUnlockDetector() {
  useStickerUnlockDetector();
  return null;
}

interface StickerProviderProps {
  children: ReactNode;
}

export function StickerProvider({ children }: StickerProviderProps) {
  const { showStickerToast } = useStickerToastContext();

  const handleStickerEarned = useCallback(
    (info: StickerEarnedInfo) => {
      showStickerToast({
        emoji: info.emoji,
        name: info.stickerName,
        pageNumber: info.pageNumber,
      });
    },
    [showStickerToast]
  );

  const stickerValue = useStickers({ onStickerEarned: handleStickerEarned });

  return (
    <StickerContext.Provider value={stickerValue}>
      <StickerUnlockDetector />
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
