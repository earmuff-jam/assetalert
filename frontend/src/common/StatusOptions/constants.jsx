import {
  AnnouncementRounded,
  ArchiveRounded,
  CancelRounded,
  CheckCircleRounded,
  DraftsRounded,
  NoteRounded,
  PauseRounded,
  PendingActionsRounded,
} from '@mui/icons-material';

export const STATUS_OPTIONS = [
  {
    id: 1,
    label: 'draft',
    display: 'Draft Status',
    icon: <DraftsRounded fontSize="small" color="primary" />,
  },
  {
    id: 2,
    label: 'archived',
    display: 'Archived Status',
    icon: <ArchiveRounded fontSize="small" color="secondary" />,
  },
  {
    id: 3,
    label: 'completed',
    display: 'Completed Status',
    icon: <CheckCircleRounded fontSize="small" color="primary" />,
  },
  {
    id: 4,
    label: 'pending',
    display: 'Pending Status',
    icon: <PendingActionsRounded fontSize="small" color="secondary" />,
  },
  {
    id: 5,
    label: 'urgent',
    display: 'Urgent Status',
    icon: <AnnouncementRounded fontSize="small" color="info" />,
  },
  {
    id: 6,
    label: 'general',
    display: 'General Status',
    icon: <NoteRounded fontSize="small" color="info" />,
  },
  {
    id: 7,
    label: 'on_hold',
    display: 'On Hold Status',
    icon: <PauseRounded fontSize="small" color="warning" />,
  },
  {
    id: 8,
    label: 'cancelled',
    display: 'Cancelled Status',
    icon: <CancelRounded fontSize="small" color="error" />,
  },
];
