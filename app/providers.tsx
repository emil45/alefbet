'use client';

import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/theme/theme';
import { initAmplitude } from '@/utils/amplitude';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
