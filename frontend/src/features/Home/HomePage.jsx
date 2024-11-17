import { Stack } from '@mui/material';
import Overview from './Overview';

const HomePage = () => {
  return (
    <Stack sx={{ flexGrow: 1 }} spacing="4rem">
      <Overview />
    </Stack>
  );
};

export default HomePage;
