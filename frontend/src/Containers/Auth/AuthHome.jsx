import { Stack } from '@mui/material';
import AppBar from '../../Components/AppBarComponent/AuthAppBar';
import Authenticator from '../../Components/AuthenticatorComponent/Authenticator';
import InviteSection from '../../Components/InviteSectionComponent/InviteSection';
import AuthFooter from '../../Components/AuthFooterComponent/AuthFooter';

const AuthHome = () => {
  return (
    <>
      <AppBar title="Climate" />
      <Stack direction="row" spacing="2rem" justifyContent="space-between" sx={{ height: '90vh', mt: '5rem' }}>
        <InviteSection />
        <Authenticator />
      </Stack>
      <AuthFooter />
    </>
  );
};

export default AuthHome;
