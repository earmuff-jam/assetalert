import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#3F72AF',
      dark: '#112D4E',
    },
    secondary: {
      main: '#DBE2EF',
      light: '#F9F7F7',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h1: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.6,
    },
    h6: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body1: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3F72AF',
      dark: '#112D4E',
      light: '#5A91D7',
    },
    secondary: {
      main: '#DBE2EF',
      light: '#F9F7F7',
      dark: '#A1B6D3',
    },
    background: {
      default: '#2E2E2E',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h1: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: '#FFFFFF',
    },
    h2: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: '#FFFFFF',
    },
    h3: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      color: '#FFFFFF',
    },
    h4: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
    h5: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      color: '#FFFFFF',
    },
    h6: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#FFFFFF',
    },
    body1: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#B0B0B0',
    },
    body2: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#B0B0B0',
    },
    caption: {
      color: '#B0B0B0',
    },
  },
});
