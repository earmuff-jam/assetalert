import React, { useEffect, useState } from 'react';

import { store } from './Store';
import * as ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../src/App';
import steps from './tour/steps';
import { primary_theme } from './util/Theme';
import { TourProvider } from '@reactour/tour';

import { SnackbarProvider } from 'notistack';
import AuthHome from './Containers/Auth/AuthHome';
import { ThemeProvider } from '@material-ui/styles';
import EventPage from './Containers/Event/EventPage';
import ProfilePage from './Containers/Profile/ProfilePage';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: () => <SkeletonLoader />,
    errorElement: <SkeletonLoader />,
    children: [],
  },
  {
    path: 'profile',
    element: <ProfilePage />,
    errorElement: <SkeletonLoader />,
  },
  {
    path: ':eventID',
    element: <EventPage />,
    errorElement: <SkeletonLoader />,
  },
]);

const ApplicationValidator = () => {
  const { loading } = useSelector((state) => state.auth);
  const [loggedInUser, setLoggedInUser] = useState(false);

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
      <SnackbarProvider
        dense
        preventDuplicate
        maxSnack={3}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        autoHideDuration={3000}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
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
