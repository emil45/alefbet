'use client';

import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/theme/theme';
import { initAmplitude } from '@/utils/amplitude';
// Note: Roboto font is now loaded via next/font/google in layout.tsx for better performance

interface ProvidersProps {
  children: ReactNode;
  direction: 'ltr' | 'rtl';
}

export default function Providers({ children, direction }: ProvidersProps) {
  const theme = createTheme(getTheme(direction));

  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
