import { ListRounded, NotesRounded, TimelineRounded } from '@material-ui/icons';

/**
 * Profile Navigation Menu Bar
 *
 * Contant values for the profile nav menu bar
 */
export const PROFILE_NAVIGATION_MENU_BAR = [
  {
    id: 1,
    icon: <TimelineRounded />,
    displayName: 'Recent Activities',
    subtitle: 'Recently created events or volunteered events',
    color: '',
  },
  {
    id: 2,
    icon: <ListRounded />,
    displayName: 'Inventories',
    subtitle: '',
    color: '',
  },
  {
    id: 3,
    icon: <NotesRounded />,
    displayName: 'Notes',
    subtitle: '',
    color: '',
  },
];
