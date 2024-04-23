import React from 'react';
import { primary_theme } from './util/Theme';
import { ThemeProvider } from '@material-ui/core';
import HomePage from './Containers/Home/HomePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrimaryAppBar from './Components/AppBarComponent/PrimaryAppBar';

const App = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <CssBaseline />
      <PrimaryAppBar selectedID={1} />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
