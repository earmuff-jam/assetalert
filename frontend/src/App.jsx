import { primary_theme } from './util/Theme';
import { ThemeProvider } from '@mui/material';
import HomePage from './Containers/Home/HomePage';
import CssBaseline from '@mui/material/CssBaseline';
import PrimaryAppBar from './Components/AppBarComponent/PrimaryAppBar';

const App = () => {
  return (
    <ThemeProvider theme={primary_theme}>
      <CssBaseline />
      <PrimaryAppBar selectedID={1} />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
