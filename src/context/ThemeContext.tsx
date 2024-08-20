import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import i18n from '../utils/i18n';
import { getTheme } from '../theme/theme';

// Define the context shape
interface ThemeContextProps {
  direction: 'ltr' | 'rtl';
  toggleDirection: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  direction: 'rtl',
  toggleDirection: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>(i18n.language === 'he' ? 'rtl' : 'ltr');

  useEffect(() => {
    const handleLanguageChange = (lang: string) => {
      setDirection(lang === 'he' ? 'rtl' : 'ltr');
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const theme = createTheme(getTheme(direction));

  return (
    <ThemeContext.Provider
      value={{
        direction,
        toggleDirection: () => setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr')),
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
