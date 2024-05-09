import steps from './tour/steps';
import { router } from './util/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { TourProvider } from '@reactour/tour';
import { RouterProvider } from 'react-router-dom';
import AuthHome from './Containers/Auth/AuthHome';

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

export default ApplicationValidator;
