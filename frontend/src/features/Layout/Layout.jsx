import { Outlet } from 'react-router-dom';
import { Box, CircularProgress, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { Suspense } from 'react';
import MenuActionBar from './MenuActionBar';
import { lightTheme } from '../../util/Theme';

const Layout = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress color="inherit" />
          </Box>
        }
      >
        <Box height="100%" bgcolor="background.default">
          <Stack direction="row" spacing="1rem">
            <MenuActionBar />
            <Outlet />
          </Stack>
        </Box>
      </Suspense>
    </ThemeProvider>
  );
};

export default Layout;
