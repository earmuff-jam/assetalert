import App from '../App';
import EventPage from '../Containers/Event/EventPage';
import { createBrowserRouter } from 'react-router-dom';
import ProfilePage from '../Containers/Profile/ProfilePage';

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
