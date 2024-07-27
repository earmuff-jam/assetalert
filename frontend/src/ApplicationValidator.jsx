import steps from './tour/steps';
import { router } from './util/router';
import { useSelector } from 'react-redux';
import { Suspense, useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { TourProvider } from '@reactour/tour';
import { RouterProvider } from 'react-router-dom';
import AuthHome from './Containers/Auth/AuthHome';
import { Container, Dialog } from '@mui/material';

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
        <Container maxWidth="xl">
          <Suspense fallback={<Dialog title="Loading..." />}>
            <RouterProvider router={router} />
          </Suspense>
        </Container>
      </SnackbarProvider>
    </TourProvider>
  ) : (
    <Container maxWidth="lg">
      <AuthHome />
    </Container>
  );
};

export default ApplicationValidator;
