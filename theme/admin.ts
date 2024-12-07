import { defaultTheme } from 'react-admin';
import { ThemeOptions } from '@mui/material/styles';

export const theme: ThemeOptions = {
  ...defaultTheme,
  palette: {
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
