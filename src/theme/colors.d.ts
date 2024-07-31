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
    };
  }
  interface PaletteOptions {
    colors?: {
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
