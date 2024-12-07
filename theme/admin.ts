import { defaultTheme } from 'react-admin';

export const theme = {
  ...defaultTheme,
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#18181B'
    },
    text: {
      primary: '#ffffff',
      secondary: '#A1A1AA'
    }
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
