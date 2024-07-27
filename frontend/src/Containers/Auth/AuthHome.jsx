import { Stack } from '@mui/material';
import LandingPageTitle from '../../features/LandingPage/LandingPageTitle';
import Authenticator from '../../features/LandingPage/Authenticator';
import InviteSection from '../../features/LandingPage/InviteSection';
import AuthFooter from '../../Components/AuthFooterComponent/AuthFooter';

const AuthHome = () => {
  return (
    <>
      <LandingPageTitle title="AssetAlert" />
      <Stack sx={{ flexDirection: { sm: 'row' }, gap: 1, my: { sm: 20, xs: 5 } }}>
        <InviteSection />
        <Authenticator />
      </Stack>
      <AuthFooter />
    </>
  );
};

export default AuthHome;
