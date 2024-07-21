import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import EventDetailPage from './EventDetailPage';
import { primary_theme } from '../../util/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import PrimaryAppBar from '../../Components/AppBarComponent/PrimaryAppBar';

const EventPage = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={primary_theme}>
        <CssBaseline />
        <PrimaryAppBar selectedID={1} />
        <EventDetailPage />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default EventPage;
