import React from 'react';
import { ThemeProvider } from '@mui/material';
import EventDetailPage from './EventDetailPage';
import { lightTheme } from '../../util/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import PrimaryAppBar from '../../Components/AppBarComponent/PrimaryAppBar';

const EventPage = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <PrimaryAppBar selectedID={1} />
      <EventDetailPage />
    </ThemeProvider>
  );
};

export default EventPage;
