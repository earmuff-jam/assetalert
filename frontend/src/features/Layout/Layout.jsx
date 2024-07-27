import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  CircularProgress,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Suspense } from 'react';
import MenuActionBar from './MenuActionBar';
import { lightTheme } from '../../util/Theme';
import { LogoutRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Containers/Auth/authSlice';

const Layout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.getLogout());
    localStorage.clear();
    window.location.href = '/';
  };

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
        <AppBar color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AssetAlert
            </Typography>
            <Tooltip title="log out">
              <IconButton onClick={handleLogout}>
                <LogoutRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box>
          <Stack direction="row" spacing="1rem" sx={{ mt: '5rem' }}>
            <MenuActionBar />
            <Stack sx={{ py: '1rem', flexGrow: 1 }}>
              <Outlet />
            </Stack>
          </Stack>
        </Box>
      </Suspense>
    </ThemeProvider>
  );
};

export default Layout;
