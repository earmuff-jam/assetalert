import { Stack } from '@mui/material';
import Overview from './Overview';
import Collection from './Collection/Collection';
import CategoryList from '../Categories/CategoryList';

const HomePage = () => {
  return (
    <Stack sx={{ flexGrow: 1 }}>
      <Overview />
      <CategoryList />
      <Collection title="Learn more" />
    </Stack>
  );
};

export default HomePage;
