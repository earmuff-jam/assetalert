import {
  Inventory2Rounded,
  HomeRounded,
  PushPinRounded,
  CategoryRounded,
  SummarizeRounded,
  ReportSharp,
  Person2Rounded,
} from '@mui/icons-material';

export const MENU_ACTION_BAR_DEFAULT_LIST = [
  {
    id: 1,
    icon: <HomeRounded fontSize="small" />,
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
  {
    id: 6,
    icon: <Person2Rounded fontSize="small" />,
    label: 'Profile',
    to: '/profile',
  },
];

export const PINNED_DEFAULT_INSET_MENU_LIST = [
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
