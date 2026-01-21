'use client';

import React, { ReactNode, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/theme/theme';
import { initAmplitude, logEvent } from '@/utils/amplitude';
import { AmplitudeEventsEnum, LocaleType } from '@/models/amplitudeEvents';
import { StreakProvider } from '@/contexts/StreakContext';
import { StickerProvider } from '@/contexts/StickerContext';
import { FeatureFlagProvider } from '@/contexts/FeatureFlagContext';
import { LettersProgressProvider } from '@/contexts/LettersProgressContext';
import { NumbersProgressProvider } from '@/contexts/NumbersProgressContext';
import { AnimalsProgressProvider } from '@/contexts/AnimalsProgressContext';
import { GamesProgressProvider } from '@/contexts/GamesProgressContext';
import InstallPrompt from '@/components/InstallPrompt';
import ThemeRegistry from './ThemeRegistry';

const FIRST_VISIT_KEY = 'lepdy_first_visit';

interface ProvidersProps {
  children: ReactNode;
  direction: 'ltr' | 'rtl';
  locale: LocaleType;
}

export default function Providers({ children, direction, locale }: ProvidersProps) {
  const theme = useMemo(() => createTheme(getTheme(direction)), [direction]);

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
    <ThemeRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FeatureFlagProvider>
          <StreakProvider>
            <LettersProgressProvider>
              <NumbersProgressProvider>
                <AnimalsProgressProvider>
                  <GamesProgressProvider>
                    <StickerProvider>
                      {children}
                      <InstallPrompt />
                    </StickerProvider>
                  </GamesProgressProvider>
                </AnimalsProgressProvider>
              </NumbersProgressProvider>
            </LettersProgressProvider>
          </StreakProvider>
        </FeatureFlagProvider>
      </ThemeProvider>
    </ThemeRegistry>
  );
}
