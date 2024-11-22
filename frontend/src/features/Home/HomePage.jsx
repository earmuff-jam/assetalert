import { Stack } from '@mui/material';
import Overview from './Overview';

const HomePage = () => {
  return (
    <Stack sx={{ flexGrow: 1 }} spacing={2}>
      <Overview />
    </Stack>
  );
};

export default HomePage;
