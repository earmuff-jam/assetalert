import HomePage from './Containers/Home/HomePage';
import PrimaryAppBar from './Components/AppBarComponent/PrimaryAppBar';
import MenuActionBar from './Components/MenuActionBar/MenuActionBar';
import { Stack } from '@mui/material';

const App = () => {
  return (
    <>
      <PrimaryAppBar selectedID={1} />
      <Stack direction="row" spacing="2rem">
        <MenuActionBar />
        <HomePage />
      </Stack>
    </>
  );
};

export default App;
