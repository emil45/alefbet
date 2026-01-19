'use client';

import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/theme/theme';
import { initAmplitude, logEvent } from '@/utils/amplitude';
import { AmplitudeEventsEnum, LocaleType } from '@/models/amplitudeEvents';
import { StreakProvider } from '@/contexts/StreakContext';
import { StickerProvider } from '@/contexts/StickerContext';

const FIRST_VISIT_KEY = 'lepdy_first_visit';

interface ProvidersProps {
  children: ReactNode;
  direction: 'ltr' | 'rtl';
  locale: LocaleType;
}

export default function Providers({ children, direction, locale }: ProvidersProps) {
  const theme = createTheme(getTheme(direction));

  useEffect(() => {
    initAmplitude();

    // Check if first visit
    const hasVisitedBefore = localStorage.getItem(FIRST_VISIT_KEY);
    const isFirstVisit = !hasVisitedBefore;

    // Mark as visited
    if (isFirstVisit) {
      localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());
    }

    // Fire session_start event
    logEvent(AmplitudeEventsEnum.SESSION_START, {
      locale,
      is_first_visit: isFirstVisit,
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    });
  }, [locale]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StreakProvider>
        <StickerProvider>
          {children}
        </StickerProvider>
      </StreakProvider>
    </ThemeProvider>
  );
}
