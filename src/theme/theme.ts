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
      default: '#e8d1bb',
    },
    colors: {
      redPastel: '#f7c1bb',
      purplePastel: '#dbc3e2',
      beigePastel: '#f5ede1',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default themeLight;
