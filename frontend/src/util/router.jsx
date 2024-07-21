import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const App =  lazy(() => import('../App'));
const EventPage =  lazy(() => import('../Containers/Event/EventPage'));
const ProfilePage =  lazy(() => import('../Containers/Profile/ProfilePage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
  {
    path: ':eventID',
    element: <EventPage />,
  },
]);
