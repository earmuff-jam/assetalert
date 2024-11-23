import { Button, Stack, Typography } from '@mui/material';

export default function Header({ openSignupModal, openLoginModal }) {
  return (
    <Stack bgcolor="secondary.light">
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }} spacing={10}>
        <Stack textAlign={'center'}>
          <Typography variant="h1" fontWeight="900">
            Asset Alert
          </Typography>
          <Typography variant="h4" fontWeight="100">
            Build and track your assets with ease
          </Typography>
        </Stack>
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
      </Stack>
    </Stack>
  );
}
