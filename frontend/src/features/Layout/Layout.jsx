import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  CircularProgress,
  CssBaseline,
  IconButton,
  Skeleton,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import MenuActionBar from './MenuActionBar';
import { darkTheme, lightTheme } from '../../util/Theme';
import { DarkModeRounded, LightModeOutlined, LogoutRounded, MenuOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Containers/Auth/authSlice';
import { profileActions } from '../Profile/profileSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const { loading, profileDetails } = useSelector((state) => state.profile);

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const handleLogout = () => {
    dispatch(authActions.getLogout());
    localStorage.clear();
    window.location.href = '/';
  };

  const handleAppearance = () => {
    const draftData = { ...profileDetails, appearance: !profileDetails.appearance || false };
    dispatch(profileActions.updateProfileDetails({ draftData }));
  };

  useEffect(() => {
    dispatch(profileActions.getProfileDetails());
  }, []);

  if (loading) {
    return <Skeleton width="100%" height="100vh" />;
  }

  return (
    <ThemeProvider theme={profileDetails.appearance ? darkTheme : lightTheme}>
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
            <IconButton onClick={handleDrawerOpen}>
              <MenuOutlined />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AssetAlert
            </Typography>
            <IconButton onClick={() => handleAppearance()}>
              {profileDetails?.appearance ? <LightModeOutlined /> : <DarkModeRounded />}
            </IconButton>
            <Tooltip title="log out">
              <IconButton onClick={handleLogout}>
                <LogoutRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box>
          <Stack direction="row" spacing="1rem" sx={{ mt: '5rem' }}>
            <MenuActionBar openDrawer={openDrawer} handleDrawerClose={handleDrawerClose} />
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
