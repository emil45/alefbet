import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    componentsColor: {
      itemCardBackground: string;
    };
    colors: {
      funRed: string;
      redPastel: string;
      purplePastel: string;
      beigePastel: string;
      greenPastel: string;
      bluePastel: string;
      orangePastel: string;
      blackPastel: string;
      black: string;
      white: string;
      components: {
        itemCardBackground: string;
        memoryMatchCardBack: string;
        memoryMatchCardBackIcon: string;
      };
    };
  }
  interface PaletteOptions {
    colors?: {
      funRed?: string;
      black?: string;
      white?: string;
      redPastel?: string;
      purplePastel?: string;
      beigePastel?: string;
      greenPastel?: string;
      bluePastel?: string;
      orangePastel?: string;
      blackPastel?: string;
      components: {
        itemCardBackground?: string;
        memoryMatchCardBack?: string;
        memoryMatchCardBackIcon?: string;
      };
    };
  }
}
