import React from 'react';
import { primary_theme } from '../../util/Theme';
import ProfileDetailPage from './ProfileDetailPage';
import PrimaryAppBar from '../../Components/AppBar/PrimaryAppBar';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';

const ProfilePage = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <Container maxWidth="lg">
        <CssBaseline />
        <PrimaryAppBar selectedID={2} />
        <ProfileDetailPage />
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;
