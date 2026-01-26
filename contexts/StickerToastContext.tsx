'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import StickerToast, { StickerToastData } from '@/components/StickerToast';

interface StickerToastContextValue {
  showStickerToast: (data: StickerToastData) => void;
}

const StickerToastContext = createContext<StickerToastContextValue | null>(null);

interface StickerToastProviderProps {
  children: ReactNode;
}

export function StickerToastProvider({ children }: StickerToastProviderProps) {
  const [toastData, setToastData] = useState<StickerToastData | null>(null);

  const showStickerToast = useCallback((data: StickerToastData) => {
    setToastData(data);
  }, []);

  const handleClose = useCallback(() => {
    setToastData(null);
  }, []);

  return (
    <StickerToastContext.Provider value={{ showStickerToast }}>
      {children}
      <StickerToast data={toastData} onClose={handleClose} />
    </StickerToastContext.Provider>
  );
}

export function useStickerToastContext(): StickerToastContextValue {
  const context = useContext(StickerToastContext);
  if (!context) {
    throw new Error('useStickerToastContext must be used within a StickerToastProvider');
  }
  return context;
}
