import React from 'react';
import { primary_theme } from './util/Theme';
import { ThemeProvider } from '@material-ui/core';
import HomePage from './Containers/Home/HomePage';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
