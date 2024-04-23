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
    key: 'created_events',
    icon: <EmojiEventsRounded color="primary" />,
    tooltipPlacement: 'left-start',
    tooltipContent: 'events created',
  },
  {
    id: 2,
    title: 'Volunteered Events',
    key: 'volunteered_events',
    icon: <TrackChangesRounded color="error" />,
    tooltipPlacement: 'left-start',
    tooltipContent: 'events volunteered',
  },
  {
    id: 3,
    title: 'Issues Reported',
    key: 'reported_events',
    icon: <ReportRounded color="error" />,
    tooltipPlacement: 'left-start',
    tooltipContent: 'issues reported',
  },
  {
    id: 4,
    title: 'Deactivated Events',
    key: 'deactivated_events',
    icon: <HighlightOffRounded color="inherit" />,
    tooltipPlacement: 'left-start',
    tooltipContent: 'events deactivated',
  },
  {
    id: 5,
    title: 'Expenses Reported',
    key: 'expenses_reported',
    icon: <LocalAtmRounded color="error" />,
    tooltipPlacement: 'left-start',
    tooltipContent: 'expenses created',
  },
  {
    id: 6,
    title: 'Inventories Updated',
    key: 'inventories_updated',
    icon: <HighlightOffRounded color="inherit" />,
    tooltipPlacement: 'left-start',
    tooltipContent: 'inventories updated',
  },
];
