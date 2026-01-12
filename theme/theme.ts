import { ThemeOptions } from '@mui/material/styles';

// Function that generates the theme based on direction
export const getTheme = (direction: 'ltr' | 'rtl'): ThemeOptions => ({
  direction,
  palette: {
    mode: 'light',
    primary: {
      main: '#f0003c',
      light: '#3b0e0a',
    },
    secondary: {
      main: '#858483',
    },
    background: {},
    colors: {
      funRed: '#f0003c',
      white: '#ffffff',
      black: '#000000',
      redPastel: '#eeaea8',
      purplePastel: '#dbc3e2',
      beigePastel: '#f5ede1',
      greenPastel: '#dee581',
      bluePastel: '#9ed6ea',
      orangePastel: '#ffcd36',
      blackPastel: '#434243',
      components: {
        itemCardBackground: '#f5ede1',
        memoryMatchCardBack: '#8fd4e6',
        memoryMatchCardBackIcon: '#f5de97',
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
