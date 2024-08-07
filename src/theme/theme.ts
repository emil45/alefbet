import { createTheme } from '@mui/material/styles';

const themeLight = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      // default: '#e8d1bb',
    },
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
        itemCardBackground: '#f5ede1', // beigePastel
        memoryMatchCardBack: '#8fd4e6',
        memoryMatchCardBackIcon: '#f5de97',
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default themeLight;
