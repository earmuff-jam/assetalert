import React from 'react';
<<<<<<< Updated upstream
=======
import { ThemeProvider } from '@material-ui/core';

>>>>>>> Stashed changes
import EventDetailPage from './EventDetailPage';
import { primary_theme } from '../../util/Theme';
import { Container, ThemeProvider } from '@material-ui/core';

const EventPage = () => {
  return (
    <ThemeProvider theme={primary_theme}>
<<<<<<< Updated upstream
      <EventDetailPage />
=======
        <CssBaseline />
        <PrimaryAppBar selectedID={1} />
        <EventDetailPage />
>>>>>>> Stashed changes
    </ThemeProvider>
  );
};

export default EventPage;
