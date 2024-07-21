import { lightTheme } from '../../util/Theme';
import ProfileDetailPage from './ProfileDetailPage';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import PrimaryAppBar from '../../Components/AppBarComponent/PrimaryAppBar';

const ProfilePage = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <PrimaryAppBar selectedID={2} />
      <ProfileDetailPage />
    </ThemeProvider>
  );
};

export default ProfilePage;
