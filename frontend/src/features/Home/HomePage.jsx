import { Stack } from '@mui/material';
import Overview from './Overview';
import CategoryList from '../Categories/CategoryList';

const HomePage = () => {
  return (
    <Stack sx={{ flexGrow: 1 }} spacing="4rem">
      <Overview />
    </Stack>
  );
};

export default HomePage;
