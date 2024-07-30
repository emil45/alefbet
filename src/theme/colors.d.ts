import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    colors: {
      redPastel: string;
      purplePastel: string;
      beigePastel: string;
    };
  }
  interface PaletteOptions {
    colors?: {
      redPastel?: string;
      purplePastel?: string;
      beigePastel?: string;
    };
  }
}
