import { Stack, Typography } from '@mui/material';

export default function AuthHeading() {
  return (
    <Stack sx={{ display: 'flex', flexDirection: 'center', alignItems: 'center' }} margin={'0 auto'}>
      <Typography variant="h1" color="primary.main">
        Asset Alert
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        Track your assets with ease
      </Typography>
    </Stack>
  );
}
