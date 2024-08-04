import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    colors: {
      redPastel: string;
      purplePastel: string;
      beigePastel: string;
      greenPastel: string;
      bluePastel: string;
      orangePastel: string;
      blackPastel: string;
      black: string;
      white: string;
    };
  }
  interface PaletteOptions {
    colors?: {
      black?: string;
      white?: string;
      redPastel?: string;
      purplePastel?: string;
      beigePastel?: string;
      greenPastel?: string;
      bluePastel?: string;
      orangePastel?: string;
      blackPastel?: string;
    };
  }
}
