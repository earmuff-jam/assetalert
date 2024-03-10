import React from 'react';
import { Container, ThemeProvider } from '@material-ui/core';

import EventDetailPage from './EventDetailPage';
import { primary_theme } from '../../util/Theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrimaryAppBar from '../../stories/AppBar/PrimaryAppBar';

const EventPage = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <Container maxWidth="lg">
        <CssBaseline />
        <PrimaryAppBar selectedID={1} />
        <EventDetailPage />
      </Container>
    </ThemeProvider>
  );
};

export default EventPage;
