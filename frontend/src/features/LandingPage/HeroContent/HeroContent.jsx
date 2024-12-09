import { Stack } from '@mui/material';

import HeroContentCenterText from '@features/LandingPage/HeroContent/HeroContentCenterText';
import HeroContentCenterButton from '@features/LandingPage/HeroContent/HeroContentCenterButton';

export default function HeroContent({ openSignupModal, openLoginModal }) {
  return (
    <Stack bgcolor="secondary.light">
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }} spacing={10}>
        <HeroContentCenterText />
        <HeroContentCenterButton openLoginModal={openLoginModal} openSignupModal={openSignupModal} />
      </Stack>
    </Stack>
  );
}
