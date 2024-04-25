import { primary_theme } from '../../util/Theme';
import ProfileDetailPage from './ProfileDetailPage';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import PrimaryAppBar from '../../Components/AppBarComponent/PrimaryAppBar';

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
