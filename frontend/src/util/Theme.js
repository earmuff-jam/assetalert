import { createTheme } from '@material-ui/core';

export const primary_theme = createTheme({
  palette: {
    primary: {
      main: '#20639B',
    },
    secondary: {
      main: '#F3F4F6',
    },
    warning: {
      main: '#F6D55C',
    },
    common: {
      white: '#FAF9F6',
    },
    text: {
      secondary: {
        main: '#20639B',
      },
    },
  },
  typography: {
    fontFamily: '"Roboto"',
    fontWeight: 300,
  },
  overrides: {
    MuiButton: {
      root: {
        color: '#20639B',
        textTransform: 'capitalize',
        borderRadius: '10%',
      },
    },
    MuiCheckbox: {
      root: {
        color: '#20639B',
      },
    },
    MuiRadio: {
      root: {
        color: '#20639B',
      },
    },
  },
});
