import { defaultTheme } from 'react-admin';
import { ThemeOptions } from '@mui/material/styles';

export const theme: ThemeOptions = {
  ...defaultTheme,
  palette: {
<<<<<<< Updated upstream
    primary: {
      main: '#5E41FE',
    },
    secondary: {
      main: '#5E41FE',
      light: '#A05FFE',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#F2F5FA',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
=======
    ...defaultTheme.palette,
    mode: 'dark', // Explicitly set 'dark' to match PaletteMode
    background: {
      default: '#000000',
      paper: '#18181B',
    },
    text: {
      primary: '#ffffff',
      secondary: '#A1A1AA',
    },
>>>>>>> Stashed changes
  },
  typography: {
    // Use the system font instead of the default Roboto font
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
};
