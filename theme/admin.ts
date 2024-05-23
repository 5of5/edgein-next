import { defaultTheme } from 'react-admin';

export const theme = {
  ...defaultTheme,
  palette: {
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
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
};
