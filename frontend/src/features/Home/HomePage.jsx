import { Stack } from '@mui/material';
import Overview from './Overview';
import Collection from './Collection/Collection';
import CategoryList from '../Categories/CategoryList';
import { DEFAULT_INVENTORIES_LANDING_PAGE_TEXT } from './Collection/constants';

const HomePage = () => {
  return (
    <Stack sx={{ flexGrow: 1 }} spacing="4rem">
      <Overview />
      <CategoryList displayConcise />
      <Collection title="Learn more" items={DEFAULT_INVENTORIES_LANDING_PAGE_TEXT} />
    </Stack>
  );
};

export default HomePage;
