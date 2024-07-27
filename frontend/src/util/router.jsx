import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../features/Layout/Layout';

const HomePage = lazy(() => import('../Containers/Home/HomePage'));
const EventPage = lazy(() => import('../Containers/Event/EventPage'));
const ProfilePage = lazy(() => import('../Containers/Profile/ProfilePage'));
const InventoryList = lazy(() => import('../features/InventoryList/InventoryList'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/inventories/list',
        element: <InventoryList />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: ':eventID',
        element: <EventPage />,
      },
    ],
  },
]);
