import { Stack } from '@mui/material';
import StyledAppBar from './StyledAppBar';
import Authenticator from './Authenticator';
import InviteSection from './InviteSection';
import AuthFooter from './AuthFooter';
import ImageContainer from './ImageContainer';
import AuthHeading from './AuthHeading';

const AuthHome = () => {
  return (
    <>
      <StyledAppBar title="AssetAlert" elevation={0} />
      <AuthHeading />
      <Stack
        justifyContent="center"
        spacing="2rem"
        marginTop="1rem"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          width: { xs: '100%', sm: '100%', md: '80%' },
          mt: '2rem',
          mx: 'auto',
          gap: '1rem',
        }}
      >
        <ImageContainer
          src="asset-01.jpg"
          alt="image-of-various-items-in-display-retrieved-from-unsplash"
          style={{ width: 'inherit', height: '20rem', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
        />
        <ImageContainer
          src="asset-02.jpg"
          alt="image-of-wall-painting-asset-retrieved-from-unsplash"
          style={{
            width: 'inherit',
            height: '20rem',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            marginTop: '-0.1rem',
          }}
        />
      </Stack>
      <Stack sx={{ flexDirection: { md: 'row' }, gap: 1, my: { sm: 10, xs: 5 } }}>
        <InviteSection />
        <Authenticator />
      </Stack>
      <AuthFooter />
    </>
  );
};

export default AuthHome;
