import React from 'react';
import { primary_theme } from '../../util/Theme';
import ProfileDetailPage from './ProfileDetailPage';
import { ThemeProvider } from '@material-ui/core';

const ProfilePage = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <ProfileDetailPage />
    </ThemeProvider>
  );
};

export default ProfilePage;
