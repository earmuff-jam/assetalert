import { primary_theme } from '../../util/Theme';
import ProfileDetailPage from './ProfileDetailPage';
import PrimaryAppBar from '../../stories/AppBar/PrimaryAppBar';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
const ProfilePage = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <CssBaseline />
      <PrimaryAppBar selectedID={2} />
      <Container maxWidth="xl">
        <ProfileDetailPage />
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;
