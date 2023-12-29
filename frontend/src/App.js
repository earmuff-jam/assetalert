import React from 'react';
import { primary_theme } from './util/Theme';
import { Container, ThemeProvider } from '@material-ui/core';

import HomePage from './Containers/Home/HomePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrimaryAppBar from './Components/AppBar/PrimaryAppBar';

const App = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <>
        <Container maxWidth="lg">
          <CssBaseline />
          <PrimaryAppBar selectedID={1} />
          <HomePage />
        </Container>
      </>
    </ThemeProvider>
  );
};

export default App;
