import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import EventDetailPage from './EventDetailPage';
import { primary_theme } from '../../util/Theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrimaryAppBar from '../../Components/AppBarComponent/PrimaryAppBar';

const EventPage = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <CssBaseline />
      <PrimaryAppBar selectedID={1} />
      <EventDetailPage />
    </ThemeProvider>
  );
};

export default EventPage;
