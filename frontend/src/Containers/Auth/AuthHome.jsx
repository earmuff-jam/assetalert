import { Stack } from '@mui/material';
import AppBar from '../../Components/AppBarComponent/AuthAppBar';
import Authenticator from '../../Components/AuthenticatorComponent/Authenticator';
import InviteSection from '../../Components/InviteSectionComponent/InviteSection';
import AuthFooter from '../../Components/AuthFooterComponent/AuthFooter';

const AuthHome = () => {
  return (
    <>
      <AppBar title="AssetAlert" />
      <Stack sx={{ flexDirection: { sm: 'row' }, gap: 1, my: { sm: 20, xs: 5 } }}>
        <InviteSection />
        <Authenticator />
      </Stack>
      <AuthFooter />
    </>
  );
};

export default AuthHome;
