import { primary_theme } from '../../util/Theme';
import ProfileDetailPage from './ProfileDetailPage';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import PrimaryAppBar from '../../Components/AppBarComponent/PrimaryAppBar';

const ProfilePage = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={primary_theme}>
        <CssBaseline />
        <PrimaryAppBar selectedID={2} />
        <ProfileDetailPage />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ProfilePage;
