import React from 'react';
import EventDetailPage from './EventDetailPage';
import { primary_theme } from '../../util/Theme';
import { Container, ThemeProvider } from '@material-ui/core';

const EventPage = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <EventDetailPage />
    </ThemeProvider>
  );
};

export default EventPage;
