import React from 'react';
import { primary_theme } from '../../util/Theme';
import ProfileDetailPage from './ProfileDetailPage';
import { ThemeProvider } from '@material-ui/core';

const ProfilePage = () => {
  return (
    <ThemeProvider theme={primary_theme}>
<<<<<<< Updated upstream
      <ProfileDetailPage />
=======
        <CssBaseline />
        <PrimaryAppBar selectedID={2} />
        <ProfileDetailPage />
>>>>>>> Stashed changes
    </ThemeProvider>
  );
};

export default ProfilePage;
