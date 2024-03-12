import React, { useEffect, useState } from 'react';

import { store } from './Store';
import * as ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import steps from './tour/steps';
import classNames from 'classnames';
import { primary_theme } from './util/Theme';
import { TourProvider } from '@reactour/tour';

import { Skeleton } from '@material-ui/lab';
import { SnackbarProvider } from 'notistack';
import AuthHome from './Containers/Auth/AuthHome';
import { ThemeProvider } from '@material-ui/styles';

import EventPage from './Containers/Event/EventPage';
import { Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfilePage from './Containers/Profile/ProfilePage';
import NavigationDrawer from './stories/NavigationDrawer/NavigationDrawer';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexGrow: 1,
    marginTop: theme.spacing(6),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const useSpookyStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey,
    height: '100%',
    width: '100%',
  },
}));

const SkeletonLoader = () => {
  const classes = useSpookyStyles();
  return <Skeleton className={classes.root} />;
};

const ApplicationValidator = () => {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.auth);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [navigationDrawerOpen, setNavigationDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setNavigationDrawerOpen(true);
  const handleDrawerClose = () => setNavigationDrawerOpen(false);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      setLoggedInUser(false);
      return;
    } else {
      setLoggedInUser(true);
    }
  }, [loading]);

  return loggedInUser ? (
    <TourProvider steps={steps}>
      <BrowserRouter>
        <SnackbarProvider
          dense
          preventDuplicate
          maxSnack={3}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          autoHideDuration={3000}
        >
          <Box className={classes.content}>
            <CssBaseline />
            <Box>
              <NavigationDrawer
                drawerOpen={navigationDrawerOpen}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
              />
            </Box>
            <Box className={classes.drawerHeader} />
            <Box
              className={classNames(classes.content, {
                [classes.contentShift]: navigationDrawerOpen,
              })}
            >
              <Routes>
                <Route exact path="/" element={<App />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/:id" element={<EventPage />} />
              </Routes>
            </Box>
          </Box>
        </SnackbarProvider>
      </BrowserRouter>
    </TourProvider>
  ) : (
    <AuthHome />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={primary_theme}>
    <Provider store={store}>
      <ApplicationValidator />
    </Provider>
  </ThemeProvider>
);
