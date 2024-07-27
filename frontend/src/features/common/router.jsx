import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';

const HomePage = lazy(() => import('../Home/HomePage'));
const EventPage = lazy(() => import('../../Containers/Event/EventPage'));
const Notes = lazy(() => import('../Notes/Notes'));
const Plan = lazy(() => import('../Maintenance/Plan'));
const ProfilePage = lazy(() => import('../Profile/ProfilePage'));
const AppearanceSettings = lazy(() => import('../Profile/Appearance/Appearance'));
const InventoryList = lazy(() => import('../InventoryList/InventoryList'));
const CategoryList = lazy(() => import('../Home/Categories/CategoryList'));
const RecentList = lazy(() => import('../RecentList/RecentList'));

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
        path: '/categories/list',
        element: <CategoryList />,
      },
      {
        path: '/plans/list',
        element: <Plan />,
      },
      {
        path: '/reports',
        element: <InventoryList />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: '/profile/appearance',
        element: <AppearanceSettings />,
      },
      {
        path: 'profile/notes',
        element: <Notes />,
      },
      {
        path: 'recent/activities',
        element: <RecentList />,
      },
      {
        path: ':eventID',
        element: <EventPage />,
      },
    ],
  },
]);
