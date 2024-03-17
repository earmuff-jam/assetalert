import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import EventPage from '../Containers/Event/EventPage';
import ProfilePage from '../Containers/Profile/ProfilePage';

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

export const router = createBrowserRouter([
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
