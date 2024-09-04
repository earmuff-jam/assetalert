import { Button, Stack, Typography } from '@mui/material';

export default function Header({ openSignupModal }) {
  return (
    <Stack bgcolor="secondary.light">
      <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <Typography variant="h1" fontWeight="900">
          Asset Alert
        </Typography>
        <Typography variant="h4" fontWeight="100">
          Build and track your assets with ease
        </Typography>
        <Stack direction="row" justifyContent="center" spacing="1rem" marginTop="1rem">
          <Button onClick={openSignupModal}>Register</Button>
          <Button variant="outlined" disabled>
            Learn More
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
