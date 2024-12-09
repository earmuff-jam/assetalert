import { Button, Stack, Typography } from '@mui/material';

export default function HeroContentCenterButton({ openSignupModal, openLoginModal }) {
  return (
    <Stack justifyContent="center" spacing={1} alignItems={'center'}>
      <Button onClick={openSignupModal} variant="outlined">
        Register
      </Button>
      <Stack direction="row" spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Already have an account?
        </Typography>
        <Typography
          variant="caption"
          color="primary.main"
          component={'span'}
          sx={{ cursor: 'pointer' }}
          onClick={openLoginModal}
        >
          Log in
        </Typography>
      </Stack>
    </Stack>
  );
}
