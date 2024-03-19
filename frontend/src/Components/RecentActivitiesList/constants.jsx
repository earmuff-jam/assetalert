import {
  EmojiEventsRounded,
  HighlightOffRounded,
  ReportRounded,
  LocalAtmRounded,
  TrackChangesRounded,
} from '@material-ui/icons';

export const RECENT_TROPHY_COLLECTION_TABS = [
  {
    id: 1,
    title: 'Created Events',
    icon: <EmojiEventsRounded color="primary" />,
    tooltipPlacement: 'left-start',
    count: 10,
  },
  {
    id: 2,
    title: 'Volunteered Events',
    icon: <TrackChangesRounded color="error" />,
    tooltipPlacement: 'left-start',
    count: 2,
  },
  {
    id: 3,
    title: 'Issues Reported',
    icon: <ReportRounded color="error" />,
    tooltipPlacement: 'left-start',
    count: 1,
  },
  {
    id: 4,
    title: 'Deactivated Events',
    icon: <HighlightOffRounded color="inherit" />,
    tooltipPlacement: 'left-start',
    count: 2,
  },
  {
    id: 5,
    title: 'Expenses Reported',
    icon: <LocalAtmRounded color="error" />,
    tooltipPlacement: 'left-start',
    count: 2,
  },
  {
    id: 6,
    title: 'Inventories Updated',
    icon: <HighlightOffRounded color="inherit" />,
    tooltipPlacement: 'left-start',
    count: 2,
  },
];
