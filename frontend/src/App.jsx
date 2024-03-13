import React from 'react';
import { primary_theme } from './util/Theme';
import { ThemeProvider } from '@material-ui/core';
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import HomePage from './Containers/Home/HomePage';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  return (
    <ThemeProvider theme={primary_theme}>
<<<<<<< Updated upstream
      <CssBaseline />
      <HomePage />
=======
        <CssBaseline />
        <PrimaryAppBar selectedID={1} />
        <HomePage />
>>>>>>> Stashed changes
    </ThemeProvider>
  );
};

export default App;
