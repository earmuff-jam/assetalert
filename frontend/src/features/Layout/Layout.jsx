import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  IconButton,
  Skeleton,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import MenuActionBar from './MenuActionBar';
import { darkTheme, lightTheme } from '../../util/Theme';
import { DarkModeRounded, LightModeOutlined, LogoutRounded, MenuOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../LandingPage/authSlice';
import { profileActions } from '../Profile/profileSlice';
import { useTheme } from '@emotion/react';

const Layout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { loading, profileDetails } = useSelector((state) => state.profile);

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
    dispatch(profileActions.getFavItems({ limit: 10 }));
  };
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
    return <Skeleton height="100vh" />;
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
        <AppBar elevation={0}>
          <Toolbar>
            <IconButton onClick={handleDrawerOpen}>
              <MenuOutlined />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AssetAlert
            </Typography>
            <Stack direction="row" spacing="0.1rem">
              {!onlySmallScreen ? (
                <>
                  <IconButton onClick={handleAppearance}>
                    {profileDetails?.appearance ? <LightModeOutlined /> : <DarkModeRounded />}
                  </IconButton>
                  <IconButton onClick={handleLogout}>
                    <LogoutRounded />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={() => handleAppearance()}>
                    {profileDetails?.appearance ? <LightModeOutlined /> : <DarkModeRounded />}
                  </IconButton>
                  <Tooltip title="log out">
                    <IconButton onClick={handleLogout}>
                      <LogoutRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
        <Stack sx={{ mt: '5rem' }}>
          <Container maxWidth="md">
            <MenuActionBar openDrawer={openDrawer} handleDrawerClose={handleDrawerClose} />
            <Outlet />
          </Container>
        </Stack>
      </Suspense>
    </ThemeProvider>
  );
};

export default Layout;
