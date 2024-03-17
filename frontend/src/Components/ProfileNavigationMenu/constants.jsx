import { BookmarkRounded, ListRounded, NotesRounded, TimelineRounded } from '@material-ui/icons';

/**
 * Profile Navigation Menu Bar
 *
 * Contant values for the profile nav menu bar
 */
export const PROFILE_NAVIGATION_MENU_BAR = [
  {
    id: 1,
    icon: <BookmarkRounded />,
    displayName: 'Tags',
    subtitle: '',
    color: '',
    onClick: () => {},
  },
  {
    id: 2,
    icon: <TimelineRounded />,
    displayName: 'Recent Activities',
    subtitle: 'Recently created events or volunteered events',
    color: '',
    onClick: () => {},
  },
  {
    id: 3,
    icon: <ListRounded />,
    displayName: 'Inventories',
    subtitle: '',
    color: '',
    onClick: () => {},
  },
  {
    id: 4,
    icon: <NotesRounded />,
    displayName: 'Notes',
    subtitle: '',
    color: '',
    onClick: () => {},
  },
];
