import { primary_theme } from '../../util/Theme';
import ProfileDetailPage from './ProfileDetailPage';
import PrimaryAppBar from '../../stories/AppBar/PrimaryAppBar';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

const ProfilePage = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <CssBaseline />
      <PrimaryAppBar selectedID={2} />
      <ProfileDetailPage />
    </ThemeProvider>
  );
};

export default ProfilePage;
