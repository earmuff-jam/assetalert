import { useEffect } from 'react';
import { homeActions } from './homeSlice';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import Overview from './Overview';
import Collection from '../common/Collection/Collection';
import CategoryList from './Categories/CategoryList';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeActions.getUsername());
    // eslint-disable-next-line
  }, []);

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <Overview />
      <CategoryList />
      <Collection title="Learn more" />
    </Stack>
  );
};

export default HomePage;
