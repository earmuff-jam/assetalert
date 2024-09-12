import {
  Inventory2Rounded,
  HomeRounded,
  PreviewRounded,
  AccountBoxRounded,
  PushPinRounded,
  CategoryRounded,
  SummarizeRounded,
  ReportSharp,
} from '@mui/icons-material';

export const PARENT_MENU_LIST = [
  {
    id: 1,
    icon: <HomeRounded fontSize="small" color="primary" />,
    label: 'Home',
    to: '/',
  },
  {
    id: 2,
    icon: <Inventory2Rounded fontSize="small" />,
    label: 'Assets',
    to: '/inventories/list',
  },
  {
    id: 3,
    icon: <CategoryRounded fontSize="small" />,
    label: 'Categories',
    to: '/categories/list',
  },
  {
    id: 4,
    icon: <SummarizeRounded fontSize="small" />,
    label: 'Maintenance plans',
    to: '/plans/list',
  },
  {
    id: 5,
    icon: <ReportSharp fontSize="small" />,
    label: 'Reports',
    to: '/reports',
  },
];

export const SETTINGS_CHILDREN_MENU_LIST = [
  {
    id: 1,
    icon: <PreviewRounded fontSize="small" />,
    label: 'Appearance',
    to: '/profile/appearance',
  },
  {
    id: 2,
    icon: <AccountBoxRounded fontSize="small" />,
    label: 'Profile details',
    to: '/profile',
  },
];

export const PINNED_CHILDREN_MENU_LIST = [
  {
    id: 1,
    icon: <PushPinRounded fontSize="small" sx={{ transform: 'rotate(45deg)' }} color="warning" />,
    label: 'Recent Activities',
    to: '/recent/activities',
  },
  {
    id: 2,
    icon: <PushPinRounded fontSize="small" sx={{ transform: 'rotate(45deg)' }} color="warning" />,
    label: 'Personal Notes',
    to: '/profile/notes',
  },
];
